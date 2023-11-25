import { useEffect, useState } from 'react';
import LayoutItem from '../Layout/LayoutItem';
// import LayoutItem from '../Layout/LayoutItem';
import {  INFT, Stat } from '../type';
import {  faArrowRight,faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import CaroseulButton from './CaroseulButton';
import HomeLoading from '../Layout/HomeLoading';
// import CaroseulLoading from './CaroseulLoading';
// import LayoutPopup from '../Layout/LayoutPopup';
interface ICaroseulComponent{
  li:INFT[],
  openPopup:(li: INFT) => void,
  handlePopup:any,
  selecting:INFT | undefined,
  arrStat:Stat[],
  showModal:boolean,
}
const CaroseulComponent = ({ openPopup, handlePopup, selecting, arrStat, showModal, li}:ICaroseulComponent) => {
  const [current, setCurrent] = useState(0);
  const [currentList, setCurrentList] = useState<INFT[]>([])
  const previousSlide = () => {
    if (current === 0) setCurrent(li.length - 1);
    else setCurrent(current - 1);
  };

  const nextSlide = () => {
    if (current === li.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };
  useEffect(()=>{
    const intervalId = setTimeout(()=>{
      nextSlide()
    },3000)
    return ()=> clearTimeout(intervalId)
  },[current])
  useEffect(()=>{
    let getNewList:INFT[]=[]
    if(current == li.length-1){
      getNewList=[li[current],li[0]]
    }else{
      getNewList=[li[current],li[current+1]]
    }
    setCurrentList(getNewList)
  },[current])
  return (
    <>
      {currentList[0] != undefined? <div className='overflow-hidden'>
        <div
          className='flex transition ease-out delay-500 duration-500'>
          <CaroseulButton handleSlide={previousSlide} icon={faArrowLeft} />
          {currentList.length==2 ? currentList.map((cl,index)=>{
            return(
              <div key={index} className='m-2 mb-7'>
                {cl?<LayoutItem openPopup={openPopup} handlePopup={handlePopup} selecting={selecting} arrStat={arrStat} showModal={showModal} li={cl} index={index} />:
                  <div className='w-full h-48 bg-gray-300'></div>}
              </div>
            )
          }):''}
          <CaroseulButton handleSlide={nextSlide} icon={faArrowRight} />
        </div>
        <div className=' flex justify-center gap-3 w-full'>
          {li.map((s, i:number) => {
            return (
              <div
                onClick={() => {setCurrent(i)}}
                key={'circle' + i}
                className={`rounded-full w-3 h-3 cursor-pointer  ${
                  i == current ? 'bg-red-400' : 'bg-gray-500'
                }`}
              ></div>
            );
          })}
        </div>
      </div>:<div className='px-8 py-2'><HomeLoading col={2}/></div>}
    </>
  );
};

export default CaroseulComponent;