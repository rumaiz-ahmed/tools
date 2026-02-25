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
  Github,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/")({
  component: IndexPage,
})

function IndexPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const tools = [
    { icon: Calculator, name: "Calculator", href: "/tools/calculator" },
    { icon: Calendar, name: "Date Calculator", href: "/tools/date-calculator" },
    { icon: Clock, name: "World Clock", href: "/tools/world-clock" },
    { icon: Type, name: "Text Tools", href: "/tools/text-tools" },
    { icon: Palette, name: "Color Converter", href: "/tools/color-converter" },
    { icon: Code, name: "JSON Formatter", href: "/tools/json-formatter" },
    { icon: Image, name: "Image Converter", href: "/tools/image-converter" },
    { icon: FileText, name: "PDF Tools", href: "/tools/pdf-tools" },
    { icon: Link2, name: "URL Shortener", href: "/tools/url-shortener" },
    { icon: Wrench, name: "Unit Converter", href: "/tools/unit-converter" },
  ]

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Minimal Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0 -translate-y-4'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold tracking-tight">
              Tools
            </Link>
            <nav className="flex items-center gap-8">
              <Link to="/discover" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
                All Tools
              </Link>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-black transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Main Title */}
          <div className={`transition-all duration-1000 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9]">
              Free
              <br />
              <span className="text-gray-300">Online</span>
              <br />
              Tools
            </h1>
          </div>

          {/* Subtitle */}
          <div className={`mt-12 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xl text-gray-500 max-w-lg leading-relaxed">
              A collection of {tools.length} free utilities. 
              No sign-ups. No downloads. Just open and use.
            </p>
          </div>

          {/* CTA */}
          <div className={`mt-12 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button asChild size="lg" className="bg-black text-white hover:bg-gray-800 rounded-full px-8 h-14 text-base">
              <Link to="/discover">
                Explore Tools
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Tools Grid - Minimal */}
          <div className={`mt-24 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {tools.map((tool, index) => (
                <Link
                  key={tool.name}
                  to={tool.href}
                  className="group relative p-6 rounded-2xl border border-gray-100 hover:border-black transition-all duration-500 hover:shadow-2xl hover:shadow-black/5"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                  <div className="relative flex flex-col items-center text-center">
                    <div className="p-3 rounded-xl bg-gray-50 group-hover:bg-black group-hover:text-white transition-all duration-300">
                      <tool.icon className="w-6 h-6" />
                    </div>
                    <span className="mt-4 font-medium text-sm">{tool.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`border-t border-gray-100 py-12 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm text-gray-400">Tools — Free forever</span>
            <span className="text-sm text-gray-400">Built with care</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
