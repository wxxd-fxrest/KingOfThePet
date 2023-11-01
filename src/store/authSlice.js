import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
};

export const authSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUserData: (state, action) => {
            const newUserData = action.payload; // 사용자 데이터
            state.users.push(newUserData);
        },
    },
});

export const selectNumberOfItems = (state) => state.cart.items.length;

// export const selectSubtotal = (state) => state.cart.items.reduce(
//     (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity, 
//     0
// );

// const cartSelector = (state) => state.cart;
// export const selectDeliceryPrice = createSelector(
//     cartSelector,
//     selectSubtotal, 
//     (cart, subtotal) => (subtotal > cart.freeDeliveryFrom ? 0 : cart.deliveryFee)
// );

// export const selectTotal = createSelector(
//     selectSubtotal,
//     selectDeliceryPrice,
//     (subtotal, delivery) => subtotal + delivery
// );