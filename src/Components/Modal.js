import React,{ useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import "./App.css";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 340,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [name, setName] = useState(props.place[0]);
  const [age, setAge] = useState(props.place[1]);
  const [job, setJob] = useState(props.place[2]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setName(props.place[0])
    setAge(props.place[1])
    setJob(props.place[2])
  },[props.place])


  let handleSubmit = async (e) => {
    if(props.id === ""){
        e.preventDefault();
        try {
          let res = await fetch("http://localhost:8080/user", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: name,
              age: age,
              job: job,
              
            }),
          });
          if (res.status === 201) {
            setName("");
            setAge("");
            setJob("");
            setMessage("User created successfully");
            setTimeout(() => {
              setMessage("");
            }, 2000);
          } else {
            setMessage("Some error occured");
            setTimeout(() => {
              setMessage("");
            }, 2000);
          }
        } catch (err) {
          console.log(err);
        }

    }
    else{
      
        e.preventDefault();
        try {
          let res = await fetch("http://localhost:8080/user/"+props.id, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: name,
              age: age,
              job: job,
              
            }),
          });
          if (res.status === 200) {
            setName("");
            setAge("");
            setJob("");
            setMessage("User Updated successfully");
            setTimeout(() => {
              setMessage("");
            }, 2000);
          } else {
            setMessage("Some error occured");
            setTimeout(() => {
              setMessage("");
            }, 2000);
          }
        } catch (err) {
          console.log(err);
        }

    }
  
  };
  return (
  
    <div>
     
      <Modal
        open={props.show}
        onClose={props.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          value={age}
          placeholder="Age"
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          value={job}
          placeholder="Job"
          onChange={(e) => setJob(e.target.value)}
        />

        <button class="button" type="submit">{props.type}</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
        </Box>
      </Modal>
    </div>
  );
}
