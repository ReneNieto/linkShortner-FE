import { Routes, Route, Link } from "react-router-dom";
import GlobalState from './context/GlobalState'
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Register from './components/Register/Register';


function App() {
  return (
    <GlobalState>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </div>
    </GlobalState>
  );
}

export default App;
