/* eslint-disable */
import React, { useState } from "react";
import '../App.css';
import axios from "axios";

function Main() {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [urls, setUrls] = useState([]);

    // for(let i=0; i<file.length; i++) {
    //     setUrls("/banner/view/"+ i)
    // }
    // console.log(urls);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('file', file);

        try {
            await axios.post('/banner/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              });
        } catch(err) {
            console.log(err);
        }
        
        console.log(formData);
    }

    return(
        <>
        <div className='banner'>
            {/* {
                urls.map(function(a,i) {
                    return (
                        <img src={a} alt={"Image"} key={i} />
                    )
                })
            } */}
            {/* <img src={"/banner/view/3"} alt={"image"} />
            <img src={"/banner/view/4"} alt={"image"} /> */}
        </div>
        <form onSubmit={handleSubmit} style={{margin:'50px'}}>
            <input type="file" name="file" onChange={handleFileChange} />
            <label>배너이름 : 
                <input type="text" name="title" value={title} onChange={handleTitleChange} ></input>
            </label>
            <button type="submit" style={{marginLeft:'70px'}}>배너 업로드</button>
        </form>
        </>
    )
}

export default Main;