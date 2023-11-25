import { Web3Provider } from '@ethersproject/providers'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { IShowPopup } from '../type'
import { ReactComponent as Sucess } from '../../image/sucess.svg'
import { memo } from 'react'
const PopupMintNFT = ({ ...props }: IShowPopup) => {
  const provider: Web3Provider = useSelector((state: any) => state.providerReducer?.reduxProvider?.payload)
  const [showModal, setShowModal] = useState(false)
  const [approving, setApproving] = useState(false)
  const start = () => {
    { props ? setShowModal(true) : setShowModal(false) }
    const approvedHash: string | undefined = props.approvedHash
    if (approvedHash) {
      const getReceipt = async () => {
        setApproving(true)
        while (await provider.getTransactionReceipt(approvedHash) == null) {
          console.log('receipt null')
        }
        await provider.getTransactionReceipt(approvedHash)
        setApproving(false)
      }
      getReceipt()
    }
  }
  useEffect(() => {
    start()
  }, [provider, props.showModalApprove, props.approvedHash])
  return (
    <div>
      <div className='popUp'>
        {props.showModalApprove == null ? '' : showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className=" p-5 border-b border-solid border-blueGray-200 rounded-t w-80">
                    <h3 className="text-3xl font-semibold text-center">
                      {approving ? <span className='text-red-400 '>Processing</span> : <span className='text-lime-400'>Done</span>}
                    </h3>

                  </div>
                  {/*body*/}
                  <div className='p-4 w-full h-full'>
                    <div className='m-auto font-semibold text-lg mb-4'>
                      {props.popupContent && props.popupContent}
                    </div>
                    {approving ?
                      <div className="m-auto w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400">
                      </div>
                      :
                      <Sucess />
                    }
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setShowModal(false)
                      }}>
                                            Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null
        }
      </div>
    </div>
  )
}

export default memo(PopupMintNFT)