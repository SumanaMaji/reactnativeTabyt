import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userData',
  initialState: {
    userData: {},
    login: false,
    guestLogin: false,
    intro: true,
    updateImg: false,
  },
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      return {...state, userData: user, login: true, guestLogin: false};
    },
    setLogin(state, action) {
      const status = action.payload;
      return {...state, login: status};
    },
    setGuestLogin(state, action) {
      const status = action.payload;
      return {...state, guestLogin: status};
    },
    // setImg(state,action) {
    //   //  const user = action.payload;
    //    console.log("action.payload",action.payload);
    //    state.userData.image = action.payload ;
    //    return {...state, userData:state.userData }
    // },
    setImg: (state, action) => void (state.userData.image = action.payload),
    removeUser(state, action) {
      return {...state, userData: {}, login: false};
    },
    setIntro(state, action) {
      return {...state, intro: false};
    },
  },
});

export const {setUser, setLogin, setGuestLogin, setImg, removeUser, setIntro} =
  userSlice.actions;

export default userSlice.reducer;
