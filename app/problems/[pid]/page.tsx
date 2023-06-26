"use client";
import Topbar from "@/components/Topbar/Topbar";
import Workspace from "@/components/Workspace/Workspace";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";
import { notFound } from "next/navigation";

async function fetchProblem({
  params,
}: {
  params: { pid: string | undefined };
}) {
  const pid = params.pid;
  if (pid === undefined) {
    return notFound();
  }
  const problem = problems[pid];
  problem.handlerFunction = problem.handlerFunction.toString();
  return problem;
}

export default async function Page({
  params,
}: {
  params: { pid: string | undefined };
}) {
  try {
    const problem = await fetchProblem({ params });
    return (
      <div>
        <Topbar ProblemPage={true} />
        <Workspace problem={problem} />
      </div>
    );
  } catch (error) {
    notFound();
  }
}
