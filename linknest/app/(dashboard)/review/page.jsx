"use client";
import React from 'react'
import { useHandle } from "./HandleContext";

const page = () => {
  // const {handle} = params;
  // const  { selectedHandle } = useHandle();
  return (
    <div>
      hello world!
      {/* <h1>Currently Viewing Handle: {handle}</h1>
      <p>Dropdown Selected Handle: {selectedHandle}</p> */}
    </div>
  );
}

export default page