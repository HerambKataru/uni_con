import { read, utils, WorkBook, WorkSheet } from "xlsx";
import { InsertAdministrator } from "@shared/schema";
import { z } from "zod";
import { insertAdministratorSchema } from "@shared/schema";

export interface ExcelUploadValidationError {
  row: number;
  errors: z.ZodIssue[];
}

export interface ExcelProcessResult {
  data: InsertAdministrator[];
  errors: ExcelUploadValidationError[];
}

/**
 * Process an Excel file to extract administrator data
 * @param file The Excel file to process
 * @returns An object containing the processed data and any validation errors
 */
export async function processExcelFile(file: File): Promise<ExcelProcessResult> {
  // Read the file as an array buffer
  const arrayBuffer = await file.arrayBuffer();
  
  // Parse the Excel file
  const workbook = read(arrayBuffer);
  
  return processWorkbook(workbook);
}

/**
 * Process a workbook to extract administrator data
 * @param workbook The workbook to process
 * @returns An object containing the processed data and any validation errors
 */
export function processWorkbook(workbook: WorkBook): ExcelProcessResult {
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  return processWorksheet(worksheet);
}

/**
 * Process a worksheet to extract administrator data
 * @param worksheet The worksheet to process
 * @returns An object containing the processed data and any validation errors
 */
export function processWorksheet(worksheet: WorkSheet): ExcelProcessResult {
  // Convert the worksheet to JSON
  const rawData = utils.sheet_to_json<Record<string, any>>(worksheet);
  
  const result: ExcelProcessResult = {
    data: [],
    errors: []
  };
  
  // Process each row
  rawData.forEach((row, index) => {
    try {
      // Normalize the field names (handle different case variations)
      const normalizedRow = {
        name: row.Name || row.name || null,
        designation: row.Designation || row.designation || null,
        department: row.Department || row.department || null,
        email: row.Email || row.email || null,
        officeAddress: row["Office Address"] || row.officeAddress || row.office_address || "",
        phone: row.Phone || row.phone || "",
        photoUrl: row.photoUrl || row.photo_url || "",
      };
      
      // Validate the row
      const validatedRow = insertAdministratorSchema.parse(normalizedRow);
      
      // Add the validated row to the result
      result.data.push(validatedRow);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Add the validation error to the result
        result.errors.push({
          row: index + 2, // Add 2 to account for 1-indexing and header row
          errors: error.errors
        });
      } else {
        // Handle unexpected errors
        result.errors.push({
          row: index + 2,
          errors: [{ 
            message: "Unexpected error processing row", 
            code: "custom", 
            path: [] 
          }]
        });
      }
    }
  });
  
  return result;
}

/**
 * Generate a template Excel file for administrators
 */
export function generateTemplateWorkbook(): WorkBook {
  const worksheet = utils.json_to_sheet([
    {
      Name: "Dr. Jane Smith",
      Designation: "Dean of Science",
      Department: "Faculty of Science",
      Email: "jane.smith@university.edu",
      "Office Address": "Science Building, Room 305",
      Phone: "555-123-4567"
    }
  ]);
  
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Administrators");
  
  return workbook;
}

/**
 * Download a template Excel file for administrators
 */
export function downloadTemplate(): void {
  const workbook = generateTemplateWorkbook();
  utils.writeFile(workbook, "administrator_template.xlsx");
}
