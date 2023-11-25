import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listSize,listNFT } from '../../Redux/createSlice'
import layoutService from '../../Service/layoutService'
import { Contract } from 'ethers'
import { INFT, Stat, LayoutProps } from '../type'
import { useSearchParams } from 'react-router-dom'
import { search } from '../../Service/SearchService'
import { filterService } from '../../Service/filterService'

const useLayout = ({ type }: LayoutProps) => {
  const [searchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [list, setList] = useState<INFT[]>([])
  const [selecting, setSelecting] = useState<INFT>()
  const [loading, setLoading] = useState<boolean | null>(null)
  const [arrStat, setArrStat] = useState<Stat[]>([])
  const contract: Contract = useSelector((state: any) => state.providerReducer?.reduxContract?.payload)
  const isOn = useSelector((state: any) => state.providerReducer?.isOn)
  const dispatch = useDispatch()
  const render = async () => {
    if (contract) {
      setLoading(true)
      const rs = await layoutService(contract)
      setList(rs)
      dispatch(listSize(rs.length))
      dispatch(listNFT(rs))
      setLoading(false)
    }
  }
  useEffect(() => {
    if (type == 'layout') {
      const connected = async () => {
        await render()
      }
      connected()
    }
    if (type == 'search') {
      const searchStart = async () => {
        const q = searchParams.get('q') || '';
        const rs = await search(q && q, contract)
        setList(rs as INFT[])
      }
      searchStart()
    }else{
      if(list){
        const rs = filterService(type,[...list])
        setList(rs as INFT[])
      }
    }
  }, [isOn, type, searchParams])
  const openPopup = async (li: INFT) => {
    setShowModal(true)
    setSelecting(li)
    setArrStat([
      { name: 'Name', value: li.name },
      { name: 'ATK', value: li.atk.toString() },
      { name: 'HP', value: li.hp.toString() },
      { name: 'Crit', value: li.crit.toString() },
      { name: 'CritDame', value: li.critdame.toString() }
    ])
  }
  const handlePopup = (isOpen: boolean) => {
    setShowModal(isOpen)
  }
  return { list, openPopup, showModal, handlePopup, selecting, arrStat, isOn, loading }
}

export default useLayout

