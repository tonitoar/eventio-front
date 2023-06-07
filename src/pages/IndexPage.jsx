import axios from 'axios';
import { useEffect, useState } from 'react';
export default function IndexPage() {
  // definimos los datos de eventos obtenidos
  const [events, setEvents] = useState([]);

  // para obtener datos de eventos
  useEffect(() => {
    // Función para fetch
    const fetchEvents = async () => {
      try {
        // GET request al endpoint
        const response = await axios.get('http://localhost:3000/events'); 

        // Guarda la información de los eventos
        setEvents(response.data);
      } catch (error) {
        console.log('Error fetching events data:', error);
      }
    };

    // Call hacia fetchEvents
    fetchEvents();
  }, []); 

  // JSX para rendear
  return (
    <div>
      {}
      {events.map((event) => (
        <div key={event.id} className='mb-80'>
          {}
          <img src={event.photos[0]} width="500"/>
          <h3>{event.title}</h3>
          <p>Date: {event.date}</p>
          <p>Location: {event.location}</p>
          <p>Description {event.description}</p>
          <p>Total Attendees {event.numattendees}</p>
          <p>Address {event.address}</p>
          <p>Max Capacity {event.maxCapacity}</p>
          <div className=''>
            <img src={event.photos[1]} width="400"/>
            </div>
          {}
        </div>
      ))}
    </div>
  );
}
