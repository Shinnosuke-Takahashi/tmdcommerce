import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

const Review = ({ checkoutToken }) => {
    console.log(checkoutToken);
  return (
    <>
        <Typography variant="h6" gutterButtom>Order Summary</Typography>
        <List disablePadding>
            {checkoutToken.line_items.map((product) => (
                <ListItem style={{padding:'10px 0'}} key={product.name}>
                    <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
                    <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
                </ListItem>
            ))}
            <ListItem style={{padding:'10px 0'}}>
                <ListItemText primary="Subtotal"/>
                <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                    {checkoutToken.subtotal.formatted_with_symbol}
                </Typography>
            </ListItem>
            <ListItem style={{padding:'10px 0'}}>
                <ListItemText primary="Tax"/>
                <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                    {checkoutToken.tax.amount.formatted_with_symbol}
                </Typography>
            </ListItem>
            <ListItem style={{padding:'10px 0'}}>
                <ListItemText primary="TOTAL"/>
                <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                    {checkoutToken.total_with_tax.formatted_with_symbol}
                </Typography>
            </ListItem>
        </List>
    </>
  )
}

export default Review;