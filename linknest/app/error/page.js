"use client"
import Link from "next/link";

const ErrorPage = () => {

  return (
    <div>
      <h1>OOps..Something went wrong!</h1>
      <Link href="/" className="text-blue-500 text-2xl cursor-pointer hover:underline hover:text-blue-400">Return to home</Link>
    </div>
  );
};

export default ErrorPage;
