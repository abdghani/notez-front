import React, { useState, useContext } from 'react';
import { MemoContext } from '../../../context/MemoContext';
import Memo from './Memo';
import Loading from '../../shared/Loading';
import moment from 'moment';
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import {Link} from 'react-router-dom';

const Memos = (props) => {
    const { loadingMemo, memos, daterange, setDateRange } = useContext(MemoContext);
    return (
        <div className="container is-fluid">
            <div className="text-center">
                <DateRangePicker
                    onChange={setDateRange}
                    value={daterange}
                    clearIcon={null}
                />
            </div>

            <div className="mg-t-50">
                {
                    loadingMemo ? (<Loading />) : (
                        <div>
                            {
                                memos.length ? (
                                    <div className="timeline is-centered">
                                        <header className="timeline-header">
                                            <span className="tag is-medium is-primary">{moment(daterange[0]).format('MMMM Do YYYY')}</span>
                                        </header>
                                        {
                                            memos.map((memo, idx) => (
                                                <Memo memo={memo} key={idx} />
                                            ))
                                        }
            
                                        <header className="timeline-header">
                                            <span className="tag is-medium is-primary">{moment(daterange[1]).format('MMMM Do YYYY')}</span>
                                        </header>
                                    </div> ) : ( 
                                        <div className="text-center">
                                            <div>
                                                <i>No memos</i>
                                            </div>
                                            <Link to={'/memos/create'} className="button mg-t-10">Add Now</Link>
                                        </div>

                                    )
                                 
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}
export default Memos;