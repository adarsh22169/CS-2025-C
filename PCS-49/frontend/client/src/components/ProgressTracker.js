"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Calendar, ArrowLeft, ArrowRight, Download } from "lucide-react"

function ProgressTracker() {
  const [timeRange, setTimeRange] = useState("week") // 'week', 'month', 'year'
  const [currentDate, setCurrentDate] = useState(new Date())

  // Sample data - in a real app, this would come from your backend
  const weeklyData = [
    { day: "Mon", mood: 6, anxiety: 4, sleep: 7 },
    { day: "Tue", mood: 7, anxiety: 3, sleep: 8 },
    { day: "Wed", mood: 5, anxiety: 6, sleep: 5 },
    { day: "Thu", mood: 8, anxiety: 2, sleep: 7 },
    { day: "Fri", mood: 6, anxiety: 3, sleep: 6 },
    { day: "Sat", mood: 7, anxiety: 2, sleep: 8 },
    { day: "Sun", mood: 9, anxiety: 1, sleep: 9 },
  ]

  const monthlyData = Array.from({ length: 30 }, (_, i) => ({
    day: `${i + 1}`,
    mood: Math.floor(Math.random() * 5) + 5,
    anxiety: Math.floor(Math.random() * 5) + 1,
    sleep: Math.floor(Math.random() * 5) + 4,
  }))

  const yearlyData = Array.from({ length: 12 }, (_, i) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return {
      month: months[i],
      mood: Math.floor(Math.random() * 3) + 6,
      anxiety: Math.floor(Math.random() * 3) + 2,
      sleep: Math.floor(Math.random() * 3) + 5,
    }
  })

  // Get data based on selected time range
  const getData = () => {
    switch (timeRange) {
      case "week":
        return weeklyData
      case "month":
        return monthlyData
      case "year":
        return yearlyData
      default:
        return weeklyData
    }
  }

  // Get x-axis data key based on time range
  const getXAxisDataKey = () => {
    return timeRange === "year" ? "month" : "day"
  }

  // Navigate through time periods
  const navigatePrevious = () => {
    const newDate = new Date(currentDate)
    if (timeRange === "week") {
      newDate.setDate(newDate.getDate() - 7)
    } else if (timeRange === "month") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setFullYear(newDate.getFullYear() - 1)
    }
    setCurrentDate(newDate)
  }

  const navigateNext = () => {
    const newDate = new Date(currentDate)
    if (timeRange === "week") {
      newDate.setDate(newDate.getDate() + 7)
    } else if (timeRange === "month") {
      newDate.setMonth(newDate.getMonth() + 1)
    } else {
      newDate.setFullYear(newDate.getFullYear() + 1)
    }
    setCurrentDate(newDate)
  }

  // Format date range for display
  const getDateRangeText = () => {
    const options = { year: "numeric", month: "short", day: "numeric" }

    if (timeRange === "week") {
      const startOfWeek = new Date(currentDate)
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)

      return `${startOfWeek.toLocaleDateString("en-US", options)} - ${endOfWeek.toLocaleDateString("en-US", options)}`
    } else if (timeRange === "month") {
      return currentDate.toLocaleDateString("en-US", { year: "numeric", month: "long" })
    } else {
      return currentDate.getFullYear().toString()
    }
  }

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700">
          <p className="font-medium text-slate-900 dark:text-white mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <p className="text-sm">
                <span className="text-slate-600 dark:text-slate-400">{entry.name}: </span>
                <span className="font-medium text-slate-900 dark:text-white">{entry.value}</span>
              </p>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <section className="py-16 px-4 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Track Your Progress</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Monitor your mental health journey over time to identify patterns and track improvements.
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            {/* Time range selector */}
            <div className="flex bg-white dark:bg-slate-700 rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setTimeRange("week")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${timeRange === "week"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-600"
                  }`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeRange("month")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${timeRange === "month"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-600"
                  }`}
              >
                Month
              </button>
              <button
                onClick={() => setTimeRange("year")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${timeRange === "year"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-600"
                  }`}
              >
                Year
              </button>
            </div>

            {/* Date navigation */}
            <div className="flex items-center gap-3">
              <button
                onClick={navigatePrevious}
                className="p-2 rounded-full bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors shadow-sm"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 bg-white dark:bg-slate-700 px-4 py-2 rounded-lg shadow-sm">
                <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{getDateRangeText()}</span>
              </div>

              <button
                onClick={navigateNext}
                className="p-2 rounded-full bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors shadow-sm"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Export button */}
            <button className="flex items-center gap-2 bg-white dark:bg-slate-700 px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors shadow-sm">
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Export Data</span>
            </button>
          </div>

          {/* Chart */}
          <div className="h-80 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey={getXAxisDataKey()} tick={{ fill: "#94a3b8" }} axisLine={{ stroke: "#cbd5e1" }} />
                <YAxis domain={[0, 10]} tick={{ fill: "#94a3b8" }} axisLine={{ stroke: "#cbd5e1" }} tickCount={6} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="mood"
                  name="Mood"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="anxiety"
                  name="Anxiety"
                  stroke="#f97316"
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="sleep"
                  name="Sleep Quality"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Legend explanation */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full bg-indigo-500"></div>
                <h3 className="font-medium text-slate-900 dark:text-white">Mood Score</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Your daily mood rating from 1 (very low) to 10 (excellent).
              </p>
            </div>

            <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                <h3 className="font-medium text-slate-900 dark:text-white">Anxiety Level</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Your anxiety level from 1 (minimal) to 10 (severe).
              </p>
            </div>

            <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full bg-cyan-500"></div>
                <h3 className="font-medium text-slate-900 dark:text-white">Sleep Quality</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Your sleep quality rating from 1 (poor) to 10 (excellent).
              </p>
            </div>
          </div>
        </div>

        {/* Insights section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Weekly Insights</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
                  <span className="text-green-600 dark:text-green-400 text-xs">↑</span>
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Mood Improvement</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Your mood has improved by 20% compared to last week.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mt-0.5">
                  <span className="text-blue-600 dark:text-blue-400 text-xs">↑</span>
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Sleep Pattern</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Your sleep quality is most consistent on weekends.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mt-0.5">
                  <span className="text-amber-600 dark:text-amber-400 text-xs">→</span>
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Anxiety Triggers</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Your anxiety tends to peak mid-week, possibly related to work stress.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Recommendations</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-indigo-600 dark:text-indigo-400 text-lg">1</span>
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Try Mindfulness Practice</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Consider adding a 10-minute mindfulness session on Wednesday mornings to help manage mid-week
                    anxiety.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-indigo-600 dark:text-indigo-400 text-lg">2</span>
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Maintain Sleep Schedule</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Your weekend sleep pattern is working well. Try to maintain a similar bedtime routine throughout the
                    week.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-indigo-600 dark:text-indigo-400 text-lg">3</span>
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Schedule Check-in</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Book a check-in with a mental health professional to discuss your progress and adjust your care
                    plan.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProgressTracker
