import React from 'react'
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import Link from 'next/link';


interface PdfDisplayProps {
    email: string;
}

const PdfDisplay: React.FC<PdfDisplayProps> = ({ email }) => {
    const getAllPdfs = useQuery(api.fileStorage.getUserFiles, {
        userEmail: email
    });

    return (
        <div className="flex flex-wrap justify-center">
            {
                getAllPdfs ?
                    getAllPdfs.map((pdf) => (
                        <Link key={pdf._id} href={`/workspace/${pdf.fileId}`}>
                            <Card className="bg-white rounded-lg p-6 m-2 w-60">
                                <CardContent className="flex items-center justify-center">
                                    <Image src={"/pdf.png"} alt='pdf image' width={55} height={45} />
                                </CardContent>
                                <CardFooter className="flex items-center justify-center m-0 p-0">
                                    <p className='font-bold text-sm m-0 p-0'>{pdf.fileName}</p>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))
                    :
                    <p className="text-gray-600">PDF Viewer content goes here.</p>
            }
        </div>
    )
}

export default PdfDisplay