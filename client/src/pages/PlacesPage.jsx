import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AccountNav from '../AccountNav';
import axios from 'axios';
import PlaceImg from '../PlaceImg';

const PlacesPage = () => {
  const[places, setPlaces] = useState([]);
  useEffect(() => {
   axios.get('/user-places').then(({data}) => {
    setPlaces(data);
   })
  }, [])
  function removePhoto(ev, filename) {
    ev.preventDefault();
    setPlaces([...places.filter(placeData => placeData !== filename)]);
   }
  return (
    <div>
      <AccountNav />
       <div className='text-center'>
       <Link className='inline-flex gap-1 bg-primary text-white px-6 py-2 rounded-full' to={'/account/places/new'}>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
 <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
         Add new place</Link>
     </div>
     <div className='mt-4'>
      {places.length > 0 && places.map(place => (
        <Link to={'/account/places/'+place._id} className='bg-gray-100 p-4 rounded-2xl flex gap-4 cursor-pointer my-4 relative'>
          <div className='flex w-32 h-32 bg-gray-300'>
            <PlaceImg place={place}/>
            </div>
            <div className='grow-0 shrink'>
            <h2 className='text-xl'>{place.title}</h2>
            <p className='text-sm mt-2'>{place.description}</p>
            </div>
            <button onClick={(ev) => {removePhoto(ev,place)}} className='cursor absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
              </button>
          </Link>
      ))}
      </div>
      </div>
  );
}

export default PlacesPage