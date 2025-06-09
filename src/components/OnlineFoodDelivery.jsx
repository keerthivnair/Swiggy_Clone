import React from 'react'
import RestaurantCard from './RestaurantCard'
function OnlineFoodDelivery({data}) {
  return (
    <div className='mt-12 w-full flex flex-col gap-7'>
      <p className='text-2xl font-bold'>Restaurants with online food delivery in Kochi</p> 
      <div className='grid grid-cols-4 gap-7'>
      {data.map(({ info,cta:{link} }) => (
        <RestaurantCard  {...info} link={link}  />
      ))}
      </div>
    </div>
  )
}

export default OnlineFoodDelivery
