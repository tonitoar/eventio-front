import {Route, Routes} from "react-router-dom";
import { UserContextProvider } from "./contexts/user.context";

import './App.css'
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import CreateEventPage from "./pages/CreateEventPage";

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
            <Route path="/"  element={<IndexPage/>} />
            <Route path="/"  element={<IndexPage/>} />
            <Route path="/register" element={<RegisterPage />} />  
            <Route path="/login" element={<LoginPage />} />  
            <Route path="/account" element={<ProfilePage />} /> 
            <Route path="/account/admin" element={<AdminPage />} /> 
            <Route path="/account/admin/create" element={<CreateEventPage />} />
            <Route path="/account/admin/event/:id" element={<CreateEventPage />} />
          </Route>
      </Routes>
    </UserContextProvider>


    
  )
}

export default App
