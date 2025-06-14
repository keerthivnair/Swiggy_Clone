import React, { useContext } from 'react'
import { CardContext } from '../Context/ContextApi'

function Cart() {
    const {cardData,setCardData} = useContext(CardContext)
  return (
    <div className='w-full'>
      <div className='w-[70%] mx-auto'>
        cart
      </div>
    </div>
  )
}

export default Cart
