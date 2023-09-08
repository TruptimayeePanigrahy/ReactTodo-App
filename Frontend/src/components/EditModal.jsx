// EditModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import "./Edit.css"
Modal.setAppElement('#root'); // Set the app element for accessibility

function EditModal({ isOpen, onRequestClose, post, onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setDescription(post.description);
    }
  }, [post]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    const updatedPost = {title, description };
    onSubmit(post._id,updatedPost);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Modal"
      className="editmodel"
    >
      <h2 style={{textAlign:"center",color:"#058665"}}>Edit Post</h2>
      <label>
        Title
        <input type="text" value={title} onChange={handleTitleChange} />
      </label>
      <label>
        Description
        <textarea value={description} onChange={handleDescriptionChange} />
      </label>
      <div className='btns'>
        <button  onClick={handleSubmit}>Save</button>
      <button onClick={onRequestClose}>Cancel</button>
      </div>
    </Modal>
  );
}

export default EditModal;
