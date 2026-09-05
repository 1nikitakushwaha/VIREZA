import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import './index.css'; 
import Navbar from "./landing_page/Navbar";
import Footer from "./landing_page/Footer";
import Homepage from "./landing_page/home/Homepage";
import ResumeATSpage from "./landing_page/resume/ResumeATS/ResumeATSpage";
 
import Signup from "./landing_page/signup/Signup";
import Login from "./landing_page/login/login_page";
import ResumeBuildPage from "./landing_page/resume/ResumeBuilder/ResumeBuildpage";
import RTPAGE from "./landing_page/resume/ResumeTemplate/RTPAGE";
import { ResumeProvider } from "./landing_page/resume/ResumeBuilder/ResumeContext";

function App() {
  const location = useLocation();
  const hideLayout = ["/signup", "/login", "/oa", "/technical-interview", "/hr-interview", "/full-interview"].includes(location.pathname);

  return (
    <div className="app-container">
      {!hideLayout && <Navbar />}

      <main className="main-content">
        <ResumeProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/resumeATS" element={<ResumeATSpage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/resume/builder" element={<ResumeBuildPage/>}/>
            <Route path="/resume/templates" element={<RTPAGE/>}/>
          </Routes>
        </ResumeProvider>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;