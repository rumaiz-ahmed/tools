import { createFileRoute, Link } from "@tanstack/react-router"
import { ArrowLeft } from "lucide-react"
import { UnitConverterTool } from "@/tools/unit-converter"

export const Route = createFileRoute("/tools/unit-converter")({
  component: UnitConverterPage,
})

function UnitConverterPage() {
  return (
    <div className="min-h-screen">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <Link to="/discover" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to All Tools
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <UnitConverterTool />
      </div>
    </div>
  )
}
