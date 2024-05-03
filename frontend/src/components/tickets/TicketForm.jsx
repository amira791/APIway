import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useTicket from '../../hooks/useTicket'
export default function TicketForm() {

  const [title , setTitle] = useState("");
  const [description , setDescription] = useState("");
  const {addNewTicket} = useTicket()


  const handleFormSubmit = (e) => {
    const newTicket ={
      api_id: 7,
      created_by : 1,
      title: title,
      issue : description
    }
      e.preventDefault(); // Prevent default form submission behavior
    console.log(newTicket)
    addNewTicket(newTicket)
  
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image','code-block'
  ];
 

  
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title"  value={title} onChange={(e) => setTitle(e.target.value)}/>
        <label htmlFor="description">Description</label>
        <ReactQuill 
        theme='snow' 
        modules={modules}
        formats={formats}
        placeholder="Enter your description" 
        value={description} 
        onChange={setDescription}/>
        <input type="submit" value="submit" />
      </form>
    </>
  );
}
