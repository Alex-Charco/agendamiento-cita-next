"use client";

import Image from "next/image";
import ResetForm from "@/components/reset/ResetForm";

export default function ResetPage() {
    return (
        <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/background.svg')" }}>
            <div className="absolute inset-0 bg-black bg-opacity-5" />
            <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
                <div className="w-full max-w-md">
                    <div className="flex justify-center mb-6">
                        <Image src="/images/reset.svg" alt="Reset Password" width={160} height={160} />
                    </div>
                    <ResetForm />
                </div>
            </div>
        </div>
    );
}
