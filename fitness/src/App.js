import React from "react";
import Content from './routes/content';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/loginButton";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  console.log(isAuthenticated);

  if(isLoading) {
    return (
      <div>
        Loading ... 
      </div>
    )
  }

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
