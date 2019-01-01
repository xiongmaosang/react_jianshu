import axios from "axios";
import * as actionTypes from './actionTypes'
import {fromJS} from 'immutable'

const changeHomeData = (result)=>{
    return {
        type: actionTypes.CHANGE_HOME_DATA,
        topicList: result.topicList,
        articleList: result.articleList,
        recommendList: result.recommendList,
    }
};

const addHomeList =(list,nextPage)=>{
    return {
        type:actionTypes.ADD_HOME_LIST,
        list:fromJS(list),  //List和immutable是一样的
        nextPage
    }
};





export const getHomeInfo = ()=>{
    return (dispatch) => {
        axios.get('/api/home.json').then((res) => {
            const result = res.data.data;
            const action = changeHomeData(result)

            dispatch(action)
        })
    }
}


export const getMore = (page)=>{
    return (dispatch)=> {
        axios.get('/api/homeList.json?page='+page).then((res) => {
            const result = res.data.data;
            dispatch(addHomeList(result,page+1))
        })
    }
}


export const toggleTopShow = (flag)=>({
    type:actionTypes.TOGGLE_SCROLL_TOP,
    flag
})








