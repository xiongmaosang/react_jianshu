import React, { PureComponent } from 'react'
import { RecommendWrapper, RecommendItem } from '../style'
import { connect } from 'react-redux'

class Recoment extends PureComponent {
    render() {
        return (
            <RecommendWrapper>
                {
                    this.props.list.map((item, index) => {
                        return <RecommendItem imgUrl={item.get('imgUrl')} key={item.get('id')}></RecommendItem>
                    })
                }
            </RecommendWrapper>
        )
    }
}
const mapState = (state) => {
    return {
        list: state.getIn(['home', 'recommendList'])
    }
}
export default connect(mapState, null)(Recoment) 