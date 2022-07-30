import React from 'react';
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import { AddShoppingCart  } from '@material-ui/icons';

import useStyles from './styles';

const UNFT = ({ product }) => {
    const classes = useStyles();

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
            <Typography className={classes.cardDesc} component="a" href={product.tokenview} variant='h5' color="textSecondary">NFT Link</Typography>
                
            </CardActions>
        </Card>
    );
}

export default UNFT;