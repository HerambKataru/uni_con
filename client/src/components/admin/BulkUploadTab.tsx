import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fileUploadSchema } from "@/lib/validators";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { UploadCloud, FileSpreadsheet, Info, Download, UploadIcon } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { formatFileSize } from "@/lib/utils";
import { downloadTemplate } from "@/lib/excel";

interface BulkUploadTabProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

type FormData = z.infer<typeof fileUploadSchema>;

export default function BulkUploadTab({ onSuccess, onError }: BulkUploadTabProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const form = useForm<FormData>({
    resolver: zodResolver(fileUploadSchema),
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      form.setValue("file", selectedFile);
    }
  };
  
  const onSubmit = async (data: FormData) => {
    try {
      setUploading(true);
      
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append("file", data.file);
      
      // Simulate upload progress (in a real app, you'd track actual progress)
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);
      
      // Upload the file
      const response = await fetch("/api/administrators/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      
      clearInterval(progressInterval);
      setProgress(100);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload file");
      }
      
      const result = await response.json();
      onSuccess(`Successfully imported ${result.administrators.length} administrators`);
      
      // Reset form
      setFile(null);
      form.reset();
    } catch (error) {
      onError(error instanceof Error ? error.message : "Failed to upload file");
    } finally {
      setTimeout(() => {
        setUploading(false);
        setProgress(0);
      }, 1000);
    }
  };
  
  return (
    <div>
      <Alert variant="info" className="mb-6">
        <Info className="h-4 w-4" />
        <AlertTitle>Excel Upload Format</AlertTitle>
        <AlertDescription>
          <p>Ensure your Excel file has these columns: Name, Designation, Department, Email, Office Address (optional), and Phone (optional).</p>
          <Button 
            variant="link" 
            className="p-0 h-auto text-primary" 
            onClick={() => downloadTemplate()}
          >
            <Download className="h-4 w-4 mr-1" />
            Download template
          </Button>
        </AlertDescription>
      </Alert>
      
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-6">
          <div className="max-w-xl mx-auto">
            <label className={`block text-center p-8 border-2 border-dashed rounded-md cursor-pointer transition-colors duration-200 ${file ? 'border-primary bg-primary/5' : 'border-gray-300 hover:bg-gray-50'}`}>
              <div className="flex flex-col items-center">
                {file ? (
                  <>
                    <FileSpreadsheet className="h-10 w-10 text-primary mb-2" />
                    <span className="font-medium">{file.name}</span>
                    <span className="text-gray-500 text-sm mt-1">{formatFileSize(file.size)}</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
                    <span className="text-gray-700 font-medium">Drag and drop your Excel file or click to browse</span>
                    <span className="text-gray-500 text-sm mt-1">Supports .xlsx and .csv files</span>
                  </>
                )}
              </div>
              <Input 
                type="file" 
                className="hidden" 
                accept=".xlsx,.csv"
                onChange={handleFileChange}
                disabled={uploading}
              />
            </label>
            {form.formState.errors.file && (
              <p className="text-sm text-destructive mt-2">
                {form.formState.errors.file.message}
              </p>
            )}
          </div>
        </div>
        
        {uploading && (
          <div className="mb-6">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-600 mt-2">
              Uploading... {progress}%
            </p>
          </div>
        )}
        
        <div className="flex justify-center">
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90"
            disabled={!file || uploading}
          >
            <UploadIcon className="mr-2 h-4 w-4" />
            Upload and Process
          </Button>
        </div>
      </form>
    </div>
  );
}
