"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Palette, Copy, Check } from "lucide-react"

export function ColorConverterTool() {
  const [color, setColor] = useState("#6366f1")
  const [hex, setHex] = useState("#6366f1")
  const [rgb, setRgb] = useState({ r: 99, g: 102, b: 241 })
  const [hsl, setHsl] = useState({ h: 239, s: 84, l: 67 })
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    const updateFromHex = (hexValue: string) => {
      if (!/^#[0-9A-Fa-f]{6}$/.test(hexValue)) return
      
      const r = parseInt(hexValue.slice(1, 3), 16)
      const g = parseInt(hexValue.slice(3, 5), 16)
      const b = parseInt(hexValue.slice(5, 7), 16)
      
      setRgb({ r, g, b })
      
      const rNorm = r / 255
      const gNorm = g / 255
      const bNorm = b / 255
      const max = Math.max(rNorm, gNorm, bNorm)
      const min = Math.min(rNorm, gNorm, bNorm)
      let h = 0
      let s = 0
      const l = (max + min) / 2
      
      if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
          case rNorm: h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6; break
          case gNorm: h = ((bNorm - rNorm) / d + 2) / 6; break
          case bNorm: h = ((rNorm - gNorm) / d + 4) / 6; break
        }
      }
      
      setHsl({ 
        h: Math.round(h * 360), 
        s: Math.round(s * 100), 
        l: Math.round(l * 100) 
      })
    }
    
    updateFromHex(hex)
  }, [hex])

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const formats = [
    { name: "HEX", value: hex, onChange: setHex },
    { name: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, onChange: () => {} },
    { name: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, onChange: () => {} },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Color Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Color Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div 
            className="aspect-square rounded-xl shadow-lg transition-colors"
            style={{ backgroundColor: hex }}
          />
          
          <div className="space-y-3">
            {formats.map((format) => (
              <div key={format.name} className="flex items-center gap-3">
                <Label className="w-12 font-mono text-sm">{format.name}</Label>
                <Input
                  value={format.value}
                  onChange={(e) => format.onChange(e.target.value)}
                  className="font-mono"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(format.value, format.name)}
                >
                  {copied === format.name ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>

          {/* Quick Colors */}
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Quick Colors</Label>
            <div className="flex flex-wrap gap-2">
              {["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899", "#000000", "#ffffff"].map((c) => (
                <button
                  key={c}
                  onClick={() => setHex(c)}
                  className="w-8 h-8 rounded-full border-2 border-border hover:scale-110 transition-transform"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sliders */}
      <Card>
        <CardHeader>
          <CardTitle>Adjust Color</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* RGB Sliders */}
          <div className="space-y-4">
            <h4 className="font-semibold">RGB</h4>
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <Label>Red</Label>
                  <span className="font-mono">{rgb.r}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgb.r}
                  onChange={(e) => {
                    const r = parseInt(e.target.value)
                    setRgb({ ...rgb, r })
                    setHex(`#${r.toString(16).padStart(2, "0")}${rgb.g.toString(16).padStart(2, "0")}${rgb.b.toString(16).padStart(2, "0")}`)
                  }}
                  className="w-full accent-red-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <Label>Green</Label>
                  <span className="font-mono">{rgb.g}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgb.g}
                  onChange={(e) => {
                    const g = parseInt(e.target.value)
                    setRgb({ ...rgb, g })
                    setHex(`#${rgb.r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${rgb.b.toString(16).padStart(2, "0")}`)
                  }}
                  className="w-full accent-green-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <Label>Blue</Label>
                  <span className="font-mono">{rgb.b}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgb.b}
                  onChange={(e) => {
                    const b = parseInt(e.target.value)
                    setRgb({ ...rgb, b })
                    setHex(`#${rgb.r.toString(16).padStart(2, "0")}${rgb.g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`)
                  }}
                  className="w-full accent-blue-500"
                />
              </div>
            </div>
          </div>

          {/* HSL Sliders */}
          <div className="space-y-4">
            <h4 className="font-semibold">HSL</h4>
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <Label>Hue</Label>
                  <span className="font-mono">{hsl.h}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={hsl.h}
                  onChange={(e) => {
                    const h = parseInt(e.target.value)
                    setHsl({ ...hsl, h })
                    // Convert back to RGB and HEX would require more complex logic
                    // For simplicity, this is one-way
                  }}
                  className="w-full"
                  style={{ background: "linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)" }}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <Label>Saturation</Label>
                  <span className="font-mono">{hsl.s}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={hsl.s}
                  onChange={(e) => setHsl({ ...hsl, s: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <Label>Lightness</Label>
                  <span className="font-mono">{hsl.l}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={hsl.l}
                  onChange={(e) => setHsl({ ...hsl, l: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
