import React from 'react';
import '../Home/home.css'
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useContext } from 'react';
import { listContextFire } from '../../listContext';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const Home = () => {
    const useList = useContext(listContextFire);
    const {addTodo, getTasksTODO ,  todoArr , deleteTodo , editProduct} = useList;
    const [title , setTitle] = useState("")
    const [descr , setDescr] = useState("")
    const [time , setTime] = useState("")
    const [key , setkey] = useState("")
    const [newtitle , setNewTitle] = useState("")
    const [newdescr , setNewDescr] = useState("")
    const [newtime , setNewTime] = useState("")
    const [newkey , setNewkey] = useState("")
    const [image , setImage] = useState(null)
    const [visible , setVisible] = useState('none');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const navigate = useNavigate();

    console.log(image);
    const {id} = useParams()
    console.log(id);
    useEffect(()=>{
        getTasksTODO();
    },[])
    let obj={
        ...todoArr,
        title:title,
        descr:descr,
        time:time,
        key:key,
        image:image,
    }
    let obj2={
        title:newtitle,
        descr:newdescr,
        time:newtime,
        key:newkey,
    }
    console.log(obj2);

    const handleAdd=()=>{
        addTodo(obj);
        handleClick();
    }
   
    
    const open = Boolean(anchorEl);
    const index = open ? 'simple-popper' : undefined;
    return (
        <Box className='mainBlock'>
            <Popper id={index} open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' , display:"flex" , flexDirection:"column" }}>
            <TextField onChange={(e)=>setTitle(e.target.value)}></TextField>
            <TextField onChange={(e)=>setDescr(e.target.value)}></TextField>
            <TextField onChange={(e)=>setTime(e.target.value)}></TextField>
            <TextField onChange={(e)=>setkey(e.target.value)}></TextField>
            <TextField type="file"  onChange={(e)=>setImage(e.target.uploadFile)}/>
          <Button onClick={handleAdd}>create</Button>
        </Box>
      </Popper>
   
      
            <Paper sx={{width:"30%" , height:"100%"}} elevation={24}>
                <Typography className="title" sx={{color:"green"}}>TODO</Typography>
                <Button onClick={handleClick}>add new task</Button>
                <Box>
                    {
                        todoArr.map((e)=>(
                            
                            <div key={e.id}>
                                {e.title} , {e.descr} , {e.time}
                                <img src={e.image}/>
                                
                                <Button onClick={()=>deleteTodo(e.id)}>delete</Button>
                                <Button onClick={()=>{
                                    setVisible('block')
                                    navigate(`/${e.id}`)
                            } }id={e.id}>edit</Button>
                            </div>
                        ))
                    }
                                <div style={{display:visible , postition:"absolute"}}>
        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' , display:"flex" , flexDirection:"column" }}>
            <TextField onChange={(e)=>setNewTitle(e.target.value)}></TextField>
            <TextField onChange={(e)=>setNewDescr(e.target.value)} ></TextField>
            <TextField onChange={(e)=>setNewTime(e.target.value)} ></TextField>
            <TextField onChange={(e)=>setNewkey(e.target.value)} ></TextField>
          <Button onClick={()=>{
            setVisible('none')
            editProduct(id ,obj2)

          }
            }>edit</Button>
        </Box>
      </div>
                </Box>
                </Paper>
                <Paper sx={{width:"30%" , height:"100%"}} elevation={24}>
                <Typography className="title" sx={{color:"yellow"}}>DOING</Typography>
                <Button>add new task</Button>
                </Paper>
                <Paper sx={{width:"30%" , height:"100%"}} elevation={24}>
                <Typography className="title" sx={{color:"red"}}>DONE</Typography>
                <Button>add new task</Button>
                </Paper>
        </Box>
    );
};

export default Home;