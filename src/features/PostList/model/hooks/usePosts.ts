import { useGetCommentsQuery, useGetPostsQuery } from '../../../../shared/api/jsonplaceholderApi'

export default function usePosts() {
  const {
    data: posts = [],
    isLoading: isPostsLoading,
    isError: isPostsError,
  } = useGetPostsQuery()
  const {
    data: comments = [],
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useGetCommentsQuery()

  return {
    posts,
    comments,
    isLoading: isPostsLoading || isCommentsLoading,
    error: isPostsError || isCommentsError ? 'Failed to load data' : null,
  }
}
