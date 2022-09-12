import { configureStore} from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper';
import categoriesReducer from './reducers/categoriesReducer';
import infoNegocioReducer from './reducers/infoNegocioReducer';
import MostrarModalReducer from './reducers/modalAlertReducer';
import platosDelDiaReducer from './reducers/platosReducer'
import productosCarrito from './reducers/productosCarrito';
import RangoReducer from './reducers/RangoReducer';
import RangosHorariosReducer from './reducers/RangosHorariosReducer';
import usuarioReducer from './reducers/usuarioReducer';
import PostsReducer from './reducers/PostReducer';


export const makeStore = () => 
    configureStore({
        reducer: {
            infoNegocio : infoNegocioReducer,
            infoCategories : categoriesReducer,
            platosDelDia : platosDelDiaReducer,
            productosCarrito : productosCarrito,
            rangosHorarios : RangosHorariosReducer,
            infoUsuario : usuarioReducer,
            mostrarModal: MostrarModalReducer,
            rangoEntrega : RangoReducer,
            PostsReducer: PostsReducer
        },
    devTools: true,
});

export const wrapper = createWrapper(makeStore)