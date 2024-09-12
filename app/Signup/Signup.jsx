import React from 'react'
import style from "./style.module.css"
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Signup() {
  return (
    <>
    <div
  class="absolute inset-0 h-full w-full bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] flex justify-center"
>

<div className={style.wrapper}>
<LoginLink>
    <span>
    <i class="ri-google-fill"></i>
        Continue With Google
        </span>
</LoginLink>

        <div className={style.details}>
            Your Details Will Appear Here. <br />
            Why Authentication : To assign you Unique Id for conectivity of Virtual Computer.
        </div>
</div>

</div>
    </>
  )
}
