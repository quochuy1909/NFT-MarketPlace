import { Stat } from '../type'
import {  faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NFTLayoutDescription = ({ item, handleToggle, toggleStat }: any) => {
  const stat: Array<Stat> = [
    { name: 'ATK', value: item?.atk.toString() },
    { name: 'HP', value: item?.hp.toString() },
    { name: 'Crit', value: item?.crit.toString() },
    { name: 'CritDame', value: item?.critdame.toString() },
    { name: 'Stat', value: item?.stat.toString() }
  ]
  const handleToggleStat = () => {
    if (handleToggle) {
      handleToggle()
    }
  }
  return (
    <>
      <div className='basis-1/2 mx-4 pb-10'>
        <div>
          <img className='md:w-2/3 mx-auto border-8 rounded-lg border-stone-500 w-full'
            src={item?.image} />
        </div>
        <div className='m-4 border-2 rounded-lg border-stone-400 md:w-2/3 mx-auto w-full'>
          <div className=' m-2 mb-1 ml-4 font-semibold '>
            <span >Description</span>
          </div>
          <div className='border-2 border-stone-300 rounded-lg mb-1'></div>
          <div>
            <div className='mx-4 font-normal text-sm mb-2'>
              {item?.description? item?.description : 'You are a WITCH hatched from a scheme.You dance atop mountains, samba and ballet on snowy peaks. Your magic spawns from a chickadee song.You hear the whispers of the dead in the leaves, the reeds, the willow trees.  CRAFT MAKEUP FROM THE EARTH!'} 
            </div>
            <div className='border-2 border-stone-300 rounded-lg mb-1'></div>
            <div className=' m-2 mb-1 ml-4 font-semibold flex flex-row'>
              <span className='basis-4/5'>Stat</span>
              <div className=''>
                <button onClick={handleToggleStat}><FontAwesomeIcon icon={faBars} /></button>
              </div>
            </div>
            {toggleStat ? (<div>
              <div className='border-2 border-stone-300 rounded-lg mb-1'></div>
              {stat ? stat.map((st: Stat, index: number) => {
                return (
                  <div key={index} className='flex flex-row m-2 mb-1 ml-4'>
                    <div className='basis-4/5'>
                      <span >{st.name}</span>
                    </div>
                    <div>
                      <span>{st.value}</span>
                    </div>
                  </div>
                )
              }) : ''}
            </div>) : ''}
          </div>
        </div>
      </div>
    </>
  )
}

export default NFTLayoutDescription