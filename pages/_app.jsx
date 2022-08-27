import Layout from '../components/layout/Layout'
import { wrapper } from '../redux/store';
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  return(
    <Layout>
      <Component  {...pageProps} />
    </Layout> 
  )
}

export default wrapper.withRedux(MyApp); 
