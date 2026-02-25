"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Plus, Minus, ArrowRightLeft, Clock } from "lucide-react"

export function DateCalculatorTool() {
  const [mode, setMode] = useState<"add" | "diff">("add")
  const [startDate, setStartDate] = useState("")
  const [years, setYears] = useState(0)
  const [months, setMonths] = useState(0)
  const [days, setDays] = useState(0)
  const [secondDate, setSecondDate] = useState("")
  const [result, setResult] = useState<string | null>(null)

  const calculate = () => {
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
  }

  const clear = () => {
    setStartDate("")
    setSecondDate("")
    setYears(0)
    setMonths(0)
    setDays(0)
    setResult(null)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Date Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mode Toggle */}
          <div className="flex gap-2">
            <Button
              variant={mode === "add" ? "default" : "outline"}
              onClick={() => { setMode("add"); setResult(null) }}
              className="flex-1 gap-2"
            >
              <Plus className="h-4 w-4" />
              Add/Subtract
            </Button>
            <Button
              variant={mode === "diff" ? "default" : "outline"}
              onClick={() => { setMode("diff"); setResult(null) }}
              className="flex-1 gap-2"
            >
              <ArrowRightLeft className="h-4 w-4" />
              Date Difference
            </Button>
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          {mode === "add" ? (
            <>
              {/* Add/Subtract Inputs */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Years</Label>
                  <Input
                    type="number"
                    min="0"
                    value={years}
                    onChange={(e) => setYears(parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Months</Label>
                  <Input
                    type="number"
                    min="0"
                    max="11"
                    value={months}
                    onChange={(e) => setMonths(parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Days</Label>
                  <Input
                    type="number"
                    min="0"
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={calculate} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={clear}>
                  Clear
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Second Date */}
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={secondDate}
                  onChange={(e) => setSecondDate(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={calculate} className="flex-1">
                  Calculate Difference
                </Button>
                <Button variant="outline" onClick={clear}>
                  Clear
                </Button>
              </div>
            </>
          )}

          {/* Result */}
          {result && (
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Clock className="h-4 w-4" />
                Result
              </div>
              <p className="text-lg font-semibold">{result}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reference</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-muted">
            <h4 className="font-semibold mb-2">Today</h4>
            <p className="text-muted-foreground">
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted">
            <h4 className="font-semibold mb-2">Tomorrow</h4>
            <p className="text-muted-foreground">
              {new Date(Date.now() + 86400000).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted">
            <h4 className="font-semibold mb-2">Next Week</h4>
            <p className="text-muted-foreground">
              {new Date(Date.now() + 7 * 86400000).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
