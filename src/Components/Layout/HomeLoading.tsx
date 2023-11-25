interface IHomeLoading{
  col:number
}
const HomeLoading = ({col}:IHomeLoading) => {
  let item = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  if(col==2){
    item=[1,2]
  }
  return (
    <div className='container mx-auto '>
      <div className={`grid ${col == 3 ? 'xl:grid-cols-3' : col==2 ?'xl:grid-cols-2':'xl:grid-cols-5'} xl:gap-12 ${col ==3 ? 'lg:grid-cols-3' : col==2 ?'lg:grid-cols-2':'lg:grid-cols-4'} lg:gap-8  md:grid-cols-3 md:gap-4 sm:grid-cols-2 sm:gap-2 grid-cols-2 gap-2`}>
        {item && item.map((it: number) => {
          return (
            <div className='group/item' key={it}>
              <div className={`bg-gray-500 ${col==3 ? 'h-32' : col==2 ? 'h-64 w-full' : 'h-56'} w-full rounded-t-2xl`}>
              </div>
              <div className='bg-gray-800 rounded-b-2xl'>
                <div className='flex flex-row'>
                  <div className='mt-3 ml-3 w-20 h-5 bg-gray-500 rounded-lg'></div>
                </div>
                <div>
                  <div className='mt-3 ml-3 w-20 h-5 bg-gray-500 rounded-lg'></div>
                </div>
                <div>
                  <div className={`h-${col == 3 ? '2 ' : '16'}`}> </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HomeLoading