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
  Sparkles,
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
    { icon: Calculator, name: "Calculator", href: "/tools/calculator", desc: "Basic operations" },
    { icon: Calendar, name: "Date Calculator", href: "/tools/date-calculator", desc: "Date math" },
    { icon: Clock, name: "World Clock", href: "/tools/world-clock", desc: "Time zones" },
    { icon: Type, name: "Text Tools", href: "/tools/text-tools", desc: "Text utilities" },
    { icon: Palette, name: "Color Converter", href: "/tools/color-converter", desc: "Color formats" },
    { icon: Code, name: "JSON Formatter", href: "/tools/json-formatter", desc: "JSON tools" },
    { icon: Image, name: "Image Converter", href: "/tools/image-converter", desc: "Image formats" },
    { icon: FileText, name: "PDF Tools", href: "/tools/pdf-tools", desc: "PDF utilities" },
    { icon: Link2, name: "URL Shortener", href: "/tools/url-shortener", desc: "Short links" },
    { icon: Wrench, name: "Unit Converter", href: "/tools/unit-converter", desc: "Unit conversion" },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Top glow */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-white/5 rounded-full blur-[120px] transform -translate-x-1/2" />
        {/* Bottom right glow */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/3 rounded-full blur-[100px]" />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Minimal Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5 transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0 -translate-y-4'}`}>
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-lg font-semibold tracking-wide flex items-center gap-2 group">
              <div className="w-2 h-2 rounded-full bg-white group-hover:bg-white/80 transition-colors" />
              <span className="font-medium">Tools</span>
            </Link>
            <nav className="flex items-center gap-10">
              <Link 
                to="/discover" 
                className="text-sm text-white/50 hover:text-white transition-all duration-300 hover:scale-105"
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

      {/* Hero Section */}
      <main className="relative pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-8">
          {/* Decorative pill */}
          <div className={`mb-8 transition-all duration-1000 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-white/60" />
              <span className="text-xs text-white/60 tracking-wide">10 FREE TOOLS</span>
            </div>
          </div>

          {/* Main Title with gradient text */}
          <div className={`transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.88]">
              <span className="bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent">
                Free
              </span>
              <br />
              <span className="text-white/60">Online</span>
              <br />
              <span className="bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent">
                Tools
              </span>
            </h1>
          </div>

          {/* Subtitle with refined typography */}
          <div className={`mt-10 max-w-xl transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-lg text-white/40 leading-relaxed font-light">
              A curated collection of essential utilities. 
              <span className="text-white/60"> No sign-ups. No downloads.</span> 
              <span className="text-white/50"> Just open and use.</span>
            </p>
          </div>

          {/* CTA Button - minimal and sleek */}
          <div className={`mt-12 transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button 
              asChild 
              className="group bg-white text-black hover:bg-white/90 rounded-full px-10 h-14 text-sm font-medium tracking-wide transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
            >
              <Link to="/discover">
                Explore Tools
                <ArrowRight className="w-4 h-4 ml-2.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Divider line */}
          <div className={`mt-24 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`} />

          {/* Tools Grid - Premium card design */}
          <div className={`mt-16 transition-all duration-1000 delay-600 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {tools.map((tool, index) => (
                <Link
                  key={tool.name}
                  to={tool.href}
                  className="group relative p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)]"
                  style={{ transitionDelay: `${index * 40}ms` }}
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative flex flex-col items-center text-center">
                    {/* Icon container */}
                    <div className="w-12 h-12 rounded-xl bg-white/5 group-hover:bg-white/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                      <tool.icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
                    </div>
                    
                    {/* Tool name */}
                    <span className="mt-4 font-medium text-sm text-white/80 group-hover:text-white transition-colors duration-300">
                      {tool.name}
                    </span>
                    
                    {/* Tool description */}
                    <span className="mt-1 text-xs text-white/30 group-hover:text-white/50 transition-colors duration-300">
                      {tool.desc}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer - minimal */}
      <footer className={`border-t border-white/5 py-10 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
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
