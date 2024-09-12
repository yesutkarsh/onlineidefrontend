"use client"
import { useDispatch } from "react-redux";
import styles from "./style.module.css";
import { useRouter } from 'next/navigation';
import { setSocketPort } from "@/utils/fileSlice";
import Bg from "@/components/bg/Bg";
import { useState } from "react";
import Loading from "@/components/Loading/Loading";

export default function CreateEnv() {
  const [instanceStatus, setInstanceStatus] = useState(false);
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const createContainer = () => {
    setInstanceStatus(true);
    const randomNumber = Math.floor(Math.random() * 4001) + 1000;

    fetch("http://34.67.228.203:4000/run", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-token-here',
        'apikey': 'utjve2234fnvke32of',
        "port": randomNumber
      }
    })
    .then(response => response.json())
    .then(json => {
      if (json) {
        if (json.status === "started") {
          router.push('/Editor');
          dispatch(setSocketPort(json.port));
          setInstanceStatus(false);
        } else {
          setMsg("Error: Cannot create instance at the moment.");
          setInstanceStatus(false);
        }
      } else {
      console.error(error);
        setMsg("Error: Cannot create instance at the moment.");
        setInstanceStatus(false);
      }
    })
    .catch(error => {
      console.error(error);
      setMsg("Error: Cannot create instance at the moment.");
      setInstanceStatus(false);
    });
  };

  return (
    <div
      className="absolute inset-0 h-full w-full bg-black bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
    >
      <div className={styles.wrapper}>
        <form action="/">
          <Bg />
          <input type="text" name="" id="" placeholder='myFirstInstance' required />
          {!instanceStatus ? (
            <button type="submit" onClick={(e) => {
              e.preventDefault();
              createContainer();
            }}>
              {msg=="Error: Cannot create instance at the moment."?
              <>
              retry new Instance
              <i class="ri-reset-right-line"></i>
              </>
              :
              <>
              Create Instance
               <i className="ri-arrow-right-line"></i>
              </>
              }
            </button>
          ) : (
            <button type="submit" onClick={(e) => {
              e.preventDefault();
              createContainer();
            }}>
              Creating Instance 
              <Loading />
            </button>
          )}
          <p className="m-4 text-red-500">{msg}</p>
        </form>
      </div>
    </div>
  );
}