import pandas as pd
import os

# Create the data directory if it doesn't exist
if not os.path.exists('static/uploads'):
    os.makedirs('static/uploads')

# Sample administrator data
data = [
    {
        'name': 'Dr. James Wilson',
        'email': 'jwilson@university.edu',
        'department': 'Academic Affairs',
        'position': 'Provost',
        'officeAddress': 'Admin Building, Room 301'
    },
    {
        'name': 'Dr. Sarah Chen',
        'email': 'schen@university.edu',
        'department': 'Business School',
        'position': 'Dean',
        'officeAddress': 'Business Building, Room 401'
    },
    {
        'name': 'Dr. Robert Johnson',
        'email': 'rjohnson@university.edu',
        'department': 'Engineering',
        'position': 'Dean',
        'officeAddress': 'Engineering Hall, Room 201'
    },
    {
        'name': 'Dr. Elizabeth Taylor',
        'email': 'etaylor@university.edu',
        'department': 'Arts and Sciences',
        'position': 'Dean',
        'officeAddress': 'Liberal Arts Building, Room 301'
    },
    {
        'name': 'John Smith',
        'email': 'jsmith@university.edu',
        'department': 'Student Affairs',
        'position': 'Director',
        'officeAddress': 'Student Center, Room 101'
    },
    {
        'name': 'Maria Rodriguez',
        'email': 'mrodriguez@university.edu',
        'department': 'Admissions',
        'position': 'Director',
        'officeAddress': 'Welcome Center, Room 202'
    },
    {
        'name': 'David Patel',
        'email': 'dpatel@university.edu',
        'department': 'Information Technology',
        'position': 'Director',
        'officeAddress': 'Tech Building, Room 105'
    },
    {
        'name': 'Jennifer Williams',
        'email': 'jwilliams@university.edu',
        'department': 'Human Resources',
        'position': 'Director',
        'officeAddress': 'Admin Building, Room 204'
    },
    {
        'name': 'Michael Brown',
        'email': 'mbrown@university.edu',
        'department': 'Athletics',
        'position': 'Director',
        'officeAddress': 'Sports Complex, Room 150'
    },
    {
        'name': 'Lisa Wong',
        'email': 'lwong@university.edu',
        'department': 'Research',
        'position': 'Associate Director',
        'officeAddress': 'Research Center, Room 305'
    },
    {
        'name': 'Carlos Gutierrez',
        'email': 'cgutierrez@university.edu',
        'department': 'Medical School',
        'position': 'Assistant Dean',
        'officeAddress': 'Medical Building, Room 420'
    },
    {
        'name': 'Emma Davis',
        'email': 'edavis@university.edu',
        'department': 'Library',
        'position': 'Head Librarian',
        'officeAddress': 'Main Library, Room 101'
    }
]

# Create a DataFrame
df = pd.DataFrame(data)

# Save to Excel
df.to_excel('static/sample_data.xlsx', index=False)

print("Sample data Excel file created successfully at 'static/sample_data.xlsx'")
