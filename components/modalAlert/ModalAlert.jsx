import React, { useEffect, useRef, useState } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import styles from './ModalAlert.module.scss'
import HttpsRoundedIcon from '@mui/icons-material/HttpsRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { MultiStepForm, Step } from 'react-multi-form';


import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

//axios
import { apiRecuperar, apiRegistro } from '../../axios';

//action
import { getAllInfoUser } from '../../redux/actions/usuarioAction';
import { useDispatch } from 'react-redux';
import { changeMostrar } from '../../redux/reducers/modalAlertReducer';
import Swal from 'sweetalert2';
import { Radio } from '@mui/material';



const ModalAlert = ({setMostrarModalSesion}) => {
  const dispatch = useDispatch()
  const [modal , setModal] = useState('sesion')
  const [contador , setContador] = useState(1)
  const [contadorRecuperar , setContadorRecuperar] = useState(1)
  const [rememberMe , setRememberMe] = useState(false)
  useEffect(() => {
    setContador(1)
    setContadorRecuperar(1)
    setRememberMe(false)
  }, [modal])

  //estods de recuperar contraseña
  const [formRecuperar, setFormRecuperar] = useState({
    phoneRegister: '',
    country: '',
  })
  const [formRecuperarCode, setFormRecuperarCode] = useState({
    code: '',
  })
  const [formRecuperarCuenta, setFormRecuperarCuenta] = useState({
    newpassword: '',
    repeatnewpassword: '' ,
    phoneRegister:'',
    country: '',
    code:'',
  })
  
  const [Error , setError] = useState('')
  
  const [formInicioSesion, setFormInicioSesion] = useState({
    phone: '',
    country:'',
    password:''
  })

  useEffect(() => {
    setError('')
  }, [formInicioSesion.phone , formInicioSesion.password])

  const [formNumber, setFormNumber] = useState({
    phoneRegister: '',
    country: '',
  })
  const [formCode, setFormCode] = useState({
    codigo: '',
  })
  const [formInicioRegister, setFormInicioRegister] = useState({
    nombre: '',
    apellido: '',
    phone:'',
    country: '',
    password:'',
    code: '',
    repeatPassword: '',
  })

  //Obtencion de obj para creacon de cuenta == Numero telefonico STEP1
  const handleNextStep1 = async () => {
    if(contador < 3){
      setContador(contador + 1)
    } else {
      alert('Cree la cuenta')
      setMostrarModalSesion(false)
    }
    if(formNumber.country && formNumber.phoneRegister){
      console.log('Esta funcion se ejecuto');
      let objNumber = {
        phoneRegister: Number(formNumber.phoneRegister),
        country: Number(formNumber.country),
      }
        try {
              const respuesta  = await apiRegistro.post('http://c-registro-authenticacion.restoner-api.fun/v1/codes' , objNumber)
              console.log(respuesta);
        } catch (error) {
          console.log(error);
        }
    }
}


  //Obtencion de obj para envio de codigo == CODIGO telefonico STEP2
  const handleNextStep2 = async () => {
    //Obtencion de obj para creacon de cuenta == Numero telefonico
    if(formCode.codigo){
      console.log('Esta funcion se ejecuto , Codigo');
      let objCode = {
          code: Number(formCode.codigo),
      }
        try {
              const respuesta  = await apiRegistro.put(`http://c-registro-authenticacion.restoner-api.fun/v1/codes/${formNumber.phoneRegister}/${formNumber.country}` , objCode)
              
              if(respuesta){
                setContador(contador + 1)
                Swal.fire({
                  icon:'success',
                  title: 'Codigo confirmado',
                  showConfirmButton: false,
                  timer: 1700,
                  text: ':,(',
                })
              }
        } catch (error) {
            Swal.fire({
              icon:'error',
              title: 'Codigo Incorrecto',
              showConfirmButton: false,
              timer: 1700,
              text: ':,(',
              iconColor: '#ff0d4a'
            })
        }
    }
}


//Obtencion de obj para envio del usuario == USUARIO  STEP3
const handleNextStep3 = async () => {
  //Obtencion de obj para creacon de cuenta == Numero telefonico
  if(
    formInicioRegister.nombre 
    &&formInicioRegister.apellido 
    &&formInicioRegister.password 
    &&formInicioRegister.code 
    && formInicioRegister.country
    && formInicioRegister.phone){
    console.log('Esta funcion se ejecuto , Usuario');
    let objUser = {
      name:formInicioRegister.nombre  ,
      lastname: formInicioRegister.apellido,
      phone:Number(formInicioRegister.phone),
      country: Number(formInicioRegister.country),
      password:formInicioRegister.password ,
      code: Number(formInicioRegister.code) ,
    }
      try {
            console.log(objUser)
            const respuesta  = await apiRegistro.post(`http://c-registro-authenticacion.restoner-api.fun/v1/comensal` , objUser)
            
            if(respuesta){
              Swal.fire({
                icon:'success',
                title: '',
                showConfirmButton: false,
                timer: 1700,
                text: 'Su cuenta ha sido creada con exito',
              })
              dispatch(changeMostrar(false))
            }
      } catch (error) {
        Swal.fire({
          icon:'error',
          title: 'Ups...',
          showConfirmButton: false,
          timer: 1700,
          text: 'error al cambiar la crear la cuenta',
          iconColor: '#ff0d4a'
        })
      }
  }
}

  const handleIngresar = async () => {
    if(formInicioSesion.phone && formInicioSesion.password && formInicioSesion.country){
      console.log('Esta funcion se ejecuto , Ingresar');
      let objIngresar = {
        phone: Number(formInicioSesion.phone),
        country: Number(formInicioSesion.country),
        password: formInicioSesion.password
      }
        try {
              await dispatch(getAllInfoUser(objIngresar,  rememberMe))
        } catch (error) {
              setError('Numero y/o Contraseña incorrectos');
        }
    }
  }

  //funciones para recuperar
  const handleNextStepRecuperar1 =  async() => {
    if(contadorRecuperar < 3){
      setContadorRecuperar(contadorRecuperar + 1)
    } else {
      alert('Se cambio la password')
      setMostrarModalSesion(false)
    }
    if(formRecuperar.country && formRecuperar.phoneRegister){
      console.log('Esta funcion se ejecuto');
      let objRecuperar = {
        phoneRegister: Number(formRecuperar.phoneRegister),
        country: Number(formRecuperar.country),
      }
        try {
              const respuesta  = await apiRecuperar.post('http://c-registro-authenticacion.restoner-api.fun/v1/recover' , objRecuperar)
              console.log(respuesta);
        } catch (error) {
          console.log(error);
        }
    }
  }
  const handleNextStepRecuperar2 =  async() => {
    //Obtencion de obj para creacon de cuenta == Numero telefonico
    if(formRecuperarCode.code){
      console.log('Esta funcion se ejecuto , Codigo');
      let objCode = {
          code: Number(formRecuperarCode.code),
      }
        try {
              const respuesta  = await apiRecuperar.put(`http://c-registro-authenticacion.restoner-api.fun/v1/recover/${formRecuperar.phoneRegister}/${formRecuperar.country}` , objCode)

              if(respuesta){
                setContadorRecuperar(contadorRecuperar + 1)
                Swal.fire({
                  icon:'success',
                  title: 'Codigo confirmado',
                  showConfirmButton: false,
                  timer: 1700,
                  text: ':,(',
                })
              }
              
              console.log('Respuesta codigo de recuperacion',respuesta);
        } catch (error) {
          Swal.fire({
            icon:'error',
            title: 'Codigo Incorrecto',
            showConfirmButton: false,
            timer: 1700,
            text: ':,(',
            iconColor: '#ff0d4a'
          })
        }
    }
  }


  const handleNextStepRecuperar3 = async() => {
    if(formRecuperarCode.code){
      console.log('Esta funcion se ejecuto , Codigo');
      let objCuenta = {
          newpassword: formRecuperarCuenta.newpassword,
          phone: Number(formRecuperarCuenta.phoneRegister),
          country: Number(formRecuperarCuenta.country),
          code:Number(formRecuperarCuenta.code)
      }
        try {
              const respuesta  = await apiRecuperar.put(`http://c-registro-authenticacion.restoner-api.fun/v1/recover/password` , objCuenta)

              if(respuesta){
                Swal.fire({
                  icon:'success',
                  title: '',
                  showConfirmButton: false,
                  timer: 1700,
                  text: 'Su contraseña ha sido actualizada con exito',
                })
                dispatch(changeMostrar(false))
              }
              
              console.log('Respuesta codigo de recuperacion',respuesta);
        } catch (error) {
          Swal.fire({
            icon:'error',
            title: 'Ups...',
            showConfirmButton: false,
            timer: 1700,
            text: 'error al cambiar la contraseña',
            iconColor: '#ff0d4a'
          })
        }
    }
  }

  const handleRememberMeChange = (e) => setRememberMe(e.target.checked);

  console.log(rememberMe);

  return (
    <div className={styles.container_alert}>
      {
        modal === 'sesion'? 
        <div className={styles.modal_sesion}>
              <CloseRoundedIcon className={styles.close_modal} onClick={() => dispatch(changeMostrar(false)) } />
            <h3>Inicie sesión</h3>
            <PhoneInput
            className={styles.inputNumber}
            country={'pe'}
            placeholder='Tu numero de telefono'
            name="phone"
            value={formInicioSesion.number}
            onChange={(value ,country) => {
              setFormInicioSesion({...formInicioSesion , phone: value.substring(country.dialCode.length) , country:country.dialCode })
            }}
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
            {
              Error ? <span className={styles.span_error}><ErrorOutlineRoundedIcon/> {Error}</span> : null
            }
            <div className={styles.Recover_Account_container}>
              <label className={styles.label_rememberMe} >

              <Radio  
                      className={styles.inputRemember}
                      onClick={() => setRememberMe(state => !state)}
                      checked={rememberMe}
                      sx={{
                        color: "black",
                        "&.Mui-checked": {
                          color: "#FF0D4A",
                        },
                      }} />
                 {/* //<input type="checkbox" onChange={() => setRememberMe(state => !state)}/>  */}
                
                Recuerdame</label>
              <button type='button' className={styles.button_recuperar} onClick={() => setModal('Recuperar')}>¿Olvidaste tu contraseña?</button>
            </div>
            <button type='button' className={styles.button_registrarme}  onClick={() => setModal('register')} >Registrarme</button>
            <button 
            type='button' 
            onClick={handleIngresar}
            className={styles.button_ingresar}
            disabled={formInicioSesion.phone.length < 9 || formInicioSesion.password.length < 3}
            >
              Iniciar sesión
            </button>
        </div> : null
        }

        {
            modal === 'register'? 
            <div className={styles.modal_register}>
          <CloseRoundedIcon className={styles.close_modal}  onClick={() => dispatch(changeMostrar(false)) }/>
          <h3>Registrese en 3 simples pasos</h3>
          <MultiStepForm activeStep={contador} accentColor='#ff0d4a'>
            <Step label="1">
              <PhoneInput
              className={styles.inputNumber}
              country={'pe'}
              placeholder='Tu numero de telefono'
              name="number"
              value={formInicioSesion.number}
              onChange={(value ,country) => {
                setFormNumber({...formNumber, phoneRegister:value.substring(country.dialCode.length) , country:country.dialCode}),
                setFormInicioRegister({...formInicioRegister , phone: value.substring(country.dialCode.length) , country:country.dialCode })
              }}
              // onClick={phone => handleNumberNext(phone.target.value)}
              />
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
                onClick={handleNextStep1 }
                disabled={formNumber.phoneRegister.length < 9}
                >
                  {
                    contador < 3 ?
                    'Continuar' : 'Crear cuenta'
                  }
                </button>
            </div>
            </Step>
            <Step className={styles.step_2} label="2">
              <input 
                type="tel" 
                name="codigo" 
                id="" 
                placeholder='4 9 5 6 7 2' 
                autoComplete="new-password"
                onChange={(e) => {
                  setFormCode({ ...formCode, [e.target.name]: e.target.value }) , 
                  setFormInicioRegister({ ...formInicioRegister, code: e.target.value });
                }}
                />
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
                onClick={handleNextStep2}
                disabled={formCode.codigo.length < 6}
                >
                 Continuar
                </button>
            </div>
                <button className={styles.button_reenviar_codigo}>Reenviar Codigo</button>
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
              name="repeatPassword" 
              id="" 
              placeholder='Repita contraseña'  
              autoComplete="new-password"
              onChange={(e) => {
                setFormInicioRegister({ ...formInicioRegister, [e.target.name]: e.target.value });
              }}
              />
              
              </div>
              <section className={styles.buttons_multi_container}>
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
                onClick={handleNextStep3}
                disabled={
                  formInicioRegister.nombre.length < 2 ||
                  formInicioRegister.apellido.length < 2 ||
                  formInicioRegister.password.length < 6 ||
                  formInicioRegister.password !== formInicioRegister.repeatPassword
                }
                >
                 Crear Usuario
                </button>
            </section>
            </Step>
          </ MultiStepForm>
            <button type='button' className={styles.button_registrarme} onClick={() => setModal('sesion')}>Ya tengo una cuenta</button>
        </div> : null
        }
        
        
      {
        modal === 'Recuperar'? 
        <div className={styles.modal_register}>
        <CloseRoundedIcon className={styles.close_modal}  onClick={() => dispatch(changeMostrar(false)) }/>
        <h3>Recupere su cuenta</h3>
        <MultiStepForm activeStep={contadorRecuperar} accentColor='#ff0d4a'>
          <Step label="1">
            <PhoneInput
            className={styles.inputNumber}
            country={'pe'}
            placeholder='Tu numero de telefono'
            name="number"
            value={formInicioSesion.number}
            onChange={(value ,country) => {
              setFormRecuperar({...formRecuperar, phoneRegister:value.substring(country.dialCode.length) , country:country.dialCode}),
              setFormRecuperarCuenta({...formRecuperarCuenta, phoneRegister:value.substring(country.dialCode.length) , country:country.dialCode})
            }}
            // onClick={phone => handleNumberNext(phone.target.value)}
            />
            <div className={styles.buttons_multi_container}>
                <button 
              type='button'
              className={styles.button_ingresar} 
              onClick={() => setContadorRecuperar(contador - 1)}
              disabled={contadorRecuperar === 1 }
              >
                Atras 
                </button>
              <button 
              type='button'
              className={styles.button_ingresar} 
              onClick={handleNextStepRecuperar1 }
              disabled={formRecuperar.phoneRegister.length < 9}
              >
                {
                  contador < 3 ?
                  'Continuar' : 'Crear cuenta'
                }
              </button>
          </div>
          </Step>
          <Step className={styles.step_2} label="2">
            <input 
              type="tel" 
              name="code" 
              id="" 
              placeholder='4 9 5 6 7 2' 
              autoComplete="new-password"
              onChange={(e) => {
                setFormRecuperarCode({ ...formRecuperarCode, [e.target.name]: e.target.value }),
                setFormRecuperarCuenta({ ...formRecuperarCuenta, [e.target.name]: e.target.value })
              }}
              />
              <div className={styles.buttons_multi_container}>
                <button 
              type='button'
              className={styles.button_ingresar} 
              onClick={() => setContadorRecuperar(contadorRecuperar - 1)}
              disabled={contadorRecuperar === 1 }
              >
                Atras 
                </button>
              <button 
              type='button'
              className={styles.button_ingresar} 
              onClick={handleNextStepRecuperar2}
              disabled={formRecuperarCode.code.length < 6}
              >
               Continuar
              </button>
          </div>
              <button className={styles.button_reenviar_codigo}>Reenviar Codigo</button>
          </Step>
          <Step label="3" className={styles.step_3}>
            
            <div>
            <HttpsRoundedIcon/>
            <input 
            type="password" 
            name="newpassword" 
            id="" 
            placeholder='Contraseña' 
            autoComplete="new-password" 
            onChange={(e) => {
              setFormRecuperarCuenta({ ...formRecuperarCuenta, [e.target.name]: e.target.value });
            }}
            />
            
            </div>
            <div>
              <HttpsRoundedIcon/>
            <input 
            type="password" 
            name="repeatnewpassword" 
            id="" 
            placeholder='Repita contraseña'  
            autoComplete="new-password"
            onChange={(e) => {
              setFormRecuperarCuenta({ ...formRecuperarCuenta, [e.target.name]: e.target.value });
            }}
            />
            
            </div>
            <section className={styles.buttons_multi_container}>
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
              onClick={handleNextStepRecuperar3}
              disabled={
                formRecuperarCuenta.newpassword.length < 6 ||
                formRecuperarCuenta.newpassword != formRecuperarCuenta.repeatnewpassword
              }
              >
                Cambiar contraseña
              </button>
          </section>
          </Step>
        </ MultiStepForm>
          <button type='button' className={styles.button_registrarme} onClick={() => setModal('sesion')}>Ya tengo una cuenta</button>
      </div> : null
      }
    </div>
  )
}

export default ModalAlert