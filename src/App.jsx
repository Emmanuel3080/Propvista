import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignupPage from './AuthPages/SignupPage'
import SignInPage from './AuthPages/SignInPage'
import UserDashboard from './Dashboard/UserDashboard'
import AuthProvider from './Contexts/UserAuthContext'
import { Toaster } from 'sonner'
import ProtectedRoute from './ProtectedPage/ProtectedRoute'
import AgentSignUp from './AgentAuthPage/Signup'
import AgentSignin from './AgentAuthPage/SignIn.'
import AgentAuthProvider from './Contexts/AgentAuthContext'
import AgentDashboard from './Dashboard/AgentDashboard'
import AgentProtected from './ProtectedPage/AgentProtected'
import PropertyProvider from './Contexts/PropertyContext'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <BrowserRouter>
        <AgentAuthProvider>
          <AuthProvider>
            <PropertyProvider>
              <Toaster
                richColors
                closeButton
                toastOptions={{
                  style: {
                    background: "rgba(255, 255, 255, 0.8)", // Slight transparency
                    backdropFilter: "blur(12px)",           // Glass effect
                    WebkitBackdropFilter: "blur(12px)",     // Safari support
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    borderRadius: "14px",                   // Matches modern UI curves
                    fontSize: "14px",
                    fontWeight: "600",
                    padding: "16px",
                    color: "#0f172a",                       // Slate-900 for readability
                    fontFamily: "inherit",                  // Respects your app's font-family
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
                  },
                  className: "my-toast-class", // Optional for Tailwind overrides
                }}
              />
              <Routes>
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/signin' element={<SignInPage />} />


                {/* User Protected Route */}
                <Route element={<ProtectedRoute />}>
                  <Route path='/' element={<UserDashboard />} />
                </Route>


                {/* Agent Routes */}
                <Route path='/agent/signup' element={<AgentSignUp />} />
                <Route path='/agent/signin' element={<AgentSignin />} />


                {/* Agent Protected Routes */}
                <Route element={<AgentProtected />}>
                  <Route path='/dashboard' element={<AgentDashboard />} />
                </Route>


              </Routes>

            </PropertyProvider>




          </AuthProvider>

        </AgentAuthProvider>

      </BrowserRouter>


    </>
  )
}

export default App
