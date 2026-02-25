import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Route = createFileRoute('/discover')({
  component: DiscoverPage,
});

// Adsterra Ad Component
function AdContainer() {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src =
      'https://pl28795298.effectivegatecpm.com/624ee3b4a4d6c3a00b4dc1768a217df6/invoke.js';
    script.setAttribute('data-cfasync', 'false');
    document.head.appendChild(script);

    return () => {
      const existingScript = document.head.querySelector(
        `script[src="${script.src}"]`,
      );
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="my-16 flex justify-center">
      <div id="container-624ee3b4a4d6c3a00b4dc1768a217df6" />
    </div>
  );
}

const tools = [
  {
    icon: Calculator,
    name: 'Calculator',
    description: 'Perform basic and scientific calculations',
    category: 'Productivity',
    href: '/tools/calculator',
  },
  {
    icon: Calendar,
    name: 'Date Calculator',
    description: 'Calculate dates, add or subtract days',
    category: 'Time',
    href: '/tools/date-calculator',
  },
  {
    icon: Clock,
    name: 'World Clock',
    description: 'Check time zones around the world',
    category: 'Time',
    href: '/tools/world-clock',
  },
  {
    icon: Type,
    name: 'Text Tools',
    description: 'Word counter, character counter, and more',
    category: 'Text',
    href: '/tools/text-tools',
  },
  {
    icon: Palette,
    name: 'Color Converter',
    description: 'Convert between HEX, RGB, and HSL',
    category: 'Developer',
    href: '/tools/color-converter',
  },
  {
    icon: Code,
    name: 'JSON Formatter',
    description: 'Format and validate JSON data',
    category: 'Developer',
    href: '/tools/json-formatter',
  },
  {
    icon: Image,
    name: 'Image Converter',
    description: 'Convert images between formats',
    category: 'Media',
    href: '/tools/image-converter',
  },
  {
    icon: FileText,
    name: 'PDF Tools',
    description: 'Merge, split, and compress PDFs',
    category: 'Documents',
    href: '/tools/pdf-tools',
  },
  {
    icon: Link2,
    name: 'URL Shortener',
    description: 'Shorten and manage URLs',
    category: 'Web',
    href: '/tools/url-shortener',
  },
  {
    icon: Wrench,
    name: 'Unit Converter',
    description: 'Convert length, weight, temperature and more',
    category: 'Productivity',
    href: '/tools/unit-converter',
  },
];

const categories = [
  'All',
  'Productivity',
  'Time',
  'Text',
  'Developer',
  'Media',
  'Documents',
  'Web',
];

function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0 -translate-y-4'}`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold tracking-tight">
              Tools
            </Link>
            <nav className="flex items-center gap-8">
              <Link
                to="/discover"
                className="text-sm font-medium text-black border-b-2 border-black pb-0.5"
              >
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
          {/* Title */}
          <div
            className={`transition-all duration-1000 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter">
              All Tools
            </h1>
          </div>

          {/* Subtitle */}
          <div
            className={`mt-6 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <p className="text-xl text-gray-500 max-w-xl">
              Browse our collection of {tools.length} free utilities. No
              sign-ups required.
            </p>
          </div>

          {/* Search */}
          <div
            className={`mt-12 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-gray-50 border-gray-200 rounded-full text-base focus-visible:ring-0 focus-visible:border-black"
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
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
                  className="group relative p-8 rounded-2xl border border-gray-100 hover:border-black transition-all duration-500 hover:shadow-2xl hover:shadow-black/5"
                  style={{ transitionDelay: `${index * 30}ms` }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="p-3 rounded-xl bg-gray-50 group-hover:bg-black group-hover:text-white transition-all duration-300">
                      <tool.icon className="w-6 h-6" />
                    </div>
                    <h3 className="mt-5 font-semibold text-lg">{tool.name}</h3>
                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                      {tool.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-400 group-hover:text-black transition-colors">
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
              <p className="text-xl text-gray-400">No tools found</p>
              <Button
                variant="outline"
                className="mt-6 rounded-full"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Ad */}
          <AdContainer />
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`border-t border-gray-100 py-12 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm text-gray-400">Tools — Free forever</span>
            <span className="text-sm text-gray-400">Built with care</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
