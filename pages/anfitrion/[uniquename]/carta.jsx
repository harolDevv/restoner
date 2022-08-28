import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getInfoNegotion } from '../../../redux/actions/infoNegotionAction'
import { getInfoCategoriesAction } from '../../../redux/actions/categoriesAction'
import styles from './carta.module.scss'
import Link from 'next/link'

//iconos
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

const Carta = () => {
  let today = new Date()
  let dd = today.getDay() === 0 ? 7 : today.getDay()
  console.log(dd);

  const { query: {uniquename} } = useRouter()
  const dispatch = useDispatch()
  const {data} = useSelector(state => state.infoNegocio.infoNegocio)
  const categorias = useSelector(state => state.infoCategories.categoriesBussines.data)

  useEffect(() => {
          dispatch(getInfoNegotion(uniquename))
    }, [uniquename])


  useEffect(() => {
    console.log('estoy en el useEfect');
      if(data) {
        dispatch(getInfoCategoriesAction(data.idbusiness , '2022-08-26'))
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
      <section className=''>
        Platos
      </section>
      <section className=''>
        Platos escogidos
      </section>
    </div>
  )
}

export default Carta