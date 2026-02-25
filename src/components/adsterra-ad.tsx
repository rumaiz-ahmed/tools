"use client"

import { useEffect } from "react"

export function AdsterraAd() {
  useEffect(() => {
    const script = document.createElement("script")
    script.async = true
    script.src = "https://pl28795298.effectivegatecpm.com/624ee3b4a4d6c3a00b4dc1768a217df6/invoke.js"
    script.setAttribute("data-cfasync", "false")
    document.head.appendChild(script)

    return () => {
      const existingScript = document.head.querySelector(
        `script[src="${script.src}"]`,
      )
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <div className="my-8 flex justify-center">
      <div id="container-624ee3b4a4d6c3a00b4dc1768a217df6" />
    </div>
  )
}
