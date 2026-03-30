import type { PropsWithChildren } from 'react'
import styles from './Modal.module.css'

type ModalHeaderProps = PropsWithChildren

export default function ModalHeader({ children }: ModalHeaderProps) {
  return <h3 className={styles['modal-header']}>{children}</h3>
}

