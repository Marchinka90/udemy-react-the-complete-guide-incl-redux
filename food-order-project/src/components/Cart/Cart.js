import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);
    
    const totalAmaunt = `$${cartCtx.totalAmaunt.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount: 1});
    }; 

    const orderHandler = () => {
        setIsCheckout(true)
    };

    const submitOrderHandler = (userData) => {
        setIsSubmitting(true);
        fetch('https://ract-http-828ff-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderItems: cartCtx.items
            })
        })
        .then(res => res.json());
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>
            Close
        </button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>

    const CartModalContact = <React.Fragment>
        {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmaunt}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart} /> }
            {!isCheckout && modalActions}
    </React.Fragment>;

    const isSubmittingModalContent = <p>Sending order data...</p>;
    const didSubmitModalContent = <React.Fragment>
        <p>Successfully sent the order!</p>
        <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>
            Close
        </button>
    </div>
    </React.Fragment> 

    return (
        <Modal onHideCart={props.onHideCart}>
            {!isSubmitting && !didSubmit && CartModalContact}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;