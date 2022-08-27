import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getInfoNegotion } from '../../redux/actions/infoNegotionAction'
import styles from './[uniquename].module.scss'
import Image from 'next/image'

//iconos
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ViewArrayOutlinedIcon from '@mui/icons-material/ViewArrayOutlined';
import TrackChangesRoundedIcon from '@mui/icons-material/TrackChangesRounded';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CallSharpIcon from '@mui/icons-material/CallSharp';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import PinDropRoundedIcon from '@mui/icons-material/PinDropRounded';
import WifiProtectedSetupRoundedIcon from '@mui/icons-material/WifiProtectedSetupRounded';

const days = ['Lunes' , 'Martes' , 'Miercoles' , 'Jueves' , 'Viernes' , 'Sabado' , 'Domingo']
const ProductInfo = () => {
    const { query: {uniquename} } = useRouter()
    const dispatch = useDispatch()
    console.log(uniquename);
    // info del negocio en el state de redux
    const {data} = useSelector(state => state.infoNegocio.infoNegocio)

    console.log(data);
    useEffect(() => {
        console.log(uniquename);
        if(uniquename){
                dispatch(getInfoNegotion(uniquename))
            }
        }, [uniquename])
    
  return (
    <div className={styles.info_negocio_container}>
        <section  className={styles.info_negocio_header_container}>
            <div>
                <h2>{data.name}</h2>
                <p>{data.description}</p>
            </div>
        </section>
        <section  className={styles.info_negocio_details_container}>
            <div className={styles.button_container}>
                <button type='button'>
                    <DashboardRoundedIcon/>
                    Ver carta del dia
                    </button>
            </div>
            <div className={styles.tiposcomida_container}>
                <section className={styles.header_section}>
                    <ViewArrayOutlinedIcon/>
                    <span>Tipos de comida</span>
                </section>
                <section className={styles.tiposcomida_content}>
                {
                        data.typeoffood?.map( types => {
                            return(
                                <div key={types.id} className={styles.tiposcomida_icons}>
                                    <Image
                                    src={types.url}
                                    alt='type food'
                                    width={35}
                                    height={35}
                                    >
                                    </Image>
                                    <span>{types.name}</span>
                                </div>
                            )
                        })
                    }
                </section>
                
            </div>
            <div className={styles.servicios_container}>
                <section className={styles.header_section}>
                    <WifiProtectedSetupRoundedIcon/>
                    <span>Servicios</span>
                </section>
                <section className={styles.servicios_content}>
                    {
                        data.services?.map(services => {
                            return(
                                <div key={services.id} className={styles.servicios_icons}>
                                    <Image
                                    src={services.url}
                                    alt='service'
                                    width={35}
                                    height={35}
                                    >
                                    </Image>
                                    <span className={styles.servicios_names}>{services.name}</span> <span className={styles.servicios_price}>S/. {services.price}</span>
                                </div>
                            )
                        })
                    }
                </section>

            </div>
            <div className={styles.rangoReparto_container}>
                <section className={styles.header_section}>
                    <TrackChangesRoundedIcon/>
                    <span>Rango de reparto</span>
                </section>
                <section></section>

            </div>
            <div className={styles.metodosPago_container}>
                <section className={styles.header_section}>
                    <CreditCardIcon/>
                    <span>Metodos de pago</span>
                </section>
                <section className={styles.metodosPago_content}>
                    {
                        data.paymentmethods?.map(methods => {
                            return(
                                <div key={methods.id} className={styles.pagos_icons}>
                                    <Image
                                    src={methods.url}
                                    alt='service'
                                    width={35}
                                    height={35}
                                    >
                                    </Image>
                                    <span className={styles.pagos_names}>{methods.name}</span> 
                                </div>
                            )
                        })
                    }
                </section>

            </div>
            <div className={styles.direccion_container}>
                <section className={styles.header_section}>
                    <PinDropRoundedIcon/>
                    <span>Direccion</span>
                </section>
                <section className={styles.direccion_content}>
                    <span>Ciudad</span>
                    <p>{data.address.city}, {data.address.state}</p>
                    <span>Direccion Completa</span>
                    <p>{data.address.fulladdress}</p>
                    <span>Referencia</span>
                    <p>{data.address.referenceaddress}</p>
                </section>

            </div>
            <div className={styles.horario_container}>
                <section className={styles.header_section}>
                    <WatchLaterRoundedIcon/>
                    <span>Horario</span>
                </section>
                <section className={styles.horario_content}>
                    <span>Lunes:</span>
                    <span>Lunes:</span>
                    <span>Lunes:</span>
                    <span>Lunes:</span>
                    <span>Lunes:</span>
                    <span>Lunes:</span>
                </section>

            </div>
            <div className={styles.contacto_container}>
                <section className={styles.header_section}>
                    <CallSharpIcon/>
                    <span>Contacto</span>
                </section>
                <section></section>

            </div>
        </section>
    </div>
  )
}

export default ProductInfo