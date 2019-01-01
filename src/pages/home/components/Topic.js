// 专题
import React,{PureComponent} from 'react'
import { TopicWrapper,TopicItem } from '../style'
import {connect} from 'react-redux' //让组件和store做链接
class Topic extends PureComponent {
    render(){
        const {list} = this.props

        return (
            <TopicWrapper>
                {
                    list.map((item) =>
                        <TopicItem key={item.get('id')}>
                            <img
                                className='topic-pic'
                                src={item.get('imgUrl')}
                                alt=''
                            />
                            {item.get('title')}
                        </TopicItem>
                    )
                }
            </TopicWrapper>
        )
    }
}

const mapStateToProps = (state) => ({
    list:state.get('home').get('topicList')
});


export default connect(mapStateToProps,null)(Topic)