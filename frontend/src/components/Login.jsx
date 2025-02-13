import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useStore } from '../useStore';

const Login = () => {
    const navigate = useNavigate(); // Initialize navigate function
    const {authUser, setUser,getMonthly} = useStore();
    console.log("user", authUser)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    const onSubmit = async (data) => {
        const userInfo = {
            email: data.email,
            password: data.password,
        };
  
        await axios.post('http://localhost:3000/api/auth/login', userInfo)
        .then((res) => {
            console.log(res.data);
            if (res.data) {
                toast.success('Logged In Successfully!');
                setUser(res.data)
                getMonthly()
                navigate('/dashboard');
                setTimeout(() => {
                    document.getElementById("my_modal_3").close();
                    console.log("in login") // Redirect to dashboard
                }, 1000);
            }
        }).catch((err) => {
            if (err.response) {
                console.log(err);
                toast.error("Error: " + err.response.data.message);
            }
        });
    };

    return (
        <div className='bg-slate-100'>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box bg-slate-100">
                    <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                        <Link 
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            to='/'
                            onClick={() => document.getElementById("my_modal_3").close()}
                        >✕</Link>
                        <h3 className="font-bold text-lg">Login</h3>

                        {/* Email */}
                        <div className='mt-4 space-y-2'>
                            <span>Email</span>
                            <br/>
                            <input type="email"
                                placeholder='Enter your email'
                                className='w-80 px-3 py-1 border rounded-md outline-none bg-white text-black'
                                {...register("email", { required: true })} />
                            <br/>
                            {errors.email && <span className='text-sm text-red-600'>This field is required</span>}
                        </div>

                        {/* Password */}
                        <div className='mt-4 space-y-2'>
                            <span>Password</span>
                            <br/>
                            <input type="password"
                                placeholder='Enter your password'
                                className='w-80 px-3 py-1 border rounded-md outline-none bg-white text-black'
                                {...register("password", { required: true })} />
                            <br/>
                            {errors.password && <span className='text-sm text-red-600'>This field is required</span>}
                        </div>

                        {/* Button */}
                        <div className='flex justify-around mt-4'>
                            <button className='bg-primary text-white rounded-md px-3 py-1 hover:bg-icon duration-200'>Login</button>
                            <p className='mt-1'>Not registered? <Link className='underline text-blue-500 cursor-pointer' to='/signup'>Signup</Link></p>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default Login;