import { useParams } from 'react-router-dom'
import { useGetUserTodosQuery } from '../shared/api/jsonplaceholderApi'
import UserTabs from '../widgets/UserTabs/UserTabs'

export default function UserTodosPage() {
  const { id } = useParams<{ id: string }>()
  const { data: todos = [], isLoading, isError } = useGetUserTodosQuery(id ?? '', { skip: !id })

  if (!id) {
    return <p role="alert">User id is required.</p>
  }

  return (
    <section>
      <h2>User {id} todos</h2>
      <UserTabs userId={id} />
      {isLoading ? <p>Loading todos...</p> : null}
      {isError ? <p role="alert">Failed to load todos.</p> : null}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input type="checkbox" checked={todo.completed} readOnly />
              {todo.title}
            </label>
          </li>
        ))}
      </ul>
    </section>
  )
}
