import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RxCross2 } from "react-icons/rx";
import Login from './Login';
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast';
import axios from 'axios';


function Signup() {
    const navigate = useNavigate();
      const {authUser} = useStore();
    

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const userInfo = {
            fullName: data.name,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword
        };

        try {
            const res = await axios.post('http://localhost:3000/api/auth/signup', userInfo)
            if (res.data) {
                toast.success('Signed Up Successfully!');
                navigate('/dashboard');
            }
        } catch (err) {
            if (err.response) {
                console.log(err);
                toast.error("Error: " + err.response.data.message);
            }
        }
    };

    // if(authUser) return 

    return (
        <div className='flex h-screen items-center justify-center'>
            <div className="border-[2px] shadow-md px-6 py-5 rounded-md">
                <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                    <div className='flex flex-row justify-between'>
                        <h3 className="font-bold text-lg">Sign Up</h3>
                        <Link className='mt-1 cursor-pointer hover:shadow-md' to="/"><RxCross2 /></Link>
                    </div>

                    {/* Name */}
                    <div className='mt-4 space-y-2'>
                        <span>Name</span><br />
                        <input type="text"
                            placeholder='Enter your name'
                            className='w-80 px-3 py-1 border rounded-md outline-none bg-white text-black'
                            {...register("name", { required: "Name is required" })} />
                        {errors.name && <span className='text-sm text-red-600'>{errors.name.message}</span>}
                    </div>

                    {/* Email */}
                    <div className='mt-4 space-y-2'>
                        <span>Email</span><br />
                        <input type="email"
                            placeholder='Enter your email'
                            className='w-80 px-3 py-1 border rounded-md outline-none bg-white text-black'
                            {...register("email", { required: "Email is required" })} />
                        {errors.email && <span className='text-sm text-red-600'>{errors.email.message}</span>}
                    </div>

                    {/* Password */}
                    <div className='mt-4 space-y-2'>
                        <span>Password</span><br />
                        <input type="password"
                            placeholder='Enter your password'
                            className='w-80 px-3 py-1 border rounded-md outline-none bg-white text-black'
                            {...register("password", { required: "Password is required" })} />
                        {errors.password && <span className='text-sm text-red-600'>{errors.password.message}</span>}
                    </div>

                    <div className='mt-4 space-y-2'>
                        <span>Confirm Password</span><br />
                        <input type="password"
                            placeholder='Confirm your password'
                            className='w-80 px-3 py-1 border rounded-md outline-none bg-white text-black'
                            {...register("confirmPassword", { required: "Confirm Password is required" })} />
                        {errors.confirmPassword && <span className='text-sm text-red-600'>{errors.confirmPassword.message}</span>}
                    </div>


                    {/* Button */}
                    <div className='flex justify-around mt-4'>
                        <button className='bg-primary text-white rounded-md px-3 py-1 hover:bg-icon duration-200'>
                            Sign Up
                        </button>
                        <p className='mt-1'>Already registered? 
                            <a className='underline text-blue-500 cursor-pointer' 
                                onClick={() => document.getElementById('my_modal_3').showModal()}>
                                Login
                            </a>
                            <Login />
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;