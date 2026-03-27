import type { ReactNode } from 'react'
import styles from './Modal.module.css'

type ModalBodyProps = {
  children: ReactNode
}

export default function ModalBody({ children }: ModalBodyProps) {
  return <div className={styles['modal-body']}>{children}</div>
}

