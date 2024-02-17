/* Spinner de carga al buscar los llamados vigentes */
import React from 'react'

const Spinner = () => {
  return (
    <div className="sk-chase">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
    </div>
  )
}

export default Spinner