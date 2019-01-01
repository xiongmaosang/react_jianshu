import React, {Component} from 'react';

import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    NavSearch,
    SearchInfoItem,
    SearchInfoList,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    Addition,
    Button,
    SearchWrapper
} from './style'
import {CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';
import {actionCreators} from './store' //所有的导出都在index.JS
import {actionCreators as loginActionCreators} from '../../pages/login/store' //引入别的组件的actionCreator


import {Link} from 'react-router-dom'

class Header extends Component {

    getListArea() {
        const { focused,logout,list,page,mouseIn,totalPage,handleMouseEnter,handleMouseLeave,handleChangePage } = this.props;
        const newList = list.toJS() ; //list是immutable的对象，转换成普通的JS数组
        const pageList = [];

        for( let i = (page-1)*10; i< page*10 ; i++ ) {  //第一页是0-10 ，第二页是10-20

            if(newList[i]){
                pageList.push(
                    <SearchInfoItem key={newList[i]}> {newList[i]} </SearchInfoItem>
                )
            }
        }

        if (focused || mouseIn) {
            return (
                <SearchInfo onMouseEnter={handleMouseEnter}  onMouseLeave={handleMouseLeave}>
                    <SearchInfoTitle>热门搜索</SearchInfoTitle>

                    <SearchInfoSwitch onClick={()=>handleChangePage(page,totalPage,this.spinIcon)}>
                        <i ref={(icon)=>{this.spinIcon = icon}} className='iconfont spin'>&#xe851;</i>
                        换一批
                    </SearchInfoSwitch>

                    <SearchInfoList>
                    {pageList}
                    </SearchInfoList>
                </SearchInfo>
            )
        } else {
            return null
        }
    }

    render() {
        const { focused, list ,handleInputFocus,handleInputBlur,login,logout } = this.props
        return (
            <HeaderWrapper>
                <Link to="/">
                    <Logo></Logo>
                </Link>
                <Nav>
                    <NavItem className="left active">首页</NavItem>
                    <NavItem className="left">下载APP</NavItem>
                    {
                        login?
                            <NavItem onClick={logout} className="right">退出</NavItem>:

                            <Link to="login">
                                <NavItem className="right">登录</NavItem>
                            </Link>

                    }
                    <NavItem className="right">
                        <i className="iconfont">&#xe636;</i>
                    </NavItem>

                    <SearchWrapper>
                        <CSSTransition
                            timeout={200}
                            in={focused}
                            classNames='slide'
                        >
                            <NavSearch
                                onFocus={()=>handleInputFocus(list)}
                                onBlur={handleInputBlur}
                                className={focused ? 'focused' : ''}>
                            </NavSearch>
                        </CSSTransition>

                        <i className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}>&#xe614;</i>

                        {this.getListArea()}
                    </SearchWrapper>

                </Nav>
                <Addition>
                    <Link to="/write">
                        <Button className="writting"><i className="iconfont">&#xe615;</i>写文章</Button>
                    </Link>
                    <Button className="reg">注册</Button>
                </Addition>
            </HeaderWrapper>
        )
    }
}


// const mapStateToProps = (state) => {  //state就是store里面所有的数据
//     return {
//         focused: state.header.focused //用了combineReducers 数据结构多了一层
//     }
// };

const mapStateToProps = (state) => {  //state就是store里面所有的数据
    return {
        //state.header 已经是imutable类型的数据了,这种数据要通过get去获取
        // focused: state.header.get('focused')

        // focused: state.get('header').get('focused')
        focused: state.getIn(['header', 'focused']), //另一种写法
        list:state.getIn(['header', 'list']),
        page:state.getIn(['header', 'page']),
        totalPage:state.getIn(['header', 'totalPage']),
        mouseIn: state.getIn(['header', 'mouseIn']),
        login: state.getIn(['login', 'login']),
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        handleInputFocus(list) {
            console.log(list);
            if(list.size === 0){  // 优化 防止发无畏请求
                dispatch(actionCreators.getList()) // 聚焦时请求数据
            }

            const action = actionCreators.searchFocus(); //列表的显示
            dispatch(action)
        },
        handleInputBlur() {
            const action = actionCreators.searchBlur();
            dispatch(action)
        },
        handleMouseEnter(){
            dispatch(actionCreators.mouseEnter())
        },
        handleMouseLeave(){
            dispatch(actionCreators.mouseLeave())
        },
        handleChangePage(page,totalPage,spin){
            // ---------------------转圈----------------
            let originAngle = spin.style.transform.replace(/[^0-9]/ig,'') // 对非数字的内容进行替换
            if(originAngle){
                originAngle = parseInt(originAngle,10)
            }else {
                originAngle = 0
            }
            spin.style.transform = 'rotate('+( originAngle+360 )+'360deg)';

            console.log(page+'/'+totalPage)

            // ---------------------分页------------------
            if( page<totalPage ){
                dispatch(actionCreators.changePage(page+1))
            }else {
                dispatch(actionCreators.changePage(1))  //最后一页了恢复到第一页
            }
        },
        logout(){
            dispatch(loginActionCreators.logout())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header)
