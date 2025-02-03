"use client";

import React, { useState, Suspense, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams, useRouter } from "next/navigation";
import { ImageUploder } from "@/components/ImageUploder";
// import { useImageState } from "../store/useImageState";
import { useImageState } from "@/app/store/useImageState";
import { useSession } from "next-auth/react";
import { DropdownSelector } from "@/components/ui/DropdownSelector";

const Create = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { data: session, status } = useSession();
    const { sharedState } = useImageState();

    const [links, setLinks] = useState([{ link: "", lable: "" }]);
    const [handle, setHandle] = useState("");
    const [pic, setPic] = useState("");
    const [bio, setBio] = useState("");
    const accounts = ["Facebook", "Github", "Instagram", "Linkedin", "Portfolio", "X", "WhatsApp", "Website", "Other"];

    useEffect(() => {
        if (status === "loading") {
            return;
        }

        if (!session) {
            router.push("/signin");
        }
    }, [session, status, router]);

    // Initialize state with search params on mount
    useEffect(() => {
        setHandle(searchParams.get("handle") || "");
    }, [searchParams]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    const handleChange = (index, link, lable) => {
        setLinks((initialLinks) =>
            initialLinks.map((item, i) =>
                i === index ? { link, lable } : item
            )
        );
    };

    const addLink = () => {
        setLinks((prevLinks) => [...prevLinks, { link: "", lable: "" }]);
        toast.info("Link added");
    };

    const submitLinks = async () => {
        const formData = new FormData();

        formData.append('handle', handle);
        formData.append('email', session?.user?.email)
        formData.append('bio', bio);
        formData.append('links', JSON.stringify(links));

        if (sharedState) {
            formData.append('pic', sharedState)
        }

        try {
            const response = await fetch("/api/add", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                toast.error(`Error: ${response.status} - ${response.statusText}`);
                return;
            }

            const result = await response.json();
            if (result.success) {
                toast.success(result.message);
                setLinks([{ link: "", lable: "" }]);
                setHandle("");
                setPic("");
                setBio("");

                setTimeout(() => {
                    router.push(`/review/${handle}`);
                }, 3000);
            } else {
                toast.error(result.message);
                if (result.message == "Please login to proceed!") {
                    setTimeout(() => {
                        router.push("/signin");
                    }, 2000);
                }
            }
        } catch (error) {
            console.error("Error submitting links:", error);
            toast.error("An error occurred while submitting. Please try again.");
        }
    };

    return (
        <>
            <div className="bg-[#e0cfe0] w-fit min-h-screen grid md:grid-cols-2 items-center">
                <div className="backdrop-blur-md relative">

                    <div className="ml-[10vw] flex flex-col gap-2 p-10">
                        <h2 className="text-3xl text-black font-semibold py-8">
                            Create Your <span className="font-extrabold text-green-700 animate-pulse">ViewMee.live</span>
                        </h2>
                        <div>
                            <p className="text-black font-semibold">
                                Step 1: Claim your handle
                            </p>
                            <input
                                value={handle}
                                onChange={(e) => setHandle(e.target.value)}
                                type="text"
                                placeholder="Choose a handle"
                                className="p-1 px-2 text-sm rounded-full m-2 focus:outline-purple-200"
                            />
                        </div>
                        <div>
                            <p className="text-black font-semibold">Step 2: Add Profile Links</p>
                            {links.map((item, index) => (
                                <div key={index}>
                                    <input
                                        value={item.link}
                                        onChange={(e) =>
                                            handleChange(index, e.target.value, item.lable)
                                        }
                                        type="text"
                                        placeholder="Enter profile link"
                                        className="p-1 px-2 text-sm rounded-full m-2 focus:outline-purple-200"
                                    />
                                    <DropdownSelector
                                        key={index}
                                        options={accounts}
                                        selectvalue={item.lable}
                                        onSelect={(value) => handleChange(index, item.link, value)}
                                        placeholder="Select link text"
                                        className="p-1 px-2 text-sm rounded-full m-2  focus:outline-purple-200"
                                    />
                                    {/* {item.label === "Other" && (
                                        <input
                                            value={item.customLabel || ""}
                                            onChange={(e) => handleChange(index, item.link, e.target.value)}
                                            type="text"
                                            placeholder="Enter custom label"
                                            className="p-1 px-2 text-sm rounded-full m-2 focus:outline-purple-200"
                                        />
                                    )} */}
                                </div>
                            ))}
                            <button
                                disabled={links.some((item) => !item.lable || !item.link)}
                                onClick={addLink}
                                className="text-white bg-slate-900 px-3 py-1 rounded-full text-sm font-bold disabled:bg-slate-600"
                            >
                                Add Link
                            </button>
                        </div>
                        <div className="flex flex-col">
                            <div>

                            </div>
                            <p className="text-black font-semibold">
                                Step 3: Add Picture and Bio.
                            </p>
                            <div className="flex">
                                <ImageUploder />
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Write something about yourself.."
                                    className="p-1 px-2 w-1/2 bg-gray-100 overflow-y-auto border-2 border-gray-400 focus:border-black max-w-xs rounded-md m-2 focus:outline-purple-200 outline-none text-sm resize-none transition-height"
                                />

                            </div>
                            <button
                                disabled={!handle}
                                onClick={submitLinks}
                                className="text-white cursor-pointer bg-slate-900 px-4 py-1 disabled:bg-slate-600 rounded-full text-sm font-bold w-fit m-2"
                            >
                                Create my ViewMee
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mr-[10vw]">
                    <img src="/generate.png" alt="generate" />
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default function Page() {
    return (
        <Suspense fallback={<div>
            <div role="status" className="space-y-2.5 animate-pulse max-w-lg">
                <div className="flex items-center w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                    <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                    <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full max-w-[480px]">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                </div>
                <div className="flex items-center w-full max-w-[400px]">
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                    <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <div className="flex items-center w-full max-w-[480px]">
                    <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                    <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                </div>
                <div className="flex items-center w-full max-w-[440px]">
                    <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
                    <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                    <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                </div>
                <div className="flex items-center w-full max-w-[360px]">
                    <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                    <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <span className="sr-only">Loading...</span>
            </div>
        </div>}>
            <Create />
        </Suspense>
    );
}
