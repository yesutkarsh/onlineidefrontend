"use client"
import React, { useEffect, useRef } from 'react'
import style from "../style.module.css"
import { Terminal as XTerminal } from '@xterm/xterm';
import "@xterm/xterm/css/xterm.css"
import {io} from "socket.io-client"
import { useSelector } from 'react-redux';

export default function Terminals() {


   const socketAddress = useSelector((store)=>{
     return store?.file?.socketPort;
   })

   let socket;
   if(socketAddress != undefined){
     socket = io(`http://34.67.228.203:${socketAddress}`)
   }else{
    return
   }


    const Displayterminal = useRef()

    let isRendered = false
    const term = new XTerminal()
    term.onData((data)=>{
      socket.emit("terminal:write",data)
    })

    socket.on('terminal:data',(data)=>{
      term.write(data)
    })
    
    useEffect(()=>{
        if(isRendered) return
        term.open(Displayterminal.current)
        term.writeln("Press Enter to Continue");
        isRendered = true
    },[])
  return (

<>
   <div ref={Displayterminal} className={style.term}>
   </div>
</>

  )
}
