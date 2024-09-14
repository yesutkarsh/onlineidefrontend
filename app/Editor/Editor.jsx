"use client";
import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import Nav, { BNav } from "./components/Nav";
import Editor from "@monaco-editor/react";
import Terminals from "./components/Terminal";
import FileSystem from "./components/FileSystem";
import { useDispatch, useSelector } from "react-redux";
import { chnageStatus, setFileContent, toggleFileSystem } from "@/utils/fileSlice";
import { socket } from "@/utils/connection";


export default function EditorCard() {

  const socketAddress = useSelector((store)=>{
    return store?.file?.socketPort;
  })

 

  const [saveBut, setSavButt] = useState("Save")
  const [TerminalVisibility, setTerminalVisibility] = useState(true)

  const dispatch = useDispatch()
  const [content, setContent] = useState("// Write your code here");
  const [code, setCode] = useState("");



  const FileSysVisibility = useSelector((store)=>{
    return store?.file?.FileSystemVisibility
  })

  useEffect(() => {
    // Listen for content event from socket
    socket.on("content", (data) => {
      setContent(data);
      dispatch(setFileContent(data))
    });

    // Cleanup the socket listener when component unmounts
    return () => {
      socket.off("content");
    };
  }, []);


  

  const fileName = useSelector((store)=>{
    return store?.file?.selectedFile
  })


  const fileContent = useSelector((store)=>{
    return store?.file?.fileContent
  })


  const fileStatus = useSelector((store)=>{
    return store?.file?.fileStatus
  })


  const saveContent = ()=>{
    if(!fileName){
        alert("No File Selected")
        return
    }
    else{
      setSavButt("Saving...")
      socket.emit('fileWrite',{path:fileName.path, content: code})
      console.log(fileName.path)
    }
}
socket.on('Saved',(data)=>{
  setSavButt("Document Saved")
  setTimeout(() => {
  setSavButt("Save")
  }, 3000);

})

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.container}>
          <Nav />
          <BNav />

          <div className={style.main}>
            {/* File system */}
{FileSysVisibility?
            <div className={style.fileSystem}>
              <FileSystem />
            </div>
            :
            <div className={style.fileSystem1}>
              <span onClick={()=>dispatch(toggleFileSystem())}>
              <i class="ri-arrow-right-line"></i>
              </span>
            </div>            
            }
            <div className={style.code}>
              <div style={{backgroundColor:"#2e2e3e"}} className={style.fileName}>
                {fileName?.type}
              {fileName?.path}
              <div>{fileStatus}</div>
              </div>
              <div className={style.Editor}>
                <Editor
                  className={style.codeEditor}
                  defaultLanguage="javascript"
                  value={content} // Use value instead of defaultValue
                  onChange={(value) =>{ setCode(value)}}
                  theme="vs-dark"
                  options={{
                    lineNumbers: "on",
                    minimap: { enabled: false },
                    scrollBeyondLastLine: true,
                    quickSuggestions: true,
                  }}
                />
              </div>
              <div className={style.options}>
                <span
                 onClick={saveContent}
                >
                  <i className="ri-save-3-fill"></i> {saveBut}
                </span>
                <span
                  onClick={() => {
                    socket.emit("terminal:run", "node index.js\n");
                   
                  }}
                >
                  <i className="ri-restart-line"></i> Run
                </span>
                <span
                  onClick={() => {
                    setTerminalVisibility(!TerminalVisibility)
                  }}
                >
                  {TerminalVisibility?
                <>
                  <i class="ri-eye-line"></i>
                  Hide Terminal
                </>  
                
                  :
                <>
                <i class="ri-eye-off-line"></i>
                Show Terminal
                </>
                }
                                   
                </span>
              </div>
              {TerminalVisibility?
              <Terminals />
            :""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
