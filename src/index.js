import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from "react-router-dom";

// date-fns
import Main from "./pages/mainpage.js";
import DatePicker from "./pages/datepicker.js";
import SuccessPage from "./pages/success.js"

ReactDOM.render(

    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Main />}>
        <Route path="/confirm" element={<Main />}/>
        <Route index element={<DatePicker />} />
        <Route path=":date" element={<Main/>} />
            
          </Route>
        <Route path="/booking" element={<DatePicker />} />
        <Route path="/success" element={<SuccessPage />} />
  
        </Routes>
      </BrowserRouter>
    
 ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
