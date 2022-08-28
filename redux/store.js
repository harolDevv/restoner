import { configureStore} from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper';
import categoriesReducer from './reducers/categoriesReducer';
import infoNegocioReducer from './reducers/infoNegocioReducer';


export const makeStore = () => 
    configureStore({
        reducer: {
            infoNegocio : infoNegocioReducer,
            infoCategories : categoriesReducer
        },
    devTools: true,
});

export const wrapper = createWrapper(makeStore)