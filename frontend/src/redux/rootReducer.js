import { combineReducers } from 'redux'

import authReducer from './auth'
import shiftsReducer from './shifts'

const rootReducer = combineReducers({
  auth: authReducer,
  shifts: shiftsReducer
})

export default rootReducer
