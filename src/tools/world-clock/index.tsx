"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, Plus, Trash2, Sun, Moon } from "lucide-react"

const timeZones = [
  { name: "New York", zone: "America/New_York", flag: "🇺🇸" },
  { name: "London", zone: "Europe/London", flag: "🇬🇧" },
  { name: "Paris", zone: "Europe/Paris", flag: "🇫🇷" },
  { name: "Tokyo", zone: "Asia/Tokyo", flag: "🇯🇵" },
  { name: "Sydney", zone: "Australia/Sydney", flag: "🇦🇺" },
  { name: "Dubai", zone: "Asia/Dubai", flag: "🇦🇪" },
  { name: "Singapore", zone: "Asia/Singapore", flag: "🇸🇬" },
  { name: "Los Angeles", zone: "America/Los_Angeles", flag: "🇺🇸" },
  { name: "Berlin", zone: "Europe/Berlin", flag: "🇩🇪" },
  { name: "Mumbai", zone: "Asia/Kolkata", flag: "🇮🇳" },
]

export function WorldClockTool() {
  const [selectedZones, setSelectedZones] = useState(timeZones.slice(0, 4))
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const addZone = (zone: typeof timeZones[0]) => {
    if (!selectedZones.find(z => z.zone === zone.zone)) {
      setSelectedZones([...selectedZones, zone])
    }
  }

  const removeZone = (zone: string) => {
    setSelectedZones(selectedZones.filter(z => z.zone !== zone))
  }

  const getTimeInZone = (zone: string) => {
    return new Date(currentTime.toLocaleString("en-US", { timeZone: zone }))
  }

  const getTimeOfDay = (zone: string) => {
    const hour = getTimeInZone(zone).getHours()
    return hour >= 6 && hour < 18 ? "day" : "night"
  }

  const availableToAdd = timeZones.filter(
    z => !selectedZones.find(sz => sz.zone === z.zone)
  )

  return (
    <div className="space-y-6">
      {/* Current Times */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {selectedZones.map((tz) => {
          const time = getTimeInZone(tz.zone)
          const isDay = getTimeOfDay(tz.zone) === "day"
          
          return (
            <Card key={tz.zone} className="relative overflow-hidden">
              <div className={`absolute inset-0 opacity-5 ${isDay ? 'bg-yellow-400' : 'bg-blue-900'}`} />
              <CardHeader className="pb-2 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{tz.flag}</span>
                    <CardTitle className="text-base">{tz.name}</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeZone(tz.zone)}
                    className="h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-3xl font-bold font-mono">
                  {time.toLocaleTimeString("en-US", { 
                    hour: "2-digit", 
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true 
                  })}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {time.toLocaleDateString("en-US", { 
                    weekday: "short",
                    month: "short", 
                    day: "numeric" 
                  })}
                </p>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  {isDay ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
                  <span>{isDay ? "Day" : "Night"}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Add More Zones */}
      {availableToAdd.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Add Time Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {availableToAdd.map((tz) => (
                <Button
                  key={tz.zone}
                  variant="outline"
                  onClick={() => addZone(tz)}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  {tz.flag} {tz.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Local Time */}
      <Card>
        <CardHeader>
          <CardTitle>Your Local Time</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-mono">
            {currentTime.toLocaleTimeString("en-US", { 
              hour: "2-digit", 
              minute: "2-digit",
              second: "2-digit",
              hour12: true 
            })}
          </p>
          <p className="text-muted-foreground">
            {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
