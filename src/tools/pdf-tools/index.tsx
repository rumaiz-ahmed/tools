"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { FileText, Upload, Download, Scissors, Combine, FileArchive, Loader2 } from "lucide-react"

export function PDFToolsTool() {
  const [files, setFiles] = useState<File[]>([])
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    setFiles([...files, ...selectedFiles])
    setResult(null)
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const mergePDFs = async () => {
    if (files.length < 2) return
    setProcessing(true)
    setTimeout(() => {
      setResult("PDF merge functionality requires server-side processing. This feature is coming soon!")
      setProcessing(false)
    }, 2000)
  }

  const compressPDF = async () => {
    if (files.length === 0) return
    setProcessing(true)
    setTimeout(() => {
      setResult("PDF compression functionality requires server-side processing. This feature is coming soon!")
      setProcessing(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-white/[0.02] border-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Upload className="h-5 w-5" />
              Upload PDFs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-white/20 transition-colors">
              <input
                type="file"
                accept="application/pdf"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="pdf-upload"
              />
              <Label 
                htmlFor="pdf-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <div className="p-4 rounded-full bg-white/5">
                  <FileText className="h-8 w-8 text-white/40" />
                </div>
                <span className="text-sm text-white/40">
                  Click to upload PDFs
                </span>
              </Label>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                <Label className="text-white/60">Selected Files:</Label>
                {files.map((file, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-white/40" />
                      <span className="text-sm text-white/70 truncate max-w-[200px]">
                        {file.name}
                      </span>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="px-3 py-1.5 text-sm bg-zinc-700 text-white/40 hover:text-white hover:bg-zinc-600 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white/[0.02] border-white/5">
          <CardHeader>
            <CardTitle className="text-white">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <button 
              onClick={mergePDFs}
              disabled={files.length < 2 || processing}
              className="w-full gap-2 px-4 py-3 bg-white text-black hover:bg-zinc-100 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Combine className="h-4 w-4" />
              )}
              Merge PDFs
            </button>
            
            <button 
              onClick={compressPDF}
              disabled={files.length === 0 || processing}
              className="w-full gap-2 px-4 py-3 bg-zinc-700 text-white hover:bg-zinc-600 rounded-lg border border-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileArchive className="h-4 w-4" />
              Compress PDF
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-black px-2 text-white/30">
                  More coming soon
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button disabled className="gap-2 px-4 py-3 bg-zinc-800 text-white/30 rounded-lg border border-zinc-700 cursor-not-allowed opacity-50">
                <Scissors className="h-4 w-4" />
                Split PDF
              </button>
              <button disabled className="gap-2 px-4 py-3 bg-zinc-800 text-white/30 rounded-lg border border-zinc-700 cursor-not-allowed opacity-50">
                <Download className="h-4 w-4" />
                Convert to PDF
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {result && (
        <Card className="bg-white/[0.02] border-white/5">
          <CardHeader>
            <CardTitle className="text-white">Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
              {result}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
