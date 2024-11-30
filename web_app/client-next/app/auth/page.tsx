"use client";

import Link from "next/link";


export default function AuthPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Link href="/auth/login">
          <button className="bg-blue-500 text-white px-7 py-4 rounded hover:bg-blue-600 transition">
            Login
          </button>
        </Link>
        <Link href="/auth/registration">
          <button className="bg-blue-500 text-white px-7 py-4 rounded hover:bg-blue-600 transition">
            Register
          </button>
        </Link>
      </main>
    </div>
  );
}
