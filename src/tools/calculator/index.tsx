"use client"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calculator as CalcIcon, History, Trash2 } from "lucide-react"
import { useSupportModal } from "@/components/support-modal"

type Operation = "+" | "-" | "×" | "÷" | "%" | "±"

interface CalculatorState {
  display: string
  previousValue: string | null
  operation: Operation | null
  waitingForOperand: boolean
}

const initialState: CalculatorState = {
  display: "0",
  previousValue: null,
  operation: null,
  waitingForOperand: false,
}

export function CalculatorTool() {
  const [state, setState] = useState<CalculatorState>(initialState)
  const [history, setHistory] = useState<string[]>([])
  const { showSupport } = useSupportModal()

  // Show support modal after 5 calculations
  useEffect(() => {
    if (history.length >= 5) {
      showSupport()
    }
  }, [history.length, showSupport])

  const inputDigit = useCallback((digit: string) => {
    setState((prev) => {
      if (prev.waitingForOperand) {
        return {
          ...prev,
          display: digit,
          waitingForOperand: false,
        }
      }
      return {
        ...prev,
        display: prev.display === "0" ? digit : prev.display + digit,
      }
    })
  }, [])

  const inputDecimal = useCallback(() => {
    setState((prev) => {
      if (prev.waitingForOperand) {
        return {
          ...prev,
          display: "0.",
          waitingForOperand: false,
        }
      }
      if (prev.display.includes(".")) {
        return prev
      }
      return {
        ...prev,
        display: prev.display + ".",
      }
    })
  }, [])

  const clear = useCallback(() => {
    setState(initialState)
  }, [])

  const toggleSign = useCallback(() => {
    setState((prev) => ({
      ...prev,
      display: String(parseFloat(prev.display) * -1),
    }))
  }, [])

  const percentage = useCallback(() => {
    setState((prev) => ({
      ...prev,
      display: String(parseFloat(prev.display) / 100),
    }))
  }, [])

  const performOperation = useCallback((nextOperation: Operation) => {
    setState((prev) => {
      const inputValue = parseFloat(prev.display)

      if (prev.previousValue === null) {
        return {
          ...prev,
          previousValue: String(inputValue),
          operation: nextOperation,
          waitingForOperand: true,
        }
      }

      if (prev.operation && prev.waitingForOperand) {
        return {
          ...prev,
          operation: nextOperation,
        }
      }

      const previousValue = parseFloat(prev.previousValue)
      let result: number

      switch (prev.operation) {
        case "+":
          result = previousValue + inputValue
          break
        case "-":
          result = previousValue - inputValue
          break
        case "×":
          result = previousValue * inputValue
          break
        case "÷":
          result = previousValue / inputValue
          break
        case "%":
          result = previousValue % inputValue
          break
        default:
          result = inputValue
      }

      const historyEntry = `${prev.previousValue} ${prev.operation} ${inputValue} = ${result}`
      setHistory((h) => [historyEntry, ...h].slice(0, 10))

      return {
        display: String(result),
        previousValue: String(result),
        operation: nextOperation,
        waitingForOperand: true,
      }
    })
  }, [])

  const calculate = useCallback(() => {
    setState((prev) => {
      if (prev.operation === null || prev.previousValue === null) {
        return prev
      }

      const inputValue = parseFloat(prev.display)
      const previousValue = parseFloat(prev.previousValue)
      let result: number

      switch (prev.operation) {
        case "+":
          result = previousValue + inputValue
          break
        case "-":
          result = previousValue - inputValue
          break
        case "×":
          result = previousValue * inputValue
          break
        case "÷":
          result = previousValue / inputValue
          break
        case "%":
          result = previousValue % inputValue
          break
        default:
          result = inputValue
      }

      const historyEntry = `${previousValue} ${prev.operation} ${inputValue} = ${result}`
      setHistory((h) => [historyEntry, ...h].slice(0, 10))

      return {
        display: String(result),
        previousValue: null,
        operation: null,
        waitingForOperand: true,
      }
    })
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  const buttons = [
    { label: "C", action: clear, style: "destructive" as const },
    { label: "±", action: toggleSign, style: "operator" as const },
    { label: "%", action: percentage, style: "operator" as const },
    { label: "÷", action: () => performOperation("÷"), style: "operator" as const },
    { label: "7", action: () => inputDigit("7"), style: "number" as const },
    { label: "8", action: () => inputDigit("8"), style: "number" as const },
    { label: "9", action: () => inputDigit("9"), style: "number" as const },
    { label: "×", action: () => performOperation("×"), style: "operator" as const },
    { label: "4", action: () => inputDigit("4"), style: "number" as const },
    { label: "5", action: () => inputDigit("5"), style: "number" as const },
    { label: "6", action: () => inputDigit("6"), style: "number" as const },
    { label: "-", action: () => performOperation("-"), style: "operator" as const },
    { label: "1", action: () => inputDigit("1"), style: "number" as const },
    { label: "2", action: () => inputDigit("2"), style: "number" as const },
    { label: "3", action: () => inputDigit("3"), style: "number" as const },
    { label: "+", action: () => performOperation("+"), style: "operator" as const },
    { label: "0", action: () => inputDigit("0"), style: "number" as const },
    { label: ".", action: inputDecimal, style: "number" as const },
    { label: "=", action: calculate, style: "equals" as const },
  ]

  const getButtonClass = (style: string) => {
    switch (style) {
      case "destructive":
        return "bg-red-600 hover:bg-red-700 text-white border-red-700"
      case "operator":
        return "bg-zinc-700 hover:bg-zinc-600 text-white border-zinc-600"
      case "number":
        return "bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
      case "equals":
        return "bg-white hover:bg-zinc-100 text-black border-white font-bold"
      default:
        return "bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <Card className="bg-white/[0.02] border-white/5">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-white">
              <div className="p-2 rounded-lg bg-white/5">
                <CalcIcon className="w-5 h-5" />
              </div>
              Calculator
            </CardTitle>
            <Badge variant="secondary" className="bg-white/10 text-white/70 border-0">
              Basic
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Display */}
          <div className="bg-black/40 rounded-xl p-5 mb-5 border border-white/5">
            <div className="text-sm text-white/40 h-6 font-mono">
              {state.previousValue} {state.operation}
            </div>
            <div className="text-5xl font-bold truncate font-mono text-white mt-1">
              {state.display}
            </div>
          </div>
          
          {/* Buttons */}
          <div className="grid grid-cols-4 gap-2.5">
            {buttons.map((btn, index) => (
              <button
                key={index}
                onClick={btn.action}
                className={`h-14 text-lg font-semibold transition-all duration-200 hover:scale-105 rounded-lg border ${getButtonClass(btn.style)}`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* History Panel */}
      <Card className="bg-white/[0.02] border-white/5">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-white">
              <div className="p-2 rounded-lg bg-white/5">
                <History className="w-5 h-5" />
              </div>
              History
            </CardTitle>
            {history.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearHistory}
                className="text-white/40 hover:text-white/70 hover:bg-white/5"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <CalcIcon className="w-8 h-8 text-white/20" />
              </div>
              <p className="text-sm text-white/40">No calculations yet</p>
              <p className="text-xs text-white/20 mt-1">Start calculating!</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {history.map((entry, index) => (
                <div
                  key={index}
                  className="text-sm p-3 bg-white/5 rounded-lg truncate font-mono text-white/70 border border-white/5"
                >
                  {entry}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
