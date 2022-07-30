
import React from 'react'
import ReactDOM from 'react-dom'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link, Box } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Link as Linkto} from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
export const UsList=({received})=>{
    console.log(received)
    const paperStyle={padding :40,height:'auto',width:'auto', margin:"5%"}
    const avatarStyle={backgroundColor:'#3f51b5',width:'auto',padding:10,color:' white',fontSize: '0.875rem',fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',borderRadius:'4px'}
    const btnstyle={margin:'8px 0',backgroundColor:'#3f51b5',width:'50%'}
    const outerstyle={display: 'flex', alignItems: 'center',justifyContent: 'center',width:'auto'}
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Box style={avatarStyle}>ENTER PRODUCT DETAILS</Box>
                </Grid>
                <TextField label='Product type' defaultValue='hahaha' placeholder='Enter type/category of product' fullWidth required/>
                <TextField label='Product' placeholder='Enter name of product'  fullWidth required/>
                <TextField label='Serial number' placeholder='Serial number/product UID' inputProps={{readOnly:true}} fullWidth required/>
                <TextField label='Seller' placeholder='Enter name of seller' fullWidth required/>
                <TextField label='Manufacturer' placeholder='Manufactured by-' fullWidth required/>
                <TextField label='Country  of origin' placeholder='Country of origin/Manufactured and assembled in' fullWidth required/>
                <TextField label='Price' placeholder='Enter equivalent matic amount' type='number' fullWidth required/>
                <TextField label='Warranty Period(in months)' placeholder='eg. - 12' type='number' fullWidth required/>
                <TextField label='Description' multiline  minrows={3}  maxRows={6} fullWidth />
                <TextField label='Username' placeholder='Enter username' fullWidth required/>
                
                <TextField label='Description' multiline  minrows={3}  maxRows={6} fullWidth />
                <TextField label='Username' placeholder='Enter username' fullWidth required/>
                
                
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
            </Paper>
        </Grid>
    )
}

