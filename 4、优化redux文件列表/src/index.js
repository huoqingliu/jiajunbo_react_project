import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>,document.getElementById('root'));
store.subscribe(()=>{
	ReactDOM.render(<App/>,document.getElementById('root'))
})
