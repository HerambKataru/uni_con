import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Mail, Phone, MapPin } from "lucide-react";
import { Administrator } from "@shared/schema";
import { getPaginationInfo, getInitials, generateAvatarUrl } from "@/lib/utils";

interface DirectoryTableProps {
  administrators: Administrator[];
  isLoading?: boolean;
}

export default function DirectoryTable({ administrators, isLoading = false }: DirectoryTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // 10 items per page in table view
  
  // Reset to page 1 when administrators change
  useEffect(() => {
    setCurrentPage(1);
  }, [administrators]);
  
  if (isLoading) {
    return (
      <div className="w-full bg-card rounded-md overflow-hidden border shadow-sm">
        <div className="h-[400px] bg-gray-200 animate-pulse"></div>
      </div>
    );
  }
  
  if (administrators.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-xl font-semibold text-gray-700">No administrators found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
      </div>
    );
  }
  
  const pagination = getPaginationInfo(administrators.length, currentPage, pageSize);
  const currentItems = administrators.slice(pagination.startIndex, pagination.endIndex);
  
  return (
    <div>
      <ScrollArea className="h-[500px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Contact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((admin) => (
              <TableRow key={admin.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage 
                        src={admin.photoUrl || generateAvatarUrl(admin.name)} 
                        alt={admin.name} 
                      />
                      <AvatarFallback>{getInitials(admin.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{admin.name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{admin.designation}</TableCell>
                <TableCell>{admin.department}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center text-sm">
                      <Mail className="text-gray-500 mr-2 h-3 w-3" />
                      <a href={`mailto:${admin.email}`} className="text-primary hover:underline">
                        {admin.email}
                      </a>
                    </div>
                    {admin.phone && (
                      <div className="flex items-center text-sm">
                        <Phone className="text-gray-500 mr-2 h-3 w-3" />
                        <span>{admin.phone}</span>
                      </div>
                    )}
                    {admin.officeAddress && (
                      <div className="flex items-center text-sm">
                        <MapPin className="text-gray-500 mr-2 h-3 w-3" />
                        <span>{admin.officeAddress}</span>
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
      
      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-4">
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold">{pagination.showingFrom}</span> to{" "}
          <span className="font-semibold">{pagination.showingTo}</span> of{" "}
          <span className="font-semibold">{pagination.total}</span> results
        </div>
        
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                aria-disabled={!pagination.hasPrevPage}
                className={!pagination.hasPrevPage ? "opacity-50 pointer-events-none" : ""}
              />
            </PaginationItem>
            
            {Array.from({ length: pagination.totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={pagination.currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                aria-disabled={!pagination.hasNextPage}
                className={!pagination.hasNextPage ? "opacity-50 pointer-events-none" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
