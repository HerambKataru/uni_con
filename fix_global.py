import os
import re

# Read the original app.py file
with open('app.py', 'r') as f:
    content = f.read()

# Find and fix the issue with the global declaration
new_upload_function = """@app.route('/admin/upload', methods=['POST'])
def upload_file():
    \"\"\"Upload Excel file with administrator data\"\"\"
    if not session.get('logged_in'):
        return jsonify({'error': 'Unauthorized'}), 401
    
    print("Upload request received")
    
    if 'file' not in request.files:
        flash('No file part', 'danger')
        return redirect(url_for('admin'))
    
    file = request.files['file']
    print(f"Received file: {file.filename}")
    
    if file.filename == '':
        flash('No selected file', 'danger')
        return redirect(url_for('admin'))
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        # Ensure upload directory exists
        if not os.path.exists(app.config['UPLOAD_FOLDER']):
            os.makedirs(app.config['UPLOAD_FOLDER'])
            
        file.save(filepath)
        print(f"File saved to: {filepath}")
        
        # Process Excel file
        try:
            print("Reading Excel file...")
            df = pd.read_excel(filepath)
            print(f"Excel columns: {df.columns.tolist()}")
            
            # Validate required columns
            required_excel_columns = ['Designation', 'Name', 'Email-ID']
            missing_columns = [col for col in required_excel_columns if col not in df.columns]
            
            if missing_columns:
                print(f"Missing columns: {missing_columns}")
                flash(f'Missing required columns: {", ".join(missing_columns)}', 'danger')
                return redirect(url_for('admin'))
            
            # Process and add administrators
            new_admins = []
            print(f"Processing {len(df)} rows from Excel")
            
            for idx, row in df.iterrows():
                # Skip empty rows or rows with no name
                if pd.isna(row['Name']):
                    continue
                    
                name = row['Name'] if not pd.isna(row['Name']) else ''
                email = row['Email-ID'] if not pd.isna(row['Email-ID']) else ''
                position = row['Designation'] if not pd.isna(row['Designation']) else ''
                office_address = row['Office Address'] if 'Office Address' in row and not pd.isna(row['Office Address']) else ''
                
                if name:
                    admin = {
                        'id': str(uuid.uuid4()),
                        'name': name,
                        'email': email,
                        'department': 'Administration',  # Default department 
                        'position': position,
                        'officeAddress': office_address,
                        'createdAt': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    }
                    new_admins.append(admin)
            
            print(f"Processed {len(new_admins)} valid administrator records")
            
            # Replace existing administrators with new ones
            global administrators
            administrators = new_admins
            
            # Save data to file
            try:
                save_data()
                print("Saved data to file successfully")
            except Exception as save_error:
                print(f"Error saving data: {str(save_error)}")
            
            flash(f'Successfully uploaded {len(new_admins)} administrators', 'success')
            
        except Exception as e:
            print(f"Error processing Excel file: {str(e)}")
            flash(f'Error processing file: {str(e)}', 'danger')
        
        return redirect(url_for('admin'))
    
    print("Invalid file type")
    flash('Invalid file type. Please upload Excel files only (.xlsx, .xls).', 'danger')
    return redirect(url_for('admin'))"""

# Replace the upload_file function in the content
upload_pattern = r'@app\.route\(\'/admin/upload\', methods=\[\'POST\'\]\)[\s\S]+?return redirect\(url_for\(\'admin\'\)\)'
updated_content = re.sub(upload_pattern, new_upload_function, content)

# Write the updated content to app.py
with open('app.py', 'w') as f:
    f.write(updated_content)

print("app.py has been updated with the fixed upload_file function")
