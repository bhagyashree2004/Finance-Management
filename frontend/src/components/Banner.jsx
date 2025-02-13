import React from 'react'
import banner from '../assets/expense-tracker.jpg'

export const Banner = () => {
  return (
    <>
    <div className="banner max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col bg-slate-100 md:flex-row my-10">
        <div className='order-2  md:order-1 w-full md:w-1/2 mt-12 md:mt-32'>
            <div className='space-y-12'>
                <h1 className='text-4xl font-bold text-black'>Welcome to Finance Tracker – Your Personal<span className='text-primary'> Finance Companion!!!</span></h1>
                <p className='text-xl font-light text-slate-950'>Take control of your finances with ease! Finance Tracker helps you manage your income, expenses, savings, and budgets all in one place. Track your spending habits, set financial goals, and gain insights with real-time analytics. Whether you're budgeting for daily expenses or planning for the future, Finance Tracker makes money management simple and stress-free.

Start your journey towards financial stability today! 🚀

</p>
    
            </div> 
            <button className="btn mt-6 border-none bg-primary text-white" onClick={() => document.getElementById('my_modal_3').showModal()}>Get Started</button>
        </div>
        <div className='order-1 w-full md:w-1/2'>
            <img src={banner} className=' pt-20 pl-20 w-190 h-190 flex align-center' alt="" />
        </div>
    </div>
    </>
    
  )
}
