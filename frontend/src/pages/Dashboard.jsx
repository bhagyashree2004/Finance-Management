import React from 'react'
import { CiDollar } from "react-icons/ci";
import { LuPiggyBank } from "react-icons/lu";
import { FaList } from "react-icons/fa";
import { GrUpgrade } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";

import  { useState } from "react";
import Navbar from '../components/Navbar';
import { useStore } from '../useStore';
import ChartByMonth from '../components/CharByMonth';
import PieChartByCategory from '../components/PieChartByCategory';





const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const {authUser, setUser,getMonthly,totalIncome,
      totalBudget,
      totalExpense,} = useStore();
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
  return (
    <>
    <div className="h-16"><Navbar/></div>
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-1/5 bg-slate-50 p-4 hidden sm:block">
      <div className="space-y-6 px-4 m-5 py-5">
          <div className="flex items-center text-gray-700 cursor-pointer hover:text-blue-800">
          <div className='p-2'><CiDollar /></div>
           <a href="/incomes">  Incomes </a>
          </div>
          <div className="flex items-center text-gray-700 cursor-pointer hover:text-blue-800">
          <div className='p-2'><LuPiggyBank /></div>
            <a href="/budgets">  Budgets </a>
          </div>
          <div className="flex items-center text-gray-700 cursor-pointer hover:text-blue-800">
          <div className='p-2'><FaList /></div>
            <a href="/expenses">  Expenses </a>
          </div>
          <div className="flex items-center text-gray-700 cursor-pointer hover:text-blue-800">
          <div className='p-2'><GrUpgrade /></div>
            <a href="/upgrade">  Upgrade </a>
          </div>
          <div className="flex items-center text-gray-700 cursor-pointer hover:text-blue-800">
          <div className='p-2'><CgProfile /></div>
            <a href="/profile">  Profile </a>
          </div>
        </div>
      </div>

      <div className="w-4/5 bg-slate-200 p-6">
        <div>
          <h1 className="text-2xl font-bold text-black">Hey, {authUser.fullName}</h1>
          <p className="text-gray-600">Here's what's happening with your money, let's manage your expenses.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-6">
           <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
             <div>
               <h3 className="text-gray-800 font-bold">Total Budget</h3>
               <p className="text-gray-500">{totalBudget}</p>
             </div>
             <div className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full text-lg">
               💰
             </div>
           </div>
           <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
             <div>
               <h3 className="text-gray-800 font-bold">Total Spend</h3>
               <p className="text-gray-500">{totalExpense}</p>
             </div>
             <div className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full text-lg">
               📝
             </div>
           </div>
           <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
             <div>
               <h3 className="text-gray-800 font-bold">Sum of Income Streams</h3>
               <p className="text-gray-500">{totalIncome}</p>
             </div>
             <div className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full text-lg">
               💵
             </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
               <h3 className="text-gray-800 font-bold">No. Of Budgets</h3>
               <p className="text-gray-500">6</p>
             </div>
             <div className="bg-blue-600 text-white w-12 h-12 flex items-center justify-center rounded-full text-lg">
            💳
           </div>
          </div>
         </div>

         {/* Monthly Review */}
         <div className='flex flex-row justify-around'>
          <div>
            <h3 className="text-lg font-bold mb-4 text-black">Monthly Review</h3>
            <div className="bg-blue-100 rounded-lg h-40">
              <ChartByMonth/>
            </div>
          </div>
          <div>
          <h3 className="text-lg font-bold mb-4 text-black">Category wise monthly Review</h3>
          <div className="bg-blue-100 rounded-lg h-40">
              <PieChartByCategory/>
            </div>
          </div>
        </div>
       </div>
      


     </div>
    </>
  )
}

export default Dashboard



