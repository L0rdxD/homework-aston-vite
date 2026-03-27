import type { ReactNode } from 'react'
import styles from './Modal.module.css'

type ModalHeaderProps = {
  children: ReactNode
}

export default function ModalHeader({ children }: ModalHeaderProps) {
  return <h3 className={styles['modal-header']}>{children}</h3>
}

