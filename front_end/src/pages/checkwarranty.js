
import React , {useState} from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link, Box } from '@material-ui/core'
import { WalletContext } from '../context';
export const WarrantyCheck=()=>{
    const [getVer, setGetVer] = useState(false); 
    const [result,setResult]=useState(null)
    const { wal,setWal }=React.useContext(WalletContext)
    const func =async()=>{
        const response =await fetch('http://127.0.0.1:5000//checkWarranty/'+wal+'/'+document.forms["VERIFYFORM"]["nft_val"].value,{
            method:'GET',
            mode:'cors',
            credentials:'same-origin',
            headers:{
                "Content-Type":"application/json"
            }
        })
        const body=await response.json()
        console.log(body['result'])
        if (body['result']==='False'){
            setResult(<Grid>
                <Paper elevation={10} style={paperStyle}>
                    <div>
                    <div style={{fontSize:20,fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'}}>{body['message']}</div>

                    </div>
                </Paper>
            </Grid>)
        }
        else{
            setResult(<Grid>
                <Paper elevation={10} style={paperStyle}>
                <div style={{fontSize:20,fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'}}>{body['message']}</div>
                </Paper>
            </Grid>)
        }
        // setResult(body['abcd'])
    }
    function handleSubmit(event) {
        event.preventDefault();
        //console.log(document.forms["VERIFYFORM"]["nft_val"].value)
        
        setGetVer(true)
        func()
       // You should see email and password in console.
       // ..code to submit form to backend here...
    //<UsList/>
    }
    const paperStyle={padding :40,height:310,width:390, margin:"auto",marginTop: '9%', display:'flex',alignItems: 'center',justifyContent: 'center'}
    const avatarStyle={backgroundColor:'#3f51b5',width:'auto',padding:10,color:' white',fontSize: '0.875rem',fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',borderRadius:'4px'}
    const btnstyle={margin:'8px 0',backgroundColor:'#3f51b5',width:'auto'}
    const outerstyle={display: 'flex', alignItems: 'center',justifyContent: 'center',width:'auto',marginTop:'30%'}
    return(
        <div>
        {getVer ? <></> : <>
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <form onSubmit={handleSubmit} name="VERIFYFORM"> 
                <div style={{height:290}}>
                <Grid align='center'>
                     <Box style={avatarStyle}>ENTER NFT TOKEN NUMBER</Box>
                </Grid>
                <TextField id='nft_val' label='NFT token' fullWidth required style={{marginTop:'25%'}}/>
                 <div style={outerstyle}> 
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Check Warranty</Button>
                
                </div>
                <div>*please wait, it can take upto 30 seconds</div>
                </div>
                </form>
            </Paper>
        </Grid>
        </>}
        <div>{result}</div>
        </div>

    )
}

