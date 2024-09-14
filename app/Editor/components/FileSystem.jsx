"use client"
import React, { useEffect, useState } from "react";
import style from "../style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedFile, toggleFileSystem } from "@/utils/fileSlice";
import { useRouter } from 'next/navigation';
import { socket } from "@/utils/connection";


export default function FileSystem() {

  const router = useRouter()
  
  let socketAddress = useSelector((store)=>{
    return store?.file?.socketPort;
  })




  const [data, setData] = useState([]);
  const [openFolders, setOpenFolders] = useState({});
  const [selectedPath, setSelectedPath] = useState(null);
  const [lock, setLock] = useState(true);


  // Toggling Create Folder
  const [createFolder, setCreateFolder] = useState(false);
  // Toggling Create File
  const [createFile, setCreateFile] = useState(false);

  // Gettig Filepath
  const fileName = useSelector((store) => {
    return store?.file?.selectedFile;
  });

  const [nameOfFile, setNameOfFile] = useState("");
  const [nameOfFolder, setNameOfFolder] = useState("");





  // Creates file at backend
  function createFileBackend(param) {
    let path;
    if (!param) {
      path = "./user";
      console.log({ path: path, name: nameOfFile });
      socket.emit("createFile", { path: path, name: String(nameOfFile) });
      fetchData();
    } else {
      if (param.type == "folder") {
        path = param.path;
        console.log({ path: path, name: nameOfFile });
        socket.emit("createFile", { path: path, name: String(nameOfFile) });
        fetchData();
      } else if (param.type == "file") {
        path = param.path.split("/");
        path.pop();
        path = path.join("/");
        console.log({ path: path, name: nameOfFile });
        socket.emit("createFile", { path: path, name: String(nameOfFile) });
        fetchData();
      }
    }
  }

  // Creates Folder at backend
  function createFolderBackend(param){
    let path
    if(!param){
      path = "./user"
      console.log({path:path, name:nameOfFolder})
      socket.emit("createFolder", { path: path, name: String(nameOfFolder) });
      fetchData();
    }else{
      if (param.type == "folder") {
        path = param.path;
        console.log({ path: path, name: nameOfFolder });
        socket.emit("createFolder", { path: path, name: String(nameOfFolder) });
        fetchData();
      } else if (param.type == "file") {
        path = param.path.split("/");
        path.pop();
        path = path.join("/");
        console.log({ path: path, name: nameOfFolder });
        socket.emit("createFolder", { path: path, name: String(nameOfFolder) });
        fetchData();
      }
    }
  }


  // Deletes file at Backend
  function deleteItem (){
    if(fileName){
        let name = fileName.path.split("/")
        name = name[name.length-1]
        let path = fileName.path.split("/")
        path.pop()
        path=path.join("/")
        socket.emit('deleteItem',{path:path,name:name})
        fetchData();

    }
    fetchData();

  }

  const dispatch = useDispatch();

  const toggleFolder = (path) => {
    setOpenFolders((prevState) => ({
      ...prevState,
      [path]: !prevState[path],
    }));
  };

  const HandleFolder = (files) => {
    const isOpen = openFolders[files.path];
    const isSelected = selectedPath === files.path;

    return (
      <>
        <div
          onClick={() => {
            const path = "./" + files.path;
            dispatch(setSelectedFile({ type: "folder", path: path }));
            setSelectedPath(files.path);
            toggleFolder(files.path);
          }}
          className={style.fileName}
        >
          <div
            style={{
              backgroundColor: isSelected ? "#2e2e3e" : "transparent",
              padding: "5px",
              display:"flex",
              justifyContent:"space-between"
            }}
          >
            <span>
            📂{files.name} ({files.children.length} Items
            )
            </span>
            <span>
        {isSelected? <i onClick={deleteItem} class="ri-delete-bin-6-line"></i> :""}
            </span>
          </div>
        </div>
        {isOpen &&
          files.children.map((child) => (
            <div key={child.path} className="ml-6">
              <HandleFileSystem {...child} />
            </div>
          ))}
      </>
    );
  };

  const HandleFiles = (files) => {
    const isSelected = selectedPath === files.path;

    return (
      <div
        onClick={() => {
          let name = files.path.split("/")
          if(name[1] === "package.json"){
            alert("Restricted File, Not allowed To Open")
            return
          }else if(name[1] === "package-lock.json"){
            alert("Restricted File, Not allowed To Open")
            return
          }
          const path = "./" + files.path;
          let param = { type: "file", path: path };
          socket.emit("fileToView", path);
          dispatch(setSelectedFile({ type: "file", path: path }));
          setSelectedPath(files.path);
        }}
        className={style.fileName}
      >
        <div
          style={{
            backgroundColor: isSelected ? "#2e2e3e" : "transparent",
            padding: "5px",
            display:"flex",
            justifyContent:"space-between"
          }}
        >
        <span>
          📄{files.fileName}
        </span>
        {isSelected? <i onClick={deleteItem} class="ri-delete-bin-6-line"></i> :""}
        
        </div>
      </div>
    );
  };

  const HandleFileSystem = (files) => {
    if (files.type === "file") {
      return <HandleFiles {...files} />;
    }
    if (files.type === "folder") {
      return <HandleFolder {...files} />;
    }
    return null;
  };

  const fetchData = async () => {
      try {
        let data = await fetch(`https://container-1058876736891.us-central1.run.app/files`);
        const json = await data.json();
        console.log(json)
        setData(json); // Directly set the response
      } catch (err) {
        console.log(err);
      }
  };
  


  function ShowFileSystem(){
    fetchData();
    setLock(false)
  }

  return (
    <>
      <div className={style.fileSystemNav}>
        <span onClick={() => setCreateFile(!createFile)}>
          <i className="ri-sticky-note-add-fill"></i>
        </span>
        <span onClick={() => setCreateFolder(!createFolder)}>
          <i className="ri-folder-open-fill"></i>
        </span>
        <span onClick={fetchData}>
          <i className="ri-reset-left-line"></i>
        </span>
        <span onClick={()=>{
          dispatch(toggleFileSystem())
        }}>
        <i class="ri-arrow-left-line"></i>
        </span>
      </div>

      {/* Creating File */}
      {lock?
      <div onClick={ShowFileSystem} className={style.openFilSystem}>
        <span>Open File System
        <i class="ri-file-lock-fill"></i>
        </span>
      </div>
      :""}
      {createFile && (
        <div className={style.CreateFile}>
          <i className="ri-file-2-fill"></i>
          <input
            onChange={(e) => {
              setNameOfFile(e.target.value);
            }}
            placeholder="Type File Name"
            type="text"
          />
          <i
            onClick={(e) => {
              e.stopPropagation();
              createFileBackend(fileName);
            }}
            className="ri-check-double-line"
          ></i>
          <i
            onClick={() => setCreateFile(!createFile)}
            className="ri-close-fill"
          ></i>
          
        </div>
      )}

      {/* Creating Folder */}
      {createFolder && (
        <div className={style.CreateFolder}>
          <i className="ri-folder-3-fill"></i>
          <input
            onChange={(e) => {
              setNameOfFolder(e.target.value);
            }}
            placeholder="Type Folder Name"
            type="text"
          />
          <i
            onClick={(e) => {
              e.stopPropagation();
              createFolderBackend(fileName);
            }}
            className="ri-check-double-line"
          ></i>
          <i
            onClick={() => setCreateFolder(!createFolder)}
            className="ri-close-fill"
          ></i>
        </div>
      )}
{data[0]!==undefined? 
      data.map((files) => (
        <HandleFileSystem key={files.path} {...files} />
      ))
    :""}
      <span className={style.docname}>JavaScript</span>
    </>
  );
}
