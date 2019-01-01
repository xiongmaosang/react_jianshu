// import {combineReducers} from 'redux'  //combine 结合的意思
import {combineReducers} from 'redux-immutable'  //redux-immutable也提供了此函数

import { HeaderReducer } from '../common/header/store/index'
import {reducer as HomeReducer} from '../pages/home/store/'
import {reducer as DetailReducer} from '../pages/detail/store/'
import {reducer as LoginReducer} from '../pages/login/store/'


const reducer =  combineReducers({   // 合并一个个小的reducer
    header:HeaderReducer,
    home:HomeReducer,
    detail:DetailReducer,
    login:LoginReducer,
})

export default reducer  // 导出总的reducer





