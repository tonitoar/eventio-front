import {Route, Routes} from "react-router-dom";
import { UserContextProvider } from "./contexts/user.context";

import './App.css'
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";

import axios from "axios"; 
import DisplayImage from "../DisplayImage";

axios.defaults.baseURL = "http://localhost:3000";
//axios.defaults.withCredentials = true; 


function App() {

  return (
    <UserContextProvider>
      <Routes>
          <Route path="/" element={<Layout />}> 
            <Route path="/images" element={<DisplayImage />} />  {/* //! comprobar display images from cludinary, borrar al final  */}
            <Route index element={<IndexPage />} />
            <Route path="/register" element={<RegisterPage />} />  
            <Route path="/login" element={<LoginPage />} />  
            <Route path="/account/:subpage?" element={<AccountPage />} /> {/* //! subpage --> events and admin */}
            <Route path="/account/:subpage/:action" element={<AccountPage />} /> {/* //! no admin/evenet/create ---> admin/create */}
          </Route>
      </Routes>
    </UserContextProvider>


    
  )
}

export default App
