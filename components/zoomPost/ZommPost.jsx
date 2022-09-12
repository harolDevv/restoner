import Image from 'next/image'
import React from 'react'
import styles from './ZoomPost.module.scss'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const ZommPost = ({zoomPost , setZoomPost}) => {
  return (
    <div className={styles.zoom_post_container}>
        <div className={styles.zoom_post}>
            <Image
            src={zoomPost.url}
            alt={'post'} 
            width={320}
            height={500}
            />
            <CloseRoundedIcon onClick={() => setZoomPost('')}/>
        </div>
    </div>
  )
}

export default ZommPost