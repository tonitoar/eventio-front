import {useEffect, useState} from "react";
import {Image} from "cloudinary-react";
export default function DisplayImage () {

    const[imageIds, setImageIds] = useState();

    useEffect(() => {
        loadImages(); 
    },[])

    const loadImages = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/images");
            const data = await res.json();
            //console.log(data);
            setImageIds(data);
            /* console.log(imageIds) */
        } catch (error) {
            //console.log(error); 
        }
    }
    return (
        <div>
            <h1>DisplayImage</h1>
            {imageIds && 
            imageIds.map((imageId, index) => (
                <Image
                key={index}
                cloudName="dj4yfhmth"
                publicId={imageId}
                width="300"
                crop="scale"
                quality="100"
                fetchFormat="auto"
                /> 
            ))}
        </div>
    );
}