import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import ReactLoading from 'react-loading';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/Create");
  }, [user, loading]);

  const [ authentication, setAuthentication ] = useState({});
  const handleInputChange = (e) => {
    setAuthentication({...authentication, [e.target.name]: e.target.value});
  } 

  const inputs = (label, name, helperText) => {
    return (
      <div>
        <label for="name" class="text-sm font-medium text-gray-200">{label}</label>
        <input
            type={name} 
            id="name" 
            name={name}
            className="mt-0.5 login__textBox rounded-md shadow-sm pl-2 py-3 focus:outline-none hover:ring-1 hover:ring-purple-300  focus:ring-2 focus:ring-purple-400 focus:ring-opacity-1 text-gray-300 w-full" 
            onChange = {handleInputChange}

        />
        <p className='mt-1 text-xs text-gray-400'>{helperText}</p>
      </div>
    )
  }


  return (
    <div>
    {loading || user? 
    <div className="login">
      <ReactLoading type="bubbles" height={'80px'} width={'80px'} /> 
    </div>
    : 
        
    <div>
    <div className="login">
      <h1 className="absolute top-5 left-8 font-bold text-xl">Show-IT</h1>
      <div className="login__container">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Take control of your future.</h1>
          <h1 className="text-sm font-bold text-gray-400">Create your free portfolio today.</h1>
        </div>

        {inputs("Email address", "email")}
        {inputs("Password", "password")}

        <button
          className="mt-6 login__btn font-medium text-white mb-4 py-2 rounded-md"
          onClick={() => logInWithEmailAndPassword(authentication.email, authentication.password)}
        >
          Login
        </button>
        {/* <button className="login__btn login__google font-medium mb-4 py-2 rounded-md" onClick={signInWithGoogle}>
          Login with Google
        </button> */}
        <div class="max-w-xs">
          <button type="button" class="py-2.5 px-3 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            <svg class="flex-shrink-0 w-4 h-4" width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_4132_5805adfqfqdq121)">
              <path d="M32.2566 16.36C32.2566 15.04 32.1567 14.08 31.9171 13.08H16.9166V19.02H25.7251C25.5454 20.5 24.5866 22.72 22.4494 24.22L22.4294 24.42L27.1633 28.1L27.4828 28.14C30.5189 25.34 32.2566 21.22 32.2566 16.36Z" fill="#4285F4"/>
              <path d="M16.9166 32C21.231 32 24.8463 30.58 27.5028 28.12L22.4694 24.2C21.1111 25.14 19.3135 25.8 16.9366 25.8C12.7021 25.8 9.12677 23 7.84844 19.16L7.66867 19.18L2.71513 23L2.65521 23.18C5.2718 28.4 10.6648 32 16.9166 32Z" fill="#34A853"/>
              <path d="M7.82845 19.16C7.48889 18.16 7.28915 17.1 7.28915 16C7.28915 14.9 7.48889 13.84 7.80848 12.84V12.62L2.81499 8.73999L2.6552 8.81999C1.55663 10.98 0.937439 13.42 0.937439 16C0.937439 18.58 1.55663 21.02 2.63522 23.18L7.82845 19.16Z" fill="#FBBC05"/>
              <path d="M16.9166 6.18C19.9127 6.18 21.9501 7.48 23.0886 8.56L27.6027 4.16C24.8263 1.58 21.231 0 16.9166 0C10.6648 0 5.27181 3.6 2.63525 8.82L7.80851 12.84C9.10681 8.98 12.6821 6.18 16.9166 6.18Z" fill="#EB4335"/>
              </g>
              <defs>
              <clipPath id="clip0_4132_5805adfqfqdq121">
              <rect width="32" height="32" fill="white" transform="translate(0.937439)"/>
              </clipPath>
              </defs>
            </svg>
            Sign in with Google
          </button>

          <div class="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">Or</div>

          <button type="button" class="py-2.5 px-3 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            <svg class="flex-shrink-0 w-4 h-4" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M27.2192 10.9088C27.0336 11.0528 23.7568 12.8992 23.7568 17.0048C23.7568 21.7536 27.9264 23.4336 28.0512 23.4752C28.032 23.5776 27.3888 25.776 25.8528 28.016C24.4832 29.9872 23.0528 31.9552 20.8768 31.9552C18.7008 31.9552 18.1408 30.6912 15.6288 30.6912C13.1808 30.6912 12.3104 31.9968 10.32 31.9968C8.3296 31.9968 6.9408 30.1728 5.344 27.9328C3.4944 25.3024 2 21.216 2 17.3376C2 11.1168 6.0448 7.8176 10.0256 7.8176C12.1408 7.8176 13.904 9.2064 15.232 9.2064C16.496 9.2064 18.4672 7.7344 20.8736 7.7344C21.7856 7.7344 25.0624 7.8176 27.2192 10.9088ZM19.7312 5.1008C20.7264 3.92 21.4304 2.2816 21.4304 0.6432C21.4304 0.416 21.4112 0.1856 21.3696 0C19.7504 0.0608 17.824 1.0784 16.6624 2.4256C15.7504 3.4624 14.8992 5.1008 14.8992 6.7616C14.8992 7.0112 14.9408 7.2608 14.96 7.3408C15.0624 7.36 15.2288 7.3824 15.3952 7.3824C16.848 7.3824 18.6752 6.4096 19.7312 5.1008Z" class="fill-black dark:fill-gray-200" fill="currentColor"/>
            </svg>
            Sign in with Apple
          </button>
        </div>
        
        <div className="w-full text-center text-sm text-gray-400">
          Don't have an account? <Link className="text-gray-200" to="/register">Register now.</Link>
        </div>
      </div>
    </div>
    </div>}

    </div>
  );
}
export default Login;