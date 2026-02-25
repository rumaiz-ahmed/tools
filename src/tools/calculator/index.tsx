"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
    { label: "C", action: clear, variant: "destructive" as const },
    { label: "±", action: toggleSign, variant: "outline" as const },
    { label: "%", action: percentage, variant: "outline" as const },
    { label: "÷", action: () => performOperation("÷"), variant: "outline" as const },
    { label: "7", action: () => inputDigit("7"), variant: "default" as const },
    { label: "8", action: () => inputDigit("8"), variant: "default" as const },
    { label: "9", action: () => inputDigit("9"), variant: "default" as const },
    { label: "×", action: () => performOperation("×"), variant: "outline" as const },
    { label: "4", action: () => inputDigit("4"), variant: "default" as const },
    { label: "5", action: () => inputDigit("5"), variant: "default" as const },
    { label: "6", action: () => inputDigit("6"), variant: "default" as const },
    { label: "-", action: () => performOperation("-"), variant: "outline" as const },
    { label: "1", action: () => inputDigit("1"), variant: "default" as const },
    { label: "2", action: () => inputDigit("2"), variant: "default" as const },
    { label: "3", action: () => inputDigit("3"), variant: "default" as const },
    { label: "+", action: () => performOperation("+"), variant: "outline" as const },
    { label: "0", action: () => inputDigit("0"), variant: "default" as const },
    { label: ".", action: inputDecimal, variant: "default" as const },
    { label: "=", action: calculate, variant: "secondary" as const },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Calculator
            <Badge variant="secondary">Basic</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-4 mb-4 text-right">
            <div className="text-sm text-muted-foreground h-6">
              {state.previousValue} {state.operation}
            </div>
            <div className="text-4xl font-bold truncate">
              {state.display}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {buttons.map((btn, index) => (
              <Button
                key={index}
                variant={btn.variant}
                size="lg"
                onClick={btn.action}
                className="h-14 text-lg font-semibold"
              >
                {btn.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            History
            {history.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearHistory}>
                Clear
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No calculations yet
            </p>
          ) : (
            <div className="space-y-2">
              {history.map((entry, index) => (
                <div
                  key={index}
                  className="text-sm p-2 bg-muted rounded truncate font-mono"
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
