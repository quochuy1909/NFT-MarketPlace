import LayoutComponent from './LayoutComponent';
import { INFT, LayoutProps } from '../type';
import { useState } from 'react';
import useLayout from './useLayout';
import { useWeb3React } from '@web3-react/core';
import GoHomePageComponent from '../GoHomePageComponent';

const SearchComponent = () => {
  const {account} = useWeb3React()
  const [type, setType] = useState<LayoutProps>({ type: 'search' })
  const handleFilterOption = (value: string) => {
    if (value) {
      setType({ type: value })
      setType({ type: 'search' })
    }
  }
  const { list, openPopup, showModal, handlePopup, selecting, arrStat, isOn } = useLayout(type)
  return (
    <>
      {account ? <LayoutComponent list={list as INFT[]} openPopup={openPopup} showModal={showModal}
        handlePopup={handlePopup} selecting={selecting} arrStat={arrStat} isOn={isOn} filterOption={handleFilterOption} /> : <GoHomePageComponent /> }
    </>
  )
}

export default SearchComponent