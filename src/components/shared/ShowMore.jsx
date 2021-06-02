import React, { useState } from 'react';
 const ShowMore = ({content, limit}) => {
    const [show, setShow] = useState(true);
    const changeshow = () => {
        setShow(!show);
    }
    return (
        <div>
                {
                    content.length <= limit ?
                    (
                        <div>
                            <p className="tx-13 mg-b-0">{content}</p>
                        </div>
                    ):
                    (
                        show ? (
                            <div>
                                <span className="tx-13 mg-b-0" >{content.substring(0,limit) + ' ...'}</span>
                                <div className="has-text-weight-medium has-text-link pointer" onClick={changeshow}> Show more</div>
                            </div>
                        ): (
                            <div>
                                <span className="tx-13 mg-b-0" >{content}</span>
                                <span className="has-text-weight-medium has-text-link pointer" onClick={changeshow}> Show less</span>
                            </div>
                        )
                    )
                }
        </div>
    )
}
export default ShowMore;