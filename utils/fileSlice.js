import { createSlice } from "@reduxjs/toolkit";
const fileSlice = createSlice({
  name: 'file',
  initialState: {
    selectedFile: null,
    fileContent: '',
    fileStatus:"Saved",
    FileSystemVisibility:false,
    socketPort:undefined
  },
  reducers: {
    setSelectedFile: (state, action) => {
      state.selectedFile = action.payload;
    },
    setFileContent: (state, action) => {
      state.fileContent = action.payload;
    },
    clearFile: (state) => {
      state.selectedFile = null;
      state.fileContent = '';
    },
    chnageStatus: (state,action)=>{
      state.fileStatus = action.payload;
    },
    toggleFileSystem: (state,action)=>{
      state.FileSystemVisibility = !state.FileSystemVisibility;
    },
    setSocketPort: (state,action)=>{
      state.socketPort = action.payload;
    },

  },
});

export const { setSelectedFile, setFileContent, clearFile, chnageStatus,toggleFileSystem, setSocketPort } = fileSlice.actions;

export default fileSlice.reducer;
