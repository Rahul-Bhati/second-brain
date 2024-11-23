"use client"

import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import PdfViewer from './_components/PdfViewer';
import TextEditor from './_components/TextEditor';
import WorkspaceHeader from './_components/WorkspaceHeader';

const Page = () => {
    const { fileId } = useParams<{ fileId: string }>();
    const fileInfo = useQuery(api.fileStorage.getFileRecord, {
        fileId: fileId
    });

    useEffect(() => {
        // console.log(fileInfo, fileId)
    }, [fileInfo])

    return (
        <div className='h-screen overflow-hidden '>
            <WorkspaceHeader filename={fileInfo?.fileName ?? ''} />
            <div className='grid grid-cols-2 gap-5 h-[calc(100%-64px)]'>
                <div className='overflow-auto [&::-webkit-scrollbar]:hidden h-full'>
                    <TextEditor fileId={fileId} />
                </div>

                <div className="overflow-auto [&::-webkit-scrollbar]:hidden h-full">
                    {fileInfo?.fileUrl && <PdfViewer fileUrl={fileInfo.fileUrl} />}
                </div>
            </div>
        </div>
    )
}

export default Page