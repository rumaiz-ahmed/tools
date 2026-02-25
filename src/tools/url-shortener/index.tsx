"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Link2, Copy, Check, Loader2, AlertCircle } from "lucide-react"

export function URLShortenerTool() {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const shorten = async () => {
    if (!url) return
    
    setLoading(true)
    setError(null)
    setShortUrl("")
    
    // Simulate API call - in production, use a real URL shortening service
    setTimeout(() => {
      // Generate a random short code
      const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
      let code = ""
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      setShortUrl(`https://tools.dev/${code}`)
      setLoading(false)
    }, 1500)
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5" />
            URL Shortener
          </CardTitle>
          <CardDescription>
            Enter a long URL to get a shortened version
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="url">Long URL</Label>
            <Input
              id="url"
              placeholder="https://example.com/very/long/url..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && shorten()}
            />
          </div>

          <Button 
            onClick={shorten}
            disabled={!url || loading}
            className="w-full gap-2"
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
          </Button>

          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-10 border border-red-20 text-red-600">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {shortUrl && (
            <div className="p-4 rounded-lg bg-green-50 border border-green-20">
              <Label className="text-sm text-green-600">Your shortened URL:</Label>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  value={shortUrl}
                  readOnly
                  className="font-mono bg-white"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How it works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>1. Paste your long URL in the input field above</p>
          <p>2. Click "Shorten URL" to generate a shortened version</p>
          <p>3. Copy the shortened URL and use it anywhere</p>
          <p className="pt-2 text-xs">
            Note: This is a demo. In production, integrate with a real URL shortening service.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
