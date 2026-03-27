import styles from './Header.module.css'
import { Fragment } from 'react'
import ThemeSwitcher from '../../features/ThemeSwitcher/ui/ThemeSwitcher'

export default function Header() {
  const navItems = ['Home', 'About', 'Services', 'Contact']

  return (
    <header className={styles['main-header']}>
      <nav className={styles['main-nav']}>
        <ul className={styles['main-ul']}>
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
