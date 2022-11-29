import { BrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home"
import ListContextFire from "./listContext";
import MainRoutes from "./MainRoutes";


function App() {
  return (
    <ListContextFire>
      <BrowserRouter> 
      <MainRoutes/>
    <div className="App">
      <Home/>
    </div>
    </BrowserRouter>
    </ListContextFire>
  );
}

export default App;
