import {
  SET_LOADING,
  SET_STORIES,
  SET_ERROR,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return { ...state, isLoading: true }

    case SET_STORIES:
      const { hits, nbPages } = payload
      if (hits && hits.length > 0)
        return { ...state, isLoading: false, hits, nbPages, error: null }
      else return setError(state, 'no items found')

    case SET_ERROR:
      return setError(state, payload)

    case REMOVE_STORY:
      return {
        ...state,
        hits: state.hits.filter((hit) => hit.objectID !== payload),
      }

    case HANDLE_SEARCH:
      return { ...state, query: payload, page: 0 }

    case HANDLE_PAGE:
      return {
        ...state,
        page: getPageNumber(state.page, state.nbPages, payload),
      }

    default:
      throw new Error(`Action type "${type}" not handled`)
  }
}

const setError = (state, error) => {
  return { ...state, isLoading: false, hits: [], nbPages: 0, error }
}

const getPageNumber = (page, nbPages, type) => {
  if (type === 'inc') return page < nbPages - 1 ? page + 1 : 0
  else if (type === 'dec') return page > 0 ? page - 1 : nbPages - 1
  else if (type < nbPages && type >= 0) return type
  return page
}

export default reducer
