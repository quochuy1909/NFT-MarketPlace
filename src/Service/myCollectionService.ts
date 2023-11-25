import { IMyCollectionItem, IMyCollectProps } from '../Components/type';
import { CONTRACT_APPROVE } from '../util/config';
export default async function myCollectionService(props: IMyCollectProps) {
  const { contract, account, listNFT } = props
  const itemArr: IMyCollectionItem[] = []
  const list = await contract.allMintsShow();

  for (let i = 1; i <= list.length; i++) {
    if ((await contract.ownerOf(i)) == account) {
      const index:number = i - 1
      const getItem = listNFT[index]
      const checkApproved = await contract.getApproved(i)
      let isItemApproved = false
      if (checkApproved == CONTRACT_APPROVE) {
        isItemApproved = true
      }
      itemArr.push({
        ...getItem,
        index: i,
        isApprove: isItemApproved,
        uri: list[index]._uri
      })

    }
  }
  return itemArr
}