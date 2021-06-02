import React, { useState, useContext } from 'react';
import ShowMore from '../../shared/ShowMore';
import  ConfirmModal from '../../shared/Confirm';
import { MemoContext } from '../../../context/MemoContext';
import moment from 'moment';

const Memo = ({memo}) => {

    const { removeMemo, memos, setMemos } = useContext(MemoContext)
    const [mouse, setMouse] = useState(false);
    const [ showModal, setShowModal ] = useState(false);
    const archieveMessage = 'Memo will be deleted. Are you sure ?'
    
    const hideArchieveModal = () => {
        setShowModal(false);
    }
    const archieve = () => {
        console.log(memo.id);
        
        removeMemo({
            variables: {
                id: memo.id
            },
            update(_, result){
                setMemos([...memos].filter(_memo => memo.id != _memo.id))
            }
        });
        setShowModal(false);
    }

    return (
                <div className="timeline-item is-primary" 
                    onMouseEnter={() => setMouse(true)}
                    onMouseLeave={() => setMouse(false)}
                >
                    <ConfirmModal show={showModal} handleClose={hideArchieveModal} handleSubmit={archieve} message={archieveMessage}/>

                    <div className="timeline-marker is-primary"></div>
                    <div className="timeline-content">
                        <div className="card">
                            <div className="card-content">
                                <p className="heading">{moment.unix(memo.createdAt/1000).format('MMMM Do YYYY')}</p>
                                <ShowMore content={memo.content} limit={100}/>
                                {
                                    memo.tags.map((m,i) => (
                                        <span className="tag is-info mg-r-5" key={i}>{m}</span>
                                    ))
                                }
                            </div>
                        </div>
                        <div>
                            {
                                mouse && (
                                    <div className="mg-t-10">
                                        <span className="pointer mg-r-10" onClick={() => setShowModal(true)}>
                                            <i className="fa fa-trash" ></i>
                                        </span>
                                        <span className="pointer mg-r-10">
                                            <i className="fa fa-pen" ></i>
                                        </span>
                                    </div>
                                )
                                    // <i className="pointer fa fa-pen" ></i>
                            }
                        </div>
                </div>
        </div>
    )

}

export default Memo;