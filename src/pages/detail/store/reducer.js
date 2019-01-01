import {fromJS} from 'immutable'  //fromJS把JS对象转化成immutable对象
import * as actionTypes from './actionTypes'

const defaultState = fromJS({
    title:'',
    content:''
});

export default (state = defaultState, action) => {
    switch (action.type) {  //return出去了break就不用写也不会执行了
        case actionTypes.CHANGE_DETAIL:
            return state.merge({
                title:action.title,
                content:action.content
            });
        default:
            return state
    }
}




