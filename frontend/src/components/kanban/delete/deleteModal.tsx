import React, { useState } from "react";
import {  Modal, message } from "antd";
import { AppDispatch } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../../redux/actions/taskActions";

interface DeleteModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  id: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ setOpen, open, id }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Are You Sure Want to delete?");
  const dispatch: AppDispatch = useDispatch();
  

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    dispatch(deleteTask(id));
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
    
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};

export default DeleteModal;
