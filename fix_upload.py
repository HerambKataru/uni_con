import os
from flask import Flask, render_template, request, jsonify, redirect, url_for, flash, session
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import pandas as pd
import json
import uuid

# This is a function to test reading the Excel file
def process_excel_file(filepath):
    print(f"Reading Excel file: {filepath}")
    try:
        df = pd.read_excel(filepath)
        print(f"Excel columns found: {df.columns.tolist()}")
        
        # Map required columns
        required_excel_columns = ['Designation', 'Name', 'Email-ID']
        
        # Check if all required columns are present
        missing_columns = [col for col in required_excel_columns if col not in df.columns]
        if missing_columns:
            print(f"Missing columns: {missing_columns}")
            return [], f"Missing required columns: {', '.join(missing_columns)}"
            
        # Process rows
        new_admins = []
        for idx, row in df.iterrows():
            # Skip fully empty rows or rows with no name
            if pd.isna(row['Name']) if 'Name' in row else True:
                continue
                
            # Get values safely
            name = row['Name'] if 'Name' in row and not pd.isna(row['Name']) else ''
            email = row['Email-ID'] if 'Email-ID' in row and not pd.isna(row['Email-ID']) else ''
            position = row['Designation'] if 'Designation' in row and not pd.isna(row['Designation']) else ''
            office = row['Office Address'] if 'Office Address' in row and not pd.isna(row['Office Address']) else ''
            
            # Only add if we have a name
            if name:
                admin = {
                    'id': str(uuid.uuid4()),
                    'name': name,
                    'email': email,
                    'department': 'Administration',  # Default department 
                    'position': position,
                    'officeAddress': office,
                    'createdAt': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                }
                new_admins.append(admin)
                
        print(f"Processed {len(new_admins)} valid administrators")
        
        return new_admins, None
        
    except Exception as e:
        error_msg = f"Error processing Excel: {str(e)}"
        print(error_msg)
        return [], error_msg

# Test with actual file
if __name__ == "__main__":
    filepath = "static/uploads/Office_Data.xlsx"
    admins, error = process_excel_file(filepath)
    
    if error:
        print(f"Error: {error}")
    else:
        print(f"Successfully processed {len(admins)} administrators")
        for admin in admins:
            print(f"Name: {admin['name']}, Position: {admin['position']}, Email: {admin['email']}")
