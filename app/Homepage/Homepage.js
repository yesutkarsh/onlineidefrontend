"use client"
import React, { useState } from "react";
import style from "./style.module.css";
import SelectLang from "./components/SelectLang";
export default function Homepage() {
    const [showLang, setShowLang] = useState(false)
  return (
    <>
      <div class="absolute inset-0 h-full w-full bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className={style.heading}>
            <span>Code Anytime, Anywhere</span>
            <p>A powerful Isolated online Coding Environment.</p>
            <h1 onClick={()=>setShowLang(true)}>Select Language 
            <i class="ri-arrow-right-line"></i>
            </h1>
        </div>
        {showLang?
        <>
        <SelectLang/>
        <button onClick={()=>setShowLang(false)} className={style.close}>close</button>
        </>
        :""}
        
      
      </div>
    </>
  );
}
