import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from './Modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export default function CustomizedTables(props) {
    const [showLogin, setShowLogin] = useState(false);
    const [id, setId] = useState("");
    const [type, setType] = useState("Create");
    const [placeholder, setPlaceholder] = useState(["","",""]);
    const [data, getData] = useState([])
    const URL = 'http://localhost:8080/users';
 
    useEffect(() => {
        fetchData()
    }, [showLogin]);

 
 
    const fetchData = () => {
        fetch(URL)
            .then((res) =>
                res.json())
 
            .then((response) => {
                getData(response.users);
            })
 
    }
    
  return (
    
    <div>
    <Stack spacing={10} direction="row">
      
      <Button style={{
       backgroundColor: "black",
       }} 
       onClick={() => {
        setShowLogin(true)
        setType("Create")
        setId("")
        setPlaceholder(["","",""])
      }
      } 
      variant="contained">Add User</Button>
      

    </Stack>
    <br/>
    <Modal show={showLogin} close={() => setShowLogin(false)} id={id} type={type} place={placeholder}/>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell >Name</StyledTableCell>
            <StyledTableCell >Age</StyledTableCell>
            <StyledTableCell >Job</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user,i) => (
            <StyledTableRow key={i} onClick={() => {
                setShowLogin(true)
                setId(user._id)
                setType("Update")
                setPlaceholder([user.name,user.age,user.job])}}>
              <StyledTableCell component="th" scope="row">
                {user._id}
              </StyledTableCell>
              <StyledTableCell>{user.name}</StyledTableCell>
              <StyledTableCell>{user.age}</StyledTableCell>
              <StyledTableCell>{user.job}</StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
