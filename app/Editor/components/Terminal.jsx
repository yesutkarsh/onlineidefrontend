"use client"
import React, { useEffect, useRef } from 'react'
import style from "../style.module.css"
import { Terminal as XTerminal } from '@xterm/xterm';
import "@xterm/xterm/css/xterm.css"
import { useSelector } from 'react-redux';
import { socket } from '@/utils/connection';
export default function Terminals() {


  


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
