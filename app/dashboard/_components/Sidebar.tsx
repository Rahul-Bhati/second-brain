import { Progress } from '@/components/ui/progress'
import { Shield } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
// import UploadPdf from './UploadPdf'
// import Link from 'next/link'
import AddTweet from './AddTweet'

const Sidebar = () => {
    return (
        <div className='shadow-md h-screen p-7'>
            <Image src={"/logo.svg"} width={150} height={100} alt='logo' />
            <div className='mt-10'>
                {/* <UploadPdf >
                    <Button className='w-full'><Plus /> Upload PDF</Button>
                </UploadPdf>

                <div className='flex gap-3 items-center p-3 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer'>

                    <Layout /> <h2>Workspace</h2>

                </div> */}

                <div className='flex gap-3 px-3 mt-2 hover:bg-slate-100 rounded-lg cursor-pointer'>
                    {/* <Link className='flex  gap-3 items-center ' href={"/search"}> */}
                    <AddTweet >
                        <Image src={"/twitter.png"} width={25} height={25} alt='twitter' /> <h2>Add tweet</h2>
                    </AddTweet>
                    {/* </Link> */}
                </div>

                <div className='flex gap-3 items-center p-3 mt-2 hover:bg-slate-100 rounded-lg cursor-pointer'>
                    <Shield /> <h2>Upgrade</h2>
                </div>
            </div>
            <div className='absolute bottom-10 w-[75%]'>
                <Progress value={33} />
                <p className='text-sm pt-1'>2 out of 5 Pdf uploaded</p>
                <p className='text-sm pt-2 text-gray-400'>upgrade to Upload more PDF</p>
            </div>
        </div>
    )
}

export default Sidebar