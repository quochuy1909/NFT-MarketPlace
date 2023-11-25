import HomeLoading from './HomeLoading'
import {  LayoutProps } from '../type'
import {  useState } from 'react'
import LayoutComponent from './LayoutComponent'
import useLayout from './useLayout'

const Layout = () => {
  const [type, setType] = useState<LayoutProps>({ type: 'layout' })
  const handleFilterOption = (value: string) => {
    if (value) {
      setType({ type: value })
    }
  }
  const { list, openPopup, showModal, handlePopup, selecting, arrStat,
    isOn, loading } = useLayout(type)
  return (
    <>
      {loading ? (
        <HomeLoading col={5}/>
      ) : ''}
      <LayoutComponent list={[...list]} openPopup={openPopup} showModal={showModal}
        handlePopup={handlePopup} selecting={selecting} arrStat={arrStat}
        isOn={isOn} filterOption={handleFilterOption} />
    </>
  )
}

export default Layout

