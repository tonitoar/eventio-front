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
       /*  setEvents([...response.data, ...response.data, ...response.data]); */
        setEvents(response.data);
      } catch (error) {
        console.log('Error fetching events data:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="mt-20 grid gap-x-6 gap-y-14 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {events.length > 0 &&
        events.map((event) => (
          <div className="" key={event._id}>
            <div className="bg-gray-100 rounded-2xl ">
              <div className="bg-gray-500 mb-2 rounded-2xl flex">
                {event.photos.length > 0 && (
                  <img className="rounded object-cover aspect-square" src={event.photos[0]} alt="" />
                )}
              </div>
  
              <div className="p- sm:p-6">
                <p className="font-bold text-gray-700 text-[22px] leading-7 mb-1 truncate">{event.title}</p>
                <div className="flex flex-row">
                  {/* <p className="text-[#3C3C4399] text-[17px] mr-2 line-through">MVR 700</p> */}
                  <p className="text-[17px] font-bold text-[#0FB478]">{event.price} € / ticket</p>
                </div>
                <p className="text-black font-bold mt-6">{event.date}</p>
                <p className="text-black font-[15px] mt-6">{event.address}</p>
                <Link
                  target="_blank"
                  rel="noreferrer"
                  to={"/event/" + event._id}
                  className="block mt-10 w-full px-4 py-3 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform bg-gray-300 rounded-[14px] hover:bg-primary hover:text-[#000000dd] "
                >
                  View on Eventio
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
  
  
  
}
