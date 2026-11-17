import './App.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import SignupPage from './AuthPages/SignupPage'
import SignInPage from './AuthPages/SignInPage'
import UserDashboard from './Dashboard/UserDashboard'
import AuthProvider from './Contexts/UserAuthContext'
import { Toaster } from 'sonner'
import ProtectedRoute from './ProtectedPage/ProtectedRoute'
import AgentSignUp from './AgentAuthPage/SignUp'
import AgentSignin from './AgentAuthPage/SignIn'
import AgentAuthProvider from './Contexts/AgentAuthContext'
import AgentDashboard from './Dashboard/AgentDashboard'
import AgentProtected from './ProtectedPage/AgentProtected'
import PropertyProvider from './Contexts/PropertyContext'
import PostProperty from './Pages/PostProperty'
import SinglePropertyPage from './Pages/SinglePropertyPage'
import AllPropperties from './Pages/AllPropperties'
import AppointmentProvider from './Contexts/AppointmentContext'
import UpdateProperty from './Components/UpdateProperty'
import AboutUs from './Pages/AboutUs'
import ScrollToTop from './Common/ScrollToTop'
import PageTransition from './Common/PageTransition'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path='/signup' element={<PageTransition><SignupPage /></PageTransition>} />
        <Route path='/signin' element={<PageTransition><SignInPage /></PageTransition>} />

        {/* User Protected Route */}
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<PageTransition><UserDashboard /></PageTransition>} />
          <Route path='/single/:id' element={<PageTransition><SinglePropertyPage /></PageTransition>} />
          <Route path='/properties' element={<PageTransition><AllPropperties /></PageTransition>} />
          <Route path='/saved' element={<PageTransition><AllPropperties savedOnlyDefault={true} /></PageTransition>} />
          <Route path='/about' element={<PageTransition><AboutUs /></PageTransition>} />
        </Route>

        {/* Agent Routes */}
        <Route path='/agent/signup' element={<PageTransition><AgentSignUp /></PageTransition>} />
        <Route path='/agent/signin' element={<PageTransition><AgentSignin /></PageTransition>} />

        {/* Agent Protected Routes */}
        <Route element={<AgentProtected />}>
          <Route path='/dashboard' element={<AgentDashboard />} />
          <Route path="/post-job" element={<PostProperty />} />
          <Route path='property/update/:propertyId' element={<UpdateProperty />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollToTop />
        <AgentAuthProvider>
          <AuthProvider>
            <PropertyProvider>
              <AppointmentProvider>
                <Toaster
                  richColors
                  closeButton
                  toastOptions={{
                    style: {
                      background: "#FFFFFF",
                      border: "1px solid #E4E2DC",
                      borderRadius: "12px",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      padding: "14px 16px",
                      color: "#1A1A1A",
                      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                      boxShadow: "0 12px 32px -8px rgba(26, 26, 26, 0.08)",
                    },
                    className: "my-toast-class",
                  }}
                />
                <AnimatedRoutes />
              </AppointmentProvider>
            </PropertyProvider>
          </AuthProvider>
        </AgentAuthProvider>
      </BrowserRouter>
    </MotionConfig>
  )
}

export default App
