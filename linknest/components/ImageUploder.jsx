import { useImageState } from '@/app/store/useImageState';
import React, { useRef, useState } from 'react'
import { FaRegEdit } from "react-icons/fa";

export const ImageUploder = () => {
  const { sharedState, setSharedState } = useImageState();
  const [avatarUrl, setAvatarUrl] = useState(sharedState)
  // const [avatarUrl, setAvaterUrl] = useState("/profile.png")
  const fileUploderRef = useRef(null);
  const loading = "/loading.svg"

  const handleFileUpload = () => {
    event.preventDefault();
    fileUploderRef.current.click();
  }

  const uploadImageDisplay = async () => {
    try {
      setAvatarUrl(loading)
      const uploadedFile = fileUploderRef.current.files[0];

      const formData = new FormData();
      formData.append("file", uploadedFile)

      // const response = await fetch("https://api.escuelajs.co/api/v1/files/upload", {
      //   method: "POST",
      //   body: formData
      // });

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const { imageUrl } = await response.json();
        setSharedState(imageUrl);
        setAvatarUrl(imageUrl);
      } else {
        console.error('Error uploading image:', response.statusText);
        setAvatarUrl('/profile.png');
      }
    } catch(error) {
      console.error('Error : ', error)
      setAvatarUrl('/profile.png')
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
