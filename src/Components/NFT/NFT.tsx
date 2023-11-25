import { useState, useEffect } from 'react'
import { Params, useParams } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import NFTLayout from './NFTLayout'
import { buy } from '../../Service/buyService'
import { CONTRACT_APPROVE } from '../../util/config'
import { isItemApproved } from '../../Service/approveService'
import { CONTRACT_ADDRESS } from '../../util/config'
import { Contract, Signer } from 'ethers'
import { Web3Provider } from '@ethersproject/providers'
import { IBuyReceipt, IBuyProps, IItem, IItemAproveProps, INftProps, INFT } from '../type'
import { API_KEY_ESTHERSCAN } from '../../util/config'
import { popupBuyExisted, popupBuyStatus } from '../../Redux/createSlice'
import GoHomePageComponent from '../GoHomePageComponent'
import myCollectionService from '../../Service/myCollectionService'
const NFT = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [listItemByOwner, setListItemByOwner] = useState<unknown[]>([])
  const [isApproved, setIsApproved] = useState<boolean | undefined>(false)
  const [isOwner, setIsOwner] = useState<boolean | undefined>(false)
  const [canBuy, setCanBuy] = useState<boolean | undefined>(false)
  const [owner, setOwner] = useState<string | undefined>('')
  const [receiptBuyHash, setReceiptBuyHash] = useState<string>('')
  const [listItemSameOwner, setListItemSameOwner] = useState<Array<INFT>>([])
  const { account } = useWeb3React()
  const contract: Contract = useSelector((state: any) => state.providerReducer?.reduxContract?.payload)
  const provider: Web3Provider = useSelector((state: any) => state.providerReducer?.reduxProvider?.payload)
  const signer: Signer = useSelector((state: any) => state.providerReducer?.reduxSigner?.payload)
  const newOwner = useSelector((state: any) => state.providerReducer?.reduxNewOwnerAfterBuy?.payload)
  const listNFT:INFT[] = useSelector((state: any) => state.providerReducer?.reduxListNFT?.payload)
  const dispatch = useDispatch()
  const { id, index }: Params<string> = useParams()
  const [item, setItem] = useState<IItem>()

  const getItem = async () => {
    const data = await axios.get(`https://ipfs.io/ipfs/${id}`)
    const response: IItem = data.data
    setItem(response)
    setLoading(false)
  }
  const getItemByOwn = async (ownerr: string) => {
    const listItem: unknown[] = []
    const getTransaction = async () => {
      const getTr: Response = await fetch(`https://api-sepolia.etherscan.io/api?module=account&action=tokennfttx&contractaddress=${CONTRACT_ADDRESS}&address=${ownerr}&page=1&offset=100&startblock=0&endblock=99999999&sort=asc&apikey=${API_KEY_ESTHERSCAN}`)
      return await getTr.json()
    }
    const rs = await getTransaction()
    const resultList = await rs?.result
    const itemArr:any[] = []
    let count = 0
    resultList.forEach((it: unknown | any) => {
      if (it?.tokenID == index) {
        itemArr.push(it)
      }
    });
    for (let i = itemArr.length - 1; i > 0 ; i--){
      if(count < 3){
        listItem.push(itemArr[i])
      }
      count++
    }
    setListItemByOwner(listItem)
  }

  const getItemApproved = async () => {
    const itemApproveProps: IItemAproveProps = { contract, index, account }
    const getRs = await isItemApproved({ ...itemApproveProps })
    setOwner(getRs.checkOwner)
    setIsOwner(getRs.isOwner)
    setIsApproved(getRs.isApproved)
    setCanBuy(getRs.canBuy)
    return getRs.checkOwner
  }

  const handleUnApproved = async () => {
    const unApprov = await contract.approve(owner && owner, index)
    setIsApproved(false)
    return await unApprov
  }
  const handleApprove = async () => {
    const approve = await contract.approve(CONTRACT_APPROVE, index)
    setIsApproved(true)
    return await approve
  }
  const handleBuy: () => Promise<IBuyReceipt> = async () => {
    const getStart = (isStart: boolean) => {
      if (isStart) {
        dispatch(popupBuyExisted(true))
      }
    }
    const getStatus = (status: string) => {
      dispatch(popupBuyStatus(status))
    }
    const newOwner = (owner: string | undefined) => {
      setOwner(owner)
    }
    const buyProps: IBuyProps = {
      owner, provider, account, contract, index, signer
      , getStart, getStatus, newOwner
    }
    const { sendETHToApproveContractHash
      , sendETHToOwnerHash
      , sendNFTFromOwnerToBuyerHash }: IBuyReceipt = await buy({ ...buyProps }) as IBuyReceipt
    setReceiptBuyHash(sendNFTFromOwnerToBuyerHash)
    return {
      sendETHToApproveContractHash
      , sendETHToOwnerHash
      , sendNFTFromOwnerToBuyerHash
    }
  }
  const getListItemSameOwner = async (owner:string)=>{
    const gettItemByOwner = await myCollectionService({contract,account : owner,listNFT})
    setListItemSameOwner(gettItemByOwner)
  }
  useEffect(() => {
    const start = async () => {
      if (account) {
        await getItem()
        await getItemApproved()
        await getItemByOwn(await getItemApproved())
        await getListItemSameOwner(await getItemApproved())
      }
    }
    start()
  }, [account, newOwner,id])
  const nftProps: INftProps = {
    loading, item, owner, isApproved, isOwner,
    handleUnApproved, handleApprove, handleBuy, listItemByOwner, canBuy, receiptBuyHash,
    listItemSameOwner
  }
  return (
    <>
      {account ? <NFTLayout {...nftProps} /> : <GoHomePageComponent />} 
    </>
  )
}

export default NFT