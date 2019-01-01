import {fromJS} from 'immutable'  //fromJS把JS对象转化成immutable对象
import * as actionTypes from './actionTypes'

const defaultState = fromJS({
    login:false
});

export default (state = defaultState, action) => {
    switch (action.type) {  //return出去了break就不用写也不会执行了
        case actionTypes.CHANGE_LOGIN:
            return state.set('login',action.value)
        case actionTypes.LOGINOUT:
            return state.set('login',action.value)
        default:
            return state
    }
}