import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword, signInWithGoogle } from "../../firebase/config";
import ReactLoading from 'react-loading';
import { useForm } from "react-hook-form";
import "./Register.css";
import SIGButton from "../../components/Buttons/SIGButton";
import SIAButton from "../../components/Buttons/SIAButton";

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/Create");
  }, [user, loading]);

  const onSubmit = (data) => {
    registerWithEmailAndPassword(data.name, data.email, data.password);
  };

  return (
    <div>
      {loading || user ? 
        <div className="login">
          <ReactLoading type="bubbles" height={'80px'} width={'80px'}/>
        </div>
      :
      <div className="login">
        <h1 className="absolute top-5 left-8 font-light text-lg">FolioSpark</h1>
        
        <div className="register__container rounded-md">
          <div className="mb-4">
            <h1 className="text-2xl font-light tracking-tighter">Take control of your future.</h1>
            <h1 className="text-sm font-light text-gray-400">Create your free portfolio today.</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className="text-sm font-light text-gray-200">Full Name</label>
              <input
                type="text" 
                id="name" 
                name="name"
                className="text-sm mt-0.5 login__textBox rounded-md shadow-sm pl-2 py-3 focus:outline-none hover:ring-1 hover:ring-purple-300 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-1 text-gray-300 w-full" 
                {...register('name', { required: 'Full Name is required' })}
              />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-light text-gray-200">Email address</label>
              <input
                type="email" 
                id="email" 
                name="email"
                className="text-sm mt-0.5 login__textBox rounded-md shadow-sm pl-2 py-3 focus:outline-none hover:ring-1 hover:ring-purple-300 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-1 text-gray-300 w-full" 
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-light text-gray-200">Password</label>
              <input
                type="password" 
                id="password" 
                name="password"
                className="text-sm mt-0.5 login__textBox rounded-md shadow-sm pl-2 py-3 focus:outline-none hover:ring-1 hover:ring-purple-300 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-1 text-gray-300 w-full" 
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="text-sm mt-6 login__btn font-medium text-white mb-4 py-2 rounded-md w-full bg-purple-700/80"
            >
              Register
            </button>
          </form>

          <div id="social-login">
            <SIGButton />
            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">Or</div>
            <SIAButton />
          </div>

          <div className="mt-4 w-full text-center text-sm text-gray-400">
            Already have an account? <Link className="text-gray-200" to="/">Login now</Link>
          </div>
        </div>
      </div>
      }
    </div>
  );
}

export default Register;
