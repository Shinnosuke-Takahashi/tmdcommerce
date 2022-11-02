import React from 'react'
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

import useStyles from './styles';

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart, products, cart}) => {
    const classes = useStyles();

    function cartInventoryCheck(products, item, cart){
        const product = (products.filter(({'id': n}) => n === item.product_id))[0]
        if (!product.inventory.managed) return true;
        if ((item.product_id === product.id) && (item.quantity < product.inventory.available)) return true
        return false;
    }

    console.log(item)

  return (
    <Card className={classes.root}>
        <CardMedia image={item.image.url} alt={item.name} className={classes.media}/>
        <CardContent className={classes.cardContent}>
            <Typography variant="h4">{item.name}</Typography>
            <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
            {
             item.variant ? <Typography variant="h6">{item.variant.description}</Typography> : <></>
            }
            <div className={classes.buttons}>
                <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
                <Typography>{item.quantity}</Typography>
                {cart.line_items && cartInventoryCheck(products, item, cart) ? 
                (<Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}>+</Button>) :
                (<></>)
                }

            </div>
            <br/>
            <Button variant='contained' type="button" color="secondary" onClick={() => onRemoveFromCart(item.id)}>Remove</Button>
        </CardActions>
    </Card>
  )
}

export default CartItem