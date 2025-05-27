"use client"

import { useState } from "react"
import { Search, FileText, Video, Headphones, BookOpen, Download, ExternalLink } from "lucide-react"

function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  // Sample resources data
  const resources = [
    {
      id: 1,
      title: "Understanding Anxiety: A Comprehensive Guide",
      description:
        "Learn about the different types of anxiety disorders, their symptoms, and effective coping strategies.",
      type: "article",
      categories: ["anxiety", "self-help"],
      image: "/placeholder.svg?height=200&width=300",
      featured: true,
    },
    {
      id: 2,
      title: "Mindfulness Meditation for Beginners",
      description:
        "A step-by-step guide to starting a mindfulness practice, with simple exercises you can do anywhere.",
      type: "article",
      categories: ["mindfulness", "stress"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Cognitive Behavioral Therapy Techniques",
      description:
        "Practical CBT exercises to help challenge negative thought patterns and improve your mental wellbeing.",
      type: "pdf",
      categories: ["therapy", "depression", "anxiety"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Sleep Hygiene: Improving Your Sleep Quality",
      description:
        "Tips and strategies for better sleep, including creating a sleep-friendly environment and bedtime routines.",
      type: "article",
      categories: ["sleep", "self-help"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      title: "Guided Meditation for Stress Relief",
      description: "A 15-minute guided meditation to help reduce stress and promote relaxation.",
      type: "audio",
      categories: ["mindfulness", "stress"],
      image: "/placeholder.svg?height=200&width=300",
      featured: true,
    },
    {
      id: 6,
      title: "Understanding Depression: Signs, Symptoms, and Treatment",
      description:
        "An in-depth look at depression, including how to recognize symptoms and when to seek professional help.",
      type: "video",
      categories: ["depression", "education"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 7,
      title: "Building Healthy Relationships",
      description:
        "Learn about communication skills, boundary setting, and conflict resolution for healthier relationships.",
      type: "article",
      categories: ["relationships", "self-help"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 8,
      title: "Coping with Trauma: A Workbook",
      description: "Interactive exercises and journaling prompts to help process and heal from traumatic experiences.",
      type: "pdf",
      categories: ["trauma", "therapy"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 9,
      title: "Breathing Exercises for Anxiety",
      description: "Simple breathing techniques to help manage anxiety symptoms in the moment.",
      type: "video",
      categories: ["anxiety", "mindfulness"],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 10,
      title: "Self-Compassion Practice Guide",
      description: "Learn how to be kinder to yourself with these self-compassion exercises and reflections.",
      type: "pdf",
      categories: ["self-help", "therapy"],
      image: "/placeholder.svg?height=200&width=300",
      featured: true,
    },
  ]

  // All unique categories
  const allCategories = ["all", ...new Set(resources.flatMap((resource) => resource.categories))]

  // Filter resources based on search query and active category
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      searchQuery === "" ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "all" || resource.categories.includes(activeCategory)

    return matchesSearch && matchesCategory
  })

  // Get featured resources
  const featuredResources = resources.filter((resource) => resource.featured)

  // Get resource type icon
  const getResourceTypeIcon = (type) => {
    switch (type) {
      case "article":
        return <FileText className="w-5 h-5 text-indigo-400" />
      case "video":
        return <Video className="w-5 h-5 text-red-400" />
      case "audio":
        return <Headphones className="w-5 h-5 text-green-400" />
      case "pdf":
        return <BookOpen className="w-5 h-5 text-amber-400" />
      default:
        return <FileText className="w-5 h-5 text-indigo-400" />
    }
  }

  // Get resource action button based on type
  const getResourceAction = (type) => {
    switch (type) {
      case "article":
        return (
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            <ExternalLink className="w-4 h-4" />
            <span>Read Now</span>
          </button>
        )
      case "video":
        return (
          <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            <Video className="w-4 h-4" />
            <span>Watch Video</span>
          </button>
        )
      case "audio":
        return (
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            <Headphones className="w-4 h-4" />
            <span>Listen Now</span>
          </button>
        )
      case "pdf":
        return (
          <button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        )
      default:
        return (
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            <ExternalLink className="w-4 h-4" />
            <span>View Resource</span>
          </button>
        )
    }
  }

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Mental Health Resources</h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Explore our collection of articles, videos, and tools to support your mental health journey.
          </p>
        </div>

        {/* Search and filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
              />
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category
                      ? "bg-indigo-600 text-white"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700"
                    }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured resources */}
        {activeCategory === "all" && searchQuery === "" && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Featured Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredResources.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-slate-700 transition-transform hover:transform hover:scale-105"
                >
                  <img
                    src={resource.image || "/placeholder.svg"}
                    alt={resource.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      {getResourceTypeIcon(resource.type)}
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                        {resource.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{resource.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">{resource.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.categories.map((category) => (
                        <span
                          key={category}
                          className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    {getResourceAction(resource.type)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All resources */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            {activeCategory === "all"
              ? "All Resources"
              : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Resources`}
          </h2>

          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-slate-700 flex flex-col"
                >
                  <div className="p-6 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getResourceTypeIcon(resource.type)}
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                        {resource.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{resource.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{resource.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.categories.map((category) => (
                        <span
                          key={category}
                          className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-200 dark:border-slate-700">
                    {getResourceAction(resource.type)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
              <p className="text-slate-600 dark:text-slate-400">No resources found matching your search criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("all")
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ResourcesPage;
