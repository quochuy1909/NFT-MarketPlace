import { Provider } from '@ethersproject/providers'
import { Contract, ethers, Signer } from 'ethers'
import { isItemApproved } from './approveService'
import approveABI from '../SmartContract/ApproveNFT.abi.json'
import mintNFT from '../SmartContract/MintNFT.abi.json'
import { CONTRACT_APPROVE_TRANSFER, PK_1, PK_2, CONTRACT_ADDRESS } from '../util/config'
import { IBuyProps, IItemAproveProps } from '../Components/type'

export async function buy(props: IBuyProps) {
  const { owner, provider, account, contract, index, signer, getStart, getStatus, newOwner }: IBuyProps = { ...props }
  const signer3: Signer = new ethers.Wallet(PK_2, provider)
  const signer2: Signer = new ethers.Wallet(PK_1, provider)
  const contract3: Contract = new ethers.Contract(CONTRACT_APPROVE_TRANSFER, approveABI, signer3)
  const providerr: Provider = provider
  const contractNew: Contract = new ethers.Contract(CONTRACT_ADDRESS, mintNFT,
    signer2)
  if (owner != account) {
    const amount = ethers.utils.parseEther('0.001')
    const itemAproveProps: IItemAproveProps = { contract, index, account }
    const isItemAprr = await isItemApproved({ ...itemAproveProps })
    if (isItemAprr.checkApproved == isItemAprr.approveNFT) {
      const sendETHToApproveContract = await signer.sendTransaction({
        to: CONTRACT_APPROVE_TRANSFER,
        value: amount,
      })
      if (getStart) {
        getStart(true)
      }
      if (getStatus) {
        getStatus('Sending ETH to Approver...')
      }
      const sendETHToApproveContractHash: string = sendETHToApproveContract.hash
      while (await providerr.getTransactionReceipt(sendETHToApproveContractHash) == null) {
        await providerr.getTransactionReceipt(sendETHToApproveContractHash)
      }
      await providerr.getTransactionReceipt(sendETHToApproveContractHash)
      const sendETHToOwner = await contract3.sendETHToOwner(amount, isItemAprr.checkOwner)
      if (getStatus) {
        getStatus('Sending ETH to Owner...')
      }
      const sendETHToOwnerHash: string = sendETHToOwner.hash
      while (await providerr.getTransactionReceipt(sendETHToOwnerHash) == null) {
        await providerr.getTransactionReceipt(sendETHToOwnerHash)
      }
      await providerr.getTransactionReceipt(sendETHToOwner?.hash)
      const sendNFTFromOwnerToBuyer = await contractNew.transferFrom(isItemAprr.checkOwner,
        account, index)
      if (getStatus) {
        getStatus('Sending NFT to You...')
      }
      const sendNFTFromOwnerToBuyerHash: string = sendNFTFromOwnerToBuyer.hash
      if (newOwner) {
        newOwner(account)
      }
      return { sendETHToApproveContractHash, sendETHToOwnerHash, sendNFTFromOwnerToBuyerHash }
    }
  }
}