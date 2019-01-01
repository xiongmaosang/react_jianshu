import * as actiontypes from './actionTypes'
import { fromJS } from 'immutable'  //fromJS把JS对象转化成immutable对象

// const defaultState = {
//     focused: false
// }

const defaultState = fromJS({
    focused: false,
    mouseIn: false, //显示隐藏不只是有聚焦控制，鼠标移入移出都控制
    list:[],
    page:1,      // 第几页
    totalPage:1  // 一共有几页
})

export default (state = defaultState, action) => {
    if (action.type === actiontypes.SEARCH_FOCUS) {
        // const newState = JSON.parse(JSON.stringify(state))

        // newState.focused = true;
        // return newState

        return state.set('focused',true)  //设置的话也要通过set去设置
        // immutable对象的set方法，会结合之前immutable对象的值和设置的值，
        // 返回一个全新的对象，所以一样没有对之前的数据进行修改
    }

    if (action.type === actiontypes.SEARCH_BLUR) {
        return state.set('focused',false)  //设置的话也要通过set去设置
    }


    if(action.type === actiontypes.CHANGE_LIST){   // 改变列表数据
        // return state.set('list',action.data).set('totalPage',action.totalPage)
        return state.merge({
            list:action.data,
            totalPage:action.totalPage,
        })
    }

    if(action.type === actiontypes.MOUSE_ENTER){
        return state.set('mouseIn',true)
    }

    if(action.type === actiontypes.MOUSE_LEAVE){
        return state.set('mouseIn',false)
    }

    if(action.type === actiontypes.CHANGE_PAGE){
        return state.set('page',action.page)  //等于下一页
    }

    return state
}


