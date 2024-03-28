import React, { useState } from 'react'

export default function Collapsible(props) {
    const {children } = props;
    const [isOpen, setIsOpen] = useState(false)
    const toggleCollapse = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

  return (
    <div className="collapsible">
      <div className="collapsible-header" onClick={toggleCollapse}>
            <span className={`arrow ${isOpen ? 'open' : 'close'}`}>&#x25B6;</span>
      </div>
      {isOpen && (
        <div className="collapsible-content">
          {children}
        </div>
      )}
    </div>
  )
}
