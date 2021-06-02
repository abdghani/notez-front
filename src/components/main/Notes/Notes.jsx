import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { fetchNotesQuery, archieveNoteQuery } from '../../gql/note';
import { withRouter, Link } from 'react-router-dom';
import  ConfirmModal from '../../shared/Confirm';

import toastr from '../../shared/toastr';
import moment from 'moment'

const Notes = (props) => {
    const archieveMessage = 'Note will be archieved . Are you sure ?'
    const [ noteToDelete, setNoteToDelete ] = useState({});
    const [ showModal, setShowModal ] = useState(false);
    const [ searchQuery, setSearchQuery ] = useState('');
    const { loading : loadingNotes, data : notesdata} =  useQuery(fetchNotesQuery, {variables:{'archieved':false}})
    const [ archieveNote, { loading: archieveNoteLoading } ] = useMutation(archieveNoteQuery)
    const [ notes, setNotes] = useState([]);

    const showArchieveModal = (note) => {
        setNoteToDelete(note)
        setShowModal(true);
    }
    const hideArchieveModal = () => {
        setShowModal(false);
    }
    const archieve = () => {
        archieveNote({
            variables: {id: noteToDelete.id, status: true}, 
            update : (_, result) => {
                noteToDelete.archieved= true;
                setShowModal(false);
                toastr.success("Note Archieved ");
            }
        })
    }

    useEffect(() => {
        console.log(window.location.origin);
        if(notesdata && notesdata.fetchNotes){
            setNotes(notesdata.fetchNotes);
        }
    }, [loadingNotes])

    return (
        <div>
            <ConfirmModal show={showModal} handleClose={hideArchieveModal} handleSubmit={archieve} message={archieveMessage}/>
            <div className="container is-fullhd mg-l-10-force mg-r-10-force">
                <nav className="panel">
                        <p className="panel-heading text-center">
                            All Notes
                        </p>
                        {
                            !loadingNotes ? (
                                <div>
                                {
                                    notes.length!= 0 && (
                                        <div className="panel-block ">
                                            <p className="control has-icons-left">
                                                <input className="input" type="text" placeholder="Search"  onChange={e => setSearchQuery(e.target.value)}/>
                                                <span className="icon is-left">
                                                    <i className="fas fa-search" aria-hidden="true"></i>
                                                </span>
                                            </p>
                                        </div>
                                    )
                                }
                                {
                                    notes.length ? (
                                        <div>
                                            {
                                                notes
                                                .filter((note)=>{
                                                    if(searchQuery == '' || note.title.toLowerCase().includes(searchQuery.toLowerCase())){
                                                        return true
                                                    }else {
                                                        return false;
                                                    }
                                                })
                                                .map((note, idx) => (
                                                    !note.archieved && (
                                                        <div className="panel-block is-block py-3 px-4" key={idx}>
                                                            <div className="media">
                                                                <div className="media-content">
                                                                    <b>
                                                                        {note.title}
                                                                    </b>
                                                                    <p className=" mg-r-10">
                                                                        <i className="fa fa-clock mg-r-5" aria-hidden="true"></i>
                                                                        {moment(note.createdAt).fromNow()}
                                                                    </p>
                                                                </div>
                                                                <div className="media-right">
                                                                    <div className="field has-addons">
                                                                        <p className="control" title="archieve">
                                                                            <button className="button" onClick={() => showArchieveModal(note)} data-tooltip="Tooltip Text">
                                                                                <span className="icon is-small">
                                                                                    <i className="fa fa-archive" aria-hidden="true"></i>
                                                                                </span>
                                                                            </button>
                                                                        </p>
                                                                        <p className="control">
                                                                            <Link to={`/notes/edit/${note.id}`} className="button">
                                                                                <span className="icon is-small">
                                                                                    <i className="fa fa-pen" aria-hidden="true"></i>
                                                                                </span>
                                                                            </Link>
                                                                        </p>
                                                                        <p className="control">
                                                                            <Link to={`/notes/open/${note.id}`} className="button">
                                                                                <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                                                            </Link>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                ))
                                            }
                                            
                                        </div>
                                    ) : (
                                        <div>
                                            <a className="panel-block is-active text-center">
                                                <span className="panel-icon">
                                                    <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
                                                </span>
                                                No Notes Found
                                            </a>
                                        </div>
                                    )
                                }
                            </div>
                        ) : 'Loading...'
                        }

                        
                    </nav>
            </div>
        </div>
    )
}

export default withRouter(Notes);