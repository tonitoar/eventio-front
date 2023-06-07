import axios from 'axios';
import { useEffect, useState } from 'react';
export default function IndexPage() {
  // State variable to store the fetched events data
  const [events, setEvents] = useState([]);

  // useEffect hook to fetch events data
  useEffect(() => {
    // Function to fetch events data
    const fetchEvents = async () => {
      try {
        // Send a GET request to the appropriate backend endpoint to retrieve events data
        const response = await axios.get('http://localhost:3000/events'); 

        // Store the fetched events data in the state variable
        setEvents(response.data);
      } catch (error) {
        console.log('Error fetching events data:', error);
      }
    };

    // Call the fetchEvents function to fetch the events data
    fetchEvents();
  }, []); // The empty dependency array ensures that the effect runs only once, similar to componentDidMount

  // JSX to render the event list
  return (
    <div>
      {/* Render the events data */}
      {events.map((event) => (
        <div key={event.id} className='mb-80'>
          {/* Display relevant information about each event */}
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
          {/* Add more event details as needed */}
        </div>
      ))}
    </div>
  );
}


  /*

export default function Apartments() {

    const [apartments, setApartments] = useState([]);
    const [filteredApartments, setFilteredApartments] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:3000/events")
        .then(({data})=>{
            console.log("results: ", data);
            setApartments(data);
            setFilteredApartments(data);
        })
        .catch(err => console.log(err));
    }, [])

    const filterApartments = (text) => {
        setFilteredApartments(apartments.filter(apartment => apartment.title.toLowerCase().includes(text.toLowerCase())))
    }

    return (
        <div>
            <FilterForm filterFunction={filterApartments} />
            <h1>Apartments</h1>
            {filteredApartments.map(apartment => {
                return (<div key={apartment._id} className="card">
                <img src={apartment.img} className="card-img-top" alt={apartment.title} />
                <div className="card-body">
                  <h5 className="card-title">{apartment.title}</h5>
                  <Link to={`/apartments/${apartment._id}`}>More details</Link>
                </div>
              </div>)
            })}
        </div>
    )
}
*/