import React from 'react'
import parse from 'html-react-parser';
import formatTime from '../../utils/formatTime';
import { TimeIcon } from '@chakra-ui/icons'

export default function Response({ response }) {
    return (
        <>



            <div className='history-filter'>
                <div className='history-content'>
                    <div className='inner tf-filter-container'>
                        <div className="history-content">

                            <div className="history-details tf-loadmore 3d" style={{ width: '100vh' }}>
                                <div className="avatar">
                                    <img src="/assets/images/author/user.png" alt="images" id="circular-image" />
                                    <a href="#" className="name">{response.created_by}</a>
                                </div>
                                <div className="authorr" style={{ width: '100vh' }}>

                                    <div className="content">

                                        <div className="date">
                                            <span> <TimeIcon /></span>
                                            <span className="month">{formatTime(response.created_at)}</span>
                                        </div>
                                        <div className="description">{parse(response.response_text)}</div>

                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
