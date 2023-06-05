import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios"; 

export default function RegisterPage() {

  const [username, setUsername]= useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [code, setCode]= useState("");
  const[redirect, setRedirect] = useState(false);
  
  async function registerUser(e) {
      e.preventDefault();
      try{
        await axios.post("/register", {
          username,
          email,
          password,
          code,
        });
        alert("Registration successful. Now you can log in");
        setRedirect(true);
      } catch (e) {
        alert("Registration failed. Please try again");
      }
    }
  
    if (redirect) {
      return <Navigate to={"/login"} />
    }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-6">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input type="text" 
                placeholder="Username"
                value={username} 
                onChange={(e)=>setUsername(e.target.value)}/>
          <input type="email" 
                placeholder="your@email.com" 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" 
                placeholder="password" 
                value={password} 
                onChange={(e)=>setPassword(e.target.value)}/>
          <div className="ml-2 mt-4 mb-2">
            {"Insert your Admin code:"}
          </div>
            <input type="text" 
                  placeholder="Admin code" 
                  value={code} 
                  onChange={(e)=>setCode(e.target.value)}/>
          <button className="primary mt-4">Register</button>
          <div className="text-center py-2 text-black-500">
            {"Already a member?"}<Link className="underline text-bn ml-2" to={"/login"}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
