import { Link} from "react-router-dom";


import AccountNav from "../components/AccountNav.jsx";
import { useEffect, useState } from "react";


export default function AdminPage() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
          const token = localStorage.getItem('token');
          try {
            const response = await fetch("http://localhost:3000/admin/event", {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });
            //console.log(response)
            if (response.ok) {
              const data = await response.json();
             // console.log("DATA", data)
              setEvents(data);
            } else {
              const errorData = await response.json();
              console.log('Error:', errorData.error);
              // Handle the error case if needed
            }
          } catch (error) {
            console.log(error);
            // Handle the error case if needed
          }
        };
      
        fetchEvents();
      }, []);
  

    return(
        <div className="">      
            <AccountNav />
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-black py-2 px-6 rounded-full" to={"/account/admin/create"}> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new event
                    </Link> 
                </div>
                <div className="my-10 mx-80">
                    {events.length > 0 && events.map ((event, index) => (
                        <Link to={"/account/admin/event/" + event._id } className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl mb-6" key={index}>
                            <div className=" flex h-32 w-32 bg-gray-300 shrink-0">
                                {event.photos.length > 0 && (
                                    <img className="object-cover" src={event.photos[0]} alt="" />
                                )}
                            </div>
                            <div className="grow-0 shrink">
                                <h2 className="text-xl">{event.title}</h2>
                                <p className="text-sm mt-2">{event.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
        </div>
    );
}