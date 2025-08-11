import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { SignOutButton } from '@clerk/nextjs'

export default function page() {
  return (
    <div className="bg-color-grey">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <SignOutButton>
          <Button className="cursor-pointer" variant="destructive">Logout</Button>
         </SignOutButton>
      </div>

      <div className="my-2 border-b-[2px] border-color-light-blue"></div>
      <h3>Welcome, User</h3>
    </div>
  );
}
