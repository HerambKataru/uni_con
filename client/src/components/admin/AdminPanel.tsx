import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BulkUploadTab from "./BulkUploadTab";
import ManualEntryTab from "./ManualEntryTab";
import ManageTab from "./ManageTab";
import { Administrator } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("bulk-upload");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch administrators data
  const { data: administrators = [], isLoading } = useQuery({
    queryKey: ["/api/administrators"],
  });
  
  const handleSuccess = (message: string) => {
    toast({
      title: "Success",
      description: message,
      variant: "default",
    });
    
    // Invalidate and refetch administrators
    queryClient.invalidateQueries({ queryKey: ["/api/administrators"] });
  };
  
  const handleError = (message: string) => {
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Administrator Management</CardTitle>
        <CardDescription>
          Manage university administrators information using bulk upload or manual entry.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bulk-upload" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="bulk-upload">Bulk Upload</TabsTrigger>
            <TabsTrigger value="manual-entry">Manual Entry</TabsTrigger>
            <TabsTrigger value="manage">Manage Existing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bulk-upload">
            <BulkUploadTab onSuccess={handleSuccess} onError={handleError} />
          </TabsContent>
          
          <TabsContent value="manual-entry">
            <ManualEntryTab onSuccess={handleSuccess} onError={handleError} />
          </TabsContent>
          
          <TabsContent value="manage">
            <ManageTab 
              administrators={administrators as Administrator[]} 
              isLoading={isLoading}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
