"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function ClientHome() {
    return (
        <div>
            <Button>Login</Button>
            <UserButton />
        </div>
    );
}
