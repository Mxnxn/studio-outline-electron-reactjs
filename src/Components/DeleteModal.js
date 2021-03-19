import React from "react";

const DeleteModal = ({ submit, isVisible, close, title }) => {
    return (
        <div class={isVisible ? "modal d-block" : "modal"}>
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{title}</h5>
                        <button type="button" class="close-btn" data-dismiss="modal" aria-label="Close" onClick={close}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="modal-btn " onClick={submit}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
