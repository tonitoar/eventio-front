import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PurchaseWidget from "../components/PurchaseWidget";


export default function EventPage() {

const {id}= useParams();
const [event, setEvent] = useState("");

useEffect(()=> {
    if (!id) {
        return;
    }
     axios.get("/event/" + id).then((response) => {
        const { data } = response;
        setEvent(data);

    })
}, [id])

if (!event) return "";

console.log(event)
    return(
        <div className="mt-20 bg-gray-100 rounded-lg px-8 py-8 bg-opacity-70 mx-20">
            <h1 className="text-4xl">{event.title}</h1>
            <a className="flex gap-1 my-2 block font-semibold underline text-lg" href={"https://maps.google.com/?q=" + event.address}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
            {event.address}
            </a>
                    <div className="flex mt-2 gap-2">  
                    {event.photos && event.photos.map((photo, index) => (
                        <div key={index} className="relative">
                        <img className="rounded " src={photo} alt="chosen" style={{ height: "400px" }}/>
                        </div>
                    ))}
                    </div>
            <div className="mt-8 grid gap-8 grids-cols-1 md:grid-cols-[2fr_1fr]">  
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {event.description}
                    </div>
                    Day: {event.date}<br />
                    Hour: {event.hour}<br />
                    Maximum of capacity: {event.maxCapacity}<br />
                    Tickets sold: 40 u.
                </div>
                <div>
                    <PurchaseWidget event={event}/>
                </div>
            </div>


        </div>
    );
   /*  rel="noreferrer" */
}
