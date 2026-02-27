"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle, Code, Copy, Trash2, Minimize2, Maximize2 } from "lucide-react"
import { useSupportModal } from "@/components/support-modal"

export function JSONFormatterTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const { showSupport } = useSupportModal()

  const format = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setError(null)
      showSupport()
    } catch (e) {
      setError((e as Error).message)
      setOutput("")
    }
  }

  const minify = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError(null)
      showSupport()
    } catch (e) {
      setError((e as Error).message)
      setOutput("")
    }
  }

  const validate = () => {
    try {
      JSON.parse(input)
      setError(null)
      setOutput("Valid JSON!")
    } catch (e) {
      setError((e as Error).message)
    }
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clear = () => {
    setInput("")
    setOutput("")
    setError(null)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="bg-white/[0.02] border-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Code className="h-5 w-5" />
            Input JSON
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder='{"name": "value"}'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[400px] font-mono text-sm bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:border-white/30"
          />
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            <button onClick={format} className="gap-2 px-4 py-2 bg-white text-black hover:bg-zinc-100 rounded-lg font-medium">
              <Maximize2 className="h-4 w-4" />
              Format
            </button>
            <button onClick={minify} className="gap-2 px-4 py-2 bg-zinc-700 text-white hover:bg-zinc-600 rounded-lg border border-zinc-600">
              <Minimize2 className="h-4 w-4" />
              Minify
            </button>
            <button onClick={validate} className="gap-2 px-4 py-2 bg-zinc-700 text-white hover:bg-zinc-600 rounded-lg border border-zinc-600">
              <CheckCircle className="h-4 w-4" />
              Validate
            </button>
            <button onClick={clear} className="gap-2 px-4 py-2 bg-zinc-700 text-white hover:bg-zinc-600 rounded-lg border border-zinc-600">
              <Trash2 className="h-4 w-4" />
              Clear
            </button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/[0.02] border-white/5">
        <CardHeader>
          <CardTitle className="text-white">Output</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={output}
            readOnly
            className="min-h-[400px] font-mono text-sm bg-white/5 border-white/10 text-white"
          />
          <button 
            onClick={copyToClipboard} 
            className="gap-2 w-full px-4 py-2.5 bg-zinc-700 text-white hover:bg-zinc-600 rounded-lg border border-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!output}
          >
            <Copy className="h-4 w-4" />
            {copied ? "Copied!" : "Copy to Clipboard"}
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
