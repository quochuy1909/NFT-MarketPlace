import Connect from './Connect'

const ConnectComponent = () => {
  return (
    <>
      <div className='container mx-auto '>
        <div className='text-center'>
          <div className='mt-52 font-bold text-lg my-8'>
            Connect Wallet to Create NFT
          </div>
          <div className='mb-8 text-center'>
            <Connect />
          </div>
        </div>
      </div>
    </>
  )
}

export default ConnectComponent