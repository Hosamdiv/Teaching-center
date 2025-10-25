import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import type { IProduct } from '../../../interfaces'
import { addToCart } from '../../../utils'

export interface CounterState {
    cartItem: IProduct[]
}

const initialState: CounterState = {
    cartItem: JSON.parse(localStorage.getItem("cartItem") ?? '[]') as IProduct[],
}


export const productSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemCart: (state, action: PayloadAction<IProduct>) => {
            state.cartItem = addToCart(state.cartItem, action.payload);
            localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.cartItem = state.cartItem.filter(
                (item) => item.id !== action.payload
            );
            localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
        }
    }
});
export const { addItemCart, removeFromCart } = productSlice.actions
export const selectCart = ({ cart }: RootState) => cart

export default productSlice.reducer
