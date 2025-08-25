import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StaticBackground, ProtectedRoute, ErrorBoundary } from './components';
import { Portfolio, Login, Register, Reset, Customize, Preview, Landing, ControlCenter, Settings } from './Pages';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* Landing Page - Entry Point (Public) */}
          <Route path="/" element={<Landing />} />
          
          {/* Authentication Routes (Public - redirect if logged in) */}
          <Route path="/login" element={
            <ProtectedRoute requireAuth={false}>
              <div>
                <Login />
                <StaticBackground />
              </div>
            </ProtectedRoute>
          } />
          <Route path="/register" element={
            <ProtectedRoute requireAuth={false}>
              <div>
                <Register />
                <StaticBackground />
              </div>
            </ProtectedRoute>
          } />
          <Route path="/reset" element={
            <ProtectedRoute requireAuth={false}>
              <div>
                <Reset />
                <StaticBackground />
              </div>
            </ProtectedRoute>
          } />

          {/* Main Portfolio Route (Public) */}
          <Route path="/portfolio" element={
            <div className="relative z-0 bg-primary">
              <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
                <Navbar />
                <Hero />
              </div>
              <div className="relative z-0">
                <About />
                <Experience />
                <Tech />
                <Works />
                <Feedbacks />
                <div className="relative z-0">
                  <Contact />
                  <StaticBackground />
                </div>
              </div>
            </div>
          } />

          {/* Protected Routes (Require Authentication) */}
          <Route path="/control-center" element={
            <ProtectedRoute requireAuth={true}>
              <ControlCenter />
            </ProtectedRoute>
          } />
          <Route path="/customize" element={
            <ProtectedRoute requireAuth={true}>
              <Customize />
            </ProtectedRoute>
          } />
          <Route path="/preview" element={
            <ProtectedRoute requireAuth={true}>
              <Preview />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute requireAuth={true}>
              <Settings />
            </ProtectedRoute>
          } />

          {/* Dynamic Portfolio Route (Public) */}
          <Route path="/portfolio/:userId" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
