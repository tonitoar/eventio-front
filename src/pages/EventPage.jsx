import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";


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

    return(
        <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
            <h1 className="text-3xl">{event.title}</h1>
            {/* <h2>{event.address}</h2> */}
            <a className="my-2 block font-semibold underline" target="_blank" href={"https://maps.google.com/?q=" + event.address}>{event.address}</a>
            <div className="grid gap-2 grid-cols-[2fr_1fr]">
                <div>
                    {event.photos?.[0] && (
                        <img src={event.photo} alt=""/>
                    )}
                </div>
                <div>b</div>
            </div>
        </div>
    );
}