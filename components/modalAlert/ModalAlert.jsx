import React, { useRef, useState } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import styles from './ModalAlert.module.scss'
import HttpsRoundedIcon from '@mui/icons-material/HttpsRounded';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


const ModalAlert = ({setMostrarModalSesion}) => {
  const [formInicioSesion, setFormInicioSesion] = useState({
    number: 0,
    password:''
  })

  console.log(formInicioSesion);

  return (
    <div className={styles.container_alert}>
        <div className={styles.modal_sesion}>
              <CloseRoundedIcon className={styles.close_modal} onClick={() => setMostrarModalSesion(false)} />
            <h3>Inicie sesión</h3>
            <PhoneInput
            className={styles.inputNumber}
            country={'pe'}
            placeholder='Tu numero de telefono'
            name="number"
            value={formInicioSesion.number}
            onChange={phone => setFormInicioSesion({...formInicioSesion, number:phone})}
            />
            <div className={styles.password_container}>
              <HttpsRoundedIcon/>
              <input 
              type="password" 
              name="password" 
              id="" 
              placeholder='Contraseña' 
              autoComplete="new-password"
              onChange={(e) => {
                setFormInicioSesion({ ...formInicioSesion, [e.target.name]: e.target.value });
              }}
              />
            </div>
            <button type='button' className={styles.button_registrarme}>Registrarme</button>
            <button type='button' className={styles.button_ingresar}>Ingresar</button>
        </div>

    </div>
  )
}

export default ModalAlert