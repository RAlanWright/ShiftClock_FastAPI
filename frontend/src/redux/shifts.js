import initialState from './initialState'
import apiClient from '../services/apiClient'

export const CREATE_SHIFT = '@@shifts/CREATE_SHIFT'
export const CREATE_SHIFT_SUCCESS = '@@shifts/CREATE_SHIFT_SUCCESS'
export const CREATE_SHIFT_FAILURE = '@@shifts/CREATE_SHIFT_FAILURE'

export const FETCH_SHIFT_BY_ID = '@@shifts/FETCH_SHIFT_BY_ID'
export const FETCH_SHIFT_BY_ID_SUCCESS = '@@shifts/FETCH_SHIFT_BY_ID_SUCCESS'
export const FETCH_SHIFT_BY_ID_FAILURE = '@@shifts/FETCH_SHIFT_BY_ID_FAILURE'
export const CLEAR_CURRENT_SHIFT = '@@shifts/CLEAR_CURRENT_SHIFT'

export default function shiftsReducer(state = initialState.shifts, action = {}) {
  switch (action.type) {
    case FETCH_SHIFT_BY_ID:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_SHIFT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        currentShift: action.data
      }
    case FETCH_SHIFT_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        currentShift: {}
      }
    case CLEAR_CURRENT_SHIFT:
      return {
        ...state,
        currentShift: null
      }
    case CREATE_SHIFT:
      return {
        ...state,
        isLoading: true
      }
    case CREATE_SHIFT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: {
          ...state.data,
          [action.data.id]: action.data
        }
      }
    case CREATE_SHIFT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state
  }
}

export const Actions = {}

Actions.clearCurrentShift = () => ({ type: CLEAR_CURRENT_SHIFT })

Actions.createShift = ({ new_shift }) => {
  return apiClient({
    url: `/shifts/`,
    method: `POST`,
    types: {
      REQUEST: CREATE_SHIFT,
      SUCCESS: CREATE_SHIFT_SUCCESS,
      FAILURE: CREATE_SHIFT_FAILURE
    },
    options: {
      data: { new_shift },
      params: {}
    }
  })
}

Actions.fetchShiftById = ({ shift_id }) => {
  return apiClient({
    url: `/shifts/${shift_id}/`,
    method: `GET`,
    types: {
      REQUEST: FETCH_SHIFT_BY_ID,
      SUCCESS: FETCH_SHIFT_BY_ID_SUCCESS,
      FAILURE: FETCH_SHIFT_BY_ID_FAILURE
    },
    options: {
      data: {},
      params: {}
    }
  })
}