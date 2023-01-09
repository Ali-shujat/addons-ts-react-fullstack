import CameraIcon from '@mui/icons-material/PhotoCamera';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { useEffect, useState } from "react";


type Puppy = {
  id: string;
  breed: string;
  name: string;
  image: string;
}

const theme = createTheme();

export default function Album() {

  const [puppy, setpuppy] = useState<Puppy[]>([{
    id:'96c790f8-365d-47d3-91f8-79d9d15953be',
  breed:"Afirican",
name:"jokui",
image:"https://www.stockvault.net/data/2008/01/29/104298/preview16.jpg"},{
  id:'96c790f8-365d-47d3-91f8-79d9d15953bf',
breed:"English",
name:"Tommy",
image:"https://www.stockvault.net/data/2012/11/25/138377/preview16.jpg"}]);
  //const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState('0');

  useEffect(() => {
    axios.get("https://localhost:7205/api/Puppies").then((response) => {
      setpuppy((data) => {
        return response.data;
      });
    });
  }, []);
  function confirmDeleteHandler(itemToDeleteId:string) {
    axios.delete(`https://localhost:7205/api/Puppies/${itemToDeleteId}`)
      .then((response) => {
        console.log(response);
        setShowModal(false);
        setpuppy((existingData) => {
          return existingData.filter((_) => _.id !== itemToDeleteId);
        });
        setItemToDeleteId('0');
      });
  }
  // function showConfirmDeleteHandler(id: string) {
  //   console.log(id);
  //   setShowModal(true);
  //   setItemToDeleteId(id);
  // }

  // function hideConfirmDeleteHandler() {
  //   setShowModal(false);

  //   setItemToDeleteId('0');
  // }



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Salt React Fullstack - TypeScript Addon
          </Typography>
        </Toolbar>
      </AppBar>
      {/* <DeleteConfirmation
        title="Delete Confirmation"
        body="Are you want delete this item?"
        confirmDeleteHandler={confirmDeleteHandler}
        hideConfirmDeleteHandler={hideConfirmDeleteHandler}
      /> */}
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Dog Store
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Designed products for your dog, training, hunting and active life.
              We don&apos;t sell pets but  we provide a platform to buy a sell.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">➕ Add a puppy</Button>
              <Button variant="outlined">buy for puppy</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {puppy.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      //pt: '56.25%',
                    }}

                    alt="random"
                    image={card.image}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.breed}
                    </Typography>
                    <Typography>
                      {card.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button className="me-4" size="small"
                       variant="outlined" color='primary'
                        //onClick={() => navigate(`/superdeveloper-update/${card.id}`)}
                      >
                         🖋️Edit
                      </Button>
                    <Button style={{ float: 'right' }} size="small"
                       variant="outlined" color="error"
                        onClick={() => confirmDeleteHandler(card.id)}
                      >
                        ❌Delete
                      </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Contact us
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          © SHUJAT ALI 2023
        </Typography>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}