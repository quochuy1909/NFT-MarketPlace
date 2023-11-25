import { createSlice, Slice } from '@reduxjs/toolkit'

export const counterSlice: Slice = createSlice({
  name: 'provider',
  initialState: {
    isOn: false,
    reduxProvider: null,
    reduxContract: null,
    reduxSigner: null,
    reduxPopupApprove: null,
    reduxClosePopupApprove: null,
    reduxListSize: null,
    reduxPopupBuy: null,
    reduxPopupBuyStatus: null,
    reduxNewOwnerAfterBuy: false,
    reduxListNFT:null
  },
  reducers: {
    providerExisted: (state: any, provi: any) => {
      state.isOn = true
      state.reduxProvider = provi
    },
    contractExisted: (state: any, contract: any) => {
      state.isOn = true
      state.reduxContract = contract
    },
    signerExisted: (state: any, signer: any) => {
      state.isOn = true
      state.reduxSigner = signer
    },
    popupExisted: (state: any, popup: any) => {
      state.isOn = true
      state.reduxPopupApprove = popup
    },
    popupBuyExisted: (state: any, popupBuy: any) => {
      state.isOn = true
      state.reduxPopupBuy = popupBuy
    },
    popupBuyStatus: (state: any, popupStatus: any) => {
      state.isOn = true
      state.reduxPopupBuyStatus = popupStatus
    },
    newOwnerAfterBuy: (state: any, newOwner: any) => {
      state.isOn = true
      state.reduxNewOwnerAfterBuy = newOwner
    },
    closePopupeExisted: (state: any, closePopup: any) => {
      state.isOn = true
      state.reduxClosePopupApprove = closePopup
    },
    listSize: (state: any, listSize: any) => {
      state.isOn = true
      state.reduxListSize = listSize
    },
    listNFT: (state: any, listNFT: any) => {
      state.isOn = true
      state.reduxListNFT = listNFT
    },
  }
})

export const { providerExisted, contractExisted, signerExisted, popupExisted,
  closePopupeExisted, listSize, popupBuyExisted, popupBuyStatus,
  newOwnerAfterBuy,listNFT } = counterSlice.actions;

export default counterSlice.reducer