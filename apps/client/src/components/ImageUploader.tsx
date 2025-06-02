import { TrashIcon, Upload } from 'lucide-react'
import React, { useState, useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

interface ImageUploaderProps {
  onImageUpload: (files: File[]) => void
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [files, setFiles] = useState<File>()

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 1) {
        toast.warning('Solo puedes subir una imagen')
        return
      }
      setFiles(acceptedFiles[0])
      onImageUpload([acceptedFiles[0]])
    },
    [files, onImageUpload]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    multiple: false,
  })

  const removeImage = () => {
    setFiles(undefined)
    onImageUpload([])
  }

  const Thumb = useMemo(() => {
    if (!files) return
    return (
      <div className='relative size-[200px]'>
        <img
          src={URL.createObjectURL(files)}
          alt={files.name}
          className='rounded-lg'
          style={{ width: '200px', height: '200px', objectFit: 'cover' }}
        />
        <button
          className='absolute top-2 right-2 p-2 transition-all hover:scale-105 cursor-pointer rounded-full bg-neutral-800/40'
          onClick={removeImage}
        >
          <TrashIcon strokeWidth={1.25} className='text-white' />
        </button>
      </div>
    )
  }, [files])

  return (
    <div className='mt-5'>
      {!files && (
        <div
          {...getRootProps()}
          className='border border-dashed rounded-lg p-4 flex flex-col items-center justify-center py-8 w-[60%]'
          style={{
            borderColor: isDragActive
              ? 'var(--color-blue-500)'
              : 'var(--color-gray-400)',
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Suelta las imágenes aquí ...</p>
          ) : (
            <div className='flex flex-col gap-2 items-center justify-center'>
              <Upload className='size-10' />
              <p className='text-center '>
                Arrastra y suelta imágenes aquí, o haz click para seleccionar
                imágenes
              </p>
              <p className='opacity-70 text-sm'>300x300 recomendado</p>
            </div>
          )}
        </div>
      )}
      {files && Thumb}
    </div>
  )
}

export default ImageUploader
