import style from "./style.module.css"
import jsIcon from "@/public/assets/js.png"
export default function Loading() {
  return (
<svg className={style.svg} viewBox="25 25 50 50">
  <circle className={style.circle} r="20" cy="50" cx="50"></circle>
</svg>
  )
}
