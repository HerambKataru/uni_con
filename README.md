# University Administrator Directory

A professional web application for managing and displaying university leadership information with Excel upload functionality. Built with Flask for offline capability.

## Features

- **Directory of University Administrators:** Browse and search through a comprehensive list of university administrators.
- **Search and Filtering:** Search by name, email, or office address; filter by department and position.
- **Multiple View Options:** Toggle between grid and table views.
- **Admin Login:** Secure admin dashboard for maintaining the directory.
- **Excel Upload:** Bulk upload administrator information via Excel files.
- **Responsive Design:** Works on desktop, tablet, and mobile devices.
- **Offline Capability:** Designed to work in offline environments.

## Technical Details

- Built with Flask (Python web framework)
- In-memory storage with JSON file persistence for offline use
- Responsive CSS design (no external frameworks)
- Excel file processing with pandas and openpyxl

## Setup and Installation

1. Clone the repository
2. Install dependencies: `pip install -r requirements.txt`
3. Run the application: `python app.py`
4. Access the application in your browser at `http://localhost:3000`

## Admin Login

Default admin credentials (for demonstration purposes):
- Username: `admin`
- Password: `admin123`

## Excel File Format

Excel files for bulk upload should include the following columns:
- Required: name, email, department, position
- Optional: officeAddress

A sample Excel file is included in the `static/sample_data.xlsx` file.
