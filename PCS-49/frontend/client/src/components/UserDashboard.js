"use client"

import { useState } from "react"
import { Calendar, Clock, BarChart2, FileText, User, Settings, LogOut } from "lucide-react"

function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [moodData, setMoodData] = useState([
    { day: "Mon", score: 6 },
    { day: "Tue", score: 7 },
    { day: "Wed", score: 5 },
    { day: "Thu", score: 8 },
    { day: "Fri", score: 6 },
    { day: "Sat", score: 7 },
    { day: "Sun", score: 9 },
  ])
  const [todayMood, setTodayMood] = useState(null)

  // Sample upcoming appointments
  const appointments = [
    { id: 1, title: "Therapy Session", date: "2023-05-15", time: "10:00 AM", provider: "Dr. Sarah Johnson" },
    { id: 2, title: "Mindfulness Workshop", date: "2023-05-18", time: "2:00 PM", provider: "MindCare Group" },
  ]

  // Sample recommended resources
  const resources = [
    { id: 1, title: "Managing Anxiety Guide", type: "PDF", tags: ["anxiety", "self-help"] },
    { id: 2, title: "Sleep Improvement Techniques", type: "Video", tags: ["sleep", "wellness"] },
    { id: 3, title: "Mindfulness Meditation", type: "Audio", tags: ["stress", "meditation"] },
  ]

  const handleMoodSelection = (score) => {
    setTodayMood(score)
    // In a real app, you would save this to your backend
    // For now, we'll just update the last day in our sample data
    const newMoodData = [...moodData]
    newMoodData[newMoodData.length - 1].score = score
    setMoodData(newMoodData)
  }


  return (
    <section className="py-12 px-4 bg-gradient-to-b from-slate-900 to-slate-800 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 bg-slate-800 rounded-xl border border-slate-700 p-4 h-fit">
            <div className="flex items-center gap-3 mb-8 p-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                JD
              </div>
              <div>
                <h3 className="font-semibold text-white">John </h3>
                <p className="text-slate-400 text-sm">Patient</p>
              </div>
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === "overview" ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-700"
                  }`}
              >
                <BarChart2 className="w-5 h-5" />
                <span>Overview</span>
              </button>

              <button
                onClick={() => setActiveTab("appointments")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === "appointments" ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-700"
                  }`}
              >
                <Calendar className="w-5 h-5" />
                <span>Appointments</span>
              </button>

              <button
                onClick={() => setActiveTab("resources")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === "resources" ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-700"
                  }`}
              >
                <FileText className="w-5 h-5" />
                <span>Resources</span>
              </button>

              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === "profile" ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-700"
                  }`}
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === "settings" ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-700"
                  }`}
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
            </nav>

            <div className="mt-8 pt-4 border-t border-slate-700">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-slate-300 hover:bg-slate-700 transition-colors">
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Welcome back, John</h2>
                  <p className="text-slate-300">
                    Track your progress and manage your mental health journey all in one place.
                  </p>

                  {/* Today's mood tracker */}
                  <div className="mt-6">
                    <h3 className="text-md font-medium text-slate-300 mb-3">How are you feeling today?</h3>
                    <div className="flex gap-2 flex-wrap">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                        <button
                          key={score}
                          onClick={() => handleMoodSelection(score)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${todayMood === score
                            ? "bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-500/30"
                            : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                            }`}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                    <p className="text-slate-400 text-sm mt-2">1 = Very low, 10 = Excellent</p>
                  </div>
                </div>

                {/* Mood chart */}
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Your Mood This Week</h3>
                  <div className="h-64 flex items-end justify-between gap-2 mt-4 px-4">
                    {moodData.map((day, index) => (
                      <div key={index} className="flex flex-col items-center gap-2">
                        <div
                          className="w-8 bg-gradient-to-t from-indigo-600 to-violet-600 rounded-t-md transition-all duration-500"
                          style={{ height: `${day.score * 10}%` }}
                        ></div>
                        <span className="text-slate-400 text-sm">{day.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                    <h3 className="text-slate-400 text-sm mb-1">Completed Sessions</h3>
                    <p className="text-2xl font-bold text-white">12</p>
                  </div>
                  <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                    <h3 className="text-slate-400 text-sm mb-1">Upcoming Appointments</h3>
                    <p className="text-2xl font-bold text-white">2</p>
                  </div>
                  <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                    <h3 className="text-slate-400 text-sm mb-1">Streak</h3>
                    <p className="text-2xl font-bold text-white">7 days</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "appointments" && (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Your Appointments</h2>

                {appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="bg-slate-700 rounded-lg p-4 flex justify-between items-center"
                      >
                        <div>
                          <h3 className="font-medium text-white">{appointment.title}</h3>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1 text-slate-300 text-sm">
                              <Calendar className="w-4 h-4 text-indigo-400" />
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-slate-300 text-sm">
                              <Clock className="w-4 h-4 text-indigo-400" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                          <p className="text-slate-400 text-sm mt-1">With: {appointment.provider}</p>
                        </div>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                          Join
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-slate-400">No upcoming appointments</p>
                    <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm transition-colors">
                      Schedule Appointment
                    </button>
                  </div>
                )}

                <div className="mt-6 text-center">
                  <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg text-sm transition-colors">
                    Schedule New Appointment
                  </button>
                </div>
              </div>
            )}

            {activeTab === "resources" && (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Recommended Resources</h2>

                <div className="space-y-4">
                  {resources.map((resource) => (
                    <div key={resource.id} className="bg-slate-700 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-white">{resource.title}</h3>
                        <span className="bg-slate-600 text-slate-300 text-xs px-2 py-1 rounded">{resource.type}</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        {resource.tags.map((tag, index) => (
                          <span key={index} className="bg-indigo-900/50 text-indigo-300 text-xs px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded text-sm transition-colors">
                          View Resource
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium text-white mb-3">Browse by Category</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      "Anxiety",
                      "Depression",
                      "Sleep",
                      "Stress",
                      "Relationships",
                      "Self-care",
                      "Mindfulness",
                      "Trauma",
                    ].map((category, index) => (
                      <button
                        key={index}
                        className="bg-slate-700 hover:bg-slate-600 text-slate-300 py-2 rounded-lg text-sm transition-colors"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Your Profile</h2>

                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3 flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-4xl">
                      JD
                    </div>
                    <button className="mt-4 text-indigo-400 hover:text-indigo-300 text-sm">
                      Change Profile Picture
                    </button>
                  </div>

                  <div className="md:w-2/3 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-400 text-sm mb-1">First Name</label>
                        <input
                          type="text"
                          value="John"
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-sm mb-1">Last Name</label>
                        <input
                          type="text"
                          value="Doe"
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 text-sm mb-1">Email</label>
                      <input
                        type="email"
                        value="john.doe@example.com"
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 text-sm mb-1">Phone</label>
                      <input
                        type="tel"
                        value="(555) 123-4567"
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="pt-4">
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Settings</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-slate-300">Email Notifications</label>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-slate-700">
                          <input type="checkbox" className="sr-only" defaultChecked />
                          <span className="block w-6 h-6 absolute left-0 top-0 rounded-full bg-indigo-600 transform transition-transform duration-200 translate-x-6"></span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-slate-300">SMS Reminders</label>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-slate-700">
                          <input type="checkbox" className="sr-only" defaultChecked />
                          <span className="block w-6 h-6 absolute left-0 top-0 rounded-full bg-indigo-600 transform transition-transform duration-200 translate-x-6"></span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-slate-300">App Notifications</label>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-slate-700">
                          <input type="checkbox" className="sr-only" />
                          <span className="block w-6 h-6 absolute left-0 top-0 rounded-full bg-slate-600 transform transition-transform duration-200"></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Privacy</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-slate-300">Share progress with healthcare provider</label>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-slate-700">
                          <input type="checkbox" className="sr-only" defaultChecked />
                          <span className="block w-6 h-6 absolute left-0 top-0 rounded-full bg-indigo-600 transform transition-transform duration-200 translate-x-6"></span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-slate-300">Allow anonymous data for research</label>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-slate-700">
                          <input type="checkbox" className="sr-only" />
                          <span className="block w-6 h-6 absolute left-0 top-0 rounded-full bg-slate-600 transform transition-transform duration-200"></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Account</h3>
                    <div className="space-y-4">
                      <button className="text-slate-300 hover:text-indigo-300 text-sm transition-colors">
                        Change Password
                      </button>
                      <button className="block text-red-400 hover:text-red-300 text-sm transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserDashboard
