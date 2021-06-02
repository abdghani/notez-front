import React, { useState, useContext, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css';
import TagsInput from 'react-tagsinput';
import { MemoContext } from '../../../context/MemoContext';
import toastr from '../../shared/toastr'

const MemosCreate = (props) => {

    const { addNewMemo ,memos, setMemos } = useContext(MemoContext)
    const [date, setDate] = useState(new Date());
    const [content, setContent] = useState('')
    const [tags, setTags] = useState([])

    const addMemo = () => {
        if(content.length == 0){
            toastr.error("Enter some content");
        }else{
            addNewMemo({
                variables: {
                    mdate: date,
                    content: content,
                    tags: tags
                },
                update(_, result){
                    setMemos([...memos, result.data.createMemo]);
                    initMemo();
                }
            })
        }
    }

    const initMemo = () => {
        setDate(date);
        setContent('');
        setTags([]);
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-content">
                    <div className="field">
                        <label className="label">Content</label>
                        <div className="control">
                            <textarea 
                                className="textarea" 
                                rows="10"
                                value={content} 
                                placeholder="Write Something ..."
                                onChange={e => setContent(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                            <div className="field">
                                <label className="label">Memo Date</label>
                                <DatePicker
                                    className="mg-b-25-force  react-component-cal react-calendar"
                                    onChange={setDate}
                                    clearIcon={null}
                                    value={date}
                                />
                            </div>
                        </div>
                        <div className="column">
                            <label className="label">Tags</label>
                            <TagsInput value={tags} onChange={(e) => setTags(e)} />
                        </div>
                    </div>
                    <button className="button" onClick={() => addMemo()}> Add </button>
                </div>
            </div>
        </div>
    )
}
export default MemosCreate;