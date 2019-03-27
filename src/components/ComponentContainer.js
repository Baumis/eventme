import React from 'react';
import './ComponentStyles.css';

const ComponentRenderer = (props) =>{

    return(
      <div>
        <ul>
          {props.components.map(component => {
            return (
              <li key={component.id}>
              <div className="Component">
              <h3>{component.header}</h3>
              <p>{component.content}</p>
              </div>
              </li>
            )
          })}
        </ul>
      </div>
    )

  }
  export default ComponentRenderer