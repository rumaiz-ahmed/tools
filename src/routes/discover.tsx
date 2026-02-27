import { createFileRoute, Link } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import {
  Calculator,
  Calendar,
  Clock,
  Code,
  FileText,
  Image,
  Link2,
  Palette,
  Type,
  Wrench,
  ArrowRight,
  Search,
  Github,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const Route = createFileRoute("/discover")({
  component: DiscoverPage,
  head: () => ({
    title: "All Tools - Tools",
    meta: [
      { name: "description", content: "Browse our collection of free online utilities." },
    ],
  }),
})

const tools = [
  {
    icon: Calculator,
    name: "Calculator",
    description: "Perform basic and scientific calculations with history tracking",
    category: "Productivity",
    href: "/tools/calculator",
  },
  {
    icon: Calendar,
    name: "Date Calculator",
    description: "Add or subtract days from dates, calculate date differences",
    category: "Time",
    href: "/tools/date-calculator",
  },
  {
    icon: Clock,
    name: "World Clock",
    description: "Check time zones around the world with live updates",
    category: "Time",
    href: "/tools/world-clock",
  },
  {
    icon: Type,
    name: "Text Tools",
    description: "Word counter, character counter, case converter, and more",
    category: "Text",
    href: "/tools/text-tools",
  },
  {
    icon: Palette,
    name: "Color Converter",
    description: "Convert between HEX, RGB, HSL with interactive color picker",
    category: "Developer",
    href: "/tools/color-converter",
  },
  {
    icon: Code,
    name: "JSON Formatter",
    description: "Format, minify, and validate JSON data",
    category: "Developer",
    href: "/tools/json-formatter",
  },
  {
    icon: Image,
    name: "Image Converter",
    description: "Convert images between PNG, JPG, WebP, and GIF formats",
    category: "Media",
    href: "/tools/image-converter",
  },
  {
    icon: FileText,
    name: "PDF Tools",
    description: "Merge, split, and compress PDF documents",
    category: "Documents",
    href: "/tools/pdf-tools",
  },
  {
    icon: Link2,
    name: "URL Shortener",
    description: "Shorten and manage URLs with tracking",
    category: "Web",
    href: "/tools/url-shortener",
  },
  {
    icon: Wrench,
    name: "Unit Converter",
    description: "Convert length, weight, temperature, volume, and time",
    category: "Productivity",
    href: "/tools/unit-converter",
  },
]

const categories = [
  "All",
  "Productivity",
  "Time",
  "Text",
  "Developer",
  "Media",
  "Documents",
  "Web",
]

function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "All" || tool.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-white/5 rounded-full blur-[120px] transform -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/3 rounded-full blur-[100px]" />
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5 transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0 -translate-y-4'}`}
      >
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-lg font-semibold tracking-wide flex items-center gap-2 group">
              <div className="w-2 h-2 rounded-full bg-white group-hover:bg-white/80 transition-colors" />
              <span className="font-medium">Tools</span>
            </Link>
            <nav className="flex items-center gap-10">
              <Link 
                to="/discover" 
                className="text-sm font-medium text-white border-b border-white pb-0.5"
              >
                All Tools
              </Link>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="pt-32 pb-20 relative">
        <div className="max-w-7xl mx-auto px-8">
          {/* Title */}
          <div
            className={`transition-all duration-1000 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.88]">
              <span className="bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent">
                All
              </span>
              <br />
              <span className="text-white/40">Tools</span>
            </h1>
          </div>

          {/* Subtitle */}
          <div
            className={`mt-8 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <p className="text-xl text-white/40 max-w-xl font-light">
              Browse our collection of {tools.length} free utilities. 
              <span className="text-white/60"> No sign-ups required.</span>
            </p>
          </div>

          {/* Search */}
          <div
            className={`mt-12 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="relative max-w-xl">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <Input
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 h-14 bg-white/5 border-white/10 rounded-full text-base text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:border-white/30 focus:bg-white/10"
              />
            </div>
          </div>

          {/* Categories */}
          <div
            className={`mt-8 transition-all duration-1000 delay-400 ${mounted ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-white text-black'
                      : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div
            className={`mt-16 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTools.map((tool, index) => (
                <Link
                  key={tool.name}
                  to={tool.href}
                  className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)]"
                  style={{ transitionDelay: `${index * 30}ms` }}
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative">
                    {/* Icon container */}
                    <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-all duration-300 w-fit">
                      <tool.icon className="w-6 h-6 text-white/70 group-hover:text-white transition-colors duration-300" />
                    </div>
                    
                    {/* Tool name */}
                    <h3 className="mt-5 font-semibold text-lg text-white/90 group-hover:text-white transition-colors duration-300">
                      {tool.name}
                    </h3>
                    
                    {/* Tool description */}
                    <p className="mt-2 text-sm text-white/40 line-clamp-2 group-hover:text-white/50 transition-colors duration-300">
                      {tool.description}
                    </p>
                    
                    {/* Category and arrow */}
                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-white/30 group-hover:text-white/50 transition-colors">
                      <span>{tool.category}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {filteredTools.length === 0 && (
            <div className="mt-16 text-center py-20">
              <p className="text-xl text-white/40">No tools found</p>
              <Button
                variant="outline"
                className="mt-6 rounded-full border-white/20 text-white hover:bg-white/10"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`border-t border-white/5 py-10 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm text-white/30">Tools — Free forever</span>
            <span className="text-sm text-white/20">Built with precision</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
