"use client"

import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import WorkspaceHeader from './_components/WorkspaceHeader';
import Header from '@/app/_components/Header';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import PdfViewer from './_components/PdfViewer';
import TextEditor from './_components/TextEditor';

const page = () => {
    const { fileId } = useParams();
    const fileInfo = useQuery(api.fileStorage.getFileRecord, {
        fileId: fileId
    });

    useEffect(() => {
        console.log(fileInfo)
    }, [fileInfo])

    return (
        <div>
            <Header />
            <div className='grid grid-cols-2 gap-5'>
                <div>
                    {/* text editor */}
                    <TextEditor fileId={fileId} />
                </div>

                <div>
                    {/* preview pdf */}
                    <PdfViewer fileUrl={fileInfo?.fileUrl} />
                </div>
            </div>
        </div>
    )
}

export default page