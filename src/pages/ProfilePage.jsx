import { useContext, useState } from "react";
import { userContext } from "../contexts/user.context";
import { Navigate, useParams } from "react-router-dom";

import axios from "axios";

import AdminPage from "./AdminPage";
import AccountNav from "../components/AccountNav";
// import { useEffect } from "react";

export default function ProfilePage () {

    const {user, ready, setUser} = useContext(userContext);
    //*console.log(user)

    const [redirect, setRedirect] = useState(null); 


    let {subpage} = useParams(); //! LET perque canviarem el "undefined" Profile cap a "profile" i menys codi per el LinkClasses
   //*console.log(subpage);

/*    useEffect(() => {
    console.log(ready)
  }, [ready]); */

   
   if (!ready) {
       return "Loading ..."; //! NECESARI PER VISUALTZAR EL USERNAME
    }
    
    if (ready && !user && !redirect) { //! !redirect per comprobar que no tenim cap altre redirecció per fer logout --> indexpage
        return <Navigate to={"/login"} /> //! NECESARI PER VISUALTZAR EL USERNAME
    }
    

    if (subpage === undefined) {
     subpage = "profile"; 
    }



//! type=null (0 diseny), per definicio nul. Donem classe predefinida (py + px).Si el type es igual a subpage (***), en la classe predefinida li afegim uns valors de diseny amb " ESPAI"
//TODO *** => profile canvia perque es "undefind", per lo tant hem de afegir (...|| (subpage === undefined && type === "profile"))



async function logout() {
    localStorage.removeItem("token");
    await axios.post("/logout")
    setRedirect("/");
    setUser(null); //! primer redirect, despres borrar dades usuari
 }


if (redirect) {
    return <Navigate to={redirect} />
}

    return (    
        <div>
            <AccountNav />
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