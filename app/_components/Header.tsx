"use client"
import React from 'react'
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
    const { user } = useUser();
    const createUser = useMutation(api.user.createUser);

    useEffect(() => {
        if (user) {
            checkUser();
        }
    }, [user])

    const checkUser = async () => {
        const result = await createUser({
            email: user?.primaryEmailAddress?.emailAddress || "",
            imageUrl: user?.imageUrl || "",
            userName: user?.fullName || ""
        });

        // console.log(result)
    }

    return (
        <nav className='p-6 shadow-sm flex justify-between items-center'>
            <Image src={"/logo.svg"} width={100} height={100} alt='logo' />
            <ul className='flex gap-6 justify-center items-center'>
                <li>{user && <Button><Link href={"/dashboard"}>Dashboard</Link></Button>}</li>
                <li>{user ? (<UserButton />) : <Link href={"/sign-in"} className='hover:border-b-2'>Sigin</Link>}</li>
            </ul>
        </nav>

    )
}

export default Header