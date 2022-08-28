import React from 'react'
//modules styles
import styles from './navbar.module.scss'

//iconos
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Swal from 'sweetalert2'
//multimedia
import Logo from '../../public/images/Restoner.png'
import Image from 'next/image'


const Navbar = () => {
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
            position: 'top-end',
            icon:'warning',
            title: 'Oops...',
            showConfirmButton: false,
            timer: 1900,
            text: 'Restoner sigue trabajando en esta funcionalidad :(',
            iconColor: '#ff0d4a'
          })
        }/>
        <MenuRoundedIcon onClick={ () =>
          Swal.fire({
            position: 'top-end',
            icon:'warning',
            title: 'Oops...',
            showConfirmButton: false,
            timer: 1900,
            text: 'Restoner sigue trabajando en esta funcionalidad :(',
            iconColor: '#ff0d4a'
          })
        }/>
        <NotificationsRoundedIcon onClick={ () =>
          Swal.fire({
            position: 'top-end',
            icon:'warning',
            title: 'Oops...',
            showConfirmButton: false,
            timer: 1900,
            text: 'Restoner sigue trabajando en esta funcionalidad :(',
            iconColor: '#ff0d4a'
          })
        }/>
        </div>
      </div>
      <div className={styles.Navbar_secondChild}>

      </div>
    </div>
  )
}

export default Navbar