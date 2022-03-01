import React from 'react';
import { withRouter } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Editor } from '@tinymce/tinymce-react';
import { addNotesQuery } from '../../gql/note'
import toastr from '../../shared/toastr';
import { tinyinit } from '../../shared/util'
import TagsInput from 'react-tagsinput'

const NotesCreate = (props) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [hasHeader, setHasHeader] = useState(false);
    const [headerContent, setHeaderContent] = useState('');
    const [headerImage, setHeaderImage] = useState('');
    const [tags, setTags] = useState([])

    const [createNewNote, { loading }] = useMutation(addNotesQuery, {
        variables: {
            input: {
                title: title,
                content: content,
                has_header: hasHeader,
                header_image: headerImage,
                header_content: headerContent,
                tags: tags
            }
        },
        update(_, result) {
            props.history.push('/notes');
        }
    })

    const addNote = () => {
        if (title.length == 0 || content.length == 0) {
            toastr.error("All fields are compulsory");
        } else {
            createNewNote()
        }

    }

    return (
        <div className="container is-fluid mg-b-10-force">
            <div class="field">
                <label class="label is-large">Title</label>
                <div class="control ">
                    <input class="input is-large" type="text" placeholder="Enter a Title" onChange={e => setTitle(e.target.value)} />
                </div>
            </div>
            <div class="field">
                <label class="label is-large">Content</label>
                <Editor
                    apiKey="qjv3x97fehnsfdfbzeuxtqbu6c58azrkjtqf15aqbmfqmcs5"
                    initialValue=""
                    init={tinyinit}
                    onEditorChange={(content, editor) => setContent(content)}
                />
            </div>

            <div>
                <label className="label is-large">Tags</label>
                <TagsInput value={tags} onChange={(e) => setTags(e)} />
            </div>

            <label class="checkbox">
                <input type="checkbox" value={hasHeader} onChange={e => setHasHeader(!hasHeader)} />
                <span className="mg-l-10">Contains Header</span>
            </label>

            <div className={`mg-t-20 ${hasHeader ? "" : "blurTextbox"}`}>
                <label className="label is-large">Header</label>
                <p>
                    Header Content
                </p>
                <div class="field">
                    <div class="control">
                        <input class="input is-primary" type="text" placeholder="Header Image Url" onChange={e => setHeaderImage(e.target.value)} />
                    </div>
                </div>
                <p>
                    Header Image Url
                </p>
                <div class="field">
                    <div class="control">
                        <input class="input is-info" type="text" placeholder="Header Content" onChange={e => setHeaderContent(e.target.value)} />
                    </div>
                </div>
            </div>

            <div class="field mg-t-10">
                <p class="control">
                    <button class="button is-success" onClick={() => addNote()}>
                        Save
                    </button>
                </p>
            </div>
        </div>
    )
}

export default withRouter(NotesCreate);