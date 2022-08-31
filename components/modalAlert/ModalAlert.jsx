import React, { useEffect, useRef, useState } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import styles from './ModalAlert.module.scss'
import HttpsRoundedIcon from '@mui/icons-material/HttpsRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { MultiStepForm, Step } from 'react-multi-form';

const ModalAlert = ({setMostrarModalSesion}) => {
  const [modal , setModal] = useState('sesion')
  const [contador , setContador] = useState(1)

  useEffect(() => {
    setContador(1)
  }, [modal])
  const [formInicioSesion, setFormInicioSesion] = useState({
    number: '',
    password:''
  })
  const [formInicioRegister, setFormInicioRegister] = useState({
    nombre: '',
    apellido: '',
    number: '',
    password:'',
  })

  const handleNext = () => {
    if(contador < 3){
      setContador(contador + 1)
    } else {
      alert('Cree la cuenta')
      setMostrarModalSesion(false)
    }
  }

  const handleIngresar = () => {
    alert('Ingrese')
    setMostrarModalSesion(false)
  }

  console.log('Sesion',formInicioSesion);
  console.log('registro',formInicioRegister);

  return (
    <div className={styles.container_alert}>
      {
        modal === 'sesion'? 
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
            <button type='button' className={styles.button_registrarme}  onClick={() => setModal('register')} >Registrarme</button>
            <button 
            type='button' 
            onClick={handleIngresar}
            className={styles.button_ingresar}
            disabled={formInicioSesion.number.length < 12 || formInicioSesion.password.length < 3}
            >
              Ingresar
            </button>
        </div>
        :
        <div className={styles.modal_register}>
          <CloseRoundedIcon className={styles.close_modal} onClick={() => setMostrarModalSesion(false)}/>
          <h3>Registrese en 3 simples pasos</h3>
          <MultiStepForm activeStep={contador} accentColor='#ff0d4a'>
            <Step label="1">
              <PhoneInput
              className={styles.inputNumber}
              country={'pe'}
              placeholder='Tu numero de telefono'
              name="number"
              value={formInicioSesion.number}
              onChange={phone => setFormInicioRegister({...formInicioRegister, number:phone})}
              />
            </Step>
            <Step className={styles.step_2} label="2">
              <input 
                type="tel" 
                name="tel" 
                id="" 
                placeholder='4 9 5 6 7 2' 
                autoComplete="new-password"
                />
                <button>Reenviar Codigo</button>
            </Step>
            <Step label="3" className={styles.step_3}>
              <div>
              <PersonRoundedIcon/>
              <input 
              type="text" 
              name="nombre" 
              id="" 
              placeholder='Nombre' 
              autoComplete="new-text"
              onChange={(e) => {
                setFormInicioRegister({ ...formInicioRegister, [e.target.name]: e.target.value });
              }}
              />
              </div>
              <div>
                <PersonRoundedIcon/>
              <input 
              type="text" 
              name="apellido" 
              id="" 
              placeholder='Apellido'
              autoComplete="new-text" 
              onChange={(e) => {
                setFormInicioRegister({ ...formInicioRegister, [e.target.name]: e.target.value });
              }}
              />
              
              </div>
              <div>
              <HttpsRoundedIcon/>
              <input 
              type="password" 
              name="password" 
              id="" 
              placeholder='Contraseña' 
              autoComplete="new-password" 
              onChange={(e) => {
                setFormInicioRegister({ ...formInicioRegister, [e.target.name]: e.target.value });
              }}
              />
              
              </div>
              <div>
                <HttpsRoundedIcon/>
              <input 
              type="password" 
              name="" 
              id="" 
              placeholder='Repita contraseña'  
              autoComplete="new-password"
              />
              
              </div>
             
            </Step>
          </ MultiStepForm>
            <button type='button' className={styles.button_registrarme} onClick={() => setModal('sesion')}>Ya tengo una cuenta</button>
            <div className={styles.buttons_multi_container}>
            <button 
            type='button'
            className={styles.button_ingresar} 
            onClick={() => setContador(contador - 1)}
            disabled={contador === 1 }
            >
              Atras 
              </button>
            <button 
            type='button'
            className={styles.button_ingresar} 
            onClick={handleNext}
            disabled={formInicioRegister.number.length < 12}
            >
              {
                contador < 3 ?
                'Continuar' : 'Crear cuenta'
              }
            </button>
            </div>
        </div>
      }
    </div>
  )
}

export default ModalAlert