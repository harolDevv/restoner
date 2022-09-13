import Image from 'next/image'
import React from 'react'
import styles from './ZoomPlato.module.scss'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const ZoomPlato = ({zoomPlato , setZoomPlato}) => {
  return (
    <div className={styles.zoom_plato_container}>
        <div className={styles.zoom_plato}>
            <Image
            src={zoomPlato.urlphoto}
            alt={'plato'} 
            width={320}
            height={500}
            />
            <CloseRoundedIcon onClick={() => setZoomPlato("")}/>
        </div>
    </div>
  )
}

export default ZoomPlato