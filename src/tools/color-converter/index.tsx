"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Palette, Copy, Check } from "lucide-react"

export function ColorConverterTool() {
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

  const quickColors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899", "#000000", "#ffffff"]

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="bg-white/[0.02] border-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Palette className="h-5 w-5" />
            Color Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div 
            className="aspect-square rounded-xl shadow-lg transition-colors border border-white/10"
            style={{ backgroundColor: hex }}
          />
          
          <div className="space-y-3">
            {formats.map((format) => (
              <div key={format.name} className="flex items-center gap-3">
                <Label className="w-12 font-mono text-sm text-white/60">{format.name}</Label>
                <Input
                  value={format.value}
                  onChange={(e) => format.onChange(e.target.value)}
                  className="font-mono bg-white/5 border-white/10 text-white"
                />
                <button
                  onClick={() => copyToClipboard(format.value, format.name)}
                  className="p-2 h-10 w-10 bg-zinc-700 text-white/40 hover:text-white hover:bg-zinc-600 rounded-lg border border-zinc-600 flex items-center justify-center"
                >
                  {copied === format.name ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-white/40">Quick Colors</Label>
            <div className="flex flex-wrap gap-2">
              {quickColors.map((c) => (
                <button
                  key={c}
                  onClick={() => setHex(c)}
                  className="w-8 h-8 rounded-full border-2 border-white/10 hover:scale-110 transition-transform hover:border-white/30"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/[0.02] border-white/5">
        <CardHeader>
          <CardTitle className="text-white">Adjust Color</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-white/70">RGB</h4>
            <div className="space-y-3">
              {[
                { label: "Red", value: rgb.r, color: "red", key: "r" as const },
                { label: "Green", value: rgb.g, color: "green", key: "g" as const },
                { label: "Blue", value: rgb.b, color: "blue", key: "b" as const },
              ].map(({ label, value, color, key }) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <Label className="text-white/60">{label}</Label>
                    <span className="font-mono text-white">{value}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={value}
                    onChange={(e) => {
                      const v = parseInt(e.target.value)
                      const newRgb = { ...rgb, [key]: v }
                      setRgb(newRgb)
                      setHex(`#${newRgb.r.toString(16).padStart(2, "0")}${newRgb.g.toString(16).padStart(2, "0")}${newRgb.b.toString(16).padStart(2, "0")}`)
                    }}
                    className="w-full"
                    style={{ accentColor: color }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-white/70">HSL</h4>
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <Label className="text-white/60">Hue</Label>
                  <span className="font-mono text-white">{hsl.h}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={hsl.h}
                  className="w-full"
                  style={{ background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)" }}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <Label className="text-white/60">Saturation</Label>
                  <span className="font-mono text-white">{hsl.s}%</span>
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
                  <Label className="text-white/60">Lightness</Label>
                  <span className="font-mono text-white">{hsl.l}%</span>
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
