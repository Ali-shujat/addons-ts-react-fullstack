import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './DetailsPuppy.css';
import axios from "axios";

interface PuppyData {
    id: string
    breed: string
    name: string
    image: string
    birthDate: string
}

function DetailPuppy() {
    const [puppy, setPuppy] = useState<PuppyData>();
    let id = useParams();
    console.log(id);
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     e.preventDefault()
    //     const value = e.currentTarget.value

    // }
    // useEffect(() => {
    //     const getData = async () => {
    //         const response = await fetch(`https://localhost:7205/api/Puppies/${Id}`);
    //         const data = await response.json();
    //         const firstPuppy = data;
    //         console.log(firstPuppy);
    //         //  setPuppy((existingData) => {
    //         //     return existingData.filter((_) => _.id.valueOf !== Id.valueOf);
    //         //   });
    //         setPuppy(prev => {
    //             return {
    //                 ...prev,

    //                 name: firstPuppy.name,
    //                 breed: firstPuppy.breed,
    //                 birthDate: firstPuppy.birthDate,
    //                 image: firstPuppy.image,
    //             }
    //         })
    //     }
    //     getData()
    // }, [id])
    useEffect(() => {
        axios.get(`https://localhost:7205/api/Puppies/${id}`).then((response) => {
          setPuppy((data) => {
            console.log(data);
            return response.data;
          });
        });
      }, []);
    return (
        <>
            <Link to="/">
                <h3> 🏠 Go Home</h3>
            </Link>
            {/* <div className='details'>
                <h3>Detail of Puppy</h3><br />
                <img className='detail-image' src={puppy.image} alt="Puppy_Image" />
                <form >
                    <label>Name:
                        <input
                            type="text"
                            value={puppy.name}
                        //onChange={handleChange}
                        />
                    </label>
                    <label>Breed:
                        <input
                            type="text"
                            value={puppy.breed}
                        />
                    </label>
                    <label>Birth Date:
                        <input
                            type="text"
                            value={puppy.birthDate}
                        />
                    </label>
                </form>
            </div> */}
        </>
    )
}

export default DetailPuppy