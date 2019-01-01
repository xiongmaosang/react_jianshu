import {fromJS} from 'immutable'  //fromJS把JS对象转化成immutable对象
import * as actionTypes from './actionTypes'

const defaultState = fromJS({
    topicList: [],
    articleList: [],
    recommendList: [],
    articlePage:1,  //加载更多 默认加载第0页数据
    showScroll:false
});

export default (state = defaultState, action) => {
    switch (action.type) {  //return出去了break就不用写也不会执行了
        case actionTypes.CHANGE_HOME_DATA:
            return state.merge({ //普通对象转换成immutable对象
                topicList: fromJS(action.topicList),
                articleList: fromJS(action.articleList),
                recomendList: fromJS(action.recommendList),
            });
        case actionTypes.ADD_HOME_LIST:
            return state.merge({
                articleList: state.get('articleList').concat(action.list),
                articlePage:action.nextPage
            });
        case actionTypes.TOGGLE_SCROLL_TOP:
            return state.merge({
                showScroll:action.flag
            })
        default:
            return state
    }
}




