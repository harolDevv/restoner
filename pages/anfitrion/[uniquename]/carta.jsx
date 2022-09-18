import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getInfoNegotion } from '../../../redux/actions/infoNegotionAction'
import { getInfoCategoriesAction } from '../../../redux/actions/categoriesAction'
import styles from './carta.module.scss'
import Link from 'next/link'
import Image from 'next/image'

//iconos
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { getPlatosDelDiaAction } from '../../../redux/actions/platosAction'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
//acciones del carrito
import { addToCart, clearCart, deleteFromCart } from '../../../redux/actions/productosCarritoAction'
import { getAllRangos } from '../../../redux/actions/rangosHorariosAction'
import ModalDireccion from '../../../components/modalDireccion/ModalDireccion'
import Script from 'next/script'
import ModalAlert from '../../../components/modalAlert/ModalAlert'
import { changeMostrar } from '../../../redux/reducers/modalAlertReducer'
import { GetAllDirecciones } from '../../../redux/actions/usuarioAction'
import axios from 'axios';
import ZoomPlato from '../../../components/zoomPlato/ZoomPlato'
import Swal from 'sweetalert2'
import { apiConnection , apiPedido } from '../../../axios'



const Carta = () => {
  let contador = 0;
  let today = new Date()
  let dd = today.getDay() === 0 ? 7 : today.getDay()
  let formatDate = (new Date()).toDateString()
  const dispatch = useDispatch()

  let dia = today.getDate()
  let mes = today.getMonth() + 1
  let year = today.getFullYear()
  let fechaCompleta = `${year}-${mes}-${dia}`
  let fechaCompleta2 = `${year}/${mes}/${dia}`


  const [modalDireccion, setModalDireccion] = useState(false)

  const { query: {uniquename} } = useRouter()
  const {data} = useSelector(state => state.infoNegocio.infoNegocio)
  const categorias = useSelector(state => state.infoCategories.categoriesBussines.data)
  const platos = useSelector(state => state.platosDelDia.platos.data)
  const {carrito} = useSelector(state => state.productosCarrito) 
  const rangosHorarios = useSelector(state => state.rangosHorarios.rangosHorarios.data)
  const {usuario} = useSelector(state => state.infoUsuario)
  const {direccionesUsuario} = useSelector(state => state.infoUsuario)
  const {RangoEntregaUserAddress} = useSelector(state => state.rangoEntrega)
  const isrestriction = useSelector(state => state.infoNegocio?.infoNegocio?.data?.delivery.isrestriction)
  const [pedido, setPedido] = useState({
    dateregistered: '',
    idstatus: 1,
    schedule: '',
    informationbusiness:{
      idbusiness: '',
      name: '',
      legalidentity: '',
      typesuscription: ''
    },
    addressbusiness:{
      latitude:'',
      longitude: '',
      fulladdress: '',
      postalcode: '',
      state: '',
      city:'',
      refere:'',
    },
    informationcomensal:  {
      name: '',
      phonecontact: '',
      idcomensal: '',
      legalidentity:''
    },
    addresscomensal:'',
    note:'No se ha agregado ninguna nota',
    service:'',
    payment:'',
    datarejected:{},
    elements: '',
    ismadebyweb: true,
  })

  const [zoomPlato , setZoomPlato] = useState("")
  

  useEffect(() => {
    dispatch(getInfoNegotion(uniquename))
  }, [uniquename])

  useEffect(() => {
    if(usuario?.data?.jwt){
      dispatch(GetAllDirecciones(usuario.data.jwt))
    }
  }, [usuario])
  
  useEffect(() => {
    if(data){
      dispatch(getAllRangos(data.idbusiness, fechaCompleta))
    }
  }, [data])

  useEffect(() => {
      if(data) {
        dispatch(getInfoCategoriesAction(data.idbusiness , fechaCompleta))
      }
    }, [data])

  useEffect(() => {
      if(data) {
        dispatch(getPlatosDelDiaAction(data.idbusiness , fechaCompleta, 30))
      }
    }, [data])
    
    useEffect(() => {
      if(data){
        setPedido({...pedido , addressbusiness:{
          latitude: data.address.latitude,
          longitude: data.address.longitude,
          fulladdress: data.address.fulladdress,
          postalcode: data.address.postalcode,
          state: data.address.state,
          city: data.address.city,
          reference: data.address.referenceaddress,
        }})
      }
    }, [data])
    
    useEffect(() => {
      if(data){
         setPedido({...pedido  , informationbusiness:{
           idbusiness: data.idbusiness,
           name: data.name,
           legalidentity: data.legalidentity,
           typesuscription: data.typesuscription
         }})
      }
     }, [pedido.addressbusiness])
    useEffect(() => {
      if(usuario.data){
        setPedido({...pedido, informationcomensal:  {
          ...pedido.informationcomensal ,
          name: usuario.data.name ,
          phonecontact: (`${usuario.data.country}${usuario.data.number}`) ,
          idcomensal:  usuario.data.id ,
        }})
      }
     }, [usuario.data])

    useEffect(() => {
      if(carrito){
        setPedido({...pedido, elements: carrito.map(item => {
          const  {namecategory ,price, urlphotcategory,urlphoto , date, availableorders, stock, ...newFood} = item
          return{...newFood , iva: data.iva , category: item.namecategory , unitprice: item.price , url: urlphoto, discount:0} 
        })})
      }

     }, [carrito])



    const findRoutes = async(token) =>{
      const hour = (new Date()).getHours()
      const minute = (new Date()).getMinutes()
      const second = (new Date()).getSeconds()
      let objPedido = {
        dateregistered:`${fechaCompleta} ${hour}:${minute}:${second}`,
        idstatus: 1,
        schedule: pedido.schedule,
        informationbusiness:pedido.informationbusiness,
        addressbusiness: pedido.addressbusiness,
        informationcomensal: pedido.addresscomensal,
        addresscomensal:pedido.addresscomensal,
        note: pedido.note,
        service:pedido.service,
        payment: pedido.payment,
        datarejected:{},
        elements: pedido.elements,
        ismadebyweb: true,
      }
      const config = {
        headers: { 
            Authorization: `${token}`,
        }
      };
      try {
        
        Swal.fire({
          title: 'Esta seguro que desea enviar el pedido?',
          icon: 'warning',
          iconColor: '#ff0d4a',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, enviar!',
          cancelButtonText: 'Cancelar'
        }).then(async (result) => {
          if (result.isConfirmed) {
            const data = await apiPedido.post(
              `http://c-a-pedidos.restoner-api.fun/v3/order/comensales`,
              objPedido,
              config)
              if(data){
                Swal.fire({
                  icon:'success',
                  title: 'Felicidades',
                  showConfirmButton: false,
                  timer: 1700,
                  text: 'Pedido enviado con exito',
                })
              }
          }
        })          
        } catch (error) {
          console.log(error.response.data);
          Swal.fire({
            icon:'error',
            title: 'Ups...',
            showConfirmButton: false,
            timer: 1700,
            text: 'Hubo un error con su pedido',
          })
        }

    }

    const handleEnviarPedido = async (token) => { 
      if(usuario.length < 1){
        dispatch(changeMostrar(true))
      }
      findRoutes(token)
    }

    const constAbrirModal = () => {
      if(usuario.length < 1){
        return dispatch(changeMostrar(true))
      }
      setModalDireccion(state => !state)
    }
    console.log(pedido);
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
          <section className={styles.fecha_completa_container}>
            <button>
              <ArrowBackIosNewRoundedIcon/>
            </button>
            {fechaCompleta2}
            <button>
              <ArrowForwardIosRoundedIcon/>
            </button>
          </section>
        </div>
       
        <div>
          <h4>Categorias</h4>
          {
            categorias?.map(categoria => {
              return(
                <a href={"#" + categoria.idcategory} id={"#" + categoria.idcategory} key={categoria.id}>{categoria.namecategory} ({categoria.elements})</a>
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
              <div key={categoria.category.idcategory} id={categoria.category.idcategory} className={styles.plato_categories_container}>
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
                                    height: 90px;
                                    width: 90px;
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
                                <h4 onClick={() => setZoomPlato(platos)}>{platos.name}</h4>
                                <p>{platos.description}</p>
                              </div>

                              <div className={styles.plato_product_buttons_container}>
                                <span>S/.{platos.price}</span>
                                <div>
                                  <button type='button' onClick={() => dispatch(deleteFromCart(platos))}> - </button>
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
                                      height: 70px;
                                      width: 70px;
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
                                    <button type='button' onClick={() => dispatch(deleteFromCart(producto))}> - </button>
                                    <span>{producto.quantity}</span>
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
              <select value='Seleccione una opcion' name="" id="" onChange={(e) =>setPedido({...pedido ,  service: {idservice: data?.services[e.target.value].id , typemoney:data?.services[e.target.value].typemoney , price: data?.services[e.target.value].price}})}>
                <option hidden selected>Selecciona una opción</option>
                  {
                      data?.services?.map((item , index) => {
                        if(item.id !== 1){
                          return(
                            <option 
                            onClick={() => setPedido({...pedido ,  service: {idservice: item.id , typemoney: item.typemoney , price: item.price}})} 
                            key={item.idschedule} value={index}>
                              {item.name} (S/.{item.price})
                            </option>
                          )
                        }
                      })
                    }
              </select>
            </div>
            <div className={styles.buttonDirecciones_container}>
              <h3>Direccion:</h3>
              <span className={styles.your_address}>{
                pedido.addresscomensal ? pedido.addresscomensal.fulladdress : 'Seleciona una direccion'
                }</span>
              <button 
              className={styles.buttonDirecciones} 
              type='button' 
              onClick={constAbrirModal}>
                {
                  usuario.data ? 'Cambiar' : 'Accede a tu cuenta para selecccionar una direccion'
                }
          
                </button>
                {
                  RangoEntregaUserAddress === false && isrestriction === false ? 
                  <div className={styles.tuUbicacionRango_container_warn}>
                    <p>La ubicacion selecionada esta fuera del area de entrega  pero el negocio no esta restringiendo los pedidos</p>
                  </div> :null
                }
            </div>
            <div>
              <h3>Rango horario:</h3>
              <select name="" id="" onChange={(e) =>setPedido({...pedido ,  schedule: {idschedule: rangosHorarios[e.target.value].idschedule , timezone: rangosHorarios[e.target.value].timezone , endtime: rangosHorarios[e.target.value].endtime , starttime: rangosHorarios[e.target.value].starttime , daterequired: rangosHorarios[e.target.value].date , idcarta: rangosHorarios[e.target.value].idbusiness }})}>
              {
                  rangosHorarios?.map((item , index) => {
                    return(
                      <option value={index} onClick={() => setPedido({...pedido ,  schedule: {idschedule: item.idschedule , timezone: item.timezone , endtime: item.endtime , starttime: item.starttime , daterequired: item.date , idcarta: data.idbusiness }})} key={item.idschedule}>{item.showtocomensal}</option>
                    )
                  })
                }
                <option hidden selected>Selecciona una opción</option>
              </select>
            </div>
            <div>
              <h3>Metodo de pago:</h3>
              <select name="" id="" onChange={(e) => setPedido(
                {...pedido ,  payment: {
                  idpayment: data?.paymentmethods[e.target.value].id,
                  name: data?.paymentmethods[e.target.value].name,
                  phonenumber: data?.paymentmethods[e.target.value].phonenumber,
                  url: data?.paymentmethods[e.target.value].url,
                  hasnumber: data?.paymentmethods[e.target.value].hasnumber
               }}
                )}>
                {
                  data?.paymentmethods?.map((item , index)=> {
                    return(
                      <option  
                      value={index}
                      onClick={() => setPedido({...pedido ,  payment: {
                              idpayment: item.id,
                              name: item.name,
                              phonenumber: item.phonenumber,
                              url: item.url,
                              hasnumber: item.hasnumber
                          }
                        }
                      )
                    } 
                      key={item.id}>
                        {item.name}
                        </option>
                    )
                  })
                }
                <option hidden selected>Selecciona una opción</option>
              </select>
            </div>
        </div>
        <h3>Nota (opcional):</h3>
        <input 
        type="text" 
        name="note" 
        id="" 
        placeholder='Ejm: Monto con el cancelara'
        onChange={e => setPedido({...pedido , [e.target.name] : e.target.value != '' ? e.target.value : 'No se ha agregado ninguna nota'})}
        />
        <h3>DNI o RUC (opcional):</h3>
        <input 
        type="text" 
        name="legalidentity" 
        id="" 
        onChange={e => setPedido({...pedido , informationcomensal: { ...pedido.informationcomensal ,   legalidentity:  e.target.value}})}
        />
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
          <button 
          className={styles.button_enviar_pedido}
          onClick={() => handleEnviarPedido(usuario?.data?.jwt)}
          disabled={
          pedido.elements.length < 1 ||
          pedido.payment == '' ||
          pedido.service == '' ||
          pedido.addresscomensal == '' ||
          pedido.schedule == ''
        }
          >
              <SendRoundedIcon/>
              <span>Enviar pedido</span>
              S/.
              {
                carrito.forEach(item => {
                  
                    contador += item.price * item.quantity
                  })
                  
                }
              {
                contador 
              }
              + Servicio
          </button>
          
      </section>
      {
        modalDireccion && <ModalDireccion  setModalDireccion={setModalDireccion} setPedido={setPedido} pedido={pedido}/>
      }
      <Script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBML2MbvuMTTCUOyVTEyTugHByWE1D5Nj8&libraries=places" />
      {
        zoomPlato !== "" ? 
        <ZoomPlato  zoomPlato={zoomPlato} setZoomPlato={setZoomPlato}/> : null
      }
    </div>
  )
}

export default Carta