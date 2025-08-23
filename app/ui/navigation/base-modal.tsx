import React from "react";
import Modal from "react-modal";

function DragHandle() {
    return (
        <div className="self-center">
            <div className="w-8 h-0.5 m-0.5 rounded-full bg-blackboard-300">
            </div>
        </div>
    )
}

export function BaseModal({isOpen, setIsOpenAction, entries} : {isOpen: boolean, setIsOpenAction:  React.Dispatch<React.SetStateAction<boolean>>, entries: React.JSX.Element[]}) {
    function closeModal() {
        setIsOpenAction(false);
    }

    Modal.setAppElement('#root');

    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            className="w-full absolute bottom-0"
        >
            <div className="flex flex-col w-full gap-2 m-2">
                <DragHandle />
                {entries?.map(entry => {
                    return entry
                })}
            </div>
        </Modal>
    );
}