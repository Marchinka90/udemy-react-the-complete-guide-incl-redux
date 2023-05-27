import { useReducer } from 'react';

import CartContext from './cart-context';

const  defaultCartState = {
    items: [],
    totalAmaunt: 0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmaunt + action.item.price * action.item.amount;
        
        const existingCatItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCatItem = state.items[existingCatItemIndex];
        
        let updatedItems;

        if (existingCatItem) {
            const updatedItem = {
                ...existingCatItem,
                amount: existingCatItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCatItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmaunt: updatedTotalAmount
        };
    }

    if (action.type === 'REMOVE') {
        const existingCatItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingCatItem = state.items[existingCatItemIndex];
        const updatedTotalAmount = state.totalAmaunt - existingCatItem.price; 
        let updatedItems;

        if (existingCatItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = { ...existingCatItem, amount: existingCatItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCatItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmaunt: updatedTotalAmount
        };

    }

    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: 'ADD', item: item});
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE', id: id});
    };

    const cartContext = {
        items: cartState.items,
        totalAmaunt: cartState.totalAmaunt,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;