import React from "react"
import { Link } from "gatsby"
import "./styles.css"

export default () => (
  <div className="sidebar">
    <h1 className="title">
      <Link to="/">brn</Link>
    </h1>
    <div className="links">
      <Link to="/about">sobre</Link>
      <Link to="/jogos">jogos</Link>
    </div>
  </div>
)
