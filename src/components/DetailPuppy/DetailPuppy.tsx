import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './DetailsPuppy.css';

interface IPuppy {
    id: string;
    breed: string;
    name: string;
    image: string;
    birthDate: string;
}

function DetailPuppy() {
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


    //console.log(id);
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
    return (
        <>
            <div className='DetailBody'>
                <Card style={{ width: "345px", margin: "10%", boxShadow:" 0 10px 20px 0 rgba(153, 153, 153, 0.25)"}}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="240"
                            image={puppy.image}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {puppy.breed}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {puppy.name} are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica. <br />
                                Data of Birth : {puppy.birthDate}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions disableSpacing={true} sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                        <Button size="small" color="primary">
                            <Link to="/">🏠Home</Link>
                        </Button>

                        <Button size="small" color="primary">
                            Share
                        </Button>
                        <Button size="small" color="primary">
                            Learn More
                        </Button>

                    </CardActions>
                </Card>
            </div>
        </>
    )
}

export default DetailPuppy