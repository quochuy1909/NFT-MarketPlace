import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
interface ICaroseulButton{
    handleSlide:()=>void,
    icon:any
}
const CaroseulButton = ({handleSlide,icon}:ICaroseulButton) => {
  return (
    <button onClick={handleSlide} className='bg-gray-300 px-3 py-2 rounded-full  h-fit my-auto'>
      <FontAwesomeIcon  icon={ icon } style={{color: '#bd2828'}} />
    </button>
  )
}

export default CaroseulButton