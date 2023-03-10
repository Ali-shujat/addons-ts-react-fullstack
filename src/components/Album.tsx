import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PageviewIcon from '@mui/icons-material/Pageview';
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
import { useNavigate } from "react-router-dom";

interface IPuppy {
  id: string;
  breed: string;
  name: string;
  image: string;
  birthDate: string;
}

const theme = createTheme();

export default function Album() {
  const navigate = useNavigate();
  const [puppy, setpuppy] = useState<IPuppy[]>([
    {
      id: '96c790f8-365d-47d3-91f8-79d9d15953bf',
      breed: "English",
      name: "Tommy",
      birthDate: '20222030',
      image: "https://www.stockvault.net/data/2012/11/25/138377/preview16.jpg"
    }
  ]);

  useEffect(() => {
    axios.get("https://localhost:7205/api/Puppies").then((response) => {
      setpuppy((data) => {
        return response.data;
      });
    });
  }, []);
  function confirmDeleteHandler(itemToDeleteId: string) {
    axios.delete(`https://localhost:7205/api/Puppies/${itemToDeleteId}`)
      .then((response) => {
        console.log(response);
        setpuppy((existingData) => {
          return existingData.filter((_) => _.id !== itemToDeleteId);
        });

      });
  }

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
              We don&apos;t sell pets but  we provide a platform to buyer and seller.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained"
                onClick={() => navigate(`/puppy-create`)}><AddIcon /> Add a puppy</Button>
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
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column', gap: 2,
                    borderRadius: 2,
                    color:'indigo',
                    boxShadow: '2',
                    '&:hover': {
                      boxShadow: `0 3px 6px 0`,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      16: 9
                      //pt: '56.25%',
                    }}

                    alt="random"
                    image={card.image}
                    height="250"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h3" color="indigo">
                      BREED : {card.breed}
                    </Typography>
                    <Typography color="indigo" component="h5">
                      Puppy Name : {card.name}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing={true} sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <Button className="me-4" size="large"
                      color='info'
                      onClick={() => navigate(`/puppy-details/${card.id}`)}
                    >
                      <PageviewIcon sx={{ fontSize: 30 }}/>
                    </Button>
                    <Button className="me-4" size="large"
                      color='success'
                      onClick={() => navigate(`/puppy-update/${card.id}`)}

                    >
                      <EditIcon sx={{ fontSize: 30 }}/>
                    </Button>
                    <Button className="me-4" size="large"
                      color="error"
                      onClick={() => confirmDeleteHandler(card.id)}
                    // startIcon={<DeleteIcon />}
                    >
                      <DeleteIcon sx={{ fontSize: 30 }} />
                    </Button>
                    {/* <IconButton aria-label="delete" 
                    size="large" color="error"
                   >
                      <DeleteIcon fontSize="inherit"  style={{ float: 'inline-end' }}/>
                    </IconButton> */}
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
          ?? SHUJAT ALI 2023
        </Typography>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}