import React from 'react'
import InstaFeeds from '../components/InstaFeeds'

const MenuScreen = () => {
  return (
    <>
      <InstaFeeds token={process.env.REACT_APP_INS_TOKEN} limit={12}/>
    </>
  )
}

export default MenuScreen