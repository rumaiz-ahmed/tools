"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  TypeOutline
} from "lucide-react"

export function TextToolsTool() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const stats = {
    characters: input.length,
    charactersNoSpaces: input.replace(/\s/g, "").length,
    words: input.trim() ? input.trim().split(/\s+/).length : 0,
    lines: input.split("\n").length,
    paragraphs: input.split(/\n\s*\n/).filter(p => p.trim()).length,
  }

  const transform = (fn: (s: string) => string) => {
    setOutput(fn(input))
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
    { name: "Remove Empty Lines", icon: Scissors, action: () => transform(s => s.split("\n").filter(l => l.trim()).join("\n")) },
    { name: "Trim Whitespace", icon: Scissors, action: () => transform(s => s.trim()) },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Input */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter or paste your text here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[300px] resize-none"
            />
            <div className="flex gap-2">
              <Button variant="outline" onClick={clear} className="gap-2">
                <Trash2 className="h-4 w-4" />
                Clear
              </Button>
              <Button variant="outline" onClick={copyToClipboard} className="gap-2">
                <Copy className="h-4 w-4" />
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats & Tools */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div className="p-3 rounded-lg bg-muted text-center">
                <p className="text-2xl font-bold">{stats.characters}</p>
                <p className="text-xs text-muted-foreground">Characters</p>
              </div>
              <div className="p-3 rounded-lg bg-muted text-center">
                <p className="text-2xl font-bold">{stats.charactersNoSpaces}</p>
                <p className="text-xs text-muted-foreground">No Spaces</p>
              </div>
              <div className="p-3 rounded-lg bg-muted text-center">
                <p className="text-2xl font-bold">{stats.words}</p>
                <p className="text-xs text-muted-foreground">Words</p>
              </div>
              <div className="p-3 rounded-lg bg-muted text-center">
                <p className="text-2xl font-bold">{stats.lines}</p>
                <p className="text-xs text-muted-foreground">Lines</p>
              </div>
              <div className="p-3 rounded-lg bg-muted text-center">
                <p className="text-2xl font-bold">{stats.paragraphs}</p>
                <p className="text-xs text-muted-foreground">Paragraphs</p>
              </div>
            </div>

            {/* Tools */}
            <div className="space-y-3">
              <h4 className="font-semibold">Transform Tools</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {tools.map((tool) => (
                  <Button
                    key={tool.name}
                    variant="outline"
                    onClick={tool.action}
                    disabled={!input}
                    className="gap-2"
                  >
                    <tool.icon className="h-4 w-4" />
                    {tool.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Output */}
      {output && (
        <Card>
          <CardHeader>
            <CardTitle>Output</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={output}
              readOnly
              className="min-h-[200px] resize-none bg-muted/50"
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
