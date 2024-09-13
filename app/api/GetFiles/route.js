import { headers } from "next/headers"
export async function GET() {
  const headersList = headers(); 
  const socketPort = headersList.get("socketPort");
  let data = await fetch(`http://34.67.228.203:${socketPort}/files`)
  let json = await data.json()
  return (
    Response.json(json)
  )
}
