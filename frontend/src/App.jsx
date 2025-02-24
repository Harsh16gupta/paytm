import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import Last from './components/Last/CardComponent'
import Layout from "./Components/Layout/Layout";
import AI_Bot from "./Components/AI_Bot/AI_Bot";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        
        
        {/* Authentication Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<SendMoney />} />
      </Routes>
    </Router>
  );
}

export default App;
