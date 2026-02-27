"use client"

import { useState, useEffect, createContext, useContext } from "react"
import type { ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Heart, Coffee, Github } from "lucide-react"

interface SupportModalContextType {
  showSupport: () => void
  supported: boolean
}

const SupportModalContext = createContext<SupportModalContextType>({
  showSupport: () => {},
  supported: false,
})

export function useSupportModal() {
  return useContext(SupportModalContext)
}

interface SupportModalProviderProps {
  children: ReactNode
}

export function SupportModalProvider({ children }: SupportModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasSupported, setHasSupported] = useState(false)
  const [dismissedCount, setDismissedCount] = useState(0)

  // Show modal after 3 dismissals or randomly after some actions
  useEffect(() => {
    if (dismissedCount >= 3 && !hasSupported) {
      setIsOpen(true)
    }
  }, [dismissedCount, hasSupported])

  const showSupport = () => {
    setIsOpen(true)
  }

  const handleSupport = () => {
    setHasSupported(true)
    setIsOpen(false)
    // Open GitHub in new tab
    window.open("https://github.com", "_blank")
  }

  const handleDismiss = () => {
    setIsOpen(false)
    setDismissedCount((prev) => prev + 1)
  }

  return (
    <SupportModalContext.Provider value={{ showSupport, supported: hasSupported }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-black border-white/10 text-white">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
              <Heart className="h-8 w-8 text-white/70" />
            </div>
            <DialogTitle className="text-xl font-semibold">
              {hasSupported ? "Thank You! ❤️" : "Support Our Work"}
            </DialogTitle>
            <DialogDescription className="text-white/50">
              {hasSupported
                ? "Your support means the world to us!"
                : "These tools are completely free. Consider supporting us to keep them running!"}
            </DialogDescription>
          </DialogHeader>

          {!hasSupported && (
            <div className="flex flex-col gap-3 mt-2">
              <Button
                onClick={handleSupport}
                className="w-full bg-white text-black hover:bg-white/90 h-12 text-base font-medium"
              >
                <Github className="w-5 h-5 mr-2" />
                Star on GitHub
              </Button>
              <Button
                onClick={handleSupport}
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/5 h-12 text-base"
              >
                <Coffee className="w-5 h-5 mr-2" />
                Buy us a coffee
              </Button>
              <Button
                variant="ghost"
                onClick={handleDismiss}
                className="w-full text-white/40 hover:text-white/60 h-10"
              >
                Maybe later
              </Button>
            </div>
          )}

          {hasSupported && (
            <Button
              onClick={() => setIsOpen(false)}
              className="w-full bg-white text-black hover:bg-white/90 mt-2"
            >
              You're awesome! ✨
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </SupportModalContext.Provider>
  )
}

// Standalone trigger component for manual support prompts
interface SupportButtonProps {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  showText?: boolean
}

export function SupportButton({ variant = "ghost", size = "icon", showText = false }: SupportButtonProps) {
  const { showSupport } = useSupportModal()

  return (
    <Button
      variant={variant}
      size={size}
      onClick={showSupport}
      className={variant === "ghost" ? "text-white/40 hover:text-white/70" : ""}
    >
      <Heart className="w-4 h-4" />
      {showText && <span className="ml-2">Support</span>}
    </Button>
  )
}
