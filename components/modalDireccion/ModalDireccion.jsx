import React, { useEffect, useState } from 'react'
import styles from './ModalDireccion.module.scss'
import usePlacesAutocomplete, { getGeocode, getLatLng, getZipCode, getDetails } from 'use-places-autocomplete' ;


import {  Combobox,  ComboboxInput,  ComboboxPopover,  ComboboxList,  ComboboxOption,  ComboboxOptionText,} from "@reach/combobox";

import "@reach/combobox/styles.css";
import { useDispatch, useSelector } from 'react-redux'


//iconos
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { GetAllDirecciones } from '../../redux/actions/usuarioAction';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Radio } from '@mui/material';
import { getRangeUser } from '../../redux/reducers/RangoReducer';
import dynamic from 'next/dynamic';
import Script from 'next/script';
// const latLng = dynamic(
//   () => import('leaflet/'),
//   {ssr: false}
// )

// const L = dynamic(
//   () => import("leaflet/"),
//   { ssr: false }
// )
import('leaflet').then(obj => L)
const ModalDireccion = ({setModalDireccion , setPedido , pedido}) => {
  const infoNegotion = useSelector(state => state.infoNegocio.infoNegocio.data)
  const direccionesUsuario = useSelector(state => state.infoUsuario.direccionesUsuario.data)
  const {usuario} = useSelector(state => state.infoUsuario)
  const dispatch = useDispatch()
  const {circleRanges}= useSelector(state => state.rangoEntrega)
  const [direccionSelecionada , setDireccionSeleccionada] = useState({
    latitude: '' ,
    longitude:'',
    postalcode: '',
    state: '' ,
    city: '',
    name:'' ,
    fulladdress:'' ,
    reference:''
  })
  const [UserUbication , setUserUbication ] = useState('')
  useEffect(() => {
    if(usuario?.data?.jwt){
      dispatch(GetAllDirecciones(usuario.data.jwt))
    }
  }, [])

  useEffect(() => {
    setModalDireccion('Tus direcciones')
  }, [])
   

    const {
        ready,
        value,
        suggestions : { status, data },
        setValue,
        clearSuggestions,
      } = usePlacesAutocomplete();

    const [estadoModal , setEstadoModal ] = useState('Tus direcciones')

    const [selectedDirection , setSelectedDirection ] = useState({
      checked: null,
    })


    const initialStateDireccion = {
      latitude: '' , 
      longitude: '' ,
      name:'',
      fulladdress: '',
      postalcode:'',
      state:'',
      city:'',
      reference: '',
  }

    const [cordenadasMapa , setCordenadasMapa ] = useState({
        latitude: '' , 
        longitude: '' ,
        name:'',
        fulladdress: '',
        postalcode:'',
        state:'',
        city:'',
        reference: '',
    })

      const handleInput = (e) => {
        setValue(e.target.value);
      };
    
      const handleSelect = (val) => {
        setValue(val, false);
      };

      const handleSelect1 = (val , description ,place_id) => {
          setValue(val, false);
          console.log('entreee1111111111111');
          let state;
          let country;
        getGeocode({ address: description }).then((results) => {
            const { lat, lng } = getLatLng(results[0]);
            const zipCode = getZipCode(results[0], false);
            console.log("ZIP Code: ", zipCode);
            console.log("📍 Coordinates: ", { lat, lng });
            setCordenadasMapa(
              { latitude: lat , 
                longitude:lng, 
                fulladdress : description, 
                postalcode: zipCode ? Number(zipCode) : 15054, 
                city: state , 
                state: country,
                name:'',
                reference:''
              })
            setEstadoModal('Mapa')
          });

          getDetails({ placeId: place_id})
          .then((details) => {
            console.log(details);
            details.address_components.forEach(item => {
              if(item.types.includes('locality')){
                 state = item.short_name
              }
              if(item.types.includes('country')){
                country = item.short_name
              }
            })
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
      };

      const handleLogin = (datos) =>  {
        e.preventDefault();
        console.log(datos);
      }

      const handleTuDirectionSelect = e => {
        setSelectedDirection({ checked : e.target.value})
      }

      const AddDirecction = async (token) =>  {
        const config = {
            headers: { 
                Authorization: `${token}`,
            }
        };
        try {
              await axios.post(
                `http://c-registro-authenticacion.restoner-api.fun/v1/comensal/address`,
                cordenadasMapa,
                config
                ).then(
                  Swal.fire({
                    icon:'success',
                    title: 'Direccion creada con exito !',
                    showConfirmButton: false,
                    timer: 1000,
                    text: ':)',
                    iconColor: '#ff0d4a'
                  })
                ).then(
                  dispatch(GetAllDirecciones(usuario.data.jwt))
                ).
                then(setEstadoModal('Tus direcciones'))
        } catch (error) {
          console.log(error);
        }
    }
      const deleteDirecction = async (token , idAddress) =>  {
        const config = {
            headers: { 
                Authorization: `${token}`,
            }
        };
        try {
                  Swal.fire({
                    title: '¿Estas seguro que deseas eliminar esta direccion?',
                    text: "La dirección sera eliminada de forma permanente",
                    icon: 'warning',
                    iconColor: '#ff0d4a',
                    showCancelButton: true,
                    confirmButtonColor: '#ff0d4a',
                    cancelButtonColor: '#88888a;',
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'Cancelar'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(
                        `http://c-registro-authenticacion.restoner-api.fun/v1/comensal/address/${idAddress}`
                      , config).then(
                        dispatch(GetAllDirecciones(usuario.data.jwt))
                      ).then(
                        Swal.fire({
                          icon:'success',
                          title: 'Direccion eliminada con exito !',
                          showConfirmButton: false,
                          timer: 1000,
                          text: ':(',
                          iconColor: '#ff0d4a'
                        })
                      )
                    }
                  })
        } catch (error) {
          console.log(error);
        }
    }

    const handleSelecionarDireccion = () => {
      setPedido({...pedido , addresscomensal: direccionSelecionada})
      Swal.fire({
        icon:'success',
        title: 'Direccion selecciona con exito!',
        showConfirmButton: false,
        timer: 1000,
        text: ':)',
        iconColor: '#ff0d4a'
      })
      setDireccionSeleccionada(initialStateDireccion)
      setModalDireccion(false)
      setUserUbication(direccionSelecionada)
      if(L){
        dispatch(getRangeUser(L.latLng(infoNegotion.address.latitude , infoNegotion.address.longitude).distanceTo({ lat:direccionSelecionada.latitude , lng:direccionSelecionada.longitude}) < (infoNegotion?.delivery.metters)))
      }
    }
  return  estadoModal === 'Mapa' ? (
    <div className={styles.container_alert}>
        <div className={styles.container_modal_direccion}>
        <CloseRoundedIcon className={styles.close_modal_direction} onClick={() => setModalDireccion(false)}/>
          <div className={styles.iframe_container}>
            <ArrowBackRoundedIcon onClick={() => setEstadoModal('Direcciones')}/>
            <iframe
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBML2MbvuMTTCUOyVTEyTugHByWE1D5Nj8
            &q=${cordenadasMapa.fulladdress}"
            `}>
            </iframe> 
            <p>{cordenadasMapa.fulladdress}</p>
            <button type='button' onClick={() => setEstadoModal('Detalles')}>Continuar</button>
        </div> 
      </div>
      </div>
      ) : estadoModal === 'Direcciones' ?(
        <div className={styles.container_alert}>
          <div className={styles.container_modal_direccion}>
          <CloseRoundedIcon className={styles.close_modal_direction} onClick={() => setModalDireccion(false)}/>
            <Combobox className={styles.Chombobox_container}  onSelect={handleSelect} aria-label='Chose a frruit'>
                  <ComboboxInput className={styles.inputDirection}  value={value} onChange={handleInput} disabled={!ready} placeholder='Tu ubicacion'/>
                      <ComboboxList>
                      {
                          data?.map(({ place_id, description }) => (
                          <ComboboxOption className={styles.option} key={place_id} value={description} onClick={() =>handleSelect1(value,description,place_id)} />
                      ))}
                      </ComboboxList>
              </Combobox> 
          </div>
      </div>
    ) : estadoModal === 'Tus direcciones' ?(
      <div className={styles.container_alert}>
      <div className={styles.container_modal_direccion}>
        <CloseRoundedIcon className={styles.close_modal_direction} onClick={() => setModalDireccion(false)}/>
          <form action={handleLogin} className={styles.form_container_direcciones}>
            <div className={styles.tusDirecciones_container}>
              {
                direccionesUsuario.length > 0 ?
                direccionesUsuario?.map( item => {
                  return(
                    <div className={styles.form_inputs_direcciones_container} key={item.id}>
                      <DeleteRoundedIcon onClick={() => deleteDirecction(usuario.data.jwt , item.id )}/>
                      <div className={styles.info_direccion_usuario}>
                        <label htmlFor={item.name}>{item.name}</label>
                        <p>{item.fulladdress}</p>
                      </div>
                      <Radio
                      value={item.fulladdress} 
                      id={item.name} 
                      onChange={handleTuDirectionSelect}
                      checked={selectedDirection.checked === item.fulladdress}
                      onClick={() => setDireccionSeleccionada(
                        {
                          latitude: item.latitude, 
                          longitude: item.longitude ,
                          name: item.name,
                          fulladdress: item.fulladdress,
                          postalcode:item.postalcode,
                          state:item.state,
                          city:item.state,
                          reference: item.reference,
                        }
                        
                        )}
                      sx={{
                        color: "#FF0D4A",
                        "&.Mui-checked": {
                          color: "#FF0D4A",
                        },
                      }}
              />
                    </div>
                  )
                }) : <p>No tienes Direcciones disponibles, agrega una para poder realizar el envio</p>
              }
              
            </div>
            <div className={styles.buttons_tusDirecciones_container}>
              <button type='button' onClick={() => setEstadoModal('Direcciones')}>Agregar nueva direccion</button>
              <button type='button' className={styles.buttonDireccion2} onClick={handleSelecionarDireccion} disabled={direccionSelecionada.city === ''}>Continuar</button>
            </div>
          </form>
      </div>
  </div>
    ) : (
      <div className={styles.container_alert}>
      <div className={styles.container_modal_direccion}>
      <ArrowBackRoundedIcon onClick={() => setEstadoModal('Mapa')}/>
        <div className={styles.Detalles_container}>
          <CloseRoundedIcon className={styles.close_modal_direction} onClick={() => setModalDireccion(false)}/>
            <h3>Agregar detalles</h3>
            <h4 className={styles.direccion}>Direccion</h4>
            <p>{cordenadasMapa.fulladdress}</p>
            <h4 className={styles.nombre}>Nombre  <small>*obligarotio</small></h4>
            <input 
            type="text" 
            name="name" 
            id="" 
            placeholder='Ejm: Casa1 ,Trabajo'
            onChange={(e)=> {
              setCordenadasMapa({...cordenadasMapa , [e.target.name] : e.target.value})
            }}
            />
            <h4 className={styles.detalles}>Detalles(opcional)</h4>
            <input 
            type="text" 
            name="reference" 
            id="" 
            placeholder='Detalle de la direccion'
            onChange={(e)=> {
              setCordenadasMapa({...cordenadasMapa , [e.target.name] : e.target.value})
            }}
            />
            <button type='button' disabled={cordenadasMapa.name.length < 2} onClick={() => AddDirecction(usuario.data.jwt)}>Guardar direccion</button>
        </div>
      </div>
      <Script src="js/leaflet/leaflet.js"></Script>  
      <Script src="js/main.js"></Script>
    </div>
    )
}

export default ModalDireccion