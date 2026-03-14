import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";

import MenuItems from "./Components/MenuItem/MenuItems";
import Homepage from "./Components/Homepage/Homepage";
import Calendar from "./Components/Calender/Calender";
import UserList from "./Components/Users/UserList";
import Charts from "./Components/Charts/Charts";
import Header from "./Components/Header/Header";

import LoginPage from "./Pages/LoginPage/LoginPage";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Message from "./Components/Message/Message";
import Notification from "./Components/Notification/Notification";
import AdminReviewForm from "./Components/AdminReviewForm/AdminReviewForm";

import useAuth from "./hooks/useAuth";
import VideoGallery from "./Components/VideoGallery/VideoGallery";
import Blogs from "./Components/Blogs/Blogs";
import AdminBlogList from "./Components/Blogs/AdminBlogList";
import ReviewTwo from "./Components/ReviewTwo/ReviewTwo";
import Nursing from "./Components/Course/Nursing";
import NursingEditDelete from "./Components/Course/NursingEditDelete";
import Accounting from "./Components/Accounting Course/Accounting";
import AccountingEditDelete from "./Components/Accounting Course/AccountingEditDelete";
import Engineering from "./Components/Engineering/Engineering";
import EngineeringEditDelete from "./Components/Engineering/EngineeringEditDelete";
import FoodHospital from "./Components/Food & Hospital/FoodHospital";
import FoodHospitalEditDelete from "./Components/Food & Hospital/FoodHospitalEditDelete";
import BusinessStudies from "./Components/Business Studies/BusinessStudies";
import BusinessStudiesEditDelete from "./Components/Business Studies/BusinessStudiesEditDelete";
import SuccessReviewPost from "./Components/AdminReviewForm/SuccessReviewPost";
import StudentsEditDelete from "./Components/ReviewTwo/StudentsEditDelete";
import CreateCollaboration from "./Components/Collaboration/CreateCollaboration";
import ManageCollaborations from "./Components/Collaboration/ManageCollaborations";
import CreateLeadership from "./Components/Leadership/CreateLeadership";
import EditDeleteLeadership from "./Components/Leadership/EditDeleteLeadership";
import CountryList from "./Components/Users/CountryList";
import ScholarshipList from "./Components/Users/ScholarshipList";
import CreateVisa from "./Components/VisaSuccess/CreateVisa";
import EditDeleteVisa from "./Components/VisaSuccess/EditDeleteVisa";

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [theme, setTheme] = useState("light");
  const { token, login, logout } = useAuth();

 
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };


  


  if (!token) {
    return (
      <div className={theme}>
        <Routes>
          <Route path="/" element={<LoginPage onLogin={login} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className={theme}>

      <Header toggleTheme={toggleTheme} onLogout={logout} />
     
      <div className="content">
        <div className="menu mt-4">
          <MenuItems theme={theme} toggleTheme={toggleTheme} />
        </div>
        <div className="main">
          <Routes>
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/countrylist" element={<CountryList />} />
            <Route path="/scholarshiplist" element={<ScholarshipList />} />
            <Route path="/adminreview" element={<AdminReviewForm />} />
            <Route path="/successeditdelete" element={<SuccessReviewPost />} />
            <Route path="/reviewtwo" element={<ReviewTwo />} />
            <Route path="/studentsrevieweditdelete" element={<StudentsEditDelete />} />
            <Route path="/videourl" element={<VideoGallery />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogitem" element={<AdminBlogList />} />
            <Route path="/nursing" element={<Nursing />} />
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/engineering" element={<Engineering />} />
            <Route path="/foodandhospitality" element={<FoodHospital />} />
            <Route path="/businessstudies" element={<BusinessStudies />} />
            <Route path="/nursingeditdelete" element={<NursingEditDelete />} />
            <Route
              path="/businessstudieseditdelete"
              element={<BusinessStudiesEditDelete />}
            />
            <Route
              path="/foodandhospitalityeditdelete"
              element={<FoodHospitalEditDelete />}
            />
            <Route
              path="/engineeringeditdelete"
              element={<EngineeringEditDelete />}
            />
            <Route
              path="/accountingeditdelete"
              element={<AccountingEditDelete />}
            />
            <Route
              path="/collaboration"
              element={<CreateCollaboration />}
            />
            <Route
              path="/collaborationeditdelete"
              element={<ManageCollaborations />}
            />
            <Route
              path="/leadership"
              element={<CreateLeadership />}
            />
            <Route
              path="/leadershipeditdelete"
              element={<EditDeleteLeadership />}
            />
            <Route
              path="/visasuccess"
              element={<CreateVisa />}
            />
            <Route
              path="/visasuccesseditdelete"
              element={<EditDeleteVisa />}
            />
             

            <Route path="/chart" element={<Charts />} />
            <Route path="/messages" element={<Message />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="*" element={<Navigate to="/homepage" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AppWrapper;
