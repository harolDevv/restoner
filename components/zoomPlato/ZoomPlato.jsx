import Image from 'next/image'
import React from 'react'
import styles from './ZoomPlato.module.scss'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../../redux/actions/productosCarritoAction';
import { switchUnstyledClasses } from '@mui/base';
import { useEffect } from 'react';
import { useState } from 'react';

const ZoomPlato = ({zoomPlato , setZoomPlato}) => {
  const {carrito} = useSelector(state => state.productosCarrito)
  const [numberCarrito , setNumberCarrito] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    setNumberCarrito(carrito?.find(item => item.idelement === zoomPlato.idelement))
  }, [carrito])
  
  console.log(carrito, 'carrito');
  console.log(numberCarrito, '2321');
  return (
    <div className={styles.zoom_plato_container}>
        <div className={styles.zoom_plato}>
          <CloseRoundedIcon onClick={() => setZoomPlato("")}/>
            <Image
            src={zoomPlato.urlphoto}
            alt={'plato'} 
            width={150}
            height={150}
            />
            <div className={styles.zoom_plato_info_container}>
              <h3>{zoomPlato.name}</h3>
              <h3>S/.{zoomPlato.price}</h3>
              <p>{zoomPlato.description}</p>
            </div>
            <div className={styles.zoom_plato_buttons_container}>
              <button type='button' onClick={() => dispatch(deleteFromCart(zoomPlato))}> - </button>
              {
                numberCarrito ? numberCarrito.quantity  : 0 
              }
              <button type='button' onClick={() => dispatch(addToCart(zoomPlato))}> + </button>
            </div>
        </div>
    </div>
  )
}

export default ZoomPlato