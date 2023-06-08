import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function IndexPage() {
  // Define the state for storing events data
  const [events, setEvents] = useState([]);

  // Fetch events data from the API endpoint
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/events');
        setEvents([...response.data, ...response.data, ...response.data]);
      } catch (error) {
        console.log('Error fetching events data:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="mt-20 grid gap-x-6 gap-y-14 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {events.length > 0 && events.map((event) => (
        <Link to={"/event/" + event._id} className="" key={event._id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex w-96">
            {event.photos.length > 0 && (
              <img className="rounded-2xl object-cover aspect-square" src={event.photos[0]} alt="" />
            )}
          </div>
          <div className="">
            <h2 className="font-bold">{event.title}</h2>
            <h3 className="text-sm text-gray-500">{event.address}</h3>
            <p className="">Day: {event.date}</p>
            <p className="">Hour: {event.hour}</p>
            <div className="mt-1">
              <span className="font-bold ">{event.price}€</span> per ticket
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
  
}
