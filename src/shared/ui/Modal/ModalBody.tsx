import type { PropsWithChildren } from 'react'
import styles from './Modal.module.css'

type ModalBodyProps = PropsWithChildren

export default function ModalBody({ children }: ModalBodyProps) {
  return <div className={styles['modal-body']}>{children}</div>
}

