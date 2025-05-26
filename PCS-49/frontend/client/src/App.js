"use client"
import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./sections/About"
import MentalHealthConditions from "./sections/MentalHealthConditions"
import MindcareServices from "./sections/MindcareServices"
import Contact from "./sections/Contact"
import MindcareFeatures from "./sections/MindcareFeatures"
import MentalHealthAssessment from "./sections/MentalHealthAssessment"
import AdminDashboard from "./components/AdminDashboard"
import MindCareBot from "./components/MindCareBot"
import UserDashboard from "./components/UserDashboard"
import Footer from "./components/Footer"
import MeditationTimer from "./components/MeditationTimer"
import ResourcesPage from "./components/ResourcesPage"
import ConditionDetails from "./components/ConditionDetails" // Import the new component

function App() {
  const [bgColor, setBgColor] = useState("bg-white") // Default background color

  return (
    <Router>
      <Routes>
        {/* Main site */}
        <Route
          path="/"
          element={
            <>
              {/* Navbar with color change functionality */}
              <Navbar bgColor={bgColor} setBgColor={setBgColor} />

              {/* Page Sections */}
              <Hero />
              <About />
              <MentalHealthConditions />
              <MindcareServices />

              <Contact />
              <Footer />
              <MindCareBot />
            </>
          }
        />

        {/* Individual Condition Details Pages */}
        <Route
          path="/condition/:conditionName"
          element={
            <>
              <Navbar bgColor={bgColor} setBgColor={setBgColor} />
              <ConditionDetails />
              <Footer />
              <MindCareBot />
            </>
          }
        />

        {/* Assessment Form */}
        <Route
          path="/assessment"
          element={
            <>
              <Navbar bgColor={bgColor} setBgColor={setBgColor} />
              <MentalHealthAssessment />
              <Footer />
              <MindCareBot />
            </>
          }
        />

        {/* User Dashboard */}
        <Route path="/dashboard" element={<UserDashboard />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Resources Page */}
        <Route
          path="/resources"
          element={
            <>
              <Navbar bgColor={bgColor} setBgColor={setBgColor} />
              <ResourcesPage />
              <Footer />
              <MindCareBot />
            </>
          }
        />

        {/* Meditation Timer */}
        <Route
          path="/meditation"
          element={
            <>
              <Navbar bgColor={bgColor} setBgColor={setBgColor} />
              <MeditationTimer />
              <Footer />
              <MindCareBot />
            </>
          }
        />
      </Routes>
    </Router>
  )
}

export default App