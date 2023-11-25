import { Contract } from 'ethers'
import { INFT } from '../Components/type'
import layoutService from './layoutService'
export async function search(input: string, contract: Contract) {
  const searchList: INFT[] = []
  try {
    const rs = await layoutService(contract)
    rs.map((item, index: number) => {
      if (item.name.includes(input) || (index + 1).toString() == input) {
        searchList.push(item)
      }
    })

    return searchList
  } catch (err) {
    console.log(err)
  }
}