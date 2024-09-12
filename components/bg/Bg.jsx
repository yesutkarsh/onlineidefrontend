"use client"
import React from "react";
import style from "./stylestyle.module.css";
import jsIcon from "../../public/assets/js.png";
import Image from "next/image";
export default function Bg() {
  return (
    <div className={style.container}>
      <div className="flex flex-col m-3">
        <Image height={50} src={jsIcon}></Image>
      <span className="mt-3">Type Name Of Your Js Instance</span>
        <span className="text-gray-600">An Instance is a Isolated room where you can code.</span>
      </div>
    </div>
  );
}
