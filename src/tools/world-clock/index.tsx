"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, Plus, Trash2, Sun, Moon, Clock } from "lucide-react"
import { useSupportModal } from "@/components/support-modal"

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
  const { showSupport } = useSupportModal()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (selectedZones.length >= 7) {
      showSupport()
    }
  }, [selectedZones.length, showSupport])

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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="p-2 rounded-lg bg-white/5">
              <Globe className="w-5 h-5" />
            </div>
            World Clock
          </CardTitle>
          <Badge variant="secondary" className="bg-white/10 text-white/70 border-0">
            Live
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {selectedZones.map((tz) => {
          const time = getTimeInZone(tz.zone)
          const isDay = getTimeOfDay(tz.zone) === "day"
          
          return (
            <Card key={tz.zone} className="relative overflow-hidden bg-white/[0.02] border-white/5 hover:border-white/10 transition-colors">
              <div className={`absolute inset-0 opacity-5 ${isDay ? 'bg-yellow-400' : 'bg-blue-900'}`} />
              <CardHeader className="pb-2 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{tz.flag}</span>
                    <CardTitle className="text-base text-white/80">{tz.name}</CardTitle>
                  </div>
                  <button
                    onClick={() => removeZone(tz.zone)}
                    className="h-8 w-8 p-0 flex items-center justify-center bg-transparent text-white/30 hover:text-white hover:bg-white/10 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-3xl font-bold font-mono text-white">
                  {time.toLocaleTimeString("en-US", { 
                    hour: "2-digit", 
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true 
                  })}
                </p>
                <p className="text-sm text-white/40 mt-1">
                  {time.toLocaleDateString("en-US", { 
                    weekday: "short",
                    month: "short", 
                    day: "numeric" 
                  })}
                </p>
                <div className="flex items-center gap-1 mt-2 text-xs text-white/30">
                  {isDay ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
                  <span>{isDay ? "Day" : "Night"}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {availableToAdd.length > 0 && (
        <Card className="bg-white/[0.02] border-white/5">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-white">
              <Globe className="h-5 w-5" />
              Add Time Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {availableToAdd.map((tz) => (
                <button
                  key={tz.zone}
                  onClick={() => addZone(tz)}
                  className="gap-2 px-4 py-2 bg-zinc-700 text-white/60 hover:text-white hover:bg-zinc-600 rounded-lg border border-zinc-600"
                >
                  <Plus className="h-4 w-4" />
                  {tz.flag} {tz.name}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-white/[0.02] border-white/5">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="p-2 rounded-lg bg-white/5">
              <Clock className="w-5 h-5" />
            </div>
            Your Local Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold font-mono text-white">
            {currentTime.toLocaleTimeString("en-US", { 
              hour: "2-digit", 
              minute: "2-digit",
              second: "2-digit",
              hour12: true 
            })}
          </p>
          <p className="text-white/40 mt-1">
            {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
