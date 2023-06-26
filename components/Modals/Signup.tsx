import { authModalState } from "@/atoms/authModalAtom";
import { auth, firestore } from "@/firebase/firebase";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = (type: "login" | "register" | "forgotPassword") => {
    setAuthModalState((prev) => ({ ...prev, type }));
  };
  const [inputs, setInputs] = useState({
    email: "",
    displayName: "",
    password: "",
  });
  const router = useRouter();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.displayName || !inputs.email || !inputs.password)
      return alert("Please fill all the fields!");
    try {
      toast.loading("Creating your account", {
        position: "top-center",
        toastId: "loadingToast",
      });

      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;

      const userData = {
        uid: newUser.user.uid,
        email: newUser.user.email,
        displayName: inputs.displayName,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        likedProblems: [],
        dislikedProblems: [],
        solvedProblems: [],
        starredProblems: [],
      };

      await setDoc(doc(firestore, "users", newUser.user.uid), userData);
      router.push("/");
    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
    } finally {
      toast.dismiss("loadingToast");
    }
  };

  useEffect(() => {
    if (error) alert(error.message);
  }, [error]);

  return (
    <div>
      <form className="space-y-6 px-6 pb-4" onSubmit={handleRegister}>
        <h3 className="text-xl font-medium text-white">
          Register to LeetClone
        </h3>
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium block mb-2 text-gray-300"
          >
            Email
          </label>
          <input
            onChange={handleChangeInput}
            type="email"
            name="email"
            id="email"
            className="border-2 outline-none sm:text-sm rounded-md focus:ring-blue-500 
                focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="Email"
          />
        </div>
        <div>
          <label
            htmlFor="displayName"
            className="text-sm font-medium block mb-2 text-gray-300"
          >
            Username
          </label>
          <input
            onChange={handleChangeInput}
            type="displayName"
            name="displayName"
            id="displayName"
            className="border-2 outline-none sm:text-sm rounded-md focus:ring-blue-500 
                focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="Username"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium block mb-2 text-gray-300"
          >
            Password
          </label>
          <input
            onChange={handleChangeInput}
            type="password"
            name="password"
            id="password"
            className="border-2 outline-none sm:text-sm rounded-md focus:ring-blue-500 
                focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="w-full text-white focus:ring-blue-300 
      font-semibold rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
        >
          {loading ? "Registering...." : "Register"}
        </button>
        <div className="text-sm font-medium text-gray-300">
          Already have an account?{" "}
          <a
            href="#"
            className="text-blue-700 hover:underline"
            onClick={() => handleClick("login")}
          >
            Log in
          </a>
        </div>
      </form>
    </div>
  );
};
export default Signup;
