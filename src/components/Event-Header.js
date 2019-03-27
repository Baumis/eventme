import React from 'react';
import './HeaderStyles.css';
import 'font-awesome/css/font-awesome.min.css'; 

const Header = (props) => {

    return (
      <div className="Header-container">
        <h1>{props.h1}</h1>
        <h2>{props.h2}</h2>
      </div>
    );
  }

export default Header;