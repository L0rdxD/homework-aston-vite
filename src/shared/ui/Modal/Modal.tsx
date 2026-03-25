import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import './Modal.css'

type ModalProps = {
  isOpen: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

export default function Modal({ isOpen, title, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEsc)

    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return createPortal(
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <h3>{title}</h3>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
