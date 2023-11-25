import { useState } from 'react'
import PopupApprove from '../Popup/PopupApprove'
import { useSelector } from 'react-redux'
import { IBuyReceipt, IApprovePopup, INftProps } from '../type'
import NFTLayoutPopup from './NFTLayoutPopup'
import NFTLayoutDescription from './NFTLayoutDescription'
import NFTLayoutNFTDetail from './NFTLayoutNFTDetail'
import NFTListNFTSameOwner from './NFTListNFTSameOwner'

const NFTLayout = ({ ...props }: INftProps) => {
  const [showModalApprove, setShowModalApprove] = useState<boolean | null>(null)
  const [approvedHash, setApprovedHash] = useState<string>('')
  const [toggleStat, setToggleStat] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const { item, owner, isApproved, isOwner, handleUnApproved, handleApprove,
    handleBuy, listItemByOwner, canBuy,listItemSameOwner }: INftProps = { ...props }
  const popup = useSelector((state: any) => state.providerReducer?.reduxPopupApprove?.payload)
  const [type, setType] = useState<string>('')
  const approvePopup: IApprovePopup = { showModalApprove, isApproved, approvedHash, type }
  const startBuy = useSelector((state: any) => state.providerReducer?.reduxPopupBuy?.payload)

  const getHandleUnApproved = async () => {
    try {
      if (popup) {
        setType('approve')
        setShowModalApprove(!showModalApprove)
      }
      const unApproved = await handleUnApproved()
      setApprovedHash(unApproved.hash)
      setShowModal(false)
    } catch (err) {
      console.log(err)
    }
  }
  const getHandleApproved = async () => {
    try {
      const approved = await handleApprove()
      setApprovedHash(approved.hash)
      setType('approve')
      setShowModalApprove(!showModalApprove)
      setShowModal(false)
    } catch (err) {
      console.log(err)
    }
  }
  const getHandleBuy = async () => {
    try {
      setType('buy')
      setApprovedHash('')
      setShowModalApprove(!showModalApprove)
      const buy: IBuyReceipt = await handleBuy()
      const receipt1 = buy.sendNFTFromOwnerToBuyerHash
      setApprovedHash(receipt1)
      setShowModal(false)
    } catch (err) {
      console.log(err)
    }
  }
  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleClosePopup = (closePopup: boolean) => {
    setShowModal(closePopup);
  }
  const handleToggle = () => {
    setToggleStat(!toggleStat)
  }
  return (
    <div className='container mx-auto mb-24'>
      {item ? (
        <>
          <div className='md:flex md:flex-row mt-6 mb-4 ml-4 mr-4 '>
            <NFTLayoutDescription item={item} handleToggle={handleToggle} toggleStat={toggleStat} />
            <div className='basis-1/2 mx-4 pb-8 h-fit'>
              <NFTLayoutNFTDetail item={item} owner={owner} isApproved={isApproved}
                popup={popup} canBuy={canBuy} isOwner={isOwner} listItemByOwner={listItemByOwner}
                getHandleBuy={getHandleBuy} handleShowModal={handleShowModal} startBuy={startBuy}
              />
              <div>
                <div className='text-lg font-bold m-2'>
                  Same Owner List:
                </div>
                <div>
                  <NFTListNFTSameOwner listItemSameOwner={listItemSameOwner} />
                </div>
              </div>
            </div>
          </div>
        </>) : ''}
      {/* Popup Un Approve */}
      {showModal ? <NFTLayoutPopup handlePopup={handleClosePopup}
        checkApprove={isApproved} getHandleUnApproved={getHandleUnApproved}
        getHandleApproved={getHandleApproved} /> : null}
      {/* End Popup */}
      <PopupApprove {...approvePopup} />
    </div>
  )
}

export default NFTLayout