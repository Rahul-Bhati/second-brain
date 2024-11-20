"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { api } from "@/convex/_generated/api"
import { generateUploadUrl } from "@/convex/fileStorage"
import { useUser } from "@clerk/nextjs"
import { useAction, useMutation } from "convex/react"
import { Loader2Icon } from "lucide-react"
import { useState } from "react"
import uuid4 from "uuid4";
import { toast } from "sonner";
import axios from "axios";


const UploadPdf = ({ children }: { children: React.ReactNode }) => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState<string>('');
    const [open, setOpen] = useState(false);

    const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
    const insertFileToDb = useMutation(api.fileStorage.AddFileToDB);
    const getFileUrl = useMutation(api.fileStorage.getFileUrl);
    const embededDoc = useAction(api.myAction.ingest);

    const { user } = useUser();

    const onFileSelct = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) setFile(event.target.files[0]);
    }
    const uploadFile = async () => {
        setLoading(true);
        // Step 1: Get a short-lived upload URL
        const postUrl = await generateUploadUrl();
        // Step 2: POST the file to the URL
        const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": file ? file.type : "application/pdf" },
            body: file,
        });
        const { storageId } = await result.json();

        // console.log(storageId);

        const fileUrl = await getFileUrl({ storageId: storageId });

        // Step 3: Save the newly allocated storage id to the database

        const fileId = uuid4();

        const res = await insertFileToDb({ fileId: fileId, storageId: storageId, fileName: fileName || 'untitled file', fileUrl: fileUrl, createdBy: user?.primaryEmailAddress?.emailAddress || 'unknown' });

        // console.log(res)

        // API call to get pdf process data
        const response = await axios.get("/api/pdf-loader?pdfUrl=" + fileUrl);
        console.log(response.data.result);

        // emedding call
        await embededDoc({
            splitText: response.data.result, fileId: fileId, apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
        });


        // if (res === "Inserted") toast("pdf uploaded!")
        // console.log(embededResult);

        setLoading(false);
        setOpen(false);
    }

    return (
        <Dialog open={open}>
            <DialogTrigger asChild>
                <Button className="w-full" onClick={() => setOpen(true)}>+ Upload Pdf file </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>upload you pdf</DialogTitle>
                    <DialogDescription asChild>
                        <div>
                            <h2 className="mt-5">Select a file to Upload</h2>
                            <div className="gap-2 p-3 rounded-md border">
                                <input type="file" accept="application/pdf" onChange={(e) => onFileSelct(e)} />
                            </div>
                            <div className="mt-3">
                                <label>File Name *</label>
                                <Input placeholder="enter file name" onChange={(e) => setFileName(e.target.value)} />
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                            Close
                        </Button>
                    </DialogClose>
                    <Button type="button" onClick={uploadFile} disabled={loading}>
                        {loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default UploadPdf