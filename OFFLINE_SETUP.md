# Running the University Administrator Directory in an Offline Environment

This document provides instructions for running the University Administrator Directory application in an offline environment. The application is designed to work without internet connectivity, making it suitable for environments where internet access is limited or unavailable.

## Prerequisites

1. Python 3.6 or higher
2. Excel file with administrator data (optional)

## Installation Steps

### 1. Download the Application

Download the application files to your local machine. Make sure you have the following:

- All Python files (app.py, etc.)
- Templates directory
- Static directory
- Data directory (will be created automatically if not present)

### 2. Install Required Dependencies

Before going offline, run these commands to install the required packages:

```bash
pip install flask werkzeug pandas openpyxl
```

For a completely offline installation, download the wheel files for these packages and their dependencies, then install them using:

```bash
pip install --no-index --find-links=./wheels flask werkzeug pandas openpyxl
```

### 3. Launch the Application

Once you have all the necessary files and dependencies installed, you can start the application by running:

```bash
python app.py
```

The application will start and be accessible at: http://localhost:3000

## Using the Application Offline

### Loading Administrator Data

There are two ways to load administrator data into the application:

1. **Excel Upload**: 
   - Log in as an administrator (default credentials: username: `admin`, password: `admin123`)
   - Navigate to the Admin Dashboard
   - Upload an Excel file with administrator data
   - The Excel file should have columns: Designation, Name, Email-ID, and optionally Office Address

2. **Sample Data**: 
   - The application will create a sample data set on first run if no data is present
   - You can also generate sample data by running `python load_sample_data.py`

### Data Persistence

All administrator data is stored in `data/administrators.json` and persists between application restarts. No database or internet connection is required.

## Troubleshooting

- If the application fails to start, ensure no other applications are using port 3000
- If Excel upload isn't working, check that your Excel file has the required columns
- If changes aren't persisting, check write permissions on the data directory

## Security Note

This application uses a simple in-memory authentication system for demonstration purposes. In a production environment, you would want to implement a more robust authentication system.