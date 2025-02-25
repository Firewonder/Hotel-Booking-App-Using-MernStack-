import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSearch } from '../contexts/SearchContext';

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  const { searchQuery } = useSearch();
  useEffect(() => {
  axios.get('/places').then(response => {
    searchQuery ? setPlaces([...response.data.filter(value => { 
      return value.title.includes(searchQuery); })]) : setPlaces([...response.data]);
  })
  }, [searchQuery] );
  return (
    <div className='mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
    {places.length > 0 && places.map(place => (
      <Link to={'/place/'+place._id} key={place._id}>
        <div className='bg-gray-500 mb-2 rounded-2xl flex'>
        {place.photos?.[0] && (
          <img className='rounded-2xl object-cover aspect-square' src={'http://localhost:4000/uploads/'+place.photos?.[0]} alt=''/>
        )}
        </div>
        <h3 className='font-bold'>{place.address}</h3>
        <h2 className='text-sm textgray-500'>{place.title}</h2>
        <div className='mt-1'>
        <span className='font-bold'>₹{place.price}</span> per night
        </div>
      </Link>
    ))}
  </div>
  )
}

export default IndexPage