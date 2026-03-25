import { useTheme } from '../../../shared/lib/theme'
import Button from '../../../shared/ui/Button/Button'

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()

  const nextThemeLabel = theme === 'light' ? 'dark' : 'light'

  return (
    <Button onClick={toggleTheme} aria-label={`Switch to ${nextThemeLabel} theme`}>
      Theme: {theme}
    </Button>
  )
}
