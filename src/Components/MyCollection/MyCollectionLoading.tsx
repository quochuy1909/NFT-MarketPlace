const MyCollectionLoading = () => {
  const item = [1, 2, 3, 4, 5, 6, 7, 8]
  const title = ['ATK', 'HP', 'Crit', 'CritDame', 'Stat']
  return (
    <>
      <div className='container mx-auto'>
        <div className='m-8'>
          <span className='font-bold text-lg'>
            <div className='ml-4 w-20 h-5 bg-gray-500 rounded-lg'></div>
          </span>
        </div>
        <div className='grid md:grid-cols-8 md:gap-4 font-semibold text-base mb-6 sm:grid-cols-2 sm:gap-4 grid-cols-2 gap-4'>
          <div className='md:col-span-2 text-center'>
            <div className=' mx-auto w-20 h-5 bg-gray-500 rounded-lg'></div>
          </div>
          {title ? title.map((tt) => {
            return (
              <div className='md:col-span-1 max-md:hidden text-center' key={tt}>
                <div className=' w-20 h-5 bg-gray-500 rounded-lg'></div>
              </div>
            )
          }) : ''}
          <div className='md:col-span-1 col-span-1 text-right'>
          </div>
        </div>
        {item && item.map((it) => {
          return (
            <>
              <div className='m-6' key={it}>
                <div>
                  <div className='my-2 border-2 border-gray-200 rounded-lg'>
                  </div>
                  <div className='grid md:grid-cols-8 font-semibold text-base mb-6 sm:grid-cols-4 sm:gap-4'>
                    <div className='md:col-span-2 sm:col-span-2  '>
                      <div className='grid grid-cols-2'>
                        <div className='col-span-1 '>
                          <div className='xl:w-40 xl:h-52 lg:w-32 lg:h-40 w-24 h-32 bg-gray-500 rounded-lg'></div>
                        </div>
                        <div className='col-span-1 align-middle font-normal m-auto text-center'>
                          <div className=' w-14 h-5 bg-gray-500 rounded-lg'></div>
                        </div>
                      </div>
                    </div>
                    {title && title.map((tt) => {
                      return (
                        <div className='md:col-span-1 font-normal text-center m-auto max-md:hidden' key={tt}>
                          <div className=' w-20 h-5 bg-gray-500 rounded-lg'></div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}

export default MyCollectionLoading