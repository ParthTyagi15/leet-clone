"use client";
import Image from "next/image";
import { authModalState } from "@/atoms/authModalAtom";
import AuthModal from "@/components/Modals/AuthModal";
import Navbar from "@/components/Navbar/Navbar";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

export default function Auth() {
  const authModal = useRecoilValue(authModalState);

  const [user, loading, error] = useAuthState(auth);

  const [pageLoading, setPageLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
    if (!loading && !user) setPageLoading(false);
  }, [user, router, loading]);

  if (pageLoading) return null;

  return (
    <main>
      <div className="bg-gradient-to-b from-gray-600 to-black h-full relative">
        <div className="max-w-7xl mx-auto">
          <Navbar />
          <div className="flex items-center justify-center h-[calc(92vh-5rem)] pointer-events-none select-none">
            <Image src="/hero.png" alt="Hero img" width={700} height={700} />
          </div>
          {authModal.isOpen && <AuthModal />}
        </div>
      </div>
    </main>
  );
}
