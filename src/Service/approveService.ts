import { IApproveProps, IItemAproveProps, IUnApproveProps } from '../Components/type'
import { CONTRACT_APPROVE } from '../util/config'
const approveNFT = CONTRACT_APPROVE
export async function isItemApproved(props: IItemAproveProps) {
  const { contract, index, account }: IItemAproveProps = { ...props }
  const checkApproved: string = await contract.getApproved(index)
  const checkOwner: string = await contract.ownerOf(index)
  let isOwner
  if (checkOwner == account) {
    isOwner = true
  }
  let isApproved
  if (checkApproved == approveNFT && checkOwner == account) {
    isApproved = true
  }
  let canBuy
  if (checkApproved == approveNFT && checkOwner != account) {
    canBuy = true
  }
  return { checkOwner, isOwner, isApproved, approveNFT, checkApproved, canBuy }
}

export async function unApprove(props: IUnApproveProps) {
  const { contract, index, account }: IUnApproveProps = { ...props }
  const unApprov = await contract.approve(account && account, index)
  return await unApprov
}
export async function approve(props: IApproveProps) {
  const { contract, index }: IApproveProps = { ...props }
  const approve = await contract.approve(approveNFT, index)
  return await approve
}