import UpdateIcon from '@mui/icons-material/Update';
import { Box, Button, Container, imageListClasses, TextField } from '@mui/material';
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IPuppy } from '../../types';
import './UpdatePuppy.css';

function UpdatePuppy() {
  const [puppy, setpuppy] = useState<IPuppy>(
    {
      id: '96c790f8-365d-47d3-91f8-79d9d15953bf',
      breed: "English",
      name: "Tommy",
      birthDate: '20222030',
      image: "https://www.stockvault.net/data/2012/11/25/138377/preview16.jpg"
    }
  );

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://localhost:7205/api/Puppies/${id}`)
      .then((response) => {
        setpuppy({
          name: response.data.name,
          breed: response.data.breed,
          birthDate: response.data.birthDate,
          image: response.data.image,
          id: response.data.id
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        }
      });
  }, []);

  const submitForm=(event: React.FormEvent<HTMLFormElement>)=> {
    event.preventDefault();
    var payload = {
      id: puppy.id,
      breed: puppy.breed,
      name: puppy.name,
      image: puppy.image,
      birthDate: puppy.birthDate,
    };
    console.log('📩'+ payload);
    
    axios
      .put(`https://localhost:7205/api/Puppies/${id}`, payload)
      .then((response) => {
        console.log('✅'+ response.data);
        navigate("/");
      }).catch((e: Error) => {
        console.log('👻'+e);
      });
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.currentTarget.value
    const name = event.target.name;
    setpuppy({ ...puppy, [name]: value });
  };

  return (
    // <>
    //   <Container maxWidth="sm">

    //     <Link style={{float:"right"}} to="/">
    //       <h3> 🏠 Go Home</h3>
    //     </Link>
    //     <h2 className='title'>Update Puppy details</h2>
    //     <Box className='form'
    //       component="form"
    //       sx={{
    //         '& .MuiTextField-root': { m: 2, width: '25ch' },
    //       }}
    //       noValidate
    //       autoComplete="on"
    //     >
    //       <div><TextField defaultValue={puppy.name} label="Name" variant="outlined" id="name" name='name' onChange={handleInputChange}/></div>
    //       <div><TextField defaultValue={puppy.breed} label="Breed" variant="outlined" id="breed" name='breed' onChange={handleInputChange} /></div>
    //       <div><TextField defaultValue={puppy.birthDate} label="BirthDate" variant="outlined" id="birthdate" name='birthDate' onChange={handleInputChange}/></div>
    //       <div><TextField defaultValue={puppy.image} label="IMAGE URL" variant="outlined" id="image" name='image' onChange={handleInputChange}/></div>
    //       <div><Button variant="outlined" type="submit" onClick={updatePuppyHandler}>✔ Submit</Button></div>
    //     </Box>
    //   </Container>

    // </>
    < >
    <div className='UpdateBody'>
      <form className="form"  onSubmit={submitForm}>
        <div className='home'>
          <Link to="/">
            <h3> Home 🏠 </h3>
          </Link>
        </div>
        <div className="title">Update</div>
        <div className="subtitle">Let's update Puppy info!</div>
        <div className="input-container ic2">
          <input id="puppy_name" className="input" type="text" value={puppy.name} name='name' onChange={handleInputChange} />
          <div className="cut"></div>
          <label  htmlFor="puppy_name" className="placeholder">Puppy Name</label>
        </div>
        <div className="input-container ic2">
          <input id="lastname" className="input" type="text" placeholder=" " value={puppy.breed} name='breed' onChange={handleInputChange} />
          <div className="cut"></div>
          <label htmlFor="lastname" className="placeholder">  Breed</label>
        </div>
        <div className="input-container ic2">
          <input id="email" className="input" type="text" placeholder=" " value={puppy.birthDate} name='bithDate' onChange={handleInputChange} />
          <div className="cut cut-short"></div>
          <label htmlFor="email" className="placeholder">BirthDate</label>
        </div>
        <div className="input-container ic2">
          <input id="imageUrl" className="input" type="text" placeholder=" " value={puppy.image} name='image' onChange={handleInputChange} />
          <div className="cut"></div>
          <label htmlFor="imageUrl" className="placeholder">ImageUrl</label>
        </div>
        <div className="action">
              <button className="action-button" type='submit'><UpdateIcon /> UPDATE</button>
            </div>
        {/* <button className="submit" type='submit'><UpdateIcon /> UPDATE</button> */}
      </form>
      </div>
    </>
  )
}

export default UpdatePuppy