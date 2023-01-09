import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function UpdatePuppy() {

  let id  = useParams();
  const breed = useRef("");
  const name = useRef("");
  const image = useRef("");
  const birthDate = useRef("");
  const navigate = useNavigate();
  

  useEffect(() => { 
    axios.get(`https://localhost:7205/api/Puppies/${id}`).then((response) => {
        name.current.valueOf = response.data.name;
        breed.current.valueOf = response.data.breed;
        image.current.valueOf = response.data.image;
        birthDate.current.valueOf = response.data.birthDate; 
      })
      .catch((error) => {
        if( error.response ){
            console.log(error.response.data); // => the response payload 
        }
    });
  }, [id]);
  function updatePuppyHandler() {
    var payload = {
      name: name.current.valueOf,
      breed: breed.current.valueOf,
      image: image.current.valueOf,
      birthDate:birthDate.current.valueOf,
      id: id,
    };
    console.log(payload);
    axios
      .put("https://localhost:7205/api/Puppies", payload)
      .then((response) => {
        navigate("/");
      });
  }

  return (
    <>
      <Link to="/">
        <h3> 🏠 Go Home</h3>
      </Link>
      <legend>Update Puppy details</legend>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="on"
      >
        <div></div><TextField label="Name" variant="outlined" id="name" name='name' />
        <div></div><TextField label="Breed" variant="outlined" id="breed" name='breed' />
        <div></div><TextField label="BirthDate" variant="outlined" id="birthdate" name='birthDate' />
        <div></div><TextField label="IMAGE URL" variant="outlined" id="image" name='image' />
        <div></div>
        <Button variant="outlined" type="submit" onClick={updatePuppyHandler}>
          ✔ Submit
        </Button>
        {/* <pre>{JSON.stringify(name, null, 2)}</pre> */}

      </Box>
    </>
  )
}

export default UpdatePuppy