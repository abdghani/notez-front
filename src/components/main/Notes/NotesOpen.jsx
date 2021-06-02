import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { fetchNoteQuery } from '../../gql/note'
import parse from 'html-react-parser';
import Loading from '../../shared/Loading';
import auth0Client from "../../auth/auth";
import moment from 'moment'




const NotesContent = ({note, profile}) => {
    return (
        <div className="">
            <section className="articles">
                <div className="column is-8 is-offset-2">
                    <div className="card article">
                        <div className="card-content">
                            <div className="media">
                                <div className="media-content has-text-centered">
                                    <p className="title article-title">{note.title}</p>
                                    <div className="tags has-addons level-item">
                                        <span className="tag is-rounded is-info">@author</span>
                                        <span className="tag is-rounded">{moment(note.createdAt).fromNow()}</span>
                                    </div>
                                    <div className="is-centered">
                                        {
                                            note.tags.map((tag, idx) => (
                                                <span className="tag is-info is-normal mg-r-5" key={idx}>
                                                    <i className="fa fa-tag mg-r-5" aria-hidden="true"></i>{tag}
                                                </span>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="content article-body">
                                {parse(note.content)}
                            </div>
                            {
                                (profile != undefined && profile.sub == note.userSub) && (
                                    <Link className="is-centered" to={`/notes/edit/${note.id}`}>
                                        <button className="mg-t-10 button" >Edit</button>
                                    </Link>
                                )
                            }
                        </div>
                    </div>                                                
                </div>
            </section>
        </div>
    )
}

const NotesOpen = (props) => {

    const [ profile, setProfile ] = useState({});
    const { loading : loadingNote, data} =  useQuery(fetchNoteQuery, {
        variables: { id:  props.match.params.note_id }
    })

    useEffect(() => {
        setProfile(auth0Client.getProfile());
    }, [auth0Client.isAuthenticated()])

    if(!loadingNote && data == undefined){
        props.history.push('/notes');
        return (<div></div>)
    }



    return (
        <div className="">
            {
                !loadingNote ? (
                    <div>
                        {
                            data != undefined ? (
                                <div className="mg-t-20">
                                        {                                        
                                            data.fetchNote.has_header && (
                                                <div>
                                                    <section className="hero is-info is-medium is-bold">
                                                        <div className="hero-body" style={{backgroundImage: `url(${data.fetchNote.header_image})`}}>
                                                            <div className="container has-text-centered">
                                                            <h1 className="title">{data.fetchNote.header_content} </h1>
                                                            </div>
                                                        </div>
                                                    </section>
                                                    <NotesContent profile={profile} note={data.fetchNote}/>
                                                </div>
                                            )
                                        }

                                        {                                        
                                            !data.fetchNote.has_header && (
                                                <div style={{marginTop:220}}>
                                                    <NotesContent profile={profile} note={data.fetchNote}/>
                                                </div>
                                            )
                                        }

                                </div>
                            ): (
                                <div>
                                    No Note
                                </div>
                            )
                        }
                    </div>
                ): (<Loading />)
            }
        </div>
    )
    
}

export default withRouter(NotesOpen);