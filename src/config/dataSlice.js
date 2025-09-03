import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API } from './configAxios'
// import { useNavigate } from 'react-router-dom'

export const GetProducts = createAsyncThunk("todos/GetProducts", async () => {
    try {
        const { data } = await API.get('Product/get-products')
        return data.data
    } catch (error) {
        console.log(error);
    }
})

export const AddProductsFunc = createAsyncThunk("todos/AddProductsFunc", async (product, { dispatch }) => {
    try {
        await API.post('Product/add-product', product)
        // const navigate = useNavigate()   
        dispatch(GetProducts())
        //   navigate('/products')

    } catch (error) {
        console.log(error);
    }
})

export const EditProductsFunc = createAsyncThunk('todos/EditProductsFunc', async (product, { dispatch }) => {
    try {
        await API.put(`Product/update-product`, product)
        dispatch(GetByIdProducts(localStorage.getItem('productId')))
    } catch (error) {
        console.log(error);
    }
})
export const AddImgProductsFunc = createAsyncThunk('todos/AddImgProductsFunc', async (product, { dispatch }) => {
    try {
        await API.post(`Product/add-image-to-product`, product)
        dispatch(GetByIdProducts(localStorage.getItem('productId')))
    } catch (error) {
        console.log(error);
    }
})
export const DelImgProductsFunc = createAsyncThunk('todos/DelImgProductsFunc', async (product, { dispatch }) => {
    try {
        await API.delete(`Product/delete-image-from-product?imageId=${product}`)
        dispatch(GetByIdProducts(localStorage.getItem('productId')))
    } catch (error) {
        console.log(error);
    }
})

export const GetByIdProducts = createAsyncThunk('todos/GetByIdProducts', async (id) => {
    try {
        const { data } = await API.get(`Product/get-product-by-id?id=${id}`)
        return data.data
    } catch (error) {
        console.log(error);
    }
})


export const GetProfileUser = createAsyncThunk("todos/GetProfileUser", async () => {
    try {
        const { data } = await API.get('UserProfile/get-user-profiles?PageNumber=1&PageSize=32')
        return data
    } catch (error) {
        console.error(error);
    }
})

export const DeleteUser = createAsyncThunk('todos/DeleteUser', async (id, { dispatch }) => {
    try {
        await API.delete(`UserProfile/delete-user?id=${id}`)
        dispatch(GetProfileUser())
    } catch (error) {
        console.log(error);
    }
})
export const DeleteUserRole = createAsyncThunk('todos/DeleteUserRole', async ({ UserId, RoleId }, { dispatch }) => {
    try {
        await API.delete(`UserProfile/remove-role-from-user?UserId=${UserId}&RoleId=${RoleId}`)
        dispatch(GetProfileUser())
    } catch (error) {
        console.log(error);
    }
})
export const AddUserRole = createAsyncThunk('todos/AddUserRole', async ({ UserId, RoleId }, { dispatch }) => {
    try {
        await API.post(`UserProfile/addrole-from-user?UserId=${UserId}&RoleId=${RoleId}`)
        dispatch(GetProfileUser())
    } catch (error) {
        console.log(error);
    }
})

export const DeleteProducts = createAsyncThunk('todos/DeleteProducts', async (id, { dispatch }) => {
    try {
        await API.delete(`Product/delete-product?id=${id}`)
        dispatch(GetProducts())
    } catch (error) {
        console.log(error);
    }
})

export const GetRole = createAsyncThunk("todos/GetRole", async () => {
    try {
        const { data } = await API.get('UserProfile/get-user-roles')
        return data.data
    } catch (error) {
        console.log(error);
    }
})

export const GetCategory = createAsyncThunk("todos/GetCategory", async () => {
    try {
        const { data } = await API.get(`Category/get-categories`)
        return data.data
    } catch (error) {
        console.log(error);
    }
})
export const AddCategory = createAsyncThunk("todos/AddCategory", async (cate, { dispatch }) => {
    try {
        await API.post(`Category/add-category`, cate)
        dispatch(GetCategory())
    } catch (error) {
        console.log(error);
    }
})
export const DeleteCategory = createAsyncThunk("todos/DeleteCategory", async (id, { dispatch }) => {
    try {
        await API.delete(`Category/delete-category?id=${id}`)
        dispatch(GetCategory())
    } catch (error) {
        console.log(error);
    }
})
export const EditCategory = createAsyncThunk("todos/DeleteCategory", async (cate, { dispatch }) => {
    try {
        await API.put(`Category/update-category`, cate)
        dispatch(GetCategory())
    } catch (error) {
        console.log(error);
    }
})



