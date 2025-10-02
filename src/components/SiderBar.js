import React from 'react'
import { useSelector } from 'react-redux'

const SiderBar = () => {
  const isMenuOpen = useSelector(store => store.app.isMenuOpen)
  if(!isMenuOpen) return null;
  return (
    <div className='p-2 m-4 w-48'>
      <div >
        <ul>
          <li>
            Home
          </li>
          <li>
            Shorts
          </li>
          <li>
            Subscriptions
          </li>
        </ul>
      </div>
      <div >
        <ul>
          <li>
            You
          </li>
          <li>
            History
          </li>
        </ul>
      </div>
      <div >
        <h1>Explore</h1>
        <ul>
          <li>
            Shopping
          </li>
          <li>
            Movies
          </li>
          <li>
            Music
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SiderBar
