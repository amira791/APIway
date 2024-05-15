import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useTicket from '../../hooks/useTicket';
import Navbar from '../global_components/navbar'
import Footer from '../global_components/footer'
import { useAuthContext } from '../../context/authContext';

export default function TicketForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { addNewTicket, error: addError, loading: addLoading } = useTicket();
  const {authState} = useAuthContext();
  const creator = authState.userId;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newTicket = {
      api_id: 7,
      created_by: creator,
      title: title,
      issue: description
    };

    try {
      await addNewTicket(newTicket);
      navigate('/searchApi');
    } catch (error) {
      console.error('Error submitting ticket:', error);
      // Handle error state here
    }
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  return (
    <>
      <Navbar />
     
      <section className="tf-login">
        <div className="tf-container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="tf-heading style-2">
                <h4 className="heading">Create a New Ticket</h4>
              </div>
            </div>
            <div className="col-xl-6 col-lg-9 col-md-12">
              <form onSubmit={handleFormSubmit}>
              <fieldset><label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </fieldset>
                <fieldset><label htmlFor="description">Description</label>
                <ReactQuill
                  theme='snow'
                  placeholder="Enter your description"
                  value={description}
                  onChange={handleDescriptionChange}
                /></fieldset>
                <input type="submit" value="Submit" disabled={addLoading} />
              </form>
              {addError && <div>Error: {addError.message}</div>}
            </div>
          </div>
        </div>
      </section>
        <Footer />
      </>
      );
}
