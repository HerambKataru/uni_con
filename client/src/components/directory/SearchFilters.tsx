import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { departmentOptions, positionOptions } from "@shared/schema";

interface SearchFiltersProps {
  onSearch: (query: string, department: string, position: string) => void;
}

export default function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  
  // Debounce search to avoid too many requests while typing
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery, department, position);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery, department, position, onSearch]);
  
  return (
    <div className="mb-6">
      <h3 className="font-bold text-xl mb-4">Find Administration Staff</h3>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by name, designation or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <div className="flex gap-2 flex-col sm:flex-row">
          <div className="w-full sm:w-auto">
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Departments</SelectItem>
                {departmentOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full sm:w-auto">
            <Select value={position} onValueChange={setPosition}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Positions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Positions</SelectItem>
                {positionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
