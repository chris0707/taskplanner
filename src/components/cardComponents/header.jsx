import React from 'react'
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div>
      <nav>
            <div className="header-headerTitle">
              <div>
                <span className="stealth">Stleath|Stride</span>
                <Link className='noUnderline' to="taskplanner/"><b>Task Planner</b></Link>
              </div>
              <div>
              <Link className='noUnderline' to="taskplanner/Login">Login</Link>
              </div>
            </div>
      </nav>
    </div>
  );
}
