import { createFileRoute, Link } from "@tanstack/react-router"
import { DateCalculatorTool } from "@/tools/date-calculator"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const Route = createFileRoute("/tools/date-calculator")({
  component: DateCalculatorPage,
  head: () => ({
    title: "Date Calculator - Tools",
    meta: [
      { name: "description", content: "Add or subtract days from dates, calculate date differences." },
    ],
  }),
})

function DateCalculatorPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] h-[300px] bg-white/5 rounded-full blur-[100px] transform -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/3 rounded-full blur-[80px]" />
      </div>

      <header className="relative z-10 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <Link 
              to="/discover" 
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              All Tools
            </Link>
            <Badge variant="secondary" className="bg-white/10 text-white/60 border-0">
              Date Calculator
            </Badge>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-8 py-8">
        <DateCalculatorTool />
      </main>
    </div>
  )
}
