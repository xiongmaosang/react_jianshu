import React, {PureComponent} from 'react'
import Topic from './components/Topic'
import Recomment from './components/Recomment'
import List from './components/List'
import Writter from './components/Writter'
import {actionCreators} from './store'
import {HomeWrapper, HomeLeft, HomeRight,BackTop} from './style'
import {connect} from 'react-redux'

class Home extends PureComponent {

    handleScrollTop(){
        window.scrollTo(0,0)
    }
    bindEvents(){
        window.addEventListener('scroll',this.props.changeScrollTopShow)
    }

    render() {
        return (
            <HomeWrapper>
                <HomeLeft>
                    <img className='banner-img'
                         src="//upload.jianshu.io/admin_banners/web_images/4318/60781ff21df1d1b03f5f8459e4a1983c009175a5.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"
                         alt=""/>
                    <Topic/>
                    <List/>
                </HomeLeft>

                <HomeRight>
                    <Recomment/>
                    <Writter/>
                </HomeRight>

                { this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>回到顶部</BackTop> : null }
            </HomeWrapper>
        )
    }

    componentDidMount() {
        this.props.changeHomeData()
        this.bindEvents()
    }

    componentWillUnmount() { // 组件销毁
        window.removeEventListener('scroll',this.props.changeScrollTopShow)
    }
}

const mapState = (state)=>({
    showScroll:state.getIn(['home','showScroll'])
});

const mapDisPatch = (dispatch) => ({
    changeHomeData() {
        dispatch(actionCreators.getHomeInfo())     // store传给reducer
    },
    changeScrollTopShow(e){
        if(document.documentElement.scrollTop>400){
            dispatch(actionCreators.toggleTopShow(true))
        }else {
            dispatch(actionCreators.toggleTopShow(false))
        }
    }
});

export default connect(mapState, mapDisPatch)(Home)


