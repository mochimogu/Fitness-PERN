import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Error from './routes/error';
import Workout from './routes/workout';
import Data from './routes/data';
import Food from './routes/food';
import Auth from './routes/auth';

const routes = createBrowserRouter([
  {
    path : '/',
    element : <App/>,
    errorElement : <Error/>,
    children : [
      {
        path : '/workout',
        element : <Workout/>,
        errorElement : <Error/>
      },
      {
        path : '/data',
        element : <Data/>,
        errorElement : <Error/>
      },
      {
        path : '/food',
        element : <Food/>,
        errorElement : <Error/>
      },
    ]
  },
  {
    path : '/login',
    element : <Auth/>,
    errorElement : <Error/>
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routes}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
