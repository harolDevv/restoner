import React from 'react'
import styles from './footer.module.scss'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
const Footer = () => {
  return (
    <div className={styles.footer_container}>
        <span>
        Restoner &#169; 2022
        </span>

        <div className={styles.icons_footer_container}>
            <FacebookIcon/>
            <InstagramIcon/>
            <WhatsAppIcon/>
            <YouTubeIcon/>
        </div>
    </div>
  )
}

export default Footer