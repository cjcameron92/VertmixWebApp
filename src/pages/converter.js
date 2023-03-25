import { LinearProgress } from "@mui/material";
import { useState } from "react";
import { CloudUpload } from "@mui/icons-material";

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isConverting, setIsConverting] = useState(false);
    const [conversionProgress, setConversionProgress] = useState(0);
    const [downloadUrl, setDownloadUrl] = useState(null);

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("file", selectedFile);

        const uploadEndpoint = "/api/upload";

        try {
            const response = await fetch(uploadEndpoint, {
                method: "POST",
                body: formData,
                onUploadProgress: (progressEvent) => {
                    setUploadProgress(
                        Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    );
                },
            });

            if (response.ok) {
                console.log("File uploaded successfully");
                setIsConverting(true);
                setUploadProgress(0);

                const conversionEndpoint = "/api/convert";
                const conversionResponse = await fetch(conversionEndpoint, {
                    method: "POST",
                    body: formData,
                    onUploadProgress: (progressEvent) => {
                        setConversionProgress(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        );
                    },
                });

                if (conversionResponse.ok) {
                    console.log("File converted successfully");
                    setIsConverting(false);
                    setConversionProgress(0);

                    const downloadEndpoint = "/api/download";
                    const downloadResponse = await fetch(downloadEndpoint, {
                        method: "POST",
                        body: formData,
                    });

                    if (downloadResponse.ok) {
                        console.log("File downloaded successfully");
                        const downloadBlob = await downloadResponse.blob();
                        setDownloadUrl(URL.createObjectURL(downloadBlob));
                    } else {
                        console.error("Failed to download file");
                    }
                } else {
                    console.error("Failed to convert file");
                    setIsConverting(false);
                    setConversionProgress(0);
                }
            } else {
                console.error("Failed to upload file");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full mt-8">
                <div
                    className="dropzone w-full h-48 border-2 border-dashed border-blue-500 rounded-lg flex flex-col items-center justify-center cursor-pointer"
                    onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        e.dataTransfer.dropEffect = "copy";
                    }}
                    onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleFileChange(e);
                    }}
                >
                    <input
                        id="file"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    {!selectedFile && (
                        <>
                            <div className="mt-4 text-blue-500">
                                <CloudUpload fontSize="large"/>
                                <span className="text-sm font-bold ml-2">
                  Drag and drop
                </span>
                            </div>
                        </>
                    )}
                    {selectedFile && (
                        <>
                            <div className="mt-4 text-blue-500">
                                <CloudUpload fontSize="large"/>
                                <span className="text-sm font-bold ml-2">
              {selectedFile.name}
            </span>
                            </div>
                        </>
                    )}
                </div>
                <button
                    onClick={handleUpload}
                    disabled={isConverting}
                    className={`bg-blue-500 hover:bg-blue-700 mt-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                        isConverting && "opacity-50 cursor-not-allowed"
                    }`}
                >
                    {isConverting ? `${conversionProgress}% Converting...` : "Upload"}
                </button>
                {uploadProgress > 0 && !isConverting && (
                    <div className="mt-4">
                        {uploadProgress}% uploaded
                        <progress
                            className="w-full mt-2 h-2 bg-blue-500 rounded-full"
                            value={uploadProgress}
                            max="100"
                        />
                    </div>
                )}
                {isConverting && conversionProgress > 0 && (
                    <div className="mt-4">
                        {conversionProgress}% converting...
                        <LinearProgress
                            variant="determinate"
                            value={conversionProgress}
                            className="w-full mt-2"
                        />
                    </div>
                )}
                {downloadUrl && (
                    <div className="mt-4">
                        <a
                            href={downloadUrl}
                            download={selectedFile.name.replace(/\.[^/.]+$/, ".pdf")}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Download
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
};
export default FileUpload;