import { configureStore} from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper';
import categoriesReducer from './reducers/categoriesReducer';
import infoNegocioReducer from './reducers/infoNegocioReducer';
import platosDelDiaReducer from './reducers/platosReducer'
import productosCarrito from './reducers/productosCarrito';


export const makeStore = () => 
    configureStore({
        reducer: {
            infoNegocio : infoNegocioReducer,
            infoCategories : categoriesReducer,
            platosDelDia : platosDelDiaReducer,
            productosCarrito : productosCarrito
        },
    devTools: true,
});

export const wrapper = createWrapper(makeStore)