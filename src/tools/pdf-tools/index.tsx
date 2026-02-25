"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Upload, Download, Scissors, Combine, FileArchive, Loader2 } from "lucide-react"
import { Label } from "@/components/ui/label"

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
    // In a real implementation, you'd use a library like pdf-lib
    // For demo purposes, we'll just show a message
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
        {/* Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload PDFs
            </CardTitle>
            <CardDescription>
              Select PDF files to work with
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
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
                <div className="p-4 rounded-full bg-muted">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">
                  Click to upload PDFs
                </span>
              </Label>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Files:</Label>
                {files.map((file, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm truncate max-w-[200px]">
                        {file.name}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
            <CardDescription>
              Choose an action to perform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={mergePDFs}
              disabled={files.length < 2 || processing}
              className="w-full gap-2"
            >
              {processing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Combine className="h-4 w-4" />
              )}
              Merge PDFs
            </Button>
            
            <Button 
              variant="outline"
              onClick={compressPDF}
              disabled={files.length === 0 || processing}
              className="w-full gap-2"
            >
              <FileArchive className="h-4 w-4" />
              Compress PDF
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  More coming soon
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="secondary" disabled className="gap-2">
                <Scissors className="h-4 w-4" />
                Split PDF
              </Button>
              <Button variant="secondary" disabled className="gap-2">
                <Download className="h-4 w-4" />
                Convert to PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Result */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800">
              {result}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
