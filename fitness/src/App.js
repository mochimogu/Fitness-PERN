import React from "react";
import Content from './routes/content';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/loginButton";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if(isLoading) {
    return (
      <div className="fs-4 w-25 m-auto mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  console.log(isAuthenticated);

  return (
    isAuthenticated ? (
    <div>
      <Content/>
    </div>) :
    <div>
      <LoginButton/>
    </div>
  );
}

export default App;
