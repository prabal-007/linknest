"use client";

import { ImageUploder } from "@/components/ImageUploder";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EditableProfile({ email, selectedHandle }) {
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState("");
    const [links, setLinks] = useState([]);
    const [background, setBackground] = useState("");
    const [solidBg, setSolidBg] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [loading, setLoading] = useState(true);
    const [originalData, setOriginalData] = useState(null); // Store original data for cancel
    const handle = selectedHandle.handle;

    useEffect(() => {
        const initialData = {
            bio: selectedHandle.bio || `Hi there! I'm ${handle}`,
            links: selectedHandle.links || [],
            background: selectedHandle.pic || "",
            solidBg: selectedHandle.solidBg || "",
            profilePic: selectedHandle.pic || "/profile.png",
        };
        setOriginalData(initialData);
        setBio(initialData.bio);
        setLinks(initialData.links);
        setBackground(initialData.background);
        setSolidBg(initialData.solidBg);
        setProfilePic(initialData.profilePic);
        setLoading(false);
    }, [selectedHandle, handle]);

    const handleSave = async () => {
        const response = await fetch("/api/update-profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ handle, bio, links, background, solidBg, email, profilePic })
        });
        if (response.ok) {
            setIsEditing(false);
            // Update originalData with the saved data
            setOriginalData({ bio, links, background, solidBg, profilePic });
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset to original data
        if (originalData) {
            setBio(originalData.bio);
            setLinks(originalData.links);
            setBackground(originalData.background);
            setSolidBg(originalData.solidBg);
            setProfilePic(originalData.profilePic);
        }
    };

    const handleLinkChange = (index, field, value) => {
        const updatedLinks = [...links];
        updatedLinks[index][field] = value;
        setLinks(updatedLinks);
    };

    const handleAddLink = () => {
        setLinks([...links, { link: "", lable: "" }]);
    };

    const handleRemoveLink = (index) => {
        const updatedLinks = [...links];
        updatedLinks.splice(index, 1);
        setLinks(updatedLinks);
    };

    const handleProfilePicChange = (newPic) => {
        setProfilePic(newPic);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    };

    if (loading) return <p className="text-white">Loading...</p>;

    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-3 bg-lime-100 h-screen absolute inset-0"
            style={{ backgroundImage: solidBg ? "none" : `url(${background})`, backgroundColor: solidBg }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="hidden md:block min-h-screen"></div>
            <motion.div
                className="col-span-1 h-[80vh] md:h-[95vh] text-sm flex flex-col justify-center items-center backdrop-blur-xl rounded-lg m-4 border border-double border-black"
                variants={itemVariants}
            >
                <AnimatePresence>
                    {isEditing ? (
                        <motion.div
                            key="imageUploader"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ImageUploder onImageChange={handleProfilePicChange} />
                        </motion.div>
                    ) : (
                        <motion.img
                            key="profileImage"
                            src={profilePic}
                            alt={handle}
                            className="rounded-full border-2 size-24 hover:size-28 hover:border-black"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                        />
                    )}
                </AnimatePresence>
                <motion.p className="text-xl font-mono font-bold mt-2" variants={itemVariants}>@{handle}</motion.p>
                <AnimatePresence>
                    {isEditing ? (
                        <motion.textarea
                            key="bioInput"
                            className="w-2/3 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                        />
                    ) : (
                        <motion.p
                            key="bioText"
                            className="w-2/3 text-center p-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                        >{bio}</motion.p>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {links.map((item, index) => (
                        <motion.div
                            key={index}
                            className="w-2/3 flex items-center mt-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {isEditing ? (
                                <>
                                    <input type="text" className="w-1/2 border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400" value={item.lable} onChange={(e) => handleLinkChange(index, "lable", e.target.value)} placeholder="lable" />
                                    <input type="text" className="w-1/2 border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400" value={item.link} onChange={(e) => handleLinkChange(index, "link", e.target.value)} placeholder="Link" />
                                    <motion.button
                                        onClick={() => handleRemoveLink(index)}
                                        className="bg-red-500 text-white p-2 rounded-md ml-2 hover:bg-red-600"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Remove
                                    </motion.button>
                                </>
                            ) : (
                                <a href={item.link} target="_blank" className="bg-slate-100 border rounded-xl w-full flex justify-center p-2 hover:bg-slate-200">{item.lable}</a>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
                <AnimatePresence>
                    {isEditing && (
                        <motion.div
                            key="editOptions"
                            className="w-full flex flex-col items-center mt-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.button
                                onClick={handleAddLink}
                                className="mt-2 bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Add Link
                            </motion.button>
                            <label className="flex items-center gap-2 mt-2">
                                <span className="text-gray-700">Solid Background:</span>
                                <input
                                    type="color"
                                    className="w-10 h-10 border cursor-pointer rounded"
                                    value={solidBg}
                                    onChange={(e) => setSolidBg(e.target.value)}
                                />
                            </label>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="flex gap-2 mt-4">
                    {isEditing && (
                        <motion.button
                            onClick={handleCancel}
                            className="bg-gray-400 p-2 rounded-lg hover:bg-gray-500"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Cancel
                        </motion.button>
                    )}
                    <motion.button
                        onClick={isEditing ? handleSave : () => setIsEditing(true)}
                        className="bg-yellow-400 p-2 rounded-lg hover:bg-yellow-500"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {isEditing ? "Save Changes" : "Edit Profile"}
                    </motion.button>
                </div>
            </motion.div>
            <div className="hidden md:block min-h-screen"></div>
        </motion.div>
    );
}
