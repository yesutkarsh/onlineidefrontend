import React from "react";
import style from "../style.module.css";
import js from "../../../public/assets/js.png"
import Image from "next/image";
import Link from "next/link";
export default function SelectLang() {





    async function CreateEnvironemnt() {
        
    }



  return (
    <>
      <div className={style.selWrapper}>
      <div
  class="absolute inset-0 h-full w-full bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
>

<div className={style.heading}>
    Select Language/Environment Below 
    <div className={style.languages}>
      <Link href={"/createEnv"}>
      <div className={style.main}>
        

  <Image className={style.jslogo} src={js}></Image>

      <p className={style.des}>Javascript Node Js Environment | Terminal | AI | File System Management | Code Editor</p>
        <button>Create Instance</button>
        </div>
      </Link>
    </div>
</div>
</div>
      </div>
    </>
  );
}
