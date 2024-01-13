import { Empty } from 'antd'
import React from 'react'

function Message() {
    return (
        <div className='empty-message'><Empty description={false} /></div>
    )
}

export default Message