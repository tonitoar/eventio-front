import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function UserEvents () {

    const [userEvent, setUserEvent] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
          const token = localStorage.getItem('token');
          try {
            const response = await fetch("http://localhost:3000/account/event", {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });
            //console.log(response)
            if (response.ok) {
              const data = await response.json();
            console.log("DATA", data)
              setUserEvent(data);
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
      <div className="mt-20 grid gap-x-6 gap-y-14 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {userEvent.length > 0 &&
        userEvent.map((purchase, index) => (
          <div className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl mb-6 w-64" key={index}>
            <div className="grow-0 shrink">
            <div>
            <Link to={"/event/"+ purchase.event}>
              <img className="rounded object-cover aspect-square mx-auto mb-2" src={purchase.photo[0]} alt="" />
            </Link>
            </div>
              <h2 className="font-bold text-gray-700 text-[22px] leading-7 mb-1 mx-auto">{purchase.title}</h2>
              <p className="text-[17px] font-bold text-[#0FB478] mx-auto">Quantity: {purchase.quantity} tickets</p>
            </div>
          </div>
        ))}
        

    </div>
    );
}






