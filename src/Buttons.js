import React from 'react'
import { useGlobalContext } from './context'

const Buttons = () => {
  const { isLoading, page, nbPages, handlePage } = useGlobalContext()

  return (
    <>
      <div className='btn-container'>
        <button disabled={isLoading} onClick={() => handlePage('dec')}>
          Prev
        </button>
        <div style={{ textAlign: 'center' }}>
          <p>
            {page + 1} of {nbPages}
          </p>
          <input
            type='range'
            disabled={isLoading}
            min='1'
            max={nbPages}
            value={page + 1}
            onChange={(e) => handlePage(parseInt(e.target.value) - 1)}
          />
        </div>
        <button disabled={isLoading} onClick={() => handlePage('inc')}>
          Next
        </button>
      </div>
      <div className='btn-container'></div>
    </>
  )
}

export default Buttons
