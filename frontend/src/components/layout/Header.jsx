import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/products">Productos</Link>
        <Link to="/categories">Categorías</Link>
      </nav>
    </header>
  )
}
