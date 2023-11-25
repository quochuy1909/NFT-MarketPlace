import { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import PopupMintNFT from '../Popup/PopupMintNFT'
import { IShowPopup, INFTInput, IOptions } from '../type'
import InputComponent from './InputComponent'
import RadioComponent from './RadioComponent'
import SelectImageInput from './SelectImageInput'
import CreatePopup from './CreatePopup'
import PopupApprove from '../Popup/PopupApprove'
import GoHomePageComponent from '../GoHomePageComponent'
import TextAriaComponent from './TextAriaComponent'
const Create = () => {
  const popupContent = 'Mint NFT'
  const approvedHash = ''
  const showModalApprove = null
  const { account } = useWeb3React()
  const [NFTStat, setNFTStat] = useState<string>('')
  const [NFTImage, setNFTImage] = useState<string>('')
  const [imgFile, setImgFile] = useState<FileList | null>()
  const [imageBase64, setImageBase64] = useState<string | undefined>('')
  const [NFTDescription, setNFTDescription] = useState<string>('')
  const [NFTDescriptionValid, setNFTDescriptionValid] = useState<boolean>(false)
  const [showValidator, setShowValidator] = useState(false)
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const [showModalStartMint, setShowModalStartMint] = useState(false)
  const [mintHash, setMintHash] = useState<string>('')
  const [mintNFTPopUp, setMintNFTPopUp] = useState(false)
  const NFTInput: Array<INFTInput> = [
    { name: 'NFT Name', placeholder: 'NFT Name', value: '' ,regex:/^[a-zA-Z0-9]+$/,valid:false ,validationMessage:'NFT Name không thể chứa kí tự đặc biệt hoặc để trống'},
    { name: 'NFT ATK', placeholder: 'NFT ATK', value: '0',regex:/^\d+$/ ,valid:false ,validationMessage:'Không được để trống'},
    { name: 'NFT HP', placeholder: 'NFT HP', value: '0',regex:/^\d+$/ ,valid:false ,validationMessage:'Không được để trống'},
    { name: 'NFT Crit', placeholder: 'NFT Crit', value: '0',regex:/^\d+$/ ,valid:false ,validationMessage:'Không được để trống'},
    { name: 'NFT Critdame', placeholder: 'NFT Critdame', value: '0',regex:/^\d+$/ ,valid:false ,validationMessage:'Không được để trống'},
    { name: 'NFT Price', placeholder: 'NFT Price', value: '0',regex:/^\d+$/ ,valid:false ,validationMessage:'Không được để trống'},
  ]
  const [statList, setStatList] = useState<Array<INFTInput>>(NFTInput)
  const options: Array<IOptions> = [
    {
      name: 'option1',
      label: 'Image URL'
    }, {
      name: 'option2',
      label: 'From your Computer'
    }
  ]
  const [selectedOption, setSelectedOption] = useState(options[0].name);
  const handleInputValueChange = (index: number, newValue: string, nftName: string) => {
    if (NFTInput[index].name === nftName) {
      const newNFTInputList = [...statList]
      newNFTInputList[index].value = newValue
      const isValid:boolean|undefined =  NFTInput[index].regex?.test(newValue)
      newNFTInputList[index].valid = isValid as boolean
      setStatList(newNFTInputList)
    }
  };
  const createPopup: IShowPopup = { showModalApprove, popupContent, approvedHash }
  if (imgFile) {
    const reader = new FileReader()
    reader.readAsDataURL(imgFile[0])
    reader.onloadend = () => {
      const rs = reader.result
      setImageBase64(rs?.toString())
    }
  }
  const handleMintNFT = () => {
    const isValidator = validator()
    if(!isValidator){
      setShowValidator(true)
    }else 
    {setShowValidator(false)
      if (statList) {
        let stat = 0
        for (let i = 1; i < 5; i++) {
          stat += Number(statList[i].value)
        }
        setNFTStat((stat / 4).toString())
      }
      setShowModalConfirm(!showModalConfirm)
      setMintNFTPopUp(true)
    }
  }
  const newHandleRadio = (value: string) => {
    setSelectedOption(value)
  }
  const handleGetImage = (value: string | FileList | null, type: string) => {
    { type === 'text' ? setNFTImage(value as string) : setImgFile(value as FileList) }
  }
  const handleOpenPopup = () => {
    setMintNFTPopUp(false)
  }
  const handleOpenPopupMintingCreate = (receiptHash: string) => {
    setMintNFTPopUp(false)
    setShowModalStartMint(true)
    setMintHash(receiptHash)
  }
  const handleTextArea = (value:string)=>{
    setNFTDescription(value)
  }
  const validator = ()=>{
    let isValidAll = true
    const checkRegexDescription:boolean = /^[\w\s]+$/u.test(NFTDescription)
    setNFTDescriptionValid(checkRegexDescription)
    if(!checkRegexDescription) isValidAll=false
    statList.forEach((sl)=>{
      if(!sl.valid){
        isValidAll = false
      }
    })
    return isValidAll
  }
  return (
    <div >
      {account ? (
        <div className='createNFT container mx-auto border-4 rounded-lg text-black font-medium text-base mt-8 pt-2 pl-4 pb-2 flex flex-row mb-24'>
          <div className='ml-10 mr-10 basis-4/6 '>
            {NFTInput ? NFTInput.map((nft, index) => {
              return (
                <>
                  <div className='mt-6 mb-6 flex flex-row' key={index}>
                    <InputComponent initialValue={''} onValueChange={(newValue: string) => handleInputValueChange(index, newValue, nft.name)}
                      placeholder={nft.placeholder}
                      name={nft.name} />
                  </div>
                  <div className='mt-6 mb-6 flex flex-row'>
                    <div className='lg:basis-1/6 sm:basis-2/6 basis-1/2'></div>
                    <div className='px-2 lg:basis-5/6 sm:basis-4/6 basis-1/2 text-base font-base text-red-500'>
                      {showValidator==true && (statList[index].valid? '' : nft.validationMessage)}
                    </div>
                  </div>
                </>
              )
            }) : ''}
            <div className='mt-6 mb-6 '>
              <div className='flex flex-row basis-5/6'>
                <TextAriaComponent handleTextArea={handleTextArea}/>
              </div>
              <div className='mt-6 mb-6 flex flex-row'>
                <div className='lg:basis-1/6 sm:basis-2/6 basis-1/2'></div>
                <div className='px-2 lg:basis-5/6 sm:basis-4/6 basis-1/2 text-base font-base text-red-500'>
                  {showValidator==true && !NFTDescriptionValid ? 'Không thể chứa kí tự đặc biệt' : ''}
                </div>
              </div>
            </div>
            <div className='mt-6 mb-6 flex flex-row'>
              <label className='lg:basis-1/6 sm:basis-2/6 basis-1/2'> NFT Image</label>
              <div className='flex flex-row basis-5/6'>
                <RadioComponent
                  options={options} selectedOption={selectedOption}
                  handleChange={newHandleRadio} name={'chooseImage'} />
              </div>
            </div>
            <div className='mt-6 mb-6 flex flex-row'>
              <label className='py-1 lg:basis-1/6 sm:basis-2/6 basis-1/2'>Up Image</label>
              {selectedOption === 'option1' ?
                <SelectImageInput type={'text'} getImage={handleGetImage} />
                :
                <SelectImageInput type={'file'} getImage={handleGetImage} />
              }
            </div>
            <div className='text-right'>
              <button className='bg-red-400 p-2 rounded-lg text-white hover:opacity-80 ' onClick={handleMintNFT}>Mint NFT</button>
            </div>
          </div>
          <div className='mt-6 mb-6 ml-10'>
            {selectedOption === 'option1' && NFTImage ? (<img className='md:w-80 rounded-lg sm:w-52  max-[640px]:hidden ' src={NFTImage} alt='NFT Image' />) : ''}
            {selectedOption === 'option2' && imageBase64 ? (<img className='md:w-80 rounded-lg sm:w-52  max-[640px]:hidden' src={imageBase64} alt='NFT Image' />) : ''}
          </div>
        </div>)
        : (<GoHomePageComponent />)}
      <div>
        <div className='popUp'>
          {mintNFTPopUp ? <CreatePopup handleOpenPopup={handleOpenPopup}
            nftStatList={statList} nftStat={NFTStat} NFTImage={selectedOption === 'option1'? NFTImage: imageBase64}
            handleOpenPopupMinting={handleOpenPopupMintingCreate} NFTDescription={NFTDescription}
          /> : ''}
        </div>
      </div>
      <PopupMintNFT {...createPopup} />
      {showModalStartMint ? <PopupApprove showModalApprove={true}
        isApproved={null} approvedHash={mintHash} type={'mint'} /> : ''}
    </div>
  )
}

export default Create