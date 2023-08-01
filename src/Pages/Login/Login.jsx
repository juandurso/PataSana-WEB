import React from 'react'
import Label from './label'
import Input from './input'
import "./login.css"

const Signin = () => {
  return (
    <div className='login-container'>
      <Label text="Usuario"></Label>
      <Input> </Input>
      <Label text="Contraseña"></Label>
      <Input> </Input>  
    </div>
  )
}

export default Signin