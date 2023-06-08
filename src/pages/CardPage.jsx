import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function CardPage() {


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

    return(

<div className="flex items-center justify-center min-h-screen from-[#F9F5F3] via-[#F9F5F3] to-[#F9F5F3] -to-br mt-20 grid gap-x-6 gap-y-14 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {events.length > 0 && events.map((event) => (
        <Link to={"/event/" + event._id} className="" key={event._id}>
            <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="max-w-md mx-auto">
                    <div
                        className="h-[236px]"
                        style={{
                            backgroundImage: `url({})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    ></div>
                    <div className="p-4 sm:p-6">
                        <p className="font-bold text-gray-700 text-[22px] leading-7 mb-1">{event.title}</p>
                        <div className="flex flex-row">
                            {/* <p className="text-[#3C3C4399] text-[17px] mr-2 line-through">MVR 700</p> */}
                            <p className="text-[17px] font-bold text-[#0FB478]">{event.price} €</p>
                        </div>
                        <p className="text-[#7C7C80] font-[15px] mt-6">
                            Our shrimp sauce is made with mozzarella, a creamy taste of shrimp with an extra kick of spices.
                        </p>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="foodiesapp://food/1001"
                            className="block mt-10 w-full px-4 py-3 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform bg-[#FFC933] rounded-[14px] hover:bg-[#FFC933DD] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80"
                        >
                            View on Foodies
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://apps.apple.com/us/app/id1493631471"
                            className="block mt-1.5 w-full px-4 py-3 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform rounded-[14px] hover:bg-[#F2ECE7] hover:text-[#000000dd] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80"
                        >
                            Download app
                        </a>
                    </div>
                </div>
            </div>
        </Link>
    ))}
</div>



    );

}