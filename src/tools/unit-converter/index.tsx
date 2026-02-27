"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRightLeft, Scale, Thermometer, Ruler, Droplets, Timer } from "lucide-react"
import { useSupportModal } from "@/components/support-modal"

type Category = "length" | "weight" | "temperature" | "volume" | "time"

const conversions: Record<Category, { from: string; to: string; factor: number; special?: string }[]> = {
  length: [
    { from: "meter", to: "kilometer", factor: 0.001 },
    { from: "kilometer", to: "meter", factor: 1000 },
    { from: "meter", to: "centimeter", factor: 100 },
    { from: "centimeter", to: "meter", factor: 0.01 },
    { from: "meter", to: "millimeter", factor: 1000 },
    { from: "millimeter", to: "meter", factor: 0.001 },
    { from: "meter", to: "mile", factor: 0.000621371 },
    { from: "mile", to: "meter", factor: 1609.34 },
    { from: "meter", to: "yard", factor: 1.09361 },
    { from: "yard", to: "meter", factor: 0.9144 },
    { from: "meter", to: "foot", factor: 3.28084 },
    { from: "foot", to: "meter", factor: 0.3048 },
    { from: "meter", to: "inch", factor: 39.3701 },
    { from: "inch", to: "meter", factor: 0.0254 },
  ],
  weight: [
    { from: "kilogram", to: "gram", factor: 1000 },
    { from: "gram", to: "kilogram", factor: 0.001 },
    { from: "kilogram", to: "milligram", factor: 1000000 },
    { from: "milligram", to: "kilogram", factor: 0.000001 },
    { from: "kilogram", to: "pound", factor: 2.20462 },
    { from: "pound", to: "kilogram", factor: 0.453592 },
    { from: "kilogram", to: "ounce", factor: 35.274 },
    { from: "ounce", to: "kilogram", factor: 0.0283495 },
    { from: "kilogram", to: "ton", factor: 0.001 },
    { from: "ton", to: "kilogram", factor: 1000 },
  ],
  temperature: [
    { from: "celsius", to: "fahrenheit", factor: 1, special: "c-to-f" },
    { from: "fahrenheit", to: "celsius", factor: 1, special: "f-to-c" },
    { from: "celsius", to: "kelvin", factor: 1, special: "c-to-k" },
    { from: "kelvin", to: "celsius", factor: 1, special: "k-to-c" },
  ],
  volume: [
    { from: "liter", to: "milliliter", factor: 1000 },
    { from: "milliliter", to: "liter", factor: 0.001 },
    { from: "liter", to: "gallon", factor: 0.264172 },
    { from: "gallon", to: "liter", factor: 3.78541 },
    { from: "liter", to: "quart", factor: 1.05669 },
    { from: "quart", to: "liter", factor: 0.946353 },
    { from: "liter", to: "pint", factor: 2.11338 },
    { from: "pint", to: "liter", factor: 0.473176 },
    { from: "liter", to: "cup", factor: 4.22675 },
    { from: "cup", to: "liter", factor: 0.236588 },
  ],
  time: [
    { from: "second", to: "minute", factor: 0.0166667 },
    { from: "minute", to: "second", factor: 60 },
    { from: "second", to: "hour", factor: 0.000277778 },
    { from: "hour", to: "second", factor: 3600 },
    { from: "second", to: "day", factor: 0.0000115741 },
    { from: "day", to: "second", factor: 86400 },
    { from: "second", to: "week", factor: 0.00000165344 },
    { from: "week", to: "second", factor: 604800 },
    { from: "second", to: "year", factor: 0.0000000317098 },
    { from: "year", to: "second", factor: 31536000 },
  ],
}

