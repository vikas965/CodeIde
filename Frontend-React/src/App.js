import React from "react";
import "./index.css"

// import Home from "./Users/Home";
import { Route, Routes } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CodeEditor from "./CodeEditor";

const App = () => {


  return (
    <section className="App">


      <ToastContainer />
      <Routes>
       
        <Route path="/" element={<CodeEditor />}></Route>
       
      </Routes>



    </section>

  );
}





export default App