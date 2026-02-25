"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, Code, Copy, Trash2, Minimize2, Maximize2 } from "lucide-react"

export function JSONFormatterTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const format = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setError(null)
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
      {/* Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Input JSON
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder='{"name": "value"}'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[400px] font-mono text-sm"
          />
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-10 border border-red-20 text-red-600">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            <Button onClick={format} className="gap-2">
              <Maximize2 className="h-4 w-4" />
              Format
            </Button>
            <Button variant="outline" onClick={minify} className="gap-2">
              <Minimize2 className="h-4 w-4" />
              Minify
            </Button>
            <Button variant="outline" onClick={validate} className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Validate
            </Button>
            <Button variant="outline" onClick={clear} className="gap-2">
              <Trash2 className="h-4 w-4" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Output */}
      <Card>
        <CardHeader>
          <CardTitle>Output</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={output}
            readOnly
            className="min-h-[400px] font-mono text-sm bg-muted/50"
          />
          <Button 
            variant="outline" 
            onClick={copyToClipboard} 
            className="gap-2 w-full"
            disabled={!output}
          >
            <Copy className="h-4 w-4" />
            {copied ? "Copied!" : "Copy to Clipboard"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
