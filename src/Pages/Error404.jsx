import React from 'react'
import "../styles/styleError404.css"


const Error404 = () => {

  return (
    <div 
      className='container'
      style={{
        margin: '0',
        padding: '0',
        backgroundColor: '#014F47',
        // backgroundImage: `url(${process.env.PUBLIC_URL}/error404.jpg)`,
        backgroundImage: `url(/error404-b.jpg)`,
        // backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        // height: '100%',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        minWidth: '100vw'

        // alignItems: 'center',
        // color: 'white',
        // fontSize: '24px',
      }}
    > 
      
      <h1 className='titulo mt-2 text-center display-4 fw-normal'>Página no encontrada - Error 404</h1>
      
      
    </div>
  )
}

export default Error404