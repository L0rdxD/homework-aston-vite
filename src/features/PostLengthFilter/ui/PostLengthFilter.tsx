import { useState, type ChangeEventHandler, type FormEventHandler, type FocusEventHandler } from 'react'
import styles from './PostLengthFilter.module.css'

type PostLengthFilterProps = {
  minLength: number | null
  onChangeMinLength: (nextMinLength: number | null) => void
}

export default function PostLengthFilter({ minLength, onChangeMinLength }: PostLengthFilterProps) {
  const [draftMinLength, setDraftMinLength] = useState(minLength === null ? '' : String(minLength))

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setDraftMinLength(event.target.value)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const next = Number.parseInt(draftMinLength, 10)
    onChangeMinLength(Number.isFinite(next) ? Math.max(0, next) : null)
  }

  const handleFocus: FocusEventHandler<HTMLInputElement> = () => {
    setDraftMinLength('')
  }

  return (
    <form
      key={minLength === null ? 'empty' : String(minLength)}
      className={styles.label}
      onSubmit={handleSubmit}
    >
      <label>
        Min title length:
        <input
          type="number"
          min={0}
          value={draftMinLength}
          onChange={handleChange}
          onFocus={handleFocus}
          className={styles.input}
        />
      </label>
    </form>
  )
}

