import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getInfoNegotion } from '../../../redux/actions/infoNegotionAction'
import { getInformationPosts } from '../../../redux/actions/PostsActions'
import styles from './posts.module.scss'


//iconos
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import Image from 'next/image'
import ZommPost from '../../../components/zoomPost/ZommPost'


const Posts = () => {
    const { query: {uniquename} } = useRouter()
    const {data} = useSelector(state => state.infoNegocio.infoNegocio)
    const {Posts} = useSelector(state => state.PostsReducer)
    const dispatch = useDispatch()

    const [zoomPost, setZoomPost] = useState('')

    useEffect(() => {
        dispatch(getInfoNegotion(uniquename))
      }, [uniquename])

      useEffect(() => {

        if(data){
                dispatch(getInformationPosts(data.idbusiness , 40))
            }
        }, [data])

  return (
    <div className={styles.posts_father_container}>
      <section className={styles.posts_header_container}>
      <Link href={`/anfitrion/${uniquename}`}>
          <button type=''>
            <ArrowBackIosNewRoundedIcon/>
            Ver negocio
          </button>
        </Link>
        <h3>{data?.name}</h3>
      </section>
      <section className={styles.posts_body_container}>
        <h4>Publicaciones</h4>
        <div className={styles.posts_father_container}>
            {
              Posts?.data?.length > 0 ? 
              Posts.data.map(post => {
                  return(
                      <div 
                      key={post.id} 
                      className={styles.post_container} 
                      onClick={() => setZoomPost(post)}
                      >
                          
                          <Image
                          src={post.url}
                          alt={'post'} 
                          width={200}
                          height={356}
                          />
                      </div>
                  )
              })
              : null
            }
        </div>
      </section>
      {
        zoomPost != '' ? 
        <ZommPost  zoomPost={zoomPost} setZoomPost={setZoomPost}/> : null 
      }
    </div>
  )
}

export default Posts