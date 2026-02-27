"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link2, Copy, Check, Loader2, AlertCircle } from "lucide-react"
import { useSupportModal } from "@/components/support-modal"

export function URLShortenerTool() {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { showSupport } = useSupportModal()

  const shorten = async () => {
    if (!url) return
    
    setLoading(true)
    setError(null)
    setShortUrl("")
    
    setTimeout(() => {
      const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
      let code = ""
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      setShortUrl(`https://tools.dev/${code}`)
      setLoading(false)
      showSupport()
    }, 1500)
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="bg-white/[0.02] border-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Link2 className="h-5 w-5" />
            URL Shortener
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="url" className="text-white/60">Long URL</Label>
            <Input
              id="url"
              placeholder="https://example.com/very/long/url..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && shorten()}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:border-white/30"
            />
          </div>

          <button 
            onClick={shorten}
            disabled={!url || loading}
            className="w-full gap-2 px-4 py-3 bg-white text-black hover:bg-zinc-100 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Shortening...
              </>
            ) : (
              <>
                Shorten URL
              </>
            )}
          </button>

          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {shortUrl && (
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <Label className="text-sm text-white/60">Your shortened URL:</Label>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  value={shortUrl}
                  readOnly
                  className="font-mono bg-white/5 border-white/10 text-white"
                />
                <button
                  onClick={copyToClipboard}
                  className="p-2.5 h-10 w-10 bg-zinc-700 text-white/60 hover:text-white hover:bg-zinc-600 rounded-lg border border-zinc-600 flex items-center justify-center"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-white/[0.02] border-white/5">
        <CardHeader>
          <CardTitle className="text-white">How it works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-white/40">
          <p>1. Paste your long URL in the input field above</p>
          <p>2. Click "Shorten URL" to generate a shortened version</p>
          <p>3. Copy the shortened URL and use it anywhere</p>
          <p className="pt-2 text-xs text-white/20">
            Note: This is a demo. In production, integrate with a real URL shortening service.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
