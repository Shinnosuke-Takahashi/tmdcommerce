import React, { useState, useEffect } from 'react'
import { Grid, InputLabel, Select, MenuItem, Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart    } from '@material-ui/icons';
import useStyles from './styles';
import { commerce } from '../../../lib/commerce';

const Product = ({ product, onAddToCart, cart }) => {

    //bool
    function inventoryCheck(cartItems, product) {
        if (!cartItems.length) return true //if not loaded yet
        if (!product.inventory.managed) return true //if not managed
        if ((cartItems.find(item => item.product_id === product.id) === undefined)) return true; //if product not in cart

        for (let i = 0; i < cartItems.length; i++) {
            if ((cartItems[i].product_id === product.id) && (cartItems[i].quantity < product.inventory.available)) return true
        }
        return false
    }
    
    const classes = useStyles();

    const handleAddToCart = () => {
        onAddToCart(product.id, 1, productVariant)
        };

    const [productVariants, setProductVariants] = useState([]);
    const [productVariant, setProductVariant] = useState('');
 
    const fetchVariants = async () => {
        const v = await commerce.products.getVariants(product.id);
        setProductVariants(v.data)
    }  

    useEffect(() => {
        fetchVariants();
    }, [])

    
    return (
            <Card className={classes.root}> 
                <CardMedia className={classes.media} image={product.image.url} title={product.name}/>
                <CardContent>
                    <div className={classes.cardContent}>
                        <Typography variant="h5" gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant="h5">
                            {product.price.formatted_with_symbol}
                        </Typography>
                    </div>
                    <Typography dangerouslySetInnerHTML= {{__html: product.description}} variant="body2" color="textSecondary" component="p"/>
                </CardContent>
                <div className={classes.cardActionCont}>
                    <CardActions disableSpacing className={classes.cardActionsLeft}>
                    {(productVariants ? (
                        <Grid item xs={12} sm={6}>
                        <InputLabel>Size</InputLabel>
                            <>
                            <Select id="variantSelect" value={productVariant} fullWidth onChange={(e)=> setProductVariant(e.target.value)}>
                                   {productVariants.map((v) => (
                                    <MenuItem key={v.id} value={v.id}>
                                        {v.description}
                                    </MenuItem>
                                ))}
                            </Select>
                            </>
                    </Grid>
                    ) : <></> )}
                    </CardActions>      
                    <CardActions disableSpacing className={classes.cardActionsRight}>
                        {
                        (product.inventory.managed && cart.line_items && inventoryCheck(cart.line_items, product) && !productVariants)? 
                        (<>
                            <Typography variant="body2">{product.inventory.available} in stock </Typography>
                        </>) :  
                        (<></>)
                        }
                        {
                        cart.line_items && inventoryCheck(cart.line_items, product) ? 
                            (
                               <IconButton aria-label="Add to Cart" onClick={handleAddToCart} >
                                    <AddShoppingCart />
                                </IconButton> 
                            )
                            : 
                            (<> 
                            <br/>
                            <Typography variant="body2">All available stock already in cart!</Typography>
                            </>)
                        }
                    </CardActions>
                </div>
            </Card>
    )
}

export default Product