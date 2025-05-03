import { useState, useEffect } from "react";
import { Administrator } from "@shared/schema";
import AdministratorCard from "./AdministratorCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { getPaginationInfo } from "@/lib/utils";

interface DirectoryGridProps {
  administrators: Administrator[];
  isLoading?: boolean;
}

export default function DirectoryGrid({ administrators, isLoading = false }: DirectoryGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9; // 3x3 grid
  
  // Reset to page 1 when administrators change
  useEffect(() => {
    setCurrentPage(1);
  }, [administrators]);
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-[200px] bg-gray-200 animate-pulse rounded-lg"></div>
        ))}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentItems.map((admin) => (
          <AdministratorCard key={admin.id} administrator={admin} />
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
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
