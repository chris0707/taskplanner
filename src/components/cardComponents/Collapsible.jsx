import React, { useEffect, useState } from 'react'

export default function Collapsible(props) {
    const {isCollapsed, handleCollapseToggle, collapsibleTitle, children} = props;
    const [isOpen, setIsOpen] = useState(!isCollapsed)
    // console.log('isCollapsed:',isOpen)

    // useEffect(() => {
    //   //handleCollapseToggle();
    //   setIsOpen(!isCollapsed);
    // }, [isCollapsed])

    useEffect(() => {
      handleCollapseToggle(!isOpen);
    }, [isOpen])

    const toggleCollapse = (e) => {
        e.stopPropagation();
        setIsOpen(() => !isOpen);
    };

  return (
    <div className="collapsible">
      <div className="collapsible-header" onClick={toggleCollapse} >
            <span>{collapsibleTitle}</span>
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
