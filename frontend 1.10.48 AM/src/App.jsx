// App.js

import { ChatContextProvider } from "./context/chatContext";
import SideBar from "./components/SideBar";
import ChatView from "./components/ChatView";
import MyopiaForm from "./Pages/Form";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import ToggleTheme from "./components/ToggleTheme";
import Test from "./Pages/Test"
import Dashboard from "./components/Dashboard"
const App = () => {
  const [thm, setThm] = useState(true);
  const [open, setOpen] = useState(true);
  
  useEffect(() => {
    if (localStorage.getItem('theme') === 'light') setThm(false);

    function handleResize() {
      window.innerWidth <= 720 ? setOpen(false) : setOpen(true);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ChatContextProvider>
      <Router>
       <Routes>
        
            <Route path='/' element={<Landing/>}/>  
      </Routes>  
        
         
      
          <Routes>
            <Route path="/test" element={
               <div className="flex"> 
              <SideBar setThm={setThm} open={open} setOpen={setOpen} />
              < Test />
            </div>} />
            <Route path="/dashboard" element={
               <div className="flex"> 
              <SideBar setThm={setThm} open={open} setOpen={setOpen} />
              < Dashboard />
      </div>} />
            <Route path="/bot" element={
                  <div className="flex"> 
      <SideBar setThm={setThm} open={open} setOpen={setOpen} />
             
                 <ChatView thm={thm} /></div> } />
              
              
          
      
          <Route path="/form" element={
            <div className="flex">
              <SideBar setThm={setThm} open={open} setOpen={setOpen} />
              <MyopiaForm /></div>} />
             
                
            </Routes>
         
        
      </Router>
    </ChatContextProvider>
  );
};

export default App;