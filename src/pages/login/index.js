import React, {PureComponent} from 'react'
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import {LoginWrapper,LoginBox,Input,Button} from './style'
import { actionCreators } from './store'

class Detail extends PureComponent {
    render() {
        const {loginState} = this.props;
        console.log(loginState);
        if(!loginState){  //没有登录的话展示登录页
            return (
                <LoginWrapper>
                    <LoginBox>
                        <Input placeholder="账号" ref={(input)=>{this.account=input}}/>
                        <Input placeholder="密码" type='passworld' ref={(input)=>{this.passworld=input}}/>
                        <Button onClick={()=>this.props.login(this.account,this.passworld)}>登录</Button>
                    </LoginBox>
                </LoginWrapper>
            )
        }else {  //登录的话跳回首页
            return <Redirect to="/"></Redirect>
        }
    }


}

const mapState = (state) => ({
    loginState:state.getIn(['login','login'])
})

const mapDispatch = (dispatch) => ({
    login(account,passworld){
        dispatch(actionCreators.login(account.value,passworld.value))
    }
})

export default connect(mapState, mapDispatch)(Detail)

