import React, {useState} from 'react'
import { Firebase_app } from '../firebaseconfig'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link, Box } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Link as Linkto} from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import { WalletContext } from '../context';
import {app,database} from '../firebaseconfig'
import {collection,addDoc,getDocs,doc,updateDoc,deleteDoc,where,query,onSnapshot} from "firebase/firestore";
import { getStorage,ref } from "firebase/storage";

// const Query =  query(itemsRef,where(colum,condition,value))
// pass query instead of collection ref

// getDocs(itemsRef).then((data)=>{
//   console.log(
//     data.docs.map((item)=>{
//       return item.data();
//     })
//   )
// })

export const SlList=()=>{
    const [getVer, setGetVer] = useState(false); 
    const [result,setResult]=useState(null)
    const { wal,setWal }=React.useContext(WalletContext)
    const itemsRef = collection(database,'items')
    function HandleSubmit (event){
        event.preventDefault();
        
        const fileInput = document.querySelector("#image");
        const formData = new FormData();
        console.log(document.forms["NEWLISTFORM"]["Product"].value)
        formData.append("file", fileInput.files[0]);
        formData.append("Product type",document.forms["NEWLISTFORM"]["Product type"].value)
        formData.append("Product",document.forms["NEWLISTFORM"]["Product"].value)
        formData.append("Serial number",document.forms["NEWLISTFORM"]["Serial number"].value)
        formData.append("Seller",document.forms["NEWLISTFORM"]["Seller"].value)
        formData.append("Manufacturer",document.forms["NEWLISTFORM"]["Manufacturer"].value)
        formData.append("Price",document.forms["NEWLISTFORM"]["Price"].value)
        formData.append("Country  of origin",document.forms["NEWLISTFORM"]["Country  of origin"].value)
        formData.append("Warranty Period(in months)",document.forms["NEWLISTFORM"]["Warranty Period(in months)"].value)
        formData.append("Description",document.forms["NEWLISTFORM"]["Description"].value)
        formData.append("walletaddress",wal)
        formData.append("pvtkey",document.forms["NEWLISTFORM"]["pvtkey"].value)
        const func = async()=>{
            const options = {
                method: "POST",
                // mode:'cors',
                //     credentials:'same-origin',
                    
                body: formData,
                };
        
                const rbody= await fetch("http://127.0.0.1:5000/List", options);
                const rjbody=await rbody.json()
                console.log(rjbody['result'])
                const ipfs_link=rjbody['result']
                const pleaseadddoc = ()=>{addDoc (itemsRef,{
                    ipfs: ipfs_link,
                    serial: document.forms["NEWLISTFORM"]["Serial number"].value,
                    owner  :wal,
                    sellcount :0,
                    name :document.forms["NEWLISTFORM"]["Product"].value,
                    nft_link :null,
                    onsale :true
                })}
                pleaseadddoc()
                setGetVer(true)
                
                if (rjbody['result']){
                    setResult(<Grid>
                        <Paper elevation={10} style={paperStyle}>
                            <div>
                            <div style={{fontSize:20,fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'}}>SUCCESS!</div>
                            </div>
                        </Paper>
                    </Grid>)
                }
                else{
                    setResult(<Grid>
                        <Paper elevation={10} style={paperStyle}>
                        <div style={{fontSize:20,fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'}}>FAILED! CHECK IF YOU HAVE ENTERED THE CORRECT KEY</div>
                        </Paper>
                    </Grid>)
                }
        }
        func()
        
    }
    const paperStyle={padding :40,height:'auto',width:'auto', margin:"5%"}
    const avatarStyle={backgroundColor:'#3f51b5',width:'auto',padding:10,color:' white',fontSize: '0.875rem',fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',borderRadius:'4px'}
    const btnstyle={margin:'8px 0',backgroundColor:'#3f51b5',width:'50%'}
    const outerstyle={display: 'flex', alignItems: 'center',justifyContent: 'center',width:'auto'}
    return(
        <div>
        {getVer ? <></> : <>
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <form onSubmit={HandleSubmit} name='NEWLISTFORM'>
                <Grid align='center'>
                     <Box style={avatarStyle}>ENTER PRODUCT DETAILS</Box>
                </Grid>
                <TextField id='Product type' label='Product type' placeholder='Enter type/category of product' fullWidth required/>
                <TextField id='Product' label='Product' placeholder='Enter name of product'  fullWidth required/>
                <TextField id='Serial number' label='Serial number' placeholder='Serial number/product UID' fullWidth required/>
                <TextField id='Seller' label='Seller' placeholder='Enter name of seller' fullWidth required/>
                <TextField id='Manufacturer' label='Manufacturer' placeholder='Manufactured by-' fullWidth required/>
                <TextField id='Country  of origin' label='Country  of origin' placeholder='Country of origin/Manufactured and assembled in' fullWidth required/>
                <TextField id='Price' label='Price' placeholder='Enter equivalent matic amount' type='number' fullWidth required/>
                <TextField id='pvtkey' label='Private key (Not Stored/Shared)(please add 0x at the start)' placeholder='0x....' type='password' fullWidth required/>
                <TextField id='Warranty Period(in months)' label='Warranty Period(in months)' placeholder='eg. - 12' type='number' fullWidth required/>
                <TextField id='Description' label='Description' multiline  minRows={3}  maxRows={6} fullWidth required />
                <div > Choose Image: &nbsp;
                <input id='image' type='file' name="image" accept='image/*'></input>
                </div>
                
                
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label=''
                    
                 />
                 <Linkto to='/'> I agree to the terms and conditions</Linkto>
                 <br/>
                 <div style={outerstyle}> 
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>List Product</Button>
                
                </div>
                <div style={outerstyle}>*please wait, it can take upto 30 seconds</div>
                </form>
            </Paper>
        </Grid>
        </>}
        <div>{result}</div>
        </div>
    )
}

