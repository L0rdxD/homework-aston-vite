import './Footer.css'
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>
      <small>© {year} Homework • built with Vite + React</small>
    </footer>
  )
}