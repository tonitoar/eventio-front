import { useContext, useState } from "react";
import { userContext } from "../contexts/user.context";
import { Link, Navigate, useParams } from "react-router-dom";

import axios from "axios";

import AdminPage from "./AdminPage";

export default function AccountPage () {

    const {user, ready, setUser} = useContext(userContext);
    //*console.log(user)

    const [redirect, setRedirect] = useState(null); 

    let {subpage} = useParams(); //! LET perque canviarem el "undefined" Profile cap a "profile" i menys codi per el LinkClasses
   //*console.log(subpage);

   
   if (!ready) {
       return "Loading ..."; //! NECESARI PER VISUALTZAR EL USERNAME
    }
    
    if (ready && !user && !redirect) { //! !redirect per comprobar que no tenim cap altre redirecció per fer logout --> indexpage
        return <Navigate to={"/login"} /> //! NECESARI PER VISUALTZAR EL USERNAME
    }
    

    if (subpage === undefined) {
     subpage = "profile"; 
    }

function linkClasses (type=null) {
    let classes = "inline-flex gap-1 py-2 px-6 rounded-full";
    if (type === subpage){
        classes += " bg-primary rounded-full text-black";
    } else {
        classes += " bg-gray-200";
    }
    return classes;
}


//! type=null (0 diseny), per definicio nul. Donem classe predefinida (py + px).Si el type es igual a subpage (***), en la classe predefinida li afegim uns valors de diseny amb " ESPAI"
//TODO *** => profile canvia perque es "undefind", per lo tant hem de afegir (...|| (subpage === undefined && type === "profile"))


async function logout() {
    await axios.post("/logout")
    setRedirect("/");
    setUser(null); //! primer redirect, despres borrar dades usuari
 }


if (redirect) {
    return <Navigate to={redirect} />
}

    return (    
        <div>
            <nav className="w-full flex justify-center mt-8 gap-2 mb-8  ">
                <Link className={linkClasses("events")} to={"/account/events"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                    </svg>
                    My events
                 </Link>
                <Link className={linkClasses("admin")} to={"/account/admin"}> {/*//! {si ets ADMIN visualitza el link, sino no} */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    Admin section
                </Link> 
                <Link className={linkClasses("profile")} to={"/account"}>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    My profile
                </Link>
            </nav>
            {subpage === "profile" && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.username} ({user.email}) <br />
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
            {subpage === "admin" && (
                <AdminPage />
            )}
        </div> 
    );
} 