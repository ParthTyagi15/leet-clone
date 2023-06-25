"use client";
import Topbar from "@/components/Topbar/Topbar";
import Workspace from "@/components/Workspace/Workspace";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";
import { notFound } from "next/navigation";

async function fetchProblem({ params }: { params: { pid: string } }) {
  const { pid } = params;
  const problem = problems[pid];
  problem.handlerFunction = problem.handlerFunction.toString();
  if (!problem) {
    return undefined;
  }
  return problem;
}

export default async function Page({ params }: { params: { pid: string } }) {
  const problem = await fetchProblem({params});
  if (!problem) {
    notFound();
  }
  return (
    <div>
      <Topbar ProblemPage={true} />
      <Workspace problem={problem} />
    </div>
  );
}
