import { combineReducers } from 'redux'

import authReducer from './AuthReducer'
import productReducer from './ProductReducer'

export const reducers = combineReducers({ authReducer, productReducer })
