import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

export default function Button({ children, type = 'button', className = '', ...props }: ButtonProps) {
  return (
    <button type={type} className={`app-button ${className}`.trim()} {...props}>
      {children}
    </button>
  )
}
