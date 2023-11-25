import { useEffect, useState } from 'react'
import useLayout from '../Layout/useLayout'
import { INFT } from '../type'
import CaroseulComponent from './CaroseulComponent'
interface INFTListNFTSameOwner{
    listItemSameOwner: INFT[],
}
const NFTListNFTSameOwner = ({listItemSameOwner}:INFTListNFTSameOwner) => {
  const [list, setList] = useState<INFT[]>([])
  const [loading, setLoading] = useState<boolean>()
  const {openPopup,handlePopup,selecting,arrStat,showModal} = useLayout({type:'layout'})
  const getNewList = ()=>{
    setLoading(true)
    if(listItemSameOwner){
      const arr:INFT[] = []
      listItemSameOwner.forEach((li,index) => {
        if(index < 8){
          arr.push(li)
        }
      });
      setList(arr)
    }
    if(list.length == 8){
      setLoading(false)
    }
  }
  useEffect(()=>{
    getNewList()
  },[listItemSameOwner,loading])
  return (
    <div className='w-full h-fit'>
      <CaroseulComponent openPopup={openPopup} li={list}
        handlePopup = {handlePopup} selecting = {selecting} arrStat = {arrStat} showModal = {showModal}/>
    </div>
  )
}

export default NFTListNFTSameOwner