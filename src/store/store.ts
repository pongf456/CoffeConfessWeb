import { configureStore } from '@reduxjs/toolkit';
import sliceGlobalVars from './sliceGlobalVars';
const store = configureStore({
     reducer:{
        globalVariables:sliceGlobalVars
     }
})
export default store
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch