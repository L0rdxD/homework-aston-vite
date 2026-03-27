import type { ComponentType, FC } from 'react'

type WithLoadingProps = {
  isLoading: boolean
}

export default function withLoading<P extends object>(Component: ComponentType<P>) {
  const Wrapped: FC<P & WithLoadingProps> = ({ isLoading, ...props }) => {
    if (isLoading) {
      return (
        <div aria-busy="true" role="status">
          Loading...
        </div>
      )
    }

    return <Component {...(props as P)} />
  }

  return Wrapped
}

