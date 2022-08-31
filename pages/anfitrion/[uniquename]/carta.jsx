import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getInfoNegotion } from '../../../redux/actions/infoNegotionAction'
import { getInfoCategoriesAction } from '../../../redux/actions/categoriesAction'
import styles from './carta.module.scss'
import Link from 'next/link'
import Image from 'next/image'

//iconos
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { getPlatosDelDiaAction } from '../../../redux/actions/platosAction'
import { style } from '@mui/system'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

//acciones del carrito
import { addToCart, clearCart, deleteFromCart } from '../../../redux/actions/productosCarritoAction'

const Carta = () => {
  let contador = 0;
  let today = new Date()
  let dd = today.getDay() === 0 ? 7 : today.getDay()
  const dispatch = useDispatch()

  const { query: {uniquename} } = useRouter()
  const {data} = useSelector(state => state.infoNegocio.infoNegocio)
  const categorias = useSelector(state => state.infoCategories.categoriesBussines.data)
  const platos = useSelector(state => state.platosDelDia.platos.data)
  const {carrito} = useSelector(state => state.productosCarrito) 

  useEffect(() => {
          dispatch(getInfoNegotion(uniquename))
    }, [uniquename])


  useEffect(() => {
    console.log('estoy en el useEfect');
      if(data) {
        dispatch(getInfoCategoriesAction(data.idbusiness , '2022-08-26'))
      }
    }, [data])

  useEffect(() => {
    console.log('estoy en el useEfect de platos');
      if(data) {
        dispatch(getPlatosDelDiaAction(data.idbusiness , '2022-08-26', 30))
      }
    }, [data])
  


  return (
    <div className={styles.carta_father_container}>
      <section className={styles.header_section}>
        <div>

          <Link href={`/anfitrion/${uniquename}`}>
          <button type=''>
            <ArrowBackIosNewRoundedIcon/>
            Ver negocio
          </button>
          </Link>
          <h3>{data?.name}</h3>
          <h4>Horario</h4>
          <span>
          {
            data &&
            data?.schedule?.find(e => {return e.id == dd}).starttime   
          }
          AM
          -
          {
            data &&
            data?.schedule?.find(e => {return e.id == dd}).endtime
          }
          PM
          </span>
        </div>
        <div>
          <h4>Categorias</h4>
          {
            categorias?.map(categoria => {
              return(
                <p key={categoria.id}>{categoria.namecategory} ({categoria.elements})</p>
              )
            })
          }
        </div>
      </section>
      <section className={styles.platos_father_container}>
        {
          platos ?
          platos.map(categoria => {
            return(
              <div key={categoria.category.idcategory} id={categoria.category.namecategory} className={styles.plato_categories_container}>
                <h3>{categoria.category.namecategory}</h3>
                <div className={styles.platos_container}>
                    {
                    categoria.elements.map(platos => {
                      return(
                        <div key={platos.idelement} className={styles.plato_product_container}>
                          <div className='plato_image_container'>
                            <style jsx>
                              {
                                  `
                                  .plato_image_container{
                                    height: 130px;
                                    width: 130px;
                                    background-image: url('${platos?.urlphoto}');
                                    background-position: center;
                                    background-size: cover;
                                    background-repeat: no-repeat;
                                    border-radius: 5px 5px 5px 5px;
                                  }
                                  `
                              }
                            </style>
                          </div>
                          <div className={styles.plato_product_details_container}>
                              <div className={styles.plato_product_info_container}>
                                <h4>{platos.name}</h4>
                                <p>{platos.description}</p>
                              </div>

                              <div className={styles.plato_product_buttons_container}>
                                <span>S/.{platos.price}</span>
                                <div>
                                  <button type='button' onClick={() => dispatch(deleteFromCart(platos.idelement))}> - </button>
                                  <button type='button' onClick={() => dispatch(addToCart(platos))}> + </button>
                                </div>
                              </div>
                          </div>
                        </div>
                      )
                    })
                    }
            
                </div>
              </div>
            )
          }) 
          
          : null
        }
      </section>
      <section className={styles.platos_escogidos_container}>
        <h3>Elementos:</h3>
        <div className={styles.carrito_container}>
          {
            carrito.length > 0 ?
            carrito?.map(producto => {
              return(
                <div key={producto.id} className={styles.carrito_producto_container}>
                  <div className='plato_image_container'>
                              <style jsx>
                                {
                                    `
                                    .plato_image_container{
                                      height: 80px;
                                      width: 80px;
                                      background-image: url('${producto?.urlphoto}');
                                      background-position: center;
                                      background-size: cover;
                                      background-repeat: no-repeat;
                                      border-radius: 5px 5px 5px 5px;
                                    }
                                    `
                                }
                              </style>
                            </div>
                            <div className={styles.carrito_producto_info}>
                                <div className={styles.plato_product_info_container}>
                                  <h5>{producto.name}</h5>
                                </div>
                                <div className={styles.carrito_producto_buttons_container}>
                                  <span>S/.{producto.price}</span>
                                  <div>
                                    <button type='button' onClick={() => dispatch(deleteFromCart(producto.idelement))}> - </button>
                                    <button type='button' onClick={() => dispatch(addToCart(producto))}> + </button>
                                  </div>
                                </div>
                            </div>
                </div>
              )
            })
            : <p className={styles.sin_platos_text}>No hay platos en el carrito :)</p>
          }
        </div>
        <button type='button' onClick={() => dispatch(clearCart())} className={styles.carrito_producto_clearAll}>
          Limpiar el carrito
        </button>
        <div className={styles.selects_container}>
            <div>
            <h3>Servicio:</h3>
              <select name="" id="">
                <option value="">Consumir en el lugar</option>
                <option value="">Recoger en el lugar</option>
                <option value="">Delivery</option>
              </select>
            </div>
            <div>
              <h3>Direccion:</h3>
              <p>blablbka</p>
              <button>cambiar</button>
            </div>
            <div>
              <h3>Rango horario:</h3>
              <select name="" id="">
                <option value="">Consumir en el lugar</option>
                <option value="">Recoger en el lugar</option>
                <option value="">Delivery</option>
              </select>
            </div>
            <div>
              <h3>Metodo de pago:</h3>
              <select name="" id="">
                {
                  data?.paymentmethods?.map(item => {
                    return(
                      <option key={item.id} value={item.name}>{item.name}</option>
                    )
                  })
                }
              </select>
            </div>
        </div>
        <h3>Nota:</h3>
        <input type="text" name="" id="" placeholder='Ejm: Monto con el cancelara'/>
        <div className={styles.carrito_warning}>
          <div>
                <InfoRoundedIcon/>
          </div>
          <div>
            <p>
                Si usted detecta que el precio total debe ser menos al que se muestra, recuerde que el      anfitrión puede agregar descuentos globales o descuentos por elementos en cualquier momento a     su pedido
            </p>
          </div>
        </div>
          <button className={styles.button_enviar_pedido}>
              <SendRoundedIcon/>
              <span>Enviar pedido</span>
              S/.
              {
               carrito.reduce((sum, value) => ( sum + value.costo ),0)
              }
          </button>
          
      </section>
    </div>
  )
}

export default Carta