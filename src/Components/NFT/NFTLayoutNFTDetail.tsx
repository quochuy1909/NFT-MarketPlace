import EstherscanComponent from '../Connect/EstherscanComponent'
import { IItem } from '../type'
interface INFTLayoutNFTDetail {
    item: IItem,
    owner: string | undefined,
    isApproved: boolean | undefined,
    popup: any,
    canBuy: boolean | undefined,
    isOwner: boolean | undefined,
    listItemByOwner: unknown[],
    getHandleBuy: () => Promise<void>,
    handleShowModal: () => void,
    startBuy: boolean
}
const transactionTitle = ['From', 'To', 'Time']
const NFTLayoutNFTDetail = ({ item, owner, isApproved, popup, canBuy, isOwner,
  listItemByOwner, getHandleBuy, handleShowModal, startBuy }: INFTLayoutNFTDetail) => {
  const getTime = (li: any) => {
    const a = new Date(li.timeStamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time
  }
  const handleBuyFromNFTDetail = () => {
    if (getHandleBuy) {
      getHandleBuy()
    }
  }
  const handleShowModalFromNFTDetail = () => {
    if (handleShowModal) {
      handleShowModal()
    }
  }
  return (
    <>
      <div className='border-4 rounded-lg border-gray-500 pb-4'>
        <div className='pt-4 px-4 flex flex-row  '>
          <div className='basis-1/4 font-semibold text-lg my-auto'>
            <div>
                            Name
            </div>
          </div>
          <div className='font-medium text-normal mt-0 text-light '>
            {item.name}
          </div>
        </div>
        <div className='px-4 py-1 flex flex-row'>
          <div className='basis-1/4 font-base text-xs '>
            <span className=''>Owned by:</span>
          </div>
          <div className='font-base text-xs '>
            <EstherscanComponent address={owner} className={'hover:underline hover:text-cyan-500'} />
          </div>
        </div>
        <div className='border-2 mt-6 w-3/4 m-auto rounded-lg border-stone-300'>
        </div>
        <div className='px-4 flex flex-row mt-8'>
          <div className='basis-1/4 font-semibold text-lg my-auto'>
                        Price
          </div>
          <div className='font-medium text-normal my-auto text-red-400 hover:text-red-700'>
            {item.price}
          </div>
        </div>
        <div className='flex flex-row mt-1'>
          {isApproved ? (<button
            onClick={handleShowModalFromNFTDetail}
            className='mx-auto my-6 basis-1/2 text-white bg-gray-800 font-semibold text-lg rounded-lg h-10'>
            {popup ? 'Loading...' : 'Revoke Approval'}
          </button>) : (isOwner ? (<button
            onClick={handleShowModalFromNFTDetail}
            className='mx-auto my-6 basis-1/2 text-white bg-red-400 font-semibold text-lg rounded-lg h-10'>
            {popup ? 'Loading...' : 'Sell NFT'}
          </button>) : (canBuy && <button
            onClick={handleBuyFromNFTDetail}
            className='mx-auto my-6 basis-1/2 text-white bg-red-400 font-semibold text-lg rounded-lg h-10 hover:bg-red-700'>
            {startBuy ? 'Loading...' : 'Buy now'}
          </button>))}
        </div>
        <div className='border-4 mb-4 w-full m-auto rounded-lg border-stone-300 mt-2'></div>
        <div className='pt-4 px-4 mx-4 border-gray-300 border-4 rounded-lg'>
          <div className='font-semibold text-lg my-auto pb-2'>
                        Transaction
          </div>
          <div className='flex flex-row'>
            {transactionTitle && transactionTitle.map((tt, index) => {
              return (
                <div key={index} className='basis-1/3 '>
                  {tt}
                </div>
              )
            })}
          </div>
          <div className='border-2 mb-4 w-full m-auto rounded-lg border-stone-300 mt-2'></div>
          {listItemByOwner ? listItemByOwner.map((li: any, index: number) => {
            const time = getTime(li)
            return (
              <div key={index} className='grid md:grid-cols-3 md:gap-4 my-1 grid-cols-3 gap-2'>
                <div className='md:col-span-1 hover:text-cyan-400 '>
                  <EstherscanComponent address={li.from} className={''} />
                </div>
                <div className='col-span-1 hover:text-cyan-400 '>
                  <EstherscanComponent address={li.to} className={''} />
                </div>
                <div className='col-span-1'>
                  {li.timeStamp ? time : ''}
                </div>
              </div>
            )
          }) : <div className='m-auto font-semibold text-normal'>Not have transaction</div>}
        </div>
      </div>
    </>
  )
}

export default NFTLayoutNFTDetail