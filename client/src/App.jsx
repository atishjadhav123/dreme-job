import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Jobs from "./components/peges/Jobs"
import Browse from "./components/peges/Browse"
import Profile from "./components/peges/Profile"
import JobDescription from "./components/peges/JobDescription"
import CompanySetup from "./components/adminpages/CompanySetup"
import { CompaniesCreate } from "./components/adminpages/CompaniesCreate"
import AdminJobs from "./components/adminpages/AdminJobs"
import CreateJob from "./components/adminpages/CreateJob"
import Applicants from "./components/adminpages/Applicants"
import ProtectedRoute from "./components/adminpages/ProtectedRoute"
import Companies from "./components/adminpages/Companies;"

function App() {

  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/browse' element={<Browse />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/description/:id' element={<JobDescription />} />


        <Route

          path='/admin/compnaies' element={<ProtectedRoute><Companies /></ProtectedRoute>} />
        <Route path='/admin/compnaies/create' element={<ProtectedRoute><CompaniesCreate /></ProtectedRoute>} />
        <Route
          path='/admin/jobs/create'
          element={
            <ProtectedRoute>
              <CreateJob />
            </ProtectedRoute>
          }
        />
        <Route path='/admin/companies/:id' element={<ProtectedRoute><CompanySetup /></ProtectedRoute>} />
        <Route path='/admin/jobs' element={
          <ProtectedRoute>
            <AdminJobs />
          </ProtectedRoute>
        } />

        <Route path='/admin/jobs/:id/applicants' element={<ProtectedRoute><Applicants /></ProtectedRoute>} />
        {/* <Route path='/admin/jobs' element={<ManageJobs />} />
        <Route path='/admin/users' element={<ManageUsers />} /> */}
        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App
