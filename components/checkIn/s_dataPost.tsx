import { CheckInData } from "@/types/common";
import { fetchResult } from "@/types/common";
import { Result } from "@/types/common";

export default async function postCheckin(data: CheckInData) {
  const res = await fetch("http://localhost:3000/api/v1/InsertCheckin", {
    method: "POST",
    body: JSON.stringify({data}),
    headers: {
      "content-type": "application/json",
    },
  });
  
  if(!res.ok){
    console.log("Error Posting Data");
  }
  let result: Result = await {
    status: res.status,
    message: res.statusText,
    body: res.json()
  }
  return result;
}
