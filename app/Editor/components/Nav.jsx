"use client"
import React, { useEffect, useState } from 'react'
import style from "../style.module.css"
import Link from 'next/link'


function TimeCard(props){
  return(
    <>
    <div className={style.timeCard}>
      <div className={style.wrappercard}>
    <h1>Instance Created Successfully _
    <i class="ri-check-double-line"></i>
    </h1>
    <div>
    {props.jsx}
    </div>
      </div>
    </div>
    </>
  )
}


function TimeOver(){
  return (
    <div className={style.timeCard}>
      <div className={style.TimeOver}>
        <p>00:00 Time Left</p>
        <Link href={"/createEnv"}>
        <button> Close 
        <i class="ri-reply-all-fill"></i>

        </button>
        </Link>
      </div>
    </div>
  )
}


export function BNav() {
    return (
      <div className={style.Bav}>
      </div>
    )
  }
  

  export default function Nav() {
    const [minutes, setMinutes] = useState(30);
    const [seconds, setSeconds] = useState(0);
    const [timeCard, setTimeCard] = useState(true);
    const [timeOverCard, setTimeOverCard] = useState(false);

    function removeTimeCrad(){
      setTimeCard(false)
    }

    setTimeout(() => {
      setTimeOverCard(true)
    }, 1800000);

    useEffect(() => {
      // if(seconds == "00"){
      //   setTimeOverCard(true)
      // }
      const intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          clearInterval(intervalId);
        }
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, [minutes, seconds]);
  
    return (

      <div className={style.nav}>
        {timeOverCard?
        <TimeOver/>
      :""}
        
        {timeCard?
        <TimeCard jsx={ 
          <>
          <h1 className={style.countDown}>
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')
          }
          <p>Time Left</p> <br />
        </h1>
          <button  onClick={removeTimeCrad}>Open Instance
          <i class="ri-send-plane-fill"></i>
          </button>
          </>
      
    }/>
  :""}


        <span style={{ backgroundColor: "#fe494f" }}></span>
        <span style={{ backgroundColor: "#feaf40" }}></span>
        <span style={{ backgroundColor: "#00c24a" }}></span>
        <h1 className="text-white">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </h1>
      </div>
    );
  }