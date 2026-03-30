import type { PropsWithChildren } from 'react'
import styles from './Modal.module.css'

type ModalFooterProps = PropsWithChildren

export default function ModalFooter({ children }: ModalFooterProps) {
  return <div className={styles['modal-footer']}>{children}</div>
}

