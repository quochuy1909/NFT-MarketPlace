import { INFTInput } from '../type'
interface ICreatePopupBody {
    nftStatList: INFTInput[],
    nftStat: string,
    NFTImage: string|undefined,
    NFTDescription: string,
}
const CreatePopupBody = ({ nftStatList, nftStat, NFTImage, NFTDescription }: ICreatePopupBody) => {
  return (
    <>
      <div className='p-4 w-full h-full grid grid-cols-3 border-2 border-gray-300 '>
        <div className='col-span-2'>
          {nftStatList ? nftStatList.map((nft, index) => {
            return (
              <div key={index} className='m-auto font-semibold text-lg mb-4 grid grid-cols-2 gap-8'>
                <div className='col-auto'>{nft.name}</div>
                <div className={`col-auto ${nft.name === 'NFT Price' ? 'text-red-400' : ''}`}>
                  {nft.value} {nft.name === 'NFT Price' ? 'ETH' : ''}
                </div>
              </div>
            )
          }) : ''}
          <div className='m-auto font-semibold text-lg mb-4 grid grid-cols-2 gap-8'>
            <div className='col-auto'>NFT Stat</div>
            <div className='col-auto'>{nftStat}</div>
          </div>
          <div className='m-auto font-semibold text-lg mb-4 grid grid-cols-2 gap-8 '>
            <div className='col-auto'>NFT Description</div>
            <div className='col-auto w-96 h-24 overflow-auto'>
              <span className='w-[150%] max-w-none h-auto'>{NFTDescription}</span>
            </div>
          </div>
        </div>
        <div className='col-span-1 mx-auto'>
          <img className='rounded-lg text-center' src={NFTImage} />
        </div>
      </div>
    </>
  )
}

export default CreatePopupBody