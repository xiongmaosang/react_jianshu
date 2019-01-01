import React, {PureComponent} from 'react'
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'


class Write extends PureComponent {
    render() {
        const {loginState} = this.props;

        if(loginState){  // 已经登录的话展示写文章页
            return (
                <div>写文章页面</div>
            )
        }else {  // 没登录的话跳回登录页
            return <Redirect to="/login" />
        }
    }


}

const mapState = (state) => ({
    loginState:state.getIn(['login','login'])
})

const mapDispatch = (dispatch) => ({

})

export default connect(mapState, mapDispatch)(Write)

