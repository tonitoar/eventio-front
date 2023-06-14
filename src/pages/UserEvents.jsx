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
                <div className="my-10 mx-80">
                    {userEvent.length > 0 && userEvent.map ((purchase, index) => (
                        <Link to={"/event/" + purchase._id } className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl mb-6" key={index}>
                            <div className=" flex h-32 w-32 bg-gray-300 shrink-0">
                            {/*     {userEvent.photos.length > 0 && (
                                    <img className="object-cover" src={userEvent.photos[0]} alt="" />
                                )} */}
                            </div>
                            <div className="grow-0 shrink">
                                <h2 className="text-xl">{userEvent.title}</h2>
                                <p className="text-sm mt-2">{userEvent.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
    );
}






