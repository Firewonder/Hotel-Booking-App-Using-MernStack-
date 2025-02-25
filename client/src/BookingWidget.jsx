import React, { useContext, useEffect, useState } from 'react';
import {differenceInCalendarDays, format} from 'date-fns';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const BookingWidget = ({place}) => {
  const [checkIn,setCheckIn] = useState('');
  const [checkOut,setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [redirect, setRedirect] = useState('');
  const {user} = useContext(UserContext);
  useEffect(() => {
   if(user) {
   setName(user.name);
   }
  }, [user]);
  
  let numberOfNights = 0;
  if(checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }
  async function bookThisPlace() {
    const response = await axios.post('/bookings', {
      checkIn,checkOut,numberOfGuests,name,phone,email,
      place:place._id,
      price:numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
    const serviceId = 'service_hjysz5q';
    const templateId = 'template_q6liaqn';
    const publicKey = 'eVdntAqj9kSCCjjog';
    
    const templateParams = {
      from_name: "MyRooms Team",
      from_email: email,
      to_name: name,
      number_of_nights: numberOfNights,
      check_in_date: format(new Date(checkIn), 'yyyy-MM-dd'),
      check_out_date: format(new Date(checkOut), 'yyyy-MM-dd'),
      hotel_name: place.title, 
    }
    
    emailjs.send(serviceId, templateId, templateParams, publicKey)
  .then((response) => {
    console.log('Email sent successfully', response);
  })
  .catch((error) => {
    console.log('Error sending email', error);
  });
  }

  if(redirect) {
    return <Navigate to={redirect} />
  }
  return (
    <div className='bg-white shadow p-4 rounded-2xl'>
            <div className='text-2xl text-center'>
            Price: ₹{place.price} / per night
            </div>
            <div className="border rounded-2xl mt-4">
              <div className='flex'>
              <div className='py-3 px-4'>
              <label>Check in:</label>
              <input type='date' value={checkIn}
               onChange={ev => setCheckIn(ev.target.value)}/>
            </div>
            <div className='py-3 px-4 border-l'>
              <label>Check in:</label>
              <input type='date' value={checkOut} 
              onChange={ev => setCheckOut(ev.target.value)}/>
            </div>
              </div> 
              <div className='py-3 px-4 border-l'>
              <label>Number of guests:</label>
              <input type='number' value={numberOfGuests} 
              onChange={ev => setNumberOfGuests(ev.target.value)} />
              </div>
              {checkIn && checkOut && (
              <div className='py-3 px-4 border-l'>
              <label>Your full name:</label>
              <input type='text' value={name} 
              onChange={ev => setName(ev.target.value)} />
              <label>Phone number:</label>
              <input type='tel' value={phone} 
              onChange={ev => setPhone(ev.target.value)} />
              <label>Email:</label>
              <input type='email' value={email} 
              onChange={ev => setEmail(ev.target.value)} />
              </div>
              )}
            </div>
            <button onClick={bookThisPlace} className="primary mt-4">
              Book this place
              {numberOfNights > 0 && (
                <span> ₹{numberOfNights * place.price}</span>
              )}
              </button>
          </div>
  )
}

export default BookingWidget