import { useEffect, type ReactElement, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'
import ModalBody from './ModalBody'
import ModalFooter from './ModalFooter'
import ModalHeader from './ModalHeader'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  ariaLabel?: string
  children: ReactNode
}

type ModalComponent = ((props: ModalProps) => ReactElement | null) & {
  Header: typeof ModalHeader
  Body: typeof ModalBody
  Footer: typeof ModalFooter
}

const Modal = (({ isOpen, ariaLabel = 'Modal', onClose, children }: ModalProps) => {
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
    <div className={styles['modal-overlay']} role="presentation" onClick={onClose}>
      <div
        className={styles['modal-content']}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}) as ModalComponent

Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter

export default Modal
