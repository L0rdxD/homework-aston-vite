import { useGetCommentsQuery } from '../../../../entities/comment/api/commentsApi'
import { useGetPostsQuery } from '../../../../entities/post/api/postsApi'

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
