import { useState,useEffect } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IEtherProps } from '../type';
import { contractExisted, providerExisted, signerExisted } from '../../Redux/createSlice';
import etherProvider from '../../util/EtherProvider';
const Connect = () => {
  const { account, connector, provider } = useWeb3React();
  const [metamaskNotExist, setMetamaskNotExist] = useState(false)
  const dispatch = useDispatch()
  const checkMetamask = ()=>{
    if(!window.ethereum){
      setMetamaskNotExist(true)
    }
  }
  const handleActive = async () => {
    const isMetamask = window.ethereum
    console.log(isMetamask)
    if(isMetamask){
      await connector.activate()
      const Web3ReactProvider: Web3Provider | undefined = provider
      const etherProps: IEtherProps = { connector, Web3ReactProvider, account }
      const { providerr, contract, signer } = etherProvider({ ...etherProps })
      dispatch(providerExisted(providerr))
      dispatch(contractExisted(contract))
      dispatch(signerExisted(signer))
    }else{
      console.log('not install')
      setMetamaskNotExist(true)
    }
  }
  useEffect(() => {
    checkMetamask()
    if (account) {
      const getConnect = async () => {
        await handleActive()
      }
      getConnect()
    }
  }, [account])
  return (
    <>
      <button onClick={handleActive}
        className=' flex-initial md:w-32 bg-red-400 rounded-full 
      text-center text-white font-medium hover:bg-red-700 m-auto sm:h-12 fit-content w-24 h-fit'>
        {!metamaskNotExist ? (account ? (
          <Link to='/mycollection'>
            My Collection
          </Link>
        ) : 'Connect Wallet'): <a className='p-1' href='https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?pli=1'>Install Metamask</a>}
      </button>
    </>
  )
}

export default Connect