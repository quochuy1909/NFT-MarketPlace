import { Contract } from 'ethers'
import { INFT } from '../Components/type'

export default async function layoutService(contract: Contract) {
  const list = await contract.allMintsShow()
  const fetchImg = async () => {
    const fetchUrl: any[] = list.map((l: any, i: any) => {
      return fetch(`https://ipfs.io/ipfs/${list[i]._uri}`).then(res => {
        return res.json()
      }).then((result: INFT) => {
        const id = i + 1
        const newObject: INFT = {
          ...result,
          uri: list[i]._uri,
          id: id
        }
        return newObject
      })
    })
    const newPromiseAll = Promise.all(fetchUrl).then(res => {
      return res
    })
    return await newPromiseAll
  }
  const rs: INFT[] = await fetchImg()
  return rs
}

