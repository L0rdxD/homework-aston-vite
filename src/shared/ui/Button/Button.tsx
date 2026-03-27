import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

export default function Button({ children, type = 'button', className = '', ...props }: ButtonProps) {
  return (
    <button type={type} className={`${styles['app-button']} ${className}`.trim()} {...props}>
      {children}
    </button>
  )
}
