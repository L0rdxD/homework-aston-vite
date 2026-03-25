import './Header.css';
import { Fragment } from 'react'
import ThemeSwitcher from '../../features/ThemeSwitcher/ui/ThemeSwitcher'

export default function Header() {
  const navItems = ['Home', 'About', 'Services', 'Contact']

  return (
    <header className="main-header">
      <div className="logo">
        <img src="" alt="Website Logo" />
      </div>

      <nav className="main-nav">
        <ul className="main-ul">
          {navItems.map((item) => (
            <Fragment key={item}>
              <li>
                <a href="#">{item}</a>
              </li>
            </Fragment>
          ))}
        </ul>
      </nav>

      <ThemeSwitcher />
    </header>
  )
}
