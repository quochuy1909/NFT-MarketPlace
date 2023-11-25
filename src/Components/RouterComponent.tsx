import { Route, Routes } from 'react-router-dom'
import Create from './Create/Create'
import Layout from './Layout/Layout'
import MyCollectionLazy from './MyCollection/MyCollectionLazy'
import NFT from './NFT/NFT'
import SearchComponent from './Layout/SearchComponent'

const RouterComponent = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />} />
        <Route path='/search' element={<SearchComponent />} />
        <Route path='/create' element={<Create />} />
        <Route path='/nft/:id/:index' element={<NFT />} />
        <Route path='/mycollection' element={<MyCollectionLazy />} />
        <Route path='/*' element={<Layout />} />
      </Routes>
    </>
  )
}

export default RouterComponent