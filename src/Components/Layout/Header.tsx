import {  useState } from 'react';
import { useWeb3React } from '@web3-react/core'
import { Link } from 'react-router-dom';
import Connect from '../Connect/Connect';
import EstherscanComponent from '../Connect/EstherscanComponent';
import { ReactComponent as Logo } from '../../image/logo.svg'
const Header = () => {
  const [searchInput, setSearchInput] = useState<string>('')
  const { account } = useWeb3React();
  return (
    <div className='h-1/6 w-full m-4 lg:container lg:mx-auto md:container md:mx-auto sm:container sm:mx-auto'>
      <div className='grid 2xl:grid-cols-12 gap-4 xl:grid-cols-12 gap-4 lg:grid-cols-9 gap-4 md:grid-cols-6 gap-3 sm:grid-cols-6 gap-2 grid-cols-4 gap-6'>
        <div className='my-auto mr-6 '>
          <Link to='/' className='flex flex-row my-auto '>
            <img className='basis-1/4 h-6 w-6 mr-1' src='https://s.pinimg.com/webapp/favicon-22eb868c.png' />
            <span className=' text-red-600 text-lg font-medium '>Pinterest</span>
          </Link>
        </div>
        <Link to='/create' className='m-auto w-24 text-lg font-bold underline text-center' >
          Create NFT
        </Link>
        <div onClick={()=>setSearchInput('')} className='lg:rounded-full lg:border-4 lg:w-11/12  flex m-auto xl:col-span-7
                2xl:col-span-7 lg:col-span-4 w-0 focus:outline '>
          <Link to={`/search?q=${searchInput}`}>
            <Logo  />
          </Link>
          <input className='lg:w-10/12  w-0 focus:outline-none' type='text' placeholder='Tìm kiếm NFT...'
            onChange={(e) => setSearchInput(e.target.value)} value={searchInput}  />
        </div>
        <Connect />
        <div className='mx-6 ml-12 font-medium col-span-2 max-[640px]:hidden'>
          <div className=''>
            {account && 'Your account:'}
          </div>
          <EstherscanComponent address={account as string} className={'hover:text-cyan-500 hover:underline '} />
        </div>
      </div>
    </div>
  )
}
export default Header
