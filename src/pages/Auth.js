import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = ({ setActive, setUser }) => {
  const [state, setState] = useState(initialState);
  const [signUp, setSignUp] = useState(false);

  const { email, password, firstName, lastName, confirmPassword } = state;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
const handleAuth= async (e)=>{
  e.preventDefault();
  if(!signUp){
    if(email&& password){
      const {user}= await signInWithEmailAndPassword(auth, email, password);
     
      setActive("home");
   
    }
   
    else{
     
      return  toast.error("Điền vào chỗ trống")
    }
  }else{
    if(password !== confirmPassword){
      return toast.error("Mật khẩu không giống")
    }
    if (firstName && lastName && email && password) {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, { displayName: `${firstName} ${lastName}` });
      setActive("home");
    }else{
      return toast.error("Nhập đầy đủ thông tin")
    }
  }
  navigate("/")
}
  

  return (<div>
    <div class="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
      <div class="w-full sm:max-w-md p-5 mx-auto">
        <h2 class="mb-12 text-center text-5xl font-extrabold">   {!signUp ? "Sign-In" : "Sign-Up"}</h2>
        <form onSubmit={handleAuth}>
          {signUp && (
            <>
            <div className="flex ">
            <div class="mb-4 m-1">
                <label class="block mb-1" for="firstName">First Name</label>
                <input id="firstName" type="text" name="firstName"
                  value={firstName}
                  onChange={handleChange}
                  class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
              </div>
              <div class="mb-4 m-1">
                <label class="block mb-1" htmlFor="lastName">Last Name</label>
                <input id="lastName" type="text" name="lastName"
                  value={lastName}
                  onChange={handleChange}
                  class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
              </div>
            </div>

              
            </>
          )}
          <div class="mb-4">
            <label class="block mb-1" for="email">Email-Address</label>
            <input id="email" type="text" name="email"
              value={email}
              onChange={handleChange}
              class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
          </div>
          <div class="mb-4">
            <label class="block mb-1" for="password">Password</label>
            <input id="password" type="password" name="password"
              value={password}
              onChange={handleChange}
              class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
          </div>
          {signUp && (
            <div class="mb-4">
              <label class="block mb-1" for="confirmPassword">Confirm Password</label>
              <input id="confirmPassword" type="password" name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
            </div>
          )}
          <div class="mt-6 flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember_me" type="checkbox" class="border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50" />
              <label for="remember_me" class="ml-2 block text-sm leading-5 text-gray-900"> Remember me </label>
            </div>
            <a href="#" class="text-sm"> Forgot your password? </a>
          </div>
          <div class="mt-6">
            <button class="w-full inline-flex items-center justify-center px-4 py-2 bg-cyan-500 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition">
              {!signUp ? "Sign-in" : "Sign-up"}</button>
          </div>

        </form>
        <div>
          {!signUp ? (
            <>
              <div className="text-center justify-content-center mt-2 pt-2">
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account ?&nbsp;
                  <span
                    className="link-danger"
                    style={{ textDecoration: "none", cursor: "pointer" }}
                    onClick={() => setSignUp(true)}
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="text-center justify-content-center mt-2 pt-2">
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already have an account ?&nbsp;
                  <span
                    style={{
                      textDecoration: "none",
                      cursor: "pointer",
                      color: "#298af2",
                    }}
                    onClick={() => setSignUp(false)}
                  >
                    Sign In
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  </div>

  );
};

export default Auth;
