import React from 'react';
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
import { Auth0Provider } from '@auth0/auth0-react';
import LoginButton from './components/loginButton';

//WILL NEED TO PUT INTO AN .ENV FILE
const domain = "dev-41ntdpao6mtbxyd1.us.auth0.com";
const clientId = "tztvJBVYM7wP1HLmvSB0xwnXzdC7SeAp";
// const domain = process.env.REACT_APP_AUTH_DOMAIN;
// const clientId = process.env.REACT_APP_AUTH_CLIENT_ID;

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
    element : <LoginButton/>,
    errorElement : <Error/>
  },
])

console.log(domain, clientId);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <RouterProvider router={routes} />
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
