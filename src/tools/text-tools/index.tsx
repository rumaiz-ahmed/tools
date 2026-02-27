"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { 
  Type, 
  Scissors, 
  Copy, 
  Trash2, 
  ArrowUp, 
  ArrowDown,
  RefreshCw,
  CaseUpper,
  CaseLower,
  TypeOutline,
  Sparkles,
} from "lucide-react"
import { useSupportModal } from "@/components/support-modal"

export function TextToolsTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const { showSupport } = useSupportModal()

  const stats = {
    characters: input.length,
    charactersNoSpaces: input.replace(/\s/g, "").length,
    words: input.trim() ? input.trim().split(/\s+/).length : 0,
    lines: input.split("\n").length,
    paragraphs: input.split(/\n\s*\n/).filter(p => p.trim()).length,
  }

  const transform = (fn: (s: string) => string) => {
    setOutput(fn(input))
    showSupport()
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output || input)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clear = () => {
    setInput("")
    setOutput("")
  }

  const tools = [
    { name: "UPPERCASE", icon: CaseUpper, action: () => transform(s => s.toUpperCase()) },
    { name: "lowercase", icon: CaseLower, action: () => transform(s => s.toLowerCase()) },
    { name: "Title Case", icon: Type, action: () => transform(s => s.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase())) },
    { name: "Sentence case", icon: TypeOutline, action: () => transform(s => s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase())) },
    { name: "Reverse", icon: RefreshCw, action: () => transform(s => s.split("").reverse().join("")) },
    { name: "Sort Lines", icon: ArrowUp, action: () => transform(s => s.split("\n").sort().join("\n")) },
    { name: "Reverse Lines", icon: ArrowDown, action: () => transform(s => s.split("\n").reverse().join("\n")) },
    { name: "Remove Empty", icon: Scissors, action: () => transform(s => s.split("\n").filter(l => l.trim()).join("\n")) },
    { name: "Trim", icon: Scissors, action: () => transform(s => s.trim()) },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Input */}
        <Card className="lg:col-span-1 bg-white/[0.02] border-white/5">
          <CardHeader>
            <CardTitle className="text-white">Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter or paste your text here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[300px] resize-none bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:border-white/30"
            />
            <div className="flex gap-2">
              <button onClick={clear} className="gap-2 px-4 py-2 bg-zinc-700 text-white hover:bg-zinc-600 rounded-lg border border-zinc-600">
                <Trash2 className="h-4 w-4" />
                Clear
              </button>
              <button onClick={copyToClipboard} className="gap-2 px-4 py-2 bg-zinc-700 text-white hover:bg-zinc-600 rounded-lg border border-zinc-600">
                <Copy className="h-4 w-4" />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Stats & Tools */}
        <Card className="lg:col-span-2 bg-white/[0.02] border-white/5">
          <CardHeader>
            <CardTitle className="text-white">Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                <p className="text-2xl font-bold text-white">{stats.characters}</p>
                <p className="text-xs text-white/40">Characters</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                <p className="text-2xl font-bold text-white">{stats.charactersNoSpaces}</p>
                <p className="text-xs text-white/40">No Spaces</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                <p className="text-2xl font-bold text-white">{stats.words}</p>
                <p className="text-xs text-white/40">Words</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                <p className="text-2xl font-bold text-white">{stats.lines}</p>
                <p className="text-xs text-white/40">Lines</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                <p className="text-2xl font-bold text-white">{stats.paragraphs}</p>
                <p className="text-xs text-white/40">Paragraphs</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-white/40" />
                <h4 className="font-semibold text-white/70">Transform Tools</h4>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {tools.map((tool) => (
                  <button
                    key={tool.name}
                    onClick={tool.action}
                    disabled={!input}
                    className="gap-2 px-4 py-2.5 bg-zinc-700 text-white hover:bg-zinc-600 rounded-lg border border-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <tool.icon className="h-4 w-4" />
                    {tool.name}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {output && (
        <Card className="bg-white/[0.02] border-white/5">
          <CardHeader>
            <CardTitle className="text-white">Output</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={output}
              readOnly
              className="min-h-[200px] resize-none bg-white/5 border-white/10 text-white"
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
