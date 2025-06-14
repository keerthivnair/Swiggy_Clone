import React from 'react'
import RestaurantCard from './RestaurantCard'
function OnlineFoodDelivery({data, title}) {
  return (
    <div className='mt-12 w-full flex flex-col gap-7'>
      <p className='text-2xl font-bold'>{title}</p> 
      <div className='grid grid-cols-4 gap-7'>
      {data.map(({ info,cta:{link} }) => (
        <RestaurantCard  {...info} link={link}  />
      ))}
      </div>
    </div>
  )
}

export default OnlineFoodDelivery
