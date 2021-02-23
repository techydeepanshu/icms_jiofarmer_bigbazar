import React from "react";
class Button extends React.Component {

    render() {
      const { 
        color,
        text,
        ...others
      } = this.props;
      
      return (
        <button className={color} {...others}>
          {text}
        </button>
      )
    }
  }
  

  export default Button;