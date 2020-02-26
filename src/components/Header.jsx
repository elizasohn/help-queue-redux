import React from 'react'
import { Link } from 'react-router-dom';

function Header(props){
  return (
    <div>
      <h1 className="color-toggle">Help Queue</h1>
      <style jsx global>{`
        .color-toggle {
          color: red;
        }
        .color-toggle:hover {
          color: purple;
        }
        `}</style>
        <Link to="/">Home</Link> | <Link to="/newticket">Create Ticket</Link>
      </div>
    );
  }

  export default Header;
