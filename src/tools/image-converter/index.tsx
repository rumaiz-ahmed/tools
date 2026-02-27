"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Image, Upload, Download, Loader2 } from "lucide-react"
import { useSupportModal } from "@/components/support-modal"

export function ImageConverterTool() {
  const [file, setFile] = useState<File | null>(null)
  const [format, setFormat] = useState("png")
  const [preview, setPreview] = useState<string | null>(null)
  const [converting, setConverting] = useState(false)
  const [converted, setConverted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { showSupport } = useSupportModal()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setConverted(false)
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target?.result as string)
      reader.readAsDataURL(selectedFile)
    }
  }

  const convert = async () => {
    if (!file || !preview || !canvasRef.current) return
    
    setConverting(true)
    
    const img = new window.Image()
    img.onload = () => {
      const canvas = canvasRef.current!
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")!
      ctx.drawImage(img, 0, 0)
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          setPreview(url)
          setConverted(true)
          showSupport()
        }
        setConverting(false)
      }, `image/${format}`)
    }
    img.src = preview
  }

  const download = () => {
    if (!preview) return
    const link = document.createElement("a")
    link.href = preview
    link.download = `converted.${format}`
    link.click()
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-white/[0.02] border-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Upload className="h-5 w-5" />
              Upload Image
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-white/20 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
              />
              <Label 
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <div className="p-4 rounded-full bg-white/5">
                  <Image className="h-8 w-8 text-white/40" />
                </div>
                <span className="text-sm text-white/40">
                  Click to upload an image
                </span>
              </Label>
            </div>
            
            {file && (
              <div className="text-sm p-4 rounded-xl bg-white/5 border border-white/5">
                <p className="font-medium text-white/70">Selected file:</p>
                <p className="text-white">{file.name}</p>
                <p className="text-white/40">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white/[0.02] border-white/5">
          <CardHeader>
            <CardTitle className="text-white">Output Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-white/60">Output Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black border-white/10 text-white">
                  <SelectItem value="png" className="focus:bg-white/10 focus:text-white">PNG</SelectItem>
                  <SelectItem value="jpeg" className="focus:bg-white/10 focus:text-white">JPEG</SelectItem>
                  <SelectItem value="webp" className="focus:bg-white/10 focus:text-white">WebP</SelectItem>
                  <SelectItem value="gif" className="focus:bg-white/10 focus:text-white">GIF</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <button 
              onClick={convert} 
              disabled={!file || converting}
              className="w-full gap-2 px-4 py-3 bg-white text-black hover:bg-zinc-100 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {converting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Converting...
                </>
              ) : (
                <>
                  Convert Image
                </>
              )}
            </button>

            {converted && (
              <button 
                onClick={download}
                className="w-full gap-2 px-4 py-3 bg-zinc-700 text-white hover:bg-zinc-600 rounded-lg border border-zinc-600"
              >
                <Download className="h-4 w-4" />
                Download Converted
              </button>
            )}
          </CardContent>
        </Card>
      </div>

      {preview && (
        <Card className="bg-white/[0.02] border-white/5">
          <CardHeader>
            <CardTitle className="text-white">Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <img 
                src={preview} 
                alt="Preview" 
                className="max-w-full max-h-[400px] rounded-lg border border-white/10"
              />
            </div>
          </CardContent>
        </Card>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
