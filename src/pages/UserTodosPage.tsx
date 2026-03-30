import { useParams } from 'react-router-dom'
import { useGetUserTodosQuery } from '../entities/todo/api/todosApi'
import { useGetUserByIdQuery } from '../entities/post/api/postsApi'
import UserTabs from '../widgets/UserTabs/UserTabs'
import ItemList from '../shared/ui/ItemList'

export default function UserTodosPage() {
  const { id } = useParams<{ id: string }>()
  useGetUserByIdQuery(id ?? '', { skip: !id })
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
      <ItemList
        items={todos}
        getKey={(todo) => todo.id}
        renderItem={(todo) => (
          <label>
            <input type="checkbox" checked={todo.completed} readOnly />
            {todo.title}
          </label>
        )}
      />
    </section>
  )
}
