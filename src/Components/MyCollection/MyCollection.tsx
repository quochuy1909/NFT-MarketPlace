import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import myCollectionService from '../../Service/myCollectionService'
import { isItemApproved, approve, unApprove } from '../../Service/approveService'
import PopupApprove from '../Popup/PopupApprove'
import MyCollectionLoading from './MyCollectionLoading'
import { Contract } from 'ethers'
import { Web3Provider } from '@ethersproject/providers'
import { IApprovePopup, IApproveProps, IMyCollectProps, IItemAproveProps, IUnApproveProps, IMyCollectionItem, INFT } from '../type'
import MyCollectionItem from './MyCollectionItem'
import GoHomePageComponent from '../GoHomePageComponent'
const MyCollection = () => {
  const { account } = useWeb3React()
  const [showModalApprove, setShowModalApprove] = useState<boolean | null>(null)
  const [approvedHash, setApprovedHash] = useState<string>('')
  const [isApproved, setIsApproved] = useState<null | boolean>(null)
  const contract: Contract = useSelector((state: any) => state.providerReducer?.reduxContract?.payload)
  const provider: Web3Provider = useSelector((state: any) => state.providerReducer?.reduxProvider?.payload)
  const closePopup: boolean | null = useSelector((state: any) => state.providerReducer?.reduxClosePopupApprove?.payload)
  const listNFT: INFT[] = useSelector((state: any) => state.providerReducer?.reduxListNFT?.payload)
  const [myCollect, setMyCollect] = useState<Array<IMyCollectionItem> | null>(null)
  const type = 'approve'
  const approvePopup: IApprovePopup = { showModalApprove, isApproved, approvedHash, type }
  const title = ['ATK', 'HP', 'Crit', 'CritDame', 'Stat']
  const render = async () => {
    const myCollectProps: IMyCollectProps = { contract, account, listNFT }
    setMyCollect(null)
    setMyCollect(await myCollectionService({ ...myCollectProps }))
  }
  const handleApprove = (index: number, isApprove: boolean) => {
    const start = async () => {
      try {
        const itemAproveProps: IItemAproveProps = { contract, index, account }
        const rs = await isItemApproved({ ...itemAproveProps })
        if (rs.isOwner && rs.checkApproved != rs.approveNFT) {
          const approveProps: IApproveProps = { contract, index }
          const appr = await approve({ ...approveProps })
          setShowModalApprove(!showModalApprove)
          setApprovedHash(appr?.hash)
          setIsApproved(!isApprove)
        }
        if (rs.isOwner && rs.checkApproved == rs.approveNFT) {
          const unApproveProps: IUnApproveProps = { contract, index, account, provider }
          const unAppr = await unApprove({ ...unApproveProps })
          setShowModalApprove(!showModalApprove)
          setApprovedHash(unAppr?.hash)
          setIsApproved(!isApprove)
        }
      } catch (err) {
        console.log(err)
      }
    }
    start()
  }
  useEffect(() => {
    if (account) {
      if (closePopup == false || closePopup == undefined) {
        render()
      }
    }
  }, [account, closePopup])
  return (
    <>
      <div className={`container mx-auto ${account ? 'border-2' : ''} rounded-lg border-gray-400 mb-24`}>
        {account ? (myCollect ? (
          <div>
            <div className='m-8'>
              <span className='font-bold text-lg'>
                                My collection
              </span>
            </div>
            <div className='grid md:grid-cols-8 md:gap-4 font-semibold text-base mb-6 sm:grid-cols-2 sm:gap-4 grid-cols-2 gap-4'>
              <div className='md:col-span-2 text-center '>
                                NFT
              </div>
              {title ? title.map((tt, index: number) => {
                return (
                  <div className='md:col-span-1 max-md:hidden text-center' key={index}>
                    {tt}
                  </div>
                )
              }) : ''}
              <div className='md:col-span-1 col-span-1 text-right'>
              </div>
            </div>
          </div>) :
          <>
            <MyCollectionLoading />
          </>
        ) : <div>
          {account ? '' : <GoHomePageComponent />}
        </div>}
        <div className='m-6 '>
          <MyCollectionItem myCollect={myCollect} handleApprove={handleApprove} />
        </div>
        <PopupApprove {...approvePopup} />
      </div>
    </>
  )
}

export default MyCollection