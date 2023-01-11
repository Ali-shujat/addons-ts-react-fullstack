import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IPuppy } from '../../types';
import axios from "axios";
import './AddPuppy.css';
import { v4 as uuidv4 } from 'uuid';

function AddPuppy() {
  const [puppy, setpuppy] = useState<IPuppy>(
    {
      id: uuidv4(),
      breed: "",
      name: "",
      birthDate: "",
      image: ""
    }
  );
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.currentTarget.value
    const name = event.target.name;
    setpuppy({ ...puppy, [name]: value });
  };
  let myuuid = uuidv4();
  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var payload = {
      id: myuuid,
      breed: puppy.breed,
      name: puppy.name,
      image: puppy.image,
      birthDate: puppy.birthDate,
    };
    console.log('📩' + payload.id);

    await axios
      .post("https://localhost:7205/api/Puppies", payload)
      .then((response) => {
        console.log('✅' + response.data);
        navigate("/");
      }).catch((e: Error) => {
        console.log('👻' + e);
      });
  }

  const navigate = useNavigate();
  function getDateFromFormat(): string | number | readonly string[] | undefined {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <div className="container">
      <Link to="/">🏠 Home</Link>
        <div className="card">
          <div className="card-image">           
            <h2 className="card-heading">
              Get started
              <small>Let's Add a puppy</small>
            </h2>
          </div>
          <form className="card-form" onSubmit={submitForm}>
            <div className="input">
              <input type="text" className="input-field" value={puppy.name} name='name' onChange={handleInputChange} />
              <label className="input-label">Puppy name</label>
            </div>
            <div className="input">
              <input type="text" className="input-field" value={puppy.breed} name='breed' onChange={handleInputChange} />
              <label className="input-label">Breed</label>
            </div>
            <div className="input">
              <input type="date" className="input-field" value={puppy.birthDate} name='birthDate' onChange={handleInputChange} />
              <label className="input-label">Birth Date</label>
            </div>
            <div className="input">
              <input type="text" className="input-field" value={puppy.image} name='image' onChange={handleInputChange} />
              <label className="input-label">Image Url</label>
            </div>
            <div className="action">
              <button className="action-button" type='submit'>Add a puppy</button>
            </div>
          </form>
          <div className="card-info">
            <p>For selling pet online you are agreeing to our <a href="#">Terms and Conditions</a></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddPuppy