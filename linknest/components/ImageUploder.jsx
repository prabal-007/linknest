import React, { useRef, useState } from 'react'
import { FaRegEdit } from "react-icons/fa";

export const ImageUploder = () => {
  const [avatarUrl, setAvaterUrl] = useState("/profile.png")
  const fileUploderRef = useRef(null);
  // const loading = "/loading.gif"
  const loading = "/loading.svg"

  const handleFileUpload = () => {
    event.preventDefault();
    fileUploderRef.current.click();
  }

  const uploadImageDisplay = async () => {
    try {
      setAvaterUrl(loading)
      const uploadedFile = fileUploderRef.current.files[0];
      // const cachedURL = URL.createObjectURL(uploadedFile);
      // setAvaterUrl(cachedURL);

      const formData = new FormData();
      formData.append("file", uploadedFile)

      const response = await fetch("https://api.escuelajs.co/api/v1/files/upload", {
        method: "POST",
        body: formData
      });

      if (response.status == 201) {
        const data = await response.json();
        setAvaterUrl(data?.location);
      }
    } catch {
      console.error(error)
      setAvaterUrl(avatarUrl)
    }
  }
  return (<>
    <div className='relative'>
      <img onClick={handleFileUpload} src={avatarUrl} alt="avatar" className='rounded-full size-28' />
      <form id='form' encType='multipart/form-data' className='absolute right-1 bottom-2 rounded-full bg-white'>
        <button onClick={handleFileUpload} type='submit' className=' p-2'><FaRegEdit /></button>
        <input ref={fileUploderRef} onChange={uploadImageDisplay} type="file" id='file' accept='.png, .jpg, .svg' hidden/>
      </form>
    </div>
  </>
  )
}
