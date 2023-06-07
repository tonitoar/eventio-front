import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { userContext } from "../contexts/user.context";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

 const {setUser} = useContext(userContext);

  async function handleLoginSubmit(e) {

    e.preventDefault();
    try{
      const response = await axios.post("/login", {email, password});
      const {token, user} = response.data
      localStorage.setItem("token", token); 
      setUser(user) //! inspeccion, components, (usuario loggeado), context.provider, user
      alert("Login successful");

      setRedirect(true);
    } catch (e) {
      alert("Login failed"); 
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />
  }
    

  return (
    <div className="mt-4 grow flex items-center justify-around ">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-6">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary mt-4">Login</button>
          <div className="text-center py-2 text-black-500">
            {"Don't have an account yet?"}{" "}
            <Link className="underline text-bn ml-2" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
