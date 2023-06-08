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

import EventPage from "./pages/EventPage";
import CardPage from "./pages/CardPage";




axios.defaults.baseURL = "http://localhost:3000";
//axios.defaults.withCredentials = true; 


function App() {

  return (
    <UserContextProvider>
      <Routes>
          <Route path="/" element={<Layout />}> 
            <Route path="/"  element={<IndexPage/>} />
            <Route path="/card"  element={<CardPage/>} />
            <Route path="/event/:id"  element={<EventPage />} />
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
