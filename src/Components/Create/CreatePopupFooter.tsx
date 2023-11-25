interface ICreatePopupFooter {
    handleClosePopup: () => void,
    handleSubmit: () => Promise<void>
}
const CreatePopupFooter = ({ handleClosePopup, handleSubmit }: ICreatePopupFooter) => {
  const handleClose = () => {
    if (handleClosePopup) {
      handleClosePopup()
    }
  }
  const handleSubmitPopup = () => {
    if (handleSubmit) {
      handleSubmit()
    }
  }
  return (
    <>
      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
        <button
          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={handleClose}>
                    Close
        </button>
        <button
          className="text-lime-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          onClick={handleSubmitPopup}
        >Confirm</button>
      </div>
    </>
  )
}

export default CreatePopupFooter