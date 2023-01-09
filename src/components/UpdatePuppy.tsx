import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function UpdatePuppy() {
  
  const { id } = useParams();
  const breed = useRef("");
  const name = useRef("");
  const image = useRef("");

const navigate = useNavigate();
useEffect(() => {
  axios.get(`https://localhost:7205/api/Puppies//${id}`)
  .then((response) => {
      name.current.valueOf = response.data.name;
      breed.current.valueOf = response.data.breed;
      image.current.valueOf = response.data.image;
  });
}, []);
function updatePuppyHandler() {
  var payload = {
      name: name.current.valueOf,
    breed: breed.current.valueOf,
    imimage: image.current.valueOf,
    id: id,
  };
  axios
    .put("https://localhost:7073/SuperDeveloper", payload)
    .then((response) => {
      navigate("/");
    });
}

  return (
  <>
    <Link to="/">
      <h3>Go Home</h3>
    </Link>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" />
    </Box>
  </>
  )
}

export default UpdatePuppy