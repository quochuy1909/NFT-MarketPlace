import { Web3Provider } from '@ethersproject/providers'
import { Contract, ethers, Signer } from 'ethers'
import { IEtherProps } from '../Components/type'
import abi from '../SmartContract/MintNFT.abi.json'

export default function etherProvider(props: IEtherProps) {
  const sca = '0x6e40090e0434f384c9584cd5fb58568e1ee3bd57'
  const web3Provider = props.connector?.provider
  const providerr: Web3Provider = new Web3Provider(web3Provider)
  const signer: Signer = providerr.getSigner(props.account)
  const contract: Contract = new ethers.Contract(sca, abi, signer)
  return { providerr, contract, signer }
}