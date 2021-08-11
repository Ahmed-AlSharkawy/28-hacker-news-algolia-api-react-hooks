import React, { useContext, useEffect, useReducer } from 'react'

import {
  SET_LOADING,
  SET_STORIES,
  SET_ERROR,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'
import reducer from './reducer'

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?'

const initialState = {
  isLoading: true,
  hits: [],
  query: 'react',
  page: 0,
  nbPages: 0,
  error: null,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchStrories = async (url) => {
    dispatch({ type: SET_LOADING })
    try {
      const response = await fetch(url)
      const data = await response.json()
      dispatch({
        type: SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPages },
      })
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.toString() })
    }
  }

  useEffect(() => {
    const url = `${API_ENDPOINT}query=${state.query}&page=${state.page}`
    fetchStrories(url)
  }, [state.page, state.query])

  const removeStory = (id) => dispatch({ type: REMOVE_STORY, payload: id })

  const handleSearch = (query) =>
    dispatch({ type: HANDLE_SEARCH, payload: query })

  const handlePage = (type) => dispatch({ type: HANDLE_PAGE, payload: type })

  return (
    <AppContext.Provider
      value={{ ...state, removeStory, handleSearch, handlePage }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
