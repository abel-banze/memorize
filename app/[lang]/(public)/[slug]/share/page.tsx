"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useParams } from 'next/navigation'
import { uploadFileS3 } from "@/lib/uploadToS3"
import { createImage } from "@/actions/create"
import { Progress } from "@/components/ui/progress"
import Swal from "sweetalert2"

export default function ImageUploadPage() {
  const [files, setFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const params = useParams<{ slug: string }>()
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    multiple: true,
  })

  const submit = async () => {
    if (!files.length) return;
    setLoading(true);
    setUploadProgress(0);

    try {
      const totalFiles = files.length;
      let uploaded = 0;
      
      await Promise.all(
        files.map(async (file) => {
          try {
            const fileName = await uploadFileS3(file);
            await createImage({ url: fileName.file_url, gallery: params.slug });
            uploaded++;
            setUploadProgress(Math.round((uploaded / totalFiles) * 100));
          } catch (error) {
            console.error("Erro ao enviar imagem:", error);
          }
        })
      );

      Swal.fire({
        icon: "success",
        title: "Upload concluído!",
        text: "Todas as imagens foram enviadas com sucesso.",
      });
    } catch (error) {
      console.error("Erro no upload:", error);
      Swal.fire({
        icon: "error",
        title: "Erro ao enviar",
        text: "Ocorreu um problema ao enviar as imagens.",
      });
    } finally {
      setLoading(false);
    }
  }

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
            <p className="text-sm text-gray-700">{files.length} ficheiros selecionados.</p>
            {loading && (
              <div className="mt-2">
                <Progress value={uploadProgress} />
                <p className="mt-2 text-sm text-blue-500">Upload {uploadProgress}% concluído...</p>
              </div>
            )}
          </div>
        )}
        <Button 
          className="w-full mt-4"
          onClick={submit}
          type="button"
          disabled={files.length === 0 || loading}
        >
          {loading ? `A carregar... ${uploadProgress}%` : "Partilhar imagens"}
        </Button>
      </div>
    </div>
  )
}
