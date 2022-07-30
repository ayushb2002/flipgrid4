import React from 'react';
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton, Button} from '@material-ui/core';
import { AddShoppingCart  } from '@material-ui/icons';
import { WalletContext } from '../../context';
import useStyles from './styles';

export const Product = ({ product }) => {
    const { wal,setWal }=React.useContext(WalletContext)
    const classes = useStyles();
    const sale=event=>{
        let text;
        let person = prompt("To buy "+event.currentTarget.id+", please enter your wallets' private key, starting with 0x", "0x");
        if (person == null || person == ""||person=='0x') {
            return
          } else {
            //console.log(event.currentTarget.id)
            const array=(event.currentTarget.id).split(',')
            console.log(array)
            const func =async()=>{
                const formData = new FormData();
                formData.append("ipfs",array[3])     
                console.log(array[3],'hehehe')                                      
                const response =await fetch('http://127.0.0.1:5000/sale/'+wal+'/'+array[0]+'/'+array[1]+'/'+array[2]+'/'+person+'/'+array[4],{
                    method:'POST',
                    mode:'cors',
                    credentials:'same-origin',
              
                    body:formData,
                })
                
                const body=await response.json()

                console.log(body)
                alert("Your token id is: "+String(body.token)+"\n NFT viewable at: "+body.NFT)
          }
          func()
    }}
 
    return(
        
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product['image_uri']} title={product.name}/>
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5">
                        ${product.attributes.Price}
                    </Typography>
                </div>
                
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
            <Typography className={classes.cardDesc} variant='h5' color="textSecondary">{product.description}</Typography>
                <Button id={product.attributes['Warranty Period(in months)']+','+product.attributes['Price']+','+product.name+','+product.ipfs+','+product.owner+','+product.docid} onClick={sale}>BUY</Button>
            </CardActions>
        </Card>
    );
}

