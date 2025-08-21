
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css'
import '@mantine/tiptap/styles.css'
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css'
import FindJobs from './Pages/FindJobs.jsx'
import Header from './CommonComponents/Header/Header.jsx';
import Footer from './CommonComponents/Footer/Footer.jsx';
import FindTalentPage from './Pages/FindTalentPage.jsx';
import TalentProfilePage from './Pages/TalentProfilePage.jsx';
import PostJobPage from './Pages/PostJobPage.jsx';
import JobDescriptionPage from './Pages/JobDescriptionPage.jsx';
import ApplyJobPage from './Pages/ApplyJobPage.jsx';
import CompanyPage from './Pages/CompanyPage.jsx';
import PostedJobPage from './Pages/PostedJobPage.jsx';
import JobHistoryPage from './Pages/JobHistoryPage.jsx';
import SignUp from './Pages/SignUp.jsx';
import ProfilePage from './Pages/ProfilePage.jsx';
import { Notifications } from '@mantine/notifications';
import HomePage from './Pages/Dashboard.jsx';
import { Provider } from 'react-redux';
import Store from './Store.jsx';
// import { getItem } from './Services/LocalStorageServices.jsx';
import ProtectedRoute from './Services/ProtectedRoute.jsx';
import PublicRoute from './Services/PublicRoute.jsx';
import UnauthorisedPage from './Pages/UnauthorisedPage.jsx';
import ResumeHomePage from './Pages/ResumeHomePage.jsx';
import CheckSelectedId from './CommonComponents/CheckSelectedId.jsx';
import DetailsFilling from "./Pages/DetailsFilling.jsx";
import MyResumes from "./Pages/MyResumes.jsx";

function App() {
  return (
  <Provider store={Store}>
      <Notifications position='top-center' zIndex={1000}/>
    <BrowserRouter>
      <div className='position-relative d-flex flex-column AppContainer' >
      <Header/>
      <main>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path="/find-jobs" element={<ProtectedRoute allowedRoles={'APPLICANT'}><FindJobs /></ProtectedRoute>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/find-talent" element={<ProtectedRoute allowedRoles={'EMPLOYER'}><FindTalentPage /></ProtectedRoute>} />
        <Route path="/jobs/:id" element={<JobDescriptionPage />} />
        <Route path='/apply-job/:id' element={<ApplyJobPage />} />
        <Route path='/job-history' element={<ProtectedRoute allowedRoles={'APPLICANT'}><JobHistoryPage /></ProtectedRoute>} />
        <Route path='/talent-profile/:profileId' element={<TalentProfilePage />} />
        <Route path='/post-job/:id' element={<ProtectedRoute allowedRoles={'EMPLOYER'}><PostJobPage /></ProtectedRoute>} />
        <Route path='/company-page/:companyName' element={<CompanyPage />} />
        <Route path='/posted-job/:id' element={<ProtectedRoute allowedRoles={'EMPLOYER'}><PostedJobPage /></ProtectedRoute>} />
        <Route path='/sign-up' element={<PublicRoute><SignUp/></PublicRoute>} />
        <Route path='/login' element={<SignUp />} />
        <Route path='/unauthorized' element={<UnauthorisedPage/>} />
        <Route path="/resume" element={<ProtectedRoute allowedRoles={'APPLICANT'}><ResumeHomePage /></ProtectedRoute>} />
        <Route
          path="/template/fill-details"
          element={
            <CheckSelectedId>
              <DetailsFilling />
            </CheckSelectedId>
          }
        />
        <Route exact path="/my/resumes" element={<MyResumes />} />
      </Routes>
      </main>

      <Footer />
      </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
