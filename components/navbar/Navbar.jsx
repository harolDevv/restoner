import React, { useEffect, useState } from 'react'
//modules styles
import styles from './navbar.module.scss'

import IconProfile from '../iconProfile/IconProfile';

//iconos
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Swal from 'sweetalert2'
//multimedia
import Logo from '../../public/images/Restoner.png'
import Image from 'next/image'
import ModalAlert from '../modalAlert/ModalAlert';
import { useDispatch, useSelector } from 'react-redux';
import { getAllInfoUser } from '../../redux/actions/usuarioAction';


const Navbar = () => {
  const dispatch = useDispatch()
  const [ mostrarModalSesion , setMostrarModalSesion ]  = useState(false)
  const {mostrarModal} = useSelector(state => state.mostrarModal)
  useEffect(() => {
    dispatch(getAllInfoUser())
  } , [])
  return (
    <div className={styles.Navbar_container}>
      <div className={styles.Navbar_firstChild}>
        <div className={styles.Navbar_logo_container}>
            <Image 
            src={Logo} 
            alt='Logo Restoner'
            width={40}
            height={40}
            />
            <span>Restoner</span>
        </div>
        <div className={styles.Navbar_input_search_container}>
            <SearchRoundedIcon/>
            <input type="text" name="" id="" placeholder='Buscar Negocio'/>
        </div>
        <div className={styles.Navbar_icons_container}>
        <HomeRoundedIcon onClick={ () =>
          Swal.fire({
            title: 'Funcionalidad en desarrollo',
            text: "Restoner continua trabajando constantemente, puede  disfrutar de todas las funcionalidades en nuestra app móvil actualmente disponible para Android",
            showCancelButton: true,
            confirmButtonColor: '#ff0d4a',
            cancelButtonColor: 'gray',
            confirmButtonText: 'Descargar App',
            cancelButtonText: 'Regresar',
            cancelButtonColorText: 'black'
          }).then((result) => {
            if (result.isConfirmed) {
              window.open('https://bit.ly/3gVZAZw', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
            }
          })
          
        }/>
        <MenuRoundedIcon onClick={ () =>
        Swal.fire({
          title: 'Funcionalidad en desarrollo',
          text: "Restoner continua trabajando constantemente, puede  disfrutar de todas las funcionalidades en nuestra app móvil actualmente disponible para Android",
          showCancelButton: true,
          confirmButtonColor: '#ff0d4a',
          cancelButtonColor: 'gray',
          confirmButtonText: 'Descargar App',
          cancelButtonText: 'Regresar',
          cancelButtonColorText: 'black'
        }).then((result) => {
          if (result.isConfirmed) {
            window.open('https://bit.ly/3gVZAZw', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
          }
        })
        }/>
        <NotificationsRoundedIcon onClick={ () =>
         Swal.fire({
          title: 'Funcionalidad en desarrollo',
          text: "Restoner continua trabajando constantemente, puede  disfrutar de todas las funcionalidades en nuestra app móvil actualmente disponible para Android",
          showCancelButton: true,
          confirmButtonColor: '#ff0d4a',
          cancelButtonColor: 'gray',
          confirmButtonText: 'Descargar App',
          cancelButtonText: 'Regresar',
          cancelButtonColorText: 'black'
        }).then((result) => {
          if (result.isConfirmed) {
            window.open('https://bit.ly/3gVZAZw', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
          }
        })
        }/>
        </div>
      </div>
      <div className={styles.Navbar_secondChild}>
          <IconProfile setMostrarModalSesion={setMostrarModalSesion}/>
      </div>
      {
        mostrarModal  && <ModalAlert setMostrarModalSesion={setMostrarModalSesion}/>
      }
    </div>
  )
}

export default Navbar