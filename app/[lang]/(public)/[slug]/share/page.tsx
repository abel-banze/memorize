"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ImageUploadPage() {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    multiple: true,
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Partilhar Imagens</h1>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-500"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          {isDragActive ? (
            <p className="mt-2 text-sm text-gray-600">Solte as imagens aqui ...</p>
          ) : (
            <p className="mt-2 text-sm text-gray-600">
              Arraste e solte imagens aqui, ou clique para selecionar arquivos
            </p>
          )}
        </div>
        {files.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Arquivos selecionados:</h2>
            <ul className="list-disc pl-5">
              {files.map((file) => (
                <li key={file.name} className="text-sm text-gray-600">
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        <Button className="w-full mt-4">
            Partilhar imagens
        </Button>
      </div>
    </div>
  )
}

