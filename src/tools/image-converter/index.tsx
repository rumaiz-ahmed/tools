"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Image, Upload, Download, Loader2 } from "lucide-react"

export function ImageConverterTool() {
  const [file, setFile] = useState<File | null>(null)
  const [format, setFormat] = useState("png")
  const [preview, setPreview] = useState<string | null>(null)
  const [converting, setConverting] = useState(false)
  const [converted, setConverted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
    
    const img = new Image()
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
        {/* Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Image
            </CardTitle>
            <CardDescription>
              Select an image to convert
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
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
                <div className="p-4 rounded-full bg-muted">
                  <Image className="h-8 w-8 text-muted-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">
                  Click to upload an image
                </span>
              </Label>
            </div>
            
            {file && (
              <div className="text-sm">
                <p className="font-medium">Selected file:</p>
                <p className="text-muted-foreground">{file.name}</p>
                <p className="text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Output Settings</CardTitle>
            <CardDescription>
              Choose your output format
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Output Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="jpeg">JPEG</SelectItem>
                  <SelectItem value="webp">WebP</SelectItem>
                  <SelectItem value="gif">GIF</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={convert} 
              disabled={!file || converting}
              className="w-full gap-2"
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
            </Button>

            {converted && (
              <Button 
                variant="outline" 
                onClick={download}
                className="w-full gap-2"
              >
                <Download className="h-4 w-4" />
                Download Converted
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Preview */}
      {preview && (
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <img 
                src={preview} 
                alt="Preview" 
                className="max-w-full max-h-[400px] rounded-lg"
              />
            </div>
          </CardContent>
        </Card>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
