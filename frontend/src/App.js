import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import HomePage from "./screens/HomePage/HomePage";
import LandingPage from './screens/LandingPage/Landingpage';
import AboutPage from './screens/AboutPage/AboutPage';
import ContactPage from './screens/ContactPage/ContactPage';


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<RegisterScreen />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />

    </Routes>
  </BrowserRouter>
);

export default App;