const units: Record<Category, string[]> = {
  length: ["meter", "kilometer", "centimeter", "millimeter", "mile", "yard", "foot", "inch"],
  weight: ["kilogram", "gram", "milligram", "pound", "ounce", "ton"],
  temperature: ["celsius", "fahrenheit", "kelvin"],
  volume: ["liter", "milliliter", "gallon", "quart", "pint", "cup"],
  time: ["second", "minute", "hour", "day", "week", "year"],
}

const icons: Record<Category, React.ReactNode> = {
  length: <Ruler className="h-5 w-5" />,
  weight: <Scale className="h-5 w-5" />,
  temperature: <Thermometer className="h-5 w-5" />,
  volume: <Droplets className="h-5 w-5" />,
  time: <Timer className="h-5 w-5" />,
}

export function UnitConverterTool() {
  const [category, setCategory] = useState<Category>("length")
  const [value, setValue] = useState("")
  const [fromUnit, setFromUnit] = useState("meter")
  const [toUnit, setToUnit] = useState("kilometer")
  const [result, setResult] = useState<string | null>(null)
  const { showSupport } = useSupportModal()

  const convert = () => {
    const numValue = parseFloat(value)
    if (isNaN(numValue)) return

    let converted: number

    if (category === "temperature") {
      if (fromUnit === "celsius" && toUnit === "fahrenheit") {
        converted = (numValue * 9/5) + 32
      } else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
        converted = (numValue - 32) * 5/9
      } else if (fromUnit === "celsius" && toUnit === "kelvin") {
        converted = numValue + 273.15
      } else if (fromUnit === "kelvin" && toUnit === "celsius") {
        converted = numValue - 273.15
      } else {
        converted = numValue
      }
    } else {
      const conversion = conversions[category].find(c => c.from === fromUnit && c.to === toUnit)
      if (conversion) {
        converted = numValue * conversion.factor
      } else {
        const toBase = conversions[category].find(c => c.from === fromUnit && c.to === units[category][0])
        const fromBase = conversions[category].find(c => c.from === units[category][0] && c.to === toUnit)
        if (toBase && fromBase) {
          converted = (numValue * toBase.factor) * fromBase.factor
        } else {
          converted = numValue
        }
      }
    }

    setResult(converted.toLocaleString(undefined, { maximumFractionDigits: 10 }))
    showSupport()
  }

  const swap = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setResult(null)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="bg-white/[0.02] border-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <ArrowRightLeft className="h-5 w-5" />
            Unit Converter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-white/60">Category</Label>
            <div className="grid grid-cols-5 gap-2">
              {(Object.keys(units) as Category[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat)
                    setFromUnit(units[cat][0])
                    setToUnit(units[cat][1])
                    setResult(null)
                  }}
                  className={`p-3 rounded-lg border transition-all ${
                    category === cat 
                      ? "bg-white text-black border-white" 
                      : "bg-zinc-800 text-white/60 hover:text-white hover:bg-zinc-700 border-zinc-700"
                  }`}
                >
                  {icons[cat]}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white/60">From</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter value"
                className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/30"
              />
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger className="w-[150px] bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black border-white/10">
                  {units[category].map((unit) => (
                    <SelectItem key={unit} value={unit} className="focus:bg-white/10 focus:text-white">
                      {unit.charAt(0).toUpperCase() + unit.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center">
            <button onClick={swap} className="p-3 bg-zinc-700 text-white/60 hover:text-white hover:bg-zinc-600 rounded-lg border border-zinc-600">
              <ArrowRightLeft className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-2">
            <Label className="text-white/60">To</Label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger className="w-full bg-white/5 border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black border-white/10">
                {units[category].map((unit) => (
                  <SelectItem key={unit} value={unit} className="focus:bg-white/10 focus:text-white">
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <button onClick={convert} className="w-full px-4 py-3 bg-white text-black hover:bg-zinc-100 rounded-lg font-medium">
            Convert
          </button>

          {result && (
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <Label className="text-sm text-white/60">Result:</Label>
              <p className="text-2xl font-bold mt-1 text-white">
                {result} {toUnit}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
