import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = () => {
    setAuthModalState((prev: any) => ({ ...prev, isOpen: true }));
  };
  return (
    <div className="flex items-center justify-between sm:px-12 px-2 md:px-24">
      <Link href="/" className="flex items-center justify-center h-500" passHref>
        <Image
          src="/logo4.png"
          height={10}
          width={200}
          alt={"LeetClone"}
        ></Image>
      </Link>

      <div className="flex items-center">
        <button
          className="h-12 bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-lg text-lg font-semibold
                hover:text-brand-orange hover:bg-white border-transparent transition duration-300 ease-in-out"
          onClick={handleClick}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};
export default Navbar;
