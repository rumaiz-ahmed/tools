"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar, Plus, ArrowRightLeft, Clock, Sparkles } from "lucide-react"
import { useSupportModal } from "@/components/support-modal"

export function DateCalculatorTool() {
  const [mode, setMode] = useState<"add" | "diff">("add")
  const [startDate, setStartDate] = useState("")
  const [years, setYears] = useState(0)
  const [months, setMonths] = useState(0)
  const [days, setDays] = useState(0)
  const [secondDate, setSecondDate] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [calcCount, setCalcCount] = useState(0)
  const { showSupport } = useSupportModal()

  useEffect(() => {
    if (calcCount >= 3) {
      showSupport()
      setCalcCount(0)
    }
  }, [calcCount, showSupport])

  const calculate = useCallback(() => {
    if (mode === "add") {
      if (!startDate) return
      const date = new Date(startDate)
      date.setFullYear(date.getFullYear() + years)
      date.setMonth(date.getMonth() + months)
      date.setDate(date.getDate() + days)
      
      const options: Intl.DateTimeFormatOptions = { 
        weekday: "long", 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
      }
      setResult(date.toLocaleDateString("en-US", options))
    } else {
      if (!startDate || !secondDate) return
      const date1 = new Date(startDate)
      const date2 = new Date(secondDate)
      
      const diffTime = Math.abs(date2.getTime() - date1.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      const diffYears = Math.floor(diffDays / 365)
      const remainingDays = diffDays % 365
      const diffMonths = Math.floor(remainingDays / 30)
      const finalDays = remainingDays % 30
      
      setResult(`${diffDays} days (${diffYears} years, ${diffMonths} months, ${finalDays} days)`)
    }
    setCalcCount(c => c + 1)
  }, [mode, startDate, years, months, days, secondDate])

  const clear = () => {
    setStartDate("")
    setSecondDate("")
    setYears(0)
    setMonths(0)
    setDays(0)
    setResult(null)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <Card className="bg-white/[0.02] border-white/5">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-white">
              <div className="p-2 rounded-lg bg-white/5">
                <Calendar className="w-5 h-5" />
              </div>
              Date Calculator
            </CardTitle>
            <Badge variant="secondary" className="bg-white/10 text-white/70 border-0">
              Time
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mode Toggle */}
          <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
            <button
              onClick={() => { setMode("add"); setResult(null) }}
              className={`flex-1 gap-2 rounded-lg py-2.5 px-4 font-medium transition-all ${
                mode === "add" 
                  ? "bg-white text-black" 
                  : "bg-zinc-800 text-white hover:bg-zinc-700"
              }`}
            >
              <Plus className="h-4 w-4" />
              Add/Subtract
            </button>
            <button
              onClick={() => { setMode("diff"); setResult(null) }}
              className={`flex-1 gap-2 rounded-lg py-2.5 px-4 font-medium transition-all ${
                mode === "diff" 
                  ? "bg-white text-black" 
                  : "bg-zinc-800 text-white hover:bg-zinc-700"
              }`}
            >
              <ArrowRightLeft className="h-4 w-4" />
              Difference
            </button>
          </div>

          {/* Start Date */}
          <div className="space-y-3">
            <Label className="text-white/70 ml-1">Start Date</Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-white/5 border-white/10 text-white h-12 text-base focus-visible:ring-0 focus-visible:border-white/30"
            />
          </div>

          {mode === "add" ? (
            <>
              {/* Add/Subtract Inputs */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label className="text-white/50 ml-1 text-sm">Years</Label>
                  <Input
                    type="number"
                    min="0"
                    value={years}
                    onChange={(e) => setYears(parseInt(e.target.value) || 0)}
                    className="bg-white/5 border-white/10 text-white h-12 text-center font-mono text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/50 ml-1 text-sm">Months</Label>
                  <Input
                    type="number"
                    min="0"
                    max="11"
                    value={months}
                    onChange={(e) => setMonths(parseInt(e.target.value) || 0)}
                    className="bg-white/5 border-white/10 text-white h-12 text-center font-mono text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/50 ml-1 text-sm">Days</Label>
                  <Input
                    type="number"
                    min="0"
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value) || 0)}
                    className="bg-white/5 border-white/10 text-white h-12 text-center font-mono text-lg"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={calculate} className="flex-1 h-12 bg-white text-black hover:bg-zinc-100 font-medium rounded-lg">
                  Calculate
                </button>
                <button onClick={clear} className="h-12 px-4 bg-zinc-700 text-white hover:bg-zinc-600 rounded-lg border border-zinc-600">
                  Clear
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Second Date */}
              <div className="space-y-3">
                <Label className="text-white/70 ml-1">End Date</Label>
                <Input
                  type="date"
                  value={secondDate}
                  onChange={(e) => setSecondDate(e.target.value)}
                  className="bg-white/5 border-white/10 text-white h-12 text-base focus-visible:ring-0 focus-visible:border-white/30"
                />
              </div>

              <div className="flex gap-3">
                <button onClick={calculate} className="flex-1 h-12 bg-white text-black hover:bg-zinc-100 font-medium rounded-lg">
                  Calculate Difference
                </button>
                <button onClick={clear} className="h-12 px-4 bg-zinc-700 text-white hover:bg-zinc-600 rounded-lg border border-zinc-600">
                  Clear
                </button>
              </div>
            </>
          )}

          {/* Result */}
          {result && (
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-sm text-white/40 mb-2">
                <Clock className="h-4 w-4" />
                Result
              </div>
              <p className="text-xl font-semibold text-white">{result}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Reference */}
      <Card className="bg-white/[0.02] border-white/5">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="p-2 rounded-lg bg-white/5">
              <Sparkles className="w-5 h-5" />
            </div>
            Quick Reference
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <h4 className="font-medium text-white/70 mb-1 text-sm">Today</h4>
            <p className="text-white">
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <h4 className="font-medium text-white/70 mb-1 text-sm">Tomorrow</h4>
            <p className="text-white">
              {new Date(Date.now() + 86400000).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <h4 className="font-medium text-white/70 mb-1 text-sm">Next Week</h4>
            <p className="text-white">
              {new Date(Date.now() + 7 * 86400000).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <h4 className="font-medium text-white/70 mb-1 text-sm">Next Month</h4>
            <p className="text-white">
              {new Date(Date.now() + 30 * 86400000).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
