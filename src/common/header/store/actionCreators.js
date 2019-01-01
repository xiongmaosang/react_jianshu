import * as actionTypes from './actionTypes'
import {fromJS} from 'immutable'
import axios from 'axios';

export const searchFocus = () => {
    return {
        type: actionTypes.SEARCH_FOCUS
    }
}

export const searchBlur = () => {
    return {
        type: actionTypes.SEARCH_BLUR
    }
}

const changeList = (data)=>{
    return {
        type:actionTypes.CHANGE_LIST,
        data:fromJS(data), //把普通数组转化成immutable类型
        totalPage:Math.ceil(data.length / 10)  //取整
    }
}

export const getList = () => {
    return (dispatch)=>{
        axios.get('/api/headerList.json').then((res)=>{
            const data = res.data.data;

            dispatch(changeList(data)) //dispatch(action)
        })
    }
}

export const mouseEnter = () => {
    return {
        type: actionTypes.MOUSE_ENTER
    }
}

export const mouseLeave = () => {
    return {
        type: actionTypes.MOUSE_LEAVE
    }
}

export const changePage = (page,totalPage) => {
    return {
        type: actionTypes.CHANGE_PAGE,
        page,
    }
}
