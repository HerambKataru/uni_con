import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Administrator } from "@shared/schema";
import SearchFilters from "@/components/directory/SearchFilters";
import DirectoryGrid from "@/components/directory/DirectoryGrid";
import DirectoryTable from "@/components/directory/DirectoryTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, List } from "lucide-react";

export default function DirectoryPage() {
  const [searchParams, setSearchParams] = useState({
    query: "",
    department: "",
    position: "",
  });
  
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  
  // Fetch all administrators
  const { data: allAdministrators = [], isLoading } = useQuery({
    queryKey: ["/api/administrators"],
  });
  
  // Filter administrators based on search params
  const filteredAdministrators = filterAdministrators(
    allAdministrators as Administrator[],
    searchParams.query,
    searchParams.department,
    searchParams.position
  );
  
  const handleSearch = (query: string, department: string, position: string) => {
    setSearchParams({ query, department, position });
  };
  
  return (
    <div>
      {/* Search Section */}
      <section className="bg-white py-8 shadow-md">
        <div className="container mx-auto px-4">
          <SearchFilters onSearch={handleSearch} />
        </div>
      </section>
      
      {/* Directory Section */}
      <section className="py-12 bg-neutral">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center mb-6">
            <h3 className="font-bold text-2xl">Administration Directory</h3>
            <div className="flex items-center space-x-2">
              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "grid" | "table")}>
                <TabsList>
                  <TabsTrigger value="grid">
                    <Grid className="h-4 w-4 mr-1" /> Grid
                  </TabsTrigger>
                  <TabsTrigger value="table">
                    <List className="h-4 w-4 mr-1" /> List
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          {viewMode === "grid" ? (
            <DirectoryGrid 
              administrators={filteredAdministrators} 
              isLoading={isLoading} 
            />
          ) : (
            <DirectoryTable 
              administrators={filteredAdministrators} 
              isLoading={isLoading} 
            />
          )}
        </div>
      </section>
    </div>
  );
}

// Helper function to filter administrators based on search criteria
function filterAdministrators(
  administrators: Administrator[],
  query: string = "",
  department: string = "",
  position: string = ""
): Administrator[] {
  const searchQuery = query.toLowerCase();
  let results = [...administrators];
  
  if (query) {
    results = results.filter(
      (admin) =>
        admin.name.toLowerCase().includes(searchQuery) ||
        admin.designation.toLowerCase().includes(searchQuery) ||
        admin.department.toLowerCase().includes(searchQuery) ||
        admin.email.toLowerCase().includes(searchQuery)
    );
  }
  
  if (department) {
    results = results.filter((admin) => admin.department === department);
  }
  
  if (position) {
    results = results.filter((admin) => 
      admin.designation.toLowerCase().includes(position.toLowerCase())
    );
  }
  
  return results;
}
