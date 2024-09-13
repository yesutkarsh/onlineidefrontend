import { NextRequest } from "next/server";
export async function GET() {
    const randomNumber = Math.floor(Math.random() * 4001) + 1000;
    const data = await fetch("http://34.67.228.203:4000/run", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer your-token-here',
          'apikey': 'utjve2234fnvke32of',
          "port": randomNumber
        }
      })

    const json = await data.json()

    return(
        Response.json(json)
    )
}
