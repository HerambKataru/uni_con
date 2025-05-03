import pandas as pd
import json

# Load sample data from Excel
data = pd.read_excel("static/sample_data.xlsx")

# Convert to list of dictionaries
admins = []
for i, row in data.iterrows():
    admin = {
        "id": str(i),
        "name": row["name"],
        "email": row["email"],
        "department": row["department"],
        "position": row["position"],
        "officeAddress": row["officeAddress"],
        "createdAt": "2025-05-03 00:00:00"
    }
    admins.append(admin)

# Save to JSON
with open("data/administrators.json", "w") as f:
    json.dump(admins, f)

print(f"Loaded {len(admins)} administrators into data/administrators.json")
