import React, { useEffect } from 'react'
import {Route, Routes, Link, Navigate} from 'react-router-dom';
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import Dashboard from './pages/Dashboard';
import Signup from './components/Signup';
import { useStore } from './useStore';
import ExpenseTracker from './components/ExpenseTracker';
import Budgets from './components/Budgets';
import IncomeTracker from './components/IncomeTracker';



function App() {
  const {authUser} = useStore();


  // useEffect(() => {
  //   checkAuth()
  // },[checkAuth]);

  

  return (
    <>
      <div>
        {/* <Navbar/> */}

        <Routes>
          {/* <Route path="/dashboard" element= {<Dashboard/>} /> */}
           <Route path="/dashboard" element= { <Dashboard/>} />
           {/* </Routes></Dashboard>//{authUser ? <Dashboard/> :  <Navigate to="/signup"/>}/> */} 
          <Route path="/signup" element={<Signup/>}/>
          {/* <Route path="/contact" element={<Contact/>}/> */}
          <Route path="/incomes" element={<IncomeTracker />} />
          <Route path="/expenses" element={<ExpenseTracker/>}/> 
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/" element={<Home/>}/>
          {/* <Route path="/about" element={<About/>}/> */}
     </Routes>

        <Toaster/>
      </div>
    </>
  )
}

export default App