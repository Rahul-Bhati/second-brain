"use client"
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image"
import Link from "next/link";

const Header = () => {
  const { user } = useUser();
  return (
    <nav className='p-4 shadow-md'>
      <ul className='flex gap-6 justify-end items-center'>
        <li>{user && <Button><Link href={"/dashboard"}>Dashboard</Link></Button>}</li>
        <li>{user && (<UserButton />)}</li>
      </ul>
    </nav>
  )
}

export default Header