import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { fetchNoteQuery, updateNoteQuery } from '../../gql/note'
import Loading from '../../shared/Loading';
import { useMutation } from '@apollo/react-hooks';
import { Editor } from '@tinymce/tinymce-react';
import TagsInput from 'react-tagsinput'

import toastr from '../../shared/toastr';
import { tinyinit } from '../../shared/util'


const NotesEdit = (props) => {
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [hasHeader, setHasHeader] = useState(true);
    const [headerContent, setHeaderContent] = useState('');
    const [headerImage, setHeaderImage] = useState('');
    const [tags, setTags] = useState([])
    const [noteId, setNoteId] = useState('');
    const { loading: loadingNote, data } = useQuery(fetchNoteQuery, {
        variables: { id: props.match.params.note_id }
    })
    useEffect(() => {
        if (data != undefined) {
            setTags(data.fetchNote.tags)
            setNoteTitle(data.fetchNote.title)
            setNoteContent(data.fetchNote.content)
            setNoteId(data.fetchNote.id)
            setHasHeader(data.fetchNote.has_header)
            setHeaderImage(data.fetchNote.header_image)
            setHeaderContent(data.fetchNote.header_content)
        }
    }, [!loadingNote]);

    useEffect(() => {
        let id = setInterval(() => {
            if (noteTitle.length != 0 && noteContent.length != 0) {
                updateNote();
            }
        }, 60000);
        return () => clearInterval(id);
    });

    const [updateNote, { loading, error: mutationError }] = useMutation(updateNoteQuery, {
        variables: {
            input: {
                id: noteId,
                title: noteTitle,
                content: noteContent,
                has_header: hasHeader,
                header_image: headerImage,
                header_content: headerContent,
                tags: tags
            }
        },
        update(_, result) {
            const updatedNote = result.data.reformNote;
            setNoteTitle(updatedNote.title);
            setNoteContent(updatedNote.content);
            toastr.success(`Updated`);
        }
    })

    if (!loadingNote && data == undefined) {
        props.history.push('/notes');
    }
    const validateUpdateNote = () => {
        if (noteTitle.length == 0 || noteContent.length == 0) {
            toastr.error("All fields are necessary");
        } else {
            updateNote();
        }
    }
    if (mutationError) {
        toastr.error(`Error updating`)
    }
    const removeTag = (e) => {
        setTags(e)
    }
    return (
        <div className="container is-fluid mg-b-10-force">
            {
                !loadingNote ? (
                    <div>
                        {
                            data != undefined ? (
                                <div>

                                    <div className="field">
                                        <label className="label is-large">Title</label>
                                        <div className="control ">
                                            <input className="input is-large"
                                                type="text" placeholder="Enter a Title"
                                                value={noteTitle}
                                                onChange={e => setNoteTitle(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label is-large">Content</label>
                                        <Editor
                                            apiKey="qjv3x97fehnsfdfbzeuxtqbu6c58azrkjtqf15aqbmfqmcs5"
                                            initialValue={noteContent}
                                            init={tinyinit}
                                            onEditorChange={(content, editor) => setNoteContent(content)}
                                        />
                                    </div>

                                    <div>
                                        <label className="label is-large">Tags</label>
                                        <TagsInput value={tags} onChange={(e) => setTags(e)} />
                                    </div>

                                    <label className="checkbox mg-t-10">
                                        <input type="checkbox" checked={hasHeader} onChange={e => setHasHeader(!hasHeader)} />
                                        <span className="mg-l-10">Contains Header{hasHeader}</span>
                                    </label>

                                    <div className={`mg-t-20 ${hasHeader ? "" : "blurTextbox"}`}>
                                        <label className="label is-large">Header</label>
                                        <p>
                                            Header Content
                                        </p>
                                        <div className="field">
                                            <div className="control">
                                                <input className="input is-info" value={headerContent} type="text" placeholder="Header Content" onChange={e => setHeaderContent(e.target.value)} />
                                            </div>
                                        </div>

                                        <p>
                                            Header Image Url
                                        </p>
                                        <div className="field">
                                            <div className="control">
                                                <input className="input is-primary" value={headerImage} type="text" placeholder="Header Image Url" onChange={e => setHeaderImage(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="field text-right mg-t-20">
                                        <p className="control">
                                            <button className="button is-success mg-r-10" onClick={validateUpdateNote}>
                                                Save
                                            </button>
                                            <Link to={`/notes/open/${noteId}`} className="button text-right">
                                                Open
                                            </Link>
                                        </p>
                                    </div>

                                </div>
                            ) : (
                                <div>
                                    No Note
                                </div>
                            )
                        }
                    </div>
                ) : (<Loading />)
            }
        </div>
    )

}

export default withRouter(NotesEdit);