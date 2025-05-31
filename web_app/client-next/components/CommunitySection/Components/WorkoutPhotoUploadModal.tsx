import { ModalBody, ModalContent, ModalHeader } from '@heroui/react'
import { Modal } from '@heroui/react'
import { Camera, X } from 'lucide-react'
import Image from 'next/image'
import { useCallback } from 'react'
import { useRef } from 'react'

type WorkoutPhotoUploadModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  setFile: (file: File | null) => void
  preview: string | null
  setPreview: (preview: string | null) => void
}

export default function WorkoutPhotoUploadModal({
  isOpen,
  onOpenChange,
  setFile,
  preview,
  setPreview,
}: WorkoutPhotoUploadModalProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return
    setFile(files[0] as File)
    setPreview(URL.createObjectURL(files[0]))
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    handleFiles(e.dataTransfer.files)
  }, [])

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        className="h-auto overflow-y-auto"
        scrollBehavior="inside"
      >
        <ModalContent className="pb-6">
          <ModalHeader className="flex flex-col gap-1">
            Post photo upload
          </ModalHeader>
          <ModalBody>
            <div className="space-y-2">
              <p className="text-medium font-medium">Post Media</p>
              <div
                className="border-2 border-dashed rounded-lg p-6 text-center"
                onDrop={onDrop}
                onDragOver={e => e.preventDefault()}
                role="button"
                tabIndex={0}
                onClick={() => inputRef.current?.click()}
              >
                {!preview ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-default-100 flex items-center justify-center">
                      <Camera size={24} />
                    </div>
                    <div>
                      <p className="text-sm">
                        Drop images here or click to upload
                      </p>
                      <p className="text-xs text-default-400">
                        Supports JPG, JPEG,PNG
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <Image
                      src={preview}
                      alt="preview"
                      className="max-h-60 mx-auto mt-4 rounded-lg"
                      width={360}
                      height={360}
                    />
                    <button
                      className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1"
                      onClick={e => {
                        e.stopPropagation()
                        setPreview(null)
                        setFile(null)
                      }}
                    >
                      <X size={16} color="white" />
                    </button>
                  </div>
                )}
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/gif"
                  className="hidden"
                  onChange={e => handleFiles(e.target.files)}
                />
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
