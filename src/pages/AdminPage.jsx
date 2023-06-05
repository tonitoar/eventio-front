import { useState } from "react";
import { Link, useParams } from "react-router-dom";
/* import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; */


export default function AdminPage() {

const {action} = useParams();
//*console.log(action); 

const[title, setTitle] = useState("");
const[address, setAddress] = useState("");
/* const[date, setDate] = useState(new Date()); */
const [date, setDate] = useState(""); //! o (new Date())
const [hour, setHour] = useState("");
const [maxCapacity, setMaxCapacity] = useState(""); 
const [description, SetDescription] = useState(""); 
//!imagenes
const[fileInputState, setFileInputState] = useState("");
const[selectedFile, setSelectedFile] = useState("");
const[previewSources, setPreviewSources] = useState([]);



const handleFileInputChange = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);
    filesArray.forEach((file) => {
        previewFile(file);
    });
};

const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const previewSource = reader.result;
        setPreviewSources((prevSources) => [...prevSources, previewSource]);
    };
};

const handleSubmitFile = (e) => {
    console.log("submiting");
    e.preventDefault();
    if(!previewSources) return;
    uploadImage(previewSources);
}

//! Base64 encoding is a way to encode binary data in ASCII text. It's primarily used to store or transfer images, audio files, and other media online. It is also often used when there are limitations on the characters that can be used in a filename for various reasons.

const uploadImage = async (base64EncodedImage) => {
   console.log(base64EncodedImage);
    try {
        await fetch ("http://localhost:3000/api/upload", {
            method: "POST",
            body: JSON.stringify({data: base64EncodedImage}),
            headers: {"Content-type": "application/json"}
        })
    } catch (error) {
        console.log(error)
    }
}

//! pujar input multiple

    return(
        <div>      
            {action !== "create" && ( 
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-black py-2 px-6 rounded-full" to={"/account/admin/create"}> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new event
                    </Link>
                </div>
            )}
            {action === "create" && (
                <div>
                    <form onSubmit={handleSubmitFile}>
                        <h2 className="text-2xl mt-4">Title</h2>
                            <p className="text-gray-500 text-sm">Title of the event. Should be short and catchy as in advertisement</p>
                            <input type="text" 
                                    placeholder="title, for example: Nevermind" 
                                    value={title} 
                                    onChange={(e)=>setTitle(e.target.value)}/>
                        <h2 className="text-2xl mt-4">Date</h2>
                            <p className="text-gray-500 text-sm">Date of event</p>
                            <input type="date" 
                                    value={date} 
                                    onChange={(e)=>setDate(e.target.value)}/>
                                    {/* <DatePicker value={date} onChange={date => setDate(date)}/> */}
                        <h2 className="text-2xl mt-4">Hour</h2>
                            <p className="text-gray-500 text-sm">Hour of event</p>
                            <input type="time" 
                                    value={hour} 
                                    onChange={(e)=>setHour(e.target.value)}/> {/* //! ficar AM o PM */}
                        <h2 className="text-2xl mt-4">Address</h2>
                            <p className="text-gray-500 text-sm">Addres of the event</p> 
                            <input type="text" 
                                    placeholder="address" 
                                    value={address} 
                                    onChange={(e)=>setAddress(e.target.value)}/>
                        <h2 className="text-2xl mt-4">Maximum capacity</h2>
                            <p className="text-gray-500 text-sm">Maximum capacity of the event</p>
                            <input type="number" 
                                    value={maxCapacity} 
                                    onChange={(e)=>setMaxCapacity(e.target.value)}/>
                        <h2 className="text-2xl mt-4">Description</h2>
                            <p className="text-gray-500 text-sm">Description of the event</p>
                            <textarea  value={description} onChange={(e)=>SetDescription(e.target.value)}/>  {/* //! area de text */}
                        <h2 className="text-2xl mt-4">Photos</h2>
                            <p className="text-gray-500 text-sm">Photos of the event/location. Max 4. </p>
                            <div className="flex gap-2 mt-2">
                                <input type="file" 
                                        name="image"
                                        multiple
                                        value={fileInputState} 
                                        onChange={handleFileInputChange}/>
                            </div>
                            <div className="flex mt-2 gap-2">
                            {previewSources && previewSources.map((previewSource, index) => (
                                <img  className="rounded-2xl" key={index} src={previewSource} alt="chosen" style={{ height: "200px" }} />
                            ))}
                            </div>
                        <div>
                            <button className="cursor-pointer primary my-4 flex gap-1 justify-center p-8 text-2xl" type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                            </svg>
                            Save
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}