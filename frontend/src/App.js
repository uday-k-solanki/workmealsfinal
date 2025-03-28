import Login from "./components/login"
import Dashboard from "./components/dashboard";
import Employees from "./components/subcomponents/employees"
import Menu from "./components/subcomponents/menu"
import Sales from "./components/subcomponents/sales"
import Orders from "./components/subcomponents/orders"
import Suggestions from "./components/subcomponents/suggestions"
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/dashboard/employees" element={<Employees/>}/>
      <Route path="/dashboard/menu" element={<Menu/>}/>
      <Route path="/dashboard/sales" element={<Sales/>}/>
      <Route path="/dashboard/orders" element={<Orders/>}/>
      <Route path="/dashboard/suggestions" element={<Suggestions/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
