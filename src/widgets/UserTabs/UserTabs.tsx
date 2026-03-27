import { NavLink } from 'react-router-dom'
import styles from './UserTabs.module.css'

type UserTabsProps = {
  userId: string
}

export default function UserTabs({ userId }: UserTabsProps) {
  const tabs = [
    { to: `/users/${userId}/albums`, label: 'Albums' },
    { to: `/users/${userId}/todos`, label: 'Todos' },
    { to: `/users/${userId}/posts`, label: 'Posts' },
  ]

  return (
    <nav className={styles.tabs} aria-label="User navigation tabs">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`.trim()}
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}
