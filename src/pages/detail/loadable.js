import React from 'react'
import Loadable from 'react-loadable';

const LoadableBar = Loadable({
    loader: () => import('./index'), //异步加载哪个文件
    loading(){
        return (
            <div>正在加载</div>
        )
    }
});

export default ()=> <LoadableBar/>



