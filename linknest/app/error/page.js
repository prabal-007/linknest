"use client"

import Link from "next/link";

// import { useRouter } from 'next/router';

const ErrorPage = () => {
//   const router = useRouter();
//   const { error } = router.query;

  return (
    <div>
      <h1>Error</h1>
      <Link href="/">Return to home</Link>
    </div>
  );
};

export default ErrorPage;
