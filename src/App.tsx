import { Navbar } from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import { Home } from './pages/Home';
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Quiz } from "./pages/Quiz";
import { PageNotFound } from "./pages/PageNotFound";
import { PrivateRoute } from './utility/UtilityFunctions';
import { Rules } from './pages/Rules';

function App() {

  return (
    <div className="App min-h-screen dark:bg-l-navy dark:text-white">
      <Navbar/>
      
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/rules" element={<Rules/>}></Route>
        <Route path="*" element={<PageNotFound/>} />
        <PrivateRoute path="/level/:levelId" element={<Quiz/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
