import React from "react";
import Content from './routes/content';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/loginButton";
import images from './images/16.jpg'

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  console.log(isAuthenticated);

  if(isLoading) {
    return (
      <div className="fs-4 w-25 m-auto mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    isAuthenticated ? (
    <div>
      <Content/>
    </div>) :
    <div style={{backgroundImage: `url(${images})`, backgroundSize: 'cover', height: "100vh"}}>
      <LoginButton/>
    </div>
  );
}

export default App;
