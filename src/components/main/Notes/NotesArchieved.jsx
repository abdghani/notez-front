import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { fetchNotesQuery, archieveNoteQuery, deleteNotesQuery } from '../../gql/note';
import { withRouter, Link } from 'react-router-dom';
import  ConfirmModal from '../../shared/Confirm';

import toastr from '../../shared/toastr';
import moment from 'moment'

const NotesArchieved = (props) => {

    const archieveMessage = 'Note will be deleted permanently. Are you sure ?'
    const [ notes, setNotes ] = useState([]);
    const [ noteToDelete, setNoteToDelete ] = useState({});
    const [ showModal, setShowModal ] = useState(false);
    const [ searchQuery, setSearchQuery ] = useState('');
    const { loading : loadingNotes, data : noteData} =  useQuery(fetchNotesQuery, {variables:{'archieved':true}});
    const [archieveNote, { loading: archieveNoteLoading }] = useMutation(archieveNoteQuery);
    const [deleteNote, { loading: deleteNoteLoading }] = useMutation(deleteNotesQuery);

    const showArchieveModal = (note) => {
        setNoteToDelete(note)
        setShowModal(true);
    }

    const hideArchieveModal = () => {
        setShowModal(false);
    }

    const unarchieve = (note) => {
        archieveNote({
            variables: {id: note.id, status: false}, 
            update : (_, result) => {
                note.archieved= false;
                toastr.success("Note Removeed from archieved list ");
            }
        })
    }

    const deletenote = () => {
        deleteNote({
            variables: {id: noteToDelete.id},
            update : (_, result) => {
                setShowModal(false);
                setNotes(notes.filter((note) => note.id != noteToDelete.id))
                toastr.success("Note Deleted ");
            }
        })
    }

    useEffect(() => {
        if(noteData){
            setNotes(noteData.fetchNotes);
        }
    }, [loadingNotes])

    return (
        <div>

            <ConfirmModal show={showModal} handleClose={hideArchieveModal} handleSubmit={deletenote} message={archieveMessage}/>
            <div className="container is-fullhd mg-l-10-force mg-r-10-force">
                <nav className="panel">
                        <p className="panel-heading text-center">
                            Archieved Notes
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
                                                    note.archieved && (
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
                                                                        <p className="control" title="Remove from archieve">
                                                                            <button className="button" onClick={() => unarchieve(note)} data-tooltip="Tooltip Text">
                                                                                Remove 
                                                                            </button>
                                                                        </p>
                                                                        <p className="control" title="Delete Permanently">
                                                                            <button className="button" onClick={() => showArchieveModal(note)} data-tooltip="Tooltip Text">
                                                                                <span className="icon is-small">
                                                                                    <i className="fa fa-trash" aria-hidden="true"></i>
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

export default withRouter(NotesArchieved);