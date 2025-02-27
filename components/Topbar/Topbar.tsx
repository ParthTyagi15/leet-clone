"use client";
import Image from "next/image";
import { auth } from "@/firebase/firebase";
import Link from "next/link";
import React, { useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Logout from "../Buttons/Logout";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Timer from "../Timer/Timer";
import { problems } from "@/utils/problems";
import { useRouter } from "next/navigation";
import { useSearchParams, usePathname } from "next/navigation";
import { Problem } from "@/utils/types/problem";

type TopbarProps = {
  ProblemPage?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ ProblemPage }) => {
  const [user] = useAuthState(auth);

  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();
  const pathName = usePathname();

  const handleProblemChange = (isForward: boolean) => {
    const { order } = problems[pathName.split("/problems/")[1]] as Problem;
    const direction = isForward ? 1 : -1;
    const nextProblemOrder = order + direction;
    const nextProblemKey = Object.keys(problems).find(
      (key) => problems[key].order === nextProblemOrder
    );
    console.log(nextProblemKey);
    if (isForward && !nextProblemKey) {
      const firstProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === 1
      );
      router.push(`/problems/${firstProblemKey}`);
    } else if (!isForward && !nextProblemKey) {
      const lastProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === Object.keys(problems).length
      );
      router.push(`/problems/${lastProblemKey}`);
    } else {
      router.push(`/problems/${nextProblemKey}`);
    }
  };

  return (
    <nav className="relative flex h-[50px] w-full shrink-0 items-center px-[200px] bg-dark-layer-1 text-dark-gray-7">
      <div
        className={`flex w-full items-center justify-between "max-w-[1200px] mx-auto" : ""}`}
      >
        <Link href="/" className="h-[22px] flex-1" passHref>
          <Image src="/logo-full.png" alt="Logo" height={100} width={100} />
        </Link>

        {ProblemPage && (
          <div className="flex items-center gap-4 flex-1 justify-center">
            <div
              className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
              onClick={() => handleProblemChange(false)}
            >
              <FaChevronLeft />
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 font-medium max-w-[150px] text-dark-gray-8 cursor-pointer"
              passHref
            >
              <div>
                <BsList />
              </div>
              <p>Problem List</p>
            </Link>
            <div
              className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
              onClick={() => handleProblemChange(true)}
            >
              <FaChevronRight />
            </div>
          </div>
        )}

        <div className="flex items-center space-x-4 flex-1 justify-end">
          <div>
            <a
              href="https://www.leetcode.com"
              target="_blank"
              rel="noreferrer"
              className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2"
            >
              Premium
            </a>
          </div>
          {user && ProblemPage && <Timer />}
          {!user && (
            <Link
              href="/auth"
              onClick={() => {
                setAuthModalState((prev: any) => ({
                  ...prev,
                  isOpen: true,
                  type: "login",
                }));
              }}
              passHref
            >
              <button className="bg-dark-fill-3 py-1 px-2 cursor-pointer rounded ">
                Sign In
              </button>
            </Link>
          )}
          {user && (
            <div className="cursor-pointer group relative">
              <Image
                src="/avatar2.png"
                alt="Avatar"
                width={30}
                height={30}
                className="rounded-full"
              />
              <div
                className="absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out"
              >
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
          )}
          {user && <Logout />}
        </div>
      </div>
    </nav>
  );
};
export default Topbar;
