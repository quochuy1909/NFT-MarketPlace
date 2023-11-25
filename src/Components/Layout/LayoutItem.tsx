import { Link } from 'react-router-dom'
import { ILayoutItemProps, INFT } from '../type'
import LayoutPopup from './LayoutPopup'

const LayoutItem = ({openPopup,handlePopup,selecting,arrStat,showModal,li,index
}:ILayoutItemProps) => {
  const handleOpenPopup = (li: INFT) => {
    if (openPopup) {
      openPopup(li)
    }
  }
  return (
    <>
      <div className='group/item' key={index}>
        <div>
          <img
            onClick={() => { handleOpenPopup(li) }} 
            loading='lazy'
            className='cursor-pointer bg-auto rounded-t-2xl transition ease-in-out delay-150 hover:opacity-75 duration-100'
            src={li.image} />
        </div>
        <div className='bg-gray-800 rounded-b-2xl'>
          <div className='flex flex-row'>
            <span className='basis-4/5 text-white font-medium text-base pt-2 pl-4 pb-2 md:h-14 text-ellipsis overflow-hidden h-24' >{li?.name}</span>
          </div>
          <div className='flex flex-row'>
            <span className='basis-4/5 text-white font-medium text-base pt-2 pl-4 pb-2'>{li?.price}</span>
          </div>
          <div>
            <div className="group/edit invisible bg-cyan-600 group-hover/item:visible p-2 rounded-b-2xl  flex flex-row hover:opacity-80 ">
              <Link to={`/nft/${li.uri}/${li.id}`} className='text-white font-medium text-base flex-none mx-auto p-0 hover:text-neutral-50'>Access</Link>
            </div>
          </div>
        </div>
      </div>
      <div className='popUp'>
        {showModal ? <LayoutPopup handleClosePopup={handlePopup} selectingItem={selecting}
          arrStat={arrStat} /> : null}
      </div>
    </>
  )
}

export default LayoutItem