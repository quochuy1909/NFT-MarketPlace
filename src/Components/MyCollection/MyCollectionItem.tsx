import { Link } from 'react-router-dom'
import { IMyCollectionItem } from '../type'
interface IMyCollecItemProps {
    myCollect: IMyCollectionItem[] | null,
    handleApprove: any
}
const MyCollectionItem = ({ myCollect, handleApprove }: IMyCollecItemProps) => {
  const handleApproveByItem = (index: number, isApprove: boolean) => {
    if (handleApprove) {
      handleApprove(index, isApprove)
    }
  }
  return (
    <>
      {myCollect ? (myCollect.map((mc: IMyCollectionItem, ind: number) => {
        const mcArr = [mc.atk, mc.hp, mc.crit, mc.critdame, mc.stat]
        return (
          <div key={ind}>
            <div className='my-2 border-2 border-gray-200 rounded-lg'>
            </div>
            <div className='grid md:grid-cols-8 font-semibold text-base mb-6 sm:grid-cols-4 sm:gap-4'>
              <div className='md:col-span-2 sm:col-span-2'>
                <div className='grid grid-cols-2'>
                  <div className='col-span-1 mr-2'>
                    <Link to={`/nft/${mc.uri}/${mc.index}`}>
                      <img className='rounded-lg' src={mc.image} />
                    </Link>
                  </div>
                  <div className='col-span-1 align-middle font-semibold m-auto text-center'>
                    {mc.name}
                  </div>
                </div>
              </div>
              {mcArr ? mcArr.map((mcA, index) => {
                return (
                  <div className='md:col-span-1 font-normal text-center m-auto max-md:hidden' key={index}>
                    {mcA}
                  </div>
                )
              }) : ''}
              <div className='md:col-span-1 text-right  m-auto max-sm:hidden'>
                <div className='w-24'>
                  <button
                    className=
                      {mc.isApprove ? 'bg-gray-600 rounded-lg text-white hover:bg-gray-800 w-24 h-24'
                        : 'w-24 h-24 bg-red-400 rounded-lg text-white hover:bg-red-600'}
                    onClick={() => { handleApproveByItem(mc.index, mc.isApprove) }}
                  >
                    {mc.isApprove ? 'Revoke Approve' : 'Sell NFT'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })) : ''}
    </>
  )
}

export default MyCollectionItem