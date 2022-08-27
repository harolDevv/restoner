import { configureStore} from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper';
import infoNegocioReducer from './reducers/infoNegocioReducer';

export const makeStore = () => 
    configureStore({
        reducer: {
            infoNegocio : infoNegocioReducer
        },
    devTools: true,
});

export const wrapper = createWrapper(makeStore)