import { ReactNode, useEffect } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose?: () => void
  title: string
  children: ReactNode
  showClose?: boolean
}

export default function Modal({ isOpen, onClose, title, children, showClose = false }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
        onClick={onClose}
      />

      {/* Card */}
      <div className="relative z-10 bg-card rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 flex flex-col gap-4">
        {showClose && onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <h2 id="modal-title" className="text-xl font-bold text-foreground">{title}</h2>
        {children}
      </div>
    </div>
  )
}
