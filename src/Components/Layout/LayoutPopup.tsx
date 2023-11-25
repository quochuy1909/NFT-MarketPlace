import LayoutPopupDetail from './LayoutPopupDetail'
import LayoutPopupFooter from './LayoutPopupFooter'
import { INFT, Stat } from '../type'
interface ILayoutPopupProps {
    handleClosePopup: any,
    selectingItem: INFT | undefined,
    arrStat: Stat[]
}
const LayoutPopup = ({ handleClosePopup, selectingItem, arrStat }: ILayoutPopupProps) => {
  const handleClose = () => {
    if (handleClosePopup) {
      handleClosePopup(false)
    }
  }
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-1 px-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-2xl pt-4 font-semibold">
                                Item Detail
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 pt-2 flex-auto">
              <div className='flex flex-row'>
                <p className="my-4 text-blueGray-500 text-lg leading-relaxed mr-10 basis-1/2">
                  <img className='rounded-lg' src={selectingItem?.image} />
                </p>
                <div>
                  {/* detail popup */}
                  <LayoutPopupDetail arrStat={arrStat} />
                  {/* detail popup */}
                </div>
              </div>
            </div>
            {/*footer*/}
            <LayoutPopupFooter selectingItem={selectingItem} handleClose={handleClose} />
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default LayoutPopup