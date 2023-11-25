import { Web3Provider } from '@ethersproject/providers'
import { Contract, Signer } from 'ethers'

export interface IItem {
    atk: number,
    crit: number,
    critdame: number,
    hp: number,
    image: string,
    name: string,
    price: number,
    stat: number,
    description?:string
}
export interface IShowPopup {
    showModalApprove: boolean | null,
    popupContent: string,
    approvedHash: string | undefined
}
export interface ICreatePopup {
    handleOpenPopup: any,
    nftStatList: INFTInput[],
    nftStat: string,
    NFTImage: string|undefined,
    handleOpenPopupMinting: (receiptHash: string) => void,
    NFTDescription:string,
}
export interface IApprovePopup {
    showModalApprove: boolean | null,
    isApproved: boolean | null | undefined,
    approvedHash: string,
    type: string
}
export interface INftProps {
    loading: boolean,
    item: IItem | undefined,
    owner: string | undefined,
    isApproved: boolean | undefined,
    isOwner: boolean | undefined,
    handleUnApproved: () => Promise<any>,
    handleApprove: () => Promise<any>,
    handleBuy: () => Promise<any>,
    listItemByOwner: unknown[],
    canBuy: boolean | undefined,
    receiptBuyHash: string,
    listItemSameOwner:INFT[],
}
export interface IItemAproveProps {
    contract: Contract,
    index: number | string | undefined,
    account: string | undefined
}
export interface IBuyProps {
    owner: string | undefined,
    provider: Web3Provider,
    account: string | undefined,
    contract: Contract,
    index: string | undefined,
    signer: Signer,
    getStart: (isStart: boolean) => void,
    getStatus: (status: string) => void,
    newOwner: (owner: string | undefined) => void
}
export interface IUnApproveProps {
    contract: Contract,
    index: number,
    account: string | undefined,
    provider: Web3Provider
}
export interface IApproveProps {
    contract: Contract,
    index: number
}
export interface ICreateProps {
    NFTImage: string|undefined,
    account: string,
    statList: Array<INFTInput>
    NFTStat: string,
    reduxContract: Contract,
    reduxSigner: Signer,
    index: number,
    NFTDescription:string
}
export interface IMyCollectProps {
    contract: Contract,
    account: string | undefined,
    listNFT: INFT[]
}
export interface IEtherProps {
    connector: any,
    Web3ReactProvider: Web3Provider | undefined,
    account: string | undefined
}
export interface INFT extends IItem {
    uri: string,
    id: number,
    index?: number
}
export interface IMyCollectionItem extends INFT {
    isApprove: boolean,
    index: number
}
export interface IOptions {
    name: string,
    label: string
}
export interface INFTInput {
    name: string,
    placeholder: string,
    value: string,
    regex?:RegExp,
    valid:boolean,
    validationMessage:string
}
export interface Stat {
    name: string,
    value: string | undefined
}
export interface ILayoutProps {
    list: INFT[],
    openPopup: (li: INFT) => Promise<void>,
    showModal: boolean,
    handlePopup: (isOpen: boolean) => void,
    selecting: INFT | undefined,
    arrStat: Stat[],
    isOn: boolean,
    filterOption: (value: string) => void
}
export interface LayoutProps {
    type: string
}
export interface IBuyReceipt {
    sendETHToApproveContractHash: string,
    sendETHToOwnerHash: string,
    sendNFTFromOwnerToBuyerHash: string
}
export interface ILayoutItemProps{
    li:INFT,
    openPopup:(li: INFT) => void,
    handlePopup:any,
    selecting:INFT | undefined,
    arrStat:Stat[],
    showModal:boolean,
    index:number
}