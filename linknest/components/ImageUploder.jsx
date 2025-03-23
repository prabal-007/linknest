"use client";

import { useState, useEffect } from "react";
import { useImageState } from "@/app/store/useImageState";
import { toast } from "react-toastify";

export const ImageUploder = ({ onImageChange }) => {
    const { sharedState, setSharedState } = useImageState();
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (sharedState) {
            setImageUrl(sharedState);
        }
    }, [sharedState]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
                setSharedState(reader.result);
                if (onImageChange) {
                    onImageChange(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        setImageUrl(null);
        setSharedState(null);
        if (onImageChange) {
            onImageChange(null);
        }
        toast.info("Image removed");
    };

    return (
        <div className="flex flex-col items-center">
            <label htmlFor="image-upload" className="cursor-pointer">
                <div className="relative w-24 h-24 rounded-full border-2 border-gray-400 overflow-hidden">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="Uploaded"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                    )}
                </div>
            </label>
            <input
                type="file"
                id="image-upload"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
            />
            {imageUrl && (
                <button
                    onClick={handleRemoveImage}
                    className="mt-2 text-red-500 hover:text-red-700"
                >
                    Remove Image
                </button>
            )}
        </div>
    );
};
