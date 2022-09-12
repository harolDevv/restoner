import React, { useState } from 'react'
import styles from './IconProfile.module.scss'
import Anonimo from '../../public/images/Anonimo.png'
import Usuario from '../../public/images/User.png'
import Image from 'next/image'

//iconos
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { useDispatch, useSelector } from 'react-redux'
import { CerrarSesion } from '../../redux/actions/usuarioAction'
import { changeMostrar } from '../../redux/reducers/modalAlertReducer'
const IconProfile = ({setMostrarModalSesion}) => {
    const dispatch = useDispatch()
    const [mostrarModal, setMostrarModal ] = useState(false)
    const infoUsuario  = useSelector(state=> state.infoUsuario.usuario.data)
    const jwt  = useSelector(state=> state.infoUsuario.usuario.data?.jwt)
  return (
    <div 
    className={styles.icon_profile_container}
    onClick={() => setMostrarModal(state => !state)} 
    >
        <Image 
        src={!jwt ? Anonimo : Usuario}
        width={35}
        height={35}
        alt='Imagen del Usuario'
        />
        {
            !jwt ? <span>Anonimo</span>  :  <span>{infoUsuario.name}</span>
        }
        <ExpandMoreRoundedIcon/>
        {
          jwt ?  
          mostrarModal &&
          <div 
          className={styles.modal_iniciar_sesion} 
          onClick={() => dispatch(CerrarSesion())}>
            <p>Cerrar Sesion</p>
          </div>
          
          :
            mostrarModal &&
            <div
            className={styles.modal_iniciar_sesion}
            onClick={() => dispatch(changeMostrar(true))}
            >
            <LoginRoundedIcon/>
              <p>Iniciar Sesion</p>
            </div>
        }
    </div>
  )
}

export default IconProfile