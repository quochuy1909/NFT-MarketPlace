import React from 'react'
import { ILayoutProps, INFT } from '../type'
import ConnectComponent from '../Connect/ConnectComponent'
import { filterService } from '../../Service/filterService'
import LayoutItem from './LayoutItem'

const LayoutComponent = ({ list, openPopup, showModal, handlePopup, selecting, arrStat, isOn, filterOption }: ILayoutProps) => {
  const filter = [
    { name: 'Price low to high', value: 'price-low' },
    { name: 'Price high to low', value: 'price-high' },
    { name: 'By ATK', value: 'by-atk' },
    { name: 'By Hp', value: 'by-hp' },
    { name: 'By Crit', value: 'by-crit' },
    { name: 'By Crit Dame', value: 'by-critdame' },
    { name: 'By Stat', value: 'by-stat' },
  ]
  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    filterOption(e.target.value)
    filterService(e.target.value, list)
  }
  return (
    <>
      <div className='container mx-auto'>
        {list.length != 0 ? <div className='text-right m-4'>
          <select className='border-2 border-gray-400 rounded-lg font-semibold focus:outline-none focus:border-white focus:ring focus:ring-red-300
          focus:bg-gray-200' onChange={(e: any) => { handleFilter(e) }}>
            {filter && filter.map((op, index) => {
              return (
                <option className='hover:bg-gray-300' key={index} value={op.value}> <div className='hover:bg-red-400'>{op.name}</div></option>
              )
            })}
          </select>
        </div> : ''}
        <div className='grid xl:grid-cols-5 xl:gap-12 lg:grid-cols-4 lg:gap-8  md:grid-cols-3 md:gap-4 sm:grid-cols-2 sm:gap-2 grid-cols-2 gap-2 mb-24'>
          {list ? (list.map((li: INFT, index: number) => {
            return(
              <div key={index}>
                <LayoutItem openPopup={openPopup} handlePopup={handlePopup} 
                  selecting={selecting} arrStat={arrStat} showModal={showModal} li={li} index={index}/>
              </div>
            )
          })) : 'Connect Wallet...'}
        </div>
        <div>
          {isOn ? '' : <ConnectComponent />}
        </div>
      </div>
    </>
  )
}

export default LayoutComponent