import React from 'react';


const ConfirmModal = ({ handleSubmit, show, handleClose, message }) => {
    return (
        <div className={`modal ${show ? "is-active" : ""}`} >
            <div className="modal-background"></div>
            <div className="modal-content">
                <div className="box">
                    <div className="text-center">
                        {message}
                    </div>
                    <div className="text-center mg-t-10">
                        <button className="button" onClick={handleSubmit}>Sure</button>
                        <button className="button is-danger mg-l-5" onClick={handleClose}>Close</button>
                    </div>

                    <button 
                        className="button modal-close is-large" 
                        aria-label="close"
                        onClick={handleClose}> 
                    </button>
                    
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;