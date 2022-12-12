import React from 'react'

export default function getDay(id:number) {
   const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  return day[id-1]
}
