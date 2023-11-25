import { Link } from 'react-router-dom'

const GoHomePageComponent = () => {
  return (
    <div className='mt-64 px-2 py-3 m-auto flex-initial md:w-32 bg-red-400 rounded-full 
    text-center text-white align-middle font-medium hover:bg-red-700 m-auto sm:h-12 fit-content w-24 h-fit'>
      <Link to='/' >
                    Go Home Page
      </Link>
    </div>
  )
}

export default GoHomePageComponent