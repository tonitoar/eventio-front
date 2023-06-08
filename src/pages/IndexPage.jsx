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
        setEvents(response.data);
      } catch (error) {
        console.log('Error fetching events data:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      {events.length > 0 && events.map((event) => (
        <Link to={"/event/" + event._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl mb-6" key={event._id}>
          <div className="flex h-32 w-32 bg-gray-300 shrink-0">
            {event.photos.length > 0 && (
              <img className="object-cover" src={event.photos[0]} alt="" />
            )}
          </div>
          <div className="grow-0 shrink">
            <h2 className="text-xl">{event.title}</h2>
            <p className="text-sm mt-2">Location: {event.address}</p>
            <p className="text-sm mt-2">Dia: {event.date}</p>
            <p className="text-sm mt-2">Hora: {event.hour}</p>
          </div>
        </Link>
      ))}
    </div>
  );
  
}
