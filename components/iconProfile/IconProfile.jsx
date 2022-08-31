import React, { useState } from 'react'
import styles from './IconProfile.module.scss'
import Anonimo from '../../public/images/Anonimo.png'
import Usuario from '../../public/images/User.png'
import Image from 'next/image'

//iconos
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
const IconProfile = ({setMostrarModalSesion}) => {
    const [mostrarModal, setMostrarModal ] = useState(false)
  return (
    <div 
    className={styles.icon_profile_container}
    onClick={() => setMostrarModal(state => !state)} 
    >
        <Image 
        src={true ? Anonimo : Usuario}
        width={35}
        height={35}
        alt='Imagen del Usuario'
        />
        {
            true ? <span>Anonimo</span>  :  <span>Usuario</span>
        }
        <ExpandMoreRoundedIcon/>
        {
            mostrarModal &&
            <div
            className={styles.modal_iniciar_sesion}
            onClick={() => setMostrarModalSesion(true)}
            >
            <LoginRoundedIcon/>
            <p>Iniciar Sesion</p>
            </div>
        }
    </div>
  )
}

export default IconProfile