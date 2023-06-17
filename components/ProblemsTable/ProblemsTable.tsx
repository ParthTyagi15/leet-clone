import { problems } from "@/mockProblems/problems";
import Link from "next/link";
import React from "react";
import { BsCheckCircle } from "react-icons/bs";
type ProblemsTableProps = {};

const ProblemsTable: React.FC<ProblemsTableProps> = () => {
  return (
    <>
      <tbody className="text-white">
        {problems.map((doc, idx) => {
          const difficulyColor =
            doc.difficulty === "Easy"
              ? "text-dark-green-s"
              : doc.difficulty === "Medium"
              ? "text-dark-yellow"
              : "text-dark-pink";

          return (
            <tr
              className={`${idx % 2 == 1 ? "bg-dark-layer-1" : ""}`}
              key={doc.id}
            >
              <th className="px-2 py-4 font-medium whitespace-nowrap text-dark-green-s">
                <BsCheckCircle fontSize={"16"} width="18" />
              </th>
              <td className="px-6 py-4">
                <Link
                  href={`/problems/${doc.id}`}
                  className="hover:text-blue-600 cursor-pointer"
                >
                  {doc.title}
                </Link>
              </td>
              <td className={`px-6 py-4 ${difficulyColor}`}>
                {doc.difficulty}
              </td>
              <td className="px-6 py-4">{doc.category}</td>
              <td className="px-6 py-4">
                {doc.videoId ? (
                  <Link href={`${doc.videoId}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      className="h-5 w-5 text-blue dark:text-dark-blue-s"
                    >
                      <path d="M15.207 11.293a1 1 0 010 1.414l-3.5 3.5a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L11 14.086l2.793-2.793a1 1 0 011.414 0z"></path>
                      <path d="M4 5a3 3 0 013-3h7.039a3 3 0 012.342 1.126l2.962 3.701A3 3 0 0120 8.702V19a3 3 0 01-3 3H7a3 3 0 01-3-3V5zm3-1a1 1 0 00-1 1v14a1 1 0 001 1h10a1 1 0 001-1V9h-3a2 2 0 01-2-2V4H7zm8 .6V7h1.92L15 4.6z"></path>
                    </svg>
                  </Link>
                ) : (
                  <p className="text-gray-400">Coming Soon...</p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
};
export default ProblemsTable;
