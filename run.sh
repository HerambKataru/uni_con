#!/bin/bash

# Exit on error
set -e

# Make sure the data directory exists
mkdir -p data

# Run the Flask application
python app.py
