// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize view toggle (grid/table) if elements exist
    const viewToggleGrid = document.getElementById('view-toggle-grid');
    const viewToggleTable = document.getElementById('view-toggle-table');
    const directoryGrid = document.getElementById('directory-grid');
    const directoryTable = document.getElementById('directory-table');
    
    if (viewToggleGrid && viewToggleTable && directoryGrid && directoryTable) {
        viewToggleGrid.addEventListener('click', function() {
            directoryGrid.classList.remove('hidden');
            directoryTable.classList.add('hidden');
            viewToggleGrid.classList.add('active');
            viewToggleTable.classList.remove('active');
            localStorage.setItem('view-preference', 'grid');
        });
        
        viewToggleTable.addEventListener('click', function() {
            directoryGrid.classList.add('hidden');
            directoryTable.classList.remove('hidden');
            viewToggleGrid.classList.remove('active');
            viewToggleTable.classList.add('active');
            localStorage.setItem('view-preference', 'table');
        });
        
        // Check for user preference
        const viewPreference = localStorage.getItem('view-preference') || 'grid';
        if (viewPreference === 'table') {
            viewToggleTable.click();
        } else {
            viewToggleGrid.click();
        }
    }
    
    // Initialize search and filters if form exists
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            applyFilters();
        });
        
        // Apply filters when select inputs change
        const filterInputs = searchForm.querySelectorAll('select');
        filterInputs.forEach(input => {
            input.addEventListener('change', function() {
                applyFilters();
            });
        });
    }
    
    // Function to apply search and filters
    function applyFilters() {
        const searchQuery = document.getElementById('search-query').value;
        const departmentFilter = document.getElementById('department-filter').value;
        const positionFilter = document.getElementById('position-filter').value;
        
        // Construct URL with query parameters
        let url = '/api/administrators/search?';
        if (searchQuery) url += `query=${encodeURIComponent(searchQuery)}&`;
        if (departmentFilter) url += `department=${encodeURIComponent(departmentFilter)}&`;
        if (positionFilter) url += `position=${encodeURIComponent(positionFilter)}&`;
        
        // Remove trailing '&'
        if (url.endsWith('&')) url = url.slice(0, -1);
        
        // Make API request
        fetch(url)
            .then(response => response.json())
            .then(data => {
                updateDirectory(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
    
    // Function to update directory with filtered data
    function updateDirectory(administrators) {
        const gridContainer = document.getElementById('directory-grid-container');
        const tableBody = document.getElementById('directory-table-body');
        
        if (gridContainer) {
            // Update grid view
            gridContainer.innerHTML = '';
            
            if (administrators.length === 0) {
                gridContainer.innerHTML = '<p class="text-center py-8">No administrators found.</p>';
                return;
            }
            
            administrators.forEach(admin => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <h3 class="card-title">${admin.name}</h3>
                    <p><strong>${admin.position}</strong> - ${admin.department}</p>
                    <p><a href="mailto:${admin.email}">${admin.email}</a></p>
                    ${admin.officeAddress ? `<p><strong>Office:</strong> ${admin.officeAddress}</p>` : ''}
                `;
                gridContainer.appendChild(card);
            });
        }
        
        if (tableBody) {
            // Update table view
            tableBody.innerHTML = '';
            
            if (administrators.length === 0) {
                const row = document.createElement('tr');
                row.innerHTML = '<td colspan="5" class="text-center">No administrators found.</td>';
                tableBody.appendChild(row);
                return;
            }
            
            administrators.forEach(admin => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${admin.name}</td>
                    <td>${admin.position}</td>
                    <td>${admin.department}</td>
                    <td><a href="mailto:${admin.email}">${admin.email}</a></td>
                    <td>${admin.officeAddress || '-'}</td>
                `;
                tableBody.appendChild(row);
            });
        }
    }
    
    // File upload preview
    const fileInput = document.getElementById('file-upload');
    const fileLabel = document.querySelector('.file-label');
    const filePreview = document.getElementById('file-name-preview');
    
    if (fileInput && fileLabel && filePreview) {
        fileInput.addEventListener('change', function() {
            if (fileInput.files.length > 0) {
                const fileName = fileInput.files[0].name;
                filePreview.textContent = fileName;
                filePreview.style.display = 'block';
            } else {
                filePreview.style.display = 'none';
            }
        });
    }
    
    // Flash message auto hide
    const flashMessages = document.querySelectorAll('.alert');
    if (flashMessages.length > 0) {
        flashMessages.forEach(message => {
            setTimeout(() => {
                message.style.opacity = '0';
                setTimeout(() => {
                    message.style.display = 'none';
                }, 500);
            }, 5000);
        });
    }
});