import Image from 'next/image'
import React from 'react'

const WorkspaceHeader = () => {
    return (
        <div>
            <Image src={"/logo.svg"} width={100} height={100} alt='logo' />
        </div>
    )
}

export default WorkspaceHeader