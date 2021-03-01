import React from 'react'

const Paragraph = {
  paddingTop: "15px",
  paddingLeft: "10px",
}

const Emodji = {
    fontSize: "30px"
}

export const Duration = (props) => {


      if (props.duration === 0.0) {
          return null
      }
   return (
       <p style={Paragraph}><span  style={Emodji}>⏱</span> {props.duration.toFixed(3)} cек</p>
  )
}


export default Duration