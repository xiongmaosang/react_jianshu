import React, {PureComponent} from 'react'
import {ListItem, ListInfo,LoadMore} from '../style'
import {connect} from 'react-redux'
import {BrowserRouter, Route, Link, Redirect, Switch} from 'react-router-dom'
import {actionCreators} from '../store'


class List extends PureComponent {
    render() {
        const {list,getMoreList,page} = this.props;
        return (
            <div>
                {
                    list.map((item, index) => {
                        return (
                            <Link key={index} to={'/detail?id=' + item.get('id')}>
                                <ListItem>
                                    <img className='pic' src={item.get('imgUrl')} alt=""/>
                                    <ListInfo>
                                        <h3 className='title'>{item.get('title')}</h3>
                                        <p className='desc'>{item.get('desc')}</p>
                                    </ListInfo>
                                </ListItem>
                            </Link>

                        );
                    })}
                <LoadMore onClick={()=>{getMoreList(page)}}>更多文字</LoadMore>
            </div>
        )
    }
}

const mapState = (state) => ({
    // list:state.get('home').get('articleList')
    list: state.getIn(['home', 'articleList']),
    page:state.getIn(['home','articlePage'])
});

const mapDispatch = (dispatch) => {
    return {
        getMoreList(page){
            dispatch(actionCreators.getMore(page))
        }
    }
}

export default connect(mapState, mapDispatch)(List)



