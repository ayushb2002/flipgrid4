
import React , {useState} from 'react'

import { Grid,Paper, Avatar, TextField, Button, Typography,Link, Box } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Link as Linkto, useNavigate} from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import { UsList } from './user_listing';
import { SlList } from './seller_listing';

export const User_prelist=()=>{
    const [getSno, setGetSno] = useState(false); 
    var user_type = 'Normal'
    var toForward={}
    function handleSubmit(event) {
        event.preventDefault();
        console.log(document.forms["IDform"]["Serial_number"].value)
        toForward['Product type']='hahahah'
        toForward['Product']='hahahah'
        toForward['Serial number']='hahahah'
        toForward['Seller']='hahahah'
        toForward['Manufacturer']='hahahah'
        toForward['Country  of origin']='hahahah'
        toForward['Price']='hahahah'
        toForward['Warranty Period(in months)']='hahahah'
        toForward['Description']='hahahah'
        toForward['Username']='hahahah'
        console.log(toForward)
        user_type='Seller'
        console.log(user_type)
        setGetSno(true)
        
       // You should see email and password in console.
       // ..code to submit form to backend here...
    //<UsList/>
    }

    const paperStyle={padding :40,height:400,width:390, margin:"auto",marginTop: '9%', display:'flex',alignItems: 'center',justifyContent: 'center'}
    const avatarStyle={backgroundColor:'#3f51b5',width:'auto',padding:10,color:' white',fontSize: '0.875rem',fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',borderRadius:'4px',marginTop:'20%'}
    const btnstyle={margin:'8px 0',backgroundColor:'#3f51b5',width:'auto'}
    const outerstyle={display: 'flex', alignItems: 'center',justifyContent: 'center',width:'auto',marginTop:'2%'}
    const outerstyle2={display: 'flex', alignItems: 'center',justifyContent: 'center',width:'auto',marginTop:"25%"}
    let redirect = useNavigate();
    return(
        <div>
        {getSno ? <UsList/> : <>
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <div>
                <div style={outerstyle2}>
                <Button color='primary' variant="contained" style={btnstyle} fullWidth onClick={()=>redirect('/SList')}>List New Product</Button></div>
                <div style={{width: "100%", height: "20px", borderBottom: "1px solid black", textAlign: "center",marginTop:'10%'}}>
  <span style={{fontSize: '200%', backgroundColor: 'white', padding:' 0 10px',marginTop:'25%',fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'}}>
    OR
  </span>
</div>
                <form onSubmit={handleSubmit} name="IDform"> 
                <div style={{height:290}}>
                <Grid align='center'>
                     <Box style={avatarStyle}>ENTER PRODUCT SERIAL ID/NUMBER OF YOUR OWNED</Box>
                </Grid>
                <TextField id='Serial_number' label='Serial_number' placeholder='Serial number/product UID' fullWidth required style={{marginTop:'5%'}}/>
                
                 <div style={outerstyle}> 
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>List Product</Button>
                </div>
                </div>
                </form>
                </div>
            </Paper>
        </Grid>
        </>}
        </div>

    )
}

