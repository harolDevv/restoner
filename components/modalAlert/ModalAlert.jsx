import React from 'react'

const ModalAlert = () => {
  return (
    <div className='container_alert'>
        <h2>Alerta!</h2>
        <p>Restoner sigue trabajando en esta funcionalidad :(</p>
        <style jsx>
        {`
            .container_alert{
                background-color: gray;
                border-radius:5px;
                position: fixed;
            }
        `}
        </style>
    </div>
  )
}

export default ModalAlert