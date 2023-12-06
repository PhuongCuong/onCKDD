import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getAllProduct = createAsyncThunk(
    "api/get-all-product", async () => {
        try {
            let res = await fetch("https://656fe9796529ec1c62384de6.mockapi.io/api/v1/product", {
                method: "GET"
            })
            if (!res) {
                throw new Error("get data arror");
            } else {
                let data = await res.json();
                return data;
            }
        } catch (error) {
            throw new Error(error);
        }
    }
)

const updateUser = createAsyncThunk(
    "api/update-user", async (item) => {
        try {
            let res = await fetch(`https://656fe9796529ec1c62384de6.mockapi.io/api/v1/user/${item.id}`, {
                method: "PUT",
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            })
            if (!res) {
                throw new Error("get data arror");
            } else {
                let data = await res.json();
                return data;
            }
        } catch (error) {
            throw new Error(error);
        }
    }
)



export const dataSlice = createSlice({
    name: "dataAPI",
    initialState: {
        productArr: [],
        user: {
            name: "",
            password: "",
            cart: [],
            id: ""
        },
        product: {
            id: "",
            nameProduct: "",
            price: 0,
            img: ""
        },
    },
    reducers: {
        loginuser: (state, action) => {
            state.user = action.payload;
        },
        addCart: (state, action) => {
            if (state.user.cart && state.user.cart.length > 0) {
                let index = state.user.cart.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.user.cart[index] = { ...state.user.cart[index], sl: state.user.cart[index].sl + 1 };
                } else {
                    state.user.cart = [...state.user.cart, action.payload]
                }
            } else {
                state.user.cart = [...state.user.cart, action.payload]
            }
        },
        minusCart: (state, action) => {
            let index = state.user.cart.findIndex(item => item.id === action.payload.id);
            if (index !== -1 && state.user.cart[index].sl > 1) {
                state.user.cart[index] = { ...state.user.cart[index], sl: state.user.cart[index].sl - 1 };
            }
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.productArr = action.payload;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
    }
})

export { getAllProduct, updateUser }

export const { loginuser, addCart, minusCart } = dataSlice.actions;

export default dataSlice.reducer;