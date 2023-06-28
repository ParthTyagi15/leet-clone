"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from "recoil";

export default function ClientComponent({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body>
          <RecoilRoot>
            <ToastContainer />
            {children}
          </RecoilRoot>
        </body>
      </html>
    );
  }