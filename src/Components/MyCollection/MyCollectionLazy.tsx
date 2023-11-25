import React, { Suspense } from 'react'
import MyCollectionLoading from './MyCollectionLoading'

const MyCollectionLazy = () => {
  const MyCollection = React.lazy(() => import('./MyCollection'))
  return (
    <Suspense fallback={<MyCollectionLoading />}>
      <MyCollection />
    </Suspense>
  )
}

export default MyCollectionLazy