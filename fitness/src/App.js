import Content from "./routes/content";

function App() {

  if(window.location.pathname === '/') {
    window.location.pathname = '/workout';
  }

  return (
    <div>
      <Content></Content>
    </div>
  );
}

export default App;
