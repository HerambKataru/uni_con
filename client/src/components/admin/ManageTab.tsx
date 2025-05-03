import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2, Check, X, Loader2 } from "lucide-react";
import { Administrator } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { getInitials, generateAvatarUrl } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { administratorFormSchema } from "@/lib/validators";
import { z } from "zod";

interface ManageTabProps {
  administrators: Administrator[];
  isLoading: boolean;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

type EditFormData = z.infer<typeof administratorFormSchema>;

export default function ManageTab({ administrators, isLoading, onSuccess, onError }: ManageTabProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const form = useForm<EditFormData>({
    resolver: zodResolver(administratorFormSchema),
    defaultValues: {
      name: "",
      designation: "",
      department: "",
      email: "",
      officeAddress: "",
      phone: "",
      photoUrl: "",
    },
  });
  
  const handleEdit = (admin: Administrator) => {
    form.reset({
      name: admin.name,
      designation: admin.designation,
      department: admin.department,
      email: admin.email,
      officeAddress: admin.officeAddress || "",
      phone: admin.phone || "",
      photoUrl: admin.photoUrl || "",
    });
    setEditingId(admin.id);
  };
  
  const handleCancel = () => {
    setEditingId(null);
    form.reset();
  };
  
  const handleSave = async () => {
    if (!editingId) return;
    
    try {
      const data = form.getValues();
      const response = await apiRequest("PATCH", `/api/administrators/${editingId}`, data);
      
      if (!response.ok) {
        throw new Error("Failed to update administrator");
      }
      
      onSuccess("Administrator updated successfully");
      setEditingId(null);
    } catch (error) {
      onError(error instanceof Error ? error.message : "Failed to update administrator");
    }
  };
  
  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      setIsDeleting(true);
      const response = await apiRequest("DELETE", `/api/administrators/${deleteId}`, undefined);
      
      if (!response.ok) {
        throw new Error("Failed to delete administrator");
      }
      
      onSuccess("Administrator deleted successfully");
    } catch (error) {
      onError(error instanceof Error ? error.message : "Failed to delete administrator");
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };
  
  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
        <p className="mt-2 text-muted-foreground">Loading administrators...</p>
      </div>
    );
  }
  
  if (administrators.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-lg font-medium">No administrators found</p>
        <p className="text-muted-foreground mt-1">Add administrators using the 'Manual Entry' or 'Bulk Upload' tab</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {administrators.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage 
                        src={admin.photoUrl || generateAvatarUrl(admin.name)} 
                        alt={admin.name} 
                      />
                      <AvatarFallback>{getInitials(admin.name)}</AvatarFallback>
                    </Avatar>
                    {editingId === admin.id ? (
                      <Input
                        className="w-40"
                        value={form.getValues().name}
                        onChange={(e) => form.setValue("name", e.target.value)}
                      />
                    ) : (
                      <div className="font-medium">{admin.name}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {editingId === admin.id ? (
                    <Input
                      className="w-40"
                      value={form.getValues().designation}
                      onChange={(e) => form.setValue("designation", e.target.value)}
                    />
                  ) : (
                    admin.designation
                  )}
                </TableCell>
                <TableCell>
                  {editingId === admin.id ? (
                    <Input
                      className="w-40"
                      value={form.getValues().department}
                      onChange={(e) => form.setValue("department", e.target.value)}
                    />
                  ) : (
                    admin.department
                  )}
                </TableCell>
                <TableCell>
                  {editingId === admin.id ? (
                    <Input
                      className="w-40"
                      value={form.getValues().email}
                      onChange={(e) => form.setValue("email", e.target.value)}
                    />
                  ) : (
                    admin.email
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {editingId === admin.id ? (
                    <div className="flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={handleSave}
                        className="text-primary hover:text-primary-dark"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={handleCancel}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEdit(admin)}
                        className="text-primary hover:text-primary-dark"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setDeleteId(admin.id)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the administrator
              from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
