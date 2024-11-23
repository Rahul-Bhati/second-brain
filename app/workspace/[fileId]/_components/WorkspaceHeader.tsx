"use client"
import React from 'react'
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface WorkspaceHeaderProps {
    filename: string;
}

const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({ filename }) => {

    return (
        <nav className='p-6 shadow-sm flex justify-between items-center'>
            <Link href={"/"}>
                <Image src={"/logo.svg"} width={100} height={100} alt='logo' />
            </Link>
            <h2>{filename}</h2>
            <div className='flex justify-center items-center gap-4'>
                <Link href={"/dashboard"} ><Button>Dashboard</Button></Link>
                <UserButton />
            </div>
        </nav>

    )
}

export default WorkspaceHeader