export const GetColor = createAsyncThunk('todos/GetColor', async () => {
    try {
        const { data } = await API.get('Color/get-colors')
        return data.data
    } catch (error) {
        console.log(error);
    }
})

export const AddColor = createAsyncThunk('todos/AddColor', async (name, { dispatch }) => {
    try {
        await API.post(`Color/add-color?ColorName=${name}`)
        dispatch(GetColor())
    } catch (error) {
        console.log(error);
    }
})


export const GetSubCategory = createAsyncThunk('todos/GetSubCategory', async () => {
    try {
        const { data } = await API.get('SubCategory/get-sub-category')
        return data.data
    } catch (error) {
        console.log(error);
    }
})

export const AddSub = createAsyncThunk('todos/AddSub', async ({ CategoryId, SubCategoryName }, { dispatch }) => {
    try {
        await API.post(`SubCategory/add-sub-category?CategoryId=${CategoryId}&SubCategoryName=${SubCategoryName}`)
        dispatch(GetCategory())
    } catch (error) {
        console.log(error);
    }
})
export const EditSub = createAsyncThunk('todos/EditSub', async ({ id, CategoryId, SubCategoryName }, { dispatch }) => {
    try {
        await API.put(`SubCategory/update-sub-category?Id=${id}&CategoryId=${CategoryId}&SubCategoryName=${SubCategoryName}`)
        dispatch(GetCategory())
    } catch (error) {
        console.log(error);
    }
})
export const DeleteSub = createAsyncThunk('todos/DeleteSub', async (id, { dispatch }) => {
    try {
        await API.delete(`SubCategory/delete-sub-category?id=${id}`)
        dispatch(GetCategory())
    } catch (error) {
        console.log(error);
    }
})

export const GetBrands = createAsyncThunk('todos/GetBrands', async () => {
    try {
        const { data } = await API.get('Brand/get-brands')
        return data.data
    } catch (error) {
        console.log(error);
    }
})
export const AddBrands = createAsyncThunk('todos/AddBrands', async (brand, { dispatch }) => {
    try {
        await API.post(`Brand/add-brand?BrandName=${brand}`)
        dispatch(GetBrands())
    } catch (error) {
        console.log(error);
    }
})
export const EditBrands = createAsyncThunk('todos/EditBrands', async ({ id, BrandName }, { dispatch }) => {
    try {
        await API.put(`Brand/update-brand?Id=${id}&BrandName=${BrandName}`)
        dispatch(GetBrands())
    } catch (error) {
        console.log(error);
    }
})
export const DeleteBrands = createAsyncThunk('todos/DeleteBrands', async (id, { dispatch }) => {
    try {
        await API.delete(`Brand/delete-brand?id=${id}`)
        dispatch(GetBrands())
    } catch (error) {
        console.log(error);
    }
})

const initialState = {
    data: [],
    loading: false,
    user: [],
    category: [],
    colors: [],
    subcategory: [],
    byidproducts: [],
    brands: [],
    role:[]

}

export const dataSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers(buider) {
        buider.addCase(GetProducts.pending, (state,) => {
            state.loading = true
        }),
            buider.addCase(GetProducts.fulfilled, (state, { payload }) => {
                state.data = payload
                state.loading = false
            }),
            buider.addCase(GetProfileUser.pending, (state,) => {
                state.loading = true
            }),
            buider.addCase(GetProfileUser.fulfilled, (state, { payload }) => {
                state.user = payload
                state.loading = false
            }),
            buider.addCase(GetCategory.pending, (state,) => {
                state.loading = true
            }),
            buider.addCase(GetCategory.fulfilled, (state, { payload }) => {
                state.category = payload
                state.loading = false
            }),
            buider.addCase(GetColor.fulfilled, (state, { payload }) => {
                console.log(payload);
                state.colors = payload
            }),
            buider.addCase(GetSubCategory.fulfilled, (state, { payload }) => {
                state.subcategory = payload
            }),
            buider.addCase(GetByIdProducts.fulfilled, (state, { payload }) => {
                state.byidproducts = payload
            })
           buider.addCase(GetBrands.pending, (state,) => {
            state.loading = true
            })
           buider.addCase(GetBrands.fulfilled, (state, { payload }) => {
            state.brands = payload
            state.loading = false
          }),
          buider.addCase(GetRole.fulfilled , (state , {payload})=>{
              state.role = payload
          })
            
    }
})


export default dataSlice.reducer