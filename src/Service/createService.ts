import axios from 'axios'
import { ICreateProps } from '../Components/type'
import { JWT } from '../util/config'
export default function createService(props: ICreateProps) {
  const { NFTImage, account, statList, reduxContract, index, NFTStat, NFTDescription
  } = props
  const createNFT = async () => {
    try {
      const atk = statList[1].value
      const hp = statList[2].value
      const crit = statList[3].value
      const critdame = statList[4].value
      const stat = (NFTStat && NFTStat)
      const price = statList[5].value + ' ETH'
      const imgURL = NFTImage
      const data = JSON.stringify({
        pinataContent: {
          name: statList[0].value,
          image: imgURL,
          atk: atk,
          hp: hp,
          crit: crit,
          critdame: critdame,
          stat: stat,
          price: price,
          description: NFTDescription
        },
        pinataMetadata: {
          name: 'metadata.json',
        },
      });
      const res = await axios.post(
        'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JWT}`,
          },
        }
      );
      const ipfs: string = res.data.IpfsHash.toString()
      console.log(account, index, ipfs)
      const mintNFT = await reduxContract.mintNFT(
        account, index, ipfs, {
          gasLimit: 200000
        })
      console.log(mintNFT)
      return await mintNFT
    }
    catch (error) {
      console.log(error);
    }

  }
  return createNFT()

}