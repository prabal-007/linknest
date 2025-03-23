import { motion, AnimatePresence } from "framer-motion";

const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

const PricingModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <motion.div className="bg-white p-8 rounded-lg w-96"
                    variants={modalVariants}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Choose Your Plan</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="space-y-4">
                        {/* Free Tier */}
                        <div className="border p-4 rounded-lg">
                            <h3 className="text-xl font-semibold">Free Tier</h3>
                            <p className="text-gray-600">1 ViewMee profile</p>
                            <ul className="list-disc list-inside mt-2 text-gray-600">
                                <li>Upto 1 update per day</li>
                                <li>Basic options</li>
                            </ul>
                            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                                Select Free
                            </button>
                        </div>

                        {/* Paid Tier */}
                        <div className="border p-4 rounded-lg">
                            <h3 className="text-xl font-semibold">Paid Tier</h3>
                            <p className="text-gray-600">3 ViewMee profiles</p>
                            <ul className="list-disc list-inside mt-2 text-gray-600">
                                <li>make Unlimited updates</li>
                                <li>More options</li>
                                <li>Priority support</li>
                            </ul>
                            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                Select Paid
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PricingModal;
