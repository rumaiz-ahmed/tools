"use client"

import { useEffect, useRef } from "react"

export function AdsterraAd() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Force container size on mount
    if (containerRef.current) {
      const el = containerRef.current
      el.style.setProperty('min-height', '280px', 'important')
      el.style.setProperty('min-width', '320px', 'important')
      el.style.setProperty('width', '320px', 'important')
      el.style.setProperty('height', '280px', 'important')
    }
    
    // Check if ad loaded after a delay
    const checkAd = setTimeout(() => {
      if (containerRef.current && containerRef.current.offsetHeight === 0) {
        // Ad didn't load - show placeholder or try alternative
        console.log('Adsterra: Ad container may not have loaded properly')
      }
    }, 3000)
    
    return () => clearTimeout(checkAd)
  }, [])

  return (
    <div className="my-8 flex justify-center" style={{ minHeight: '300px' }}>
      <div 
        ref={containerRef}
        id="container-624ee3b4a4d6c3a00b4dc1768a217df6"
        style={{ 
          width: '320px', 
          height: '280px',
          minHeight: '280px',
          minWidth: '320px',
        }}
      />
    </div>
  )
}
