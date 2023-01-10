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

            <div className='details'>
                <div className='home'>
                    <Link to="/">
                        <h3> 🏠 Go Home</h3>
                    </Link>
                </div>

                <h3>Detail of Puppy</h3><br />
                <div  className='detail-image'>
                <img style={{borderRadius:"50%", width:"300px",height:"300px"}} src={puppy.image} alt="Puppy_Image" />
                </div>
                <form >
                    <label>Name:
                        <input className="input"
                            type="text"
                            value={puppy.name}
                        />
                    </label>
                    <label>Breed:
                        <input className="input"
                            type="text"
                            value={puppy.breed}
                        />
                    </label>
                    <label>Birth Date:
                        <input className="input"
                            type="text"
                            value={puppy.birthDate}
                        />
                    </label>
                </form>
            </div>
        </>
    )
}

export default DetailPuppy