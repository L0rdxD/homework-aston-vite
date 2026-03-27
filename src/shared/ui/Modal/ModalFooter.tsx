import type { ReactNode } from 'react'
import styles from './Modal.module.css'

type ModalFooterProps = {
  children: ReactNode
}

export default function ModalFooter({ children }: ModalFooterProps) {
  return <div className={styles['modal-footer']}>{children}</div>
}

