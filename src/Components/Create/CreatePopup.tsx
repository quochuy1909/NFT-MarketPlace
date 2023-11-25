import { useWeb3React } from '@web3-react/core'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { closePopupeExisted } from '../../Redux/createSlice'
import { useSelector } from 'react-redux'
import { ICreatePopup, ICreateProps } from '../type'
import createService from '../../Service/createService'
import { Contract, Signer } from 'ethers'
import CreatePopupBody from './CreatePopupBody'
import CreatePopupFooter from './CreatePopupFooter'

const CreatePopup = ({ handleOpenPopup, nftStatList, nftStat, NFTImage, handleOpenPopupMinting, NFTDescription }: ICreatePopup) => {
  const { account } = useWeb3React()
  const reduxListSize: number = useSelector((state: any) => state.providerReducer?.reduxListSize?.payload)
  const reduxContract: Contract = useSelector((state: any) => state.providerReducer?.reduxContract?.payload)
  const reduxSigner: Signer = useSelector((state: any) => state.providerReducer?.reduxSigner)
  const [showModalApprove, setShowModalApprove] = useState<boolean | null>(null)
  const dispatch = useDispatch()
  const statList = nftStatList
  const NFTStat = nftStat
  const handleSubmit = async () => {
    if (account && reduxListSize) {
      try {
        const index = Number(reduxListSize.toString()) + 1
        const createProps: ICreateProps = {
          NFTImage, account, NFTStat, statList,
          reduxContract, reduxSigner, index, NFTDescription
        }
        const receipt = await createService({ ...createProps })
        const receiptHash: string = await receipt.hash
        if (handleOpenPopupMinting) {
          handleOpenPopupMinting(receiptHash)
        }
        setShowModalApprove(!showModalApprove)
      } catch (err) {
        console.log(err)
      }
    }
  }
  const handleClosePopup = () => {
    dispatch(closePopupeExisted(false))
    handleOpenPopup()
  }
  return (
    <>
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className=" p-5 border-b border-solid border-blueGray-200 rounded-t w-80">
                <h3 className="text-3xl font-semibold text-center">
                                    Mint NFT
                </h3>
              </div>
              {/*body*/}
              <CreatePopupBody nftStatList={nftStatList} nftStat={nftStat} NFTImage={NFTImage}  NFTDescription={NFTDescription} />
              {/*footer*/}
              <CreatePopupFooter handleClosePopup={handleClosePopup} handleSubmit={handleSubmit} />
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </>
  )
}

export default CreatePopup