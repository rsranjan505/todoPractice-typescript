import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <nav>
        <Link to="/" className=''> All</Link>
        <Link to="/?todos=active" className=''> Active</Link>
        <Link to="/?todos=completed" className=''> Compelted</Link>
    </nav>
  )
}
