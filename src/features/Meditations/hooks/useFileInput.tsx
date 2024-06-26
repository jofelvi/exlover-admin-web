import {ChangeEvent, useState} from 'react';

interface FileData {
    content: string | null;
    name: string | null;
}

const useFileInput = () => {
    const [fileData, setFileData] = useState<FileData>({ content: null, name: null });

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFileData({ content: reader.result as string, name: selectedFile.name });
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    return [fileData, handleFileChange] as const;
};


export default useFileInput;
