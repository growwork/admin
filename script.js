document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const messageBox = document.getElementById('messageBox');
    const adminUserName = document.getElementById('adminUserName');

    // Navigation elements
    const navItems = document.querySelectorAll('#sidebar ul li');
    const sections = document.querySelectorAll('.admin-section');

    // Dashboard elements
    const totalListingsCount = document.getElementById('totalListingsCount');
    const pendingListingsCount = document.getElementById('pendingListingsCount');
    const activeAdsCount = document.getElementById('activeAdsCount');
    const todaysOffersCount = document.getElementById('todaysOffersCount');
    const visitorCount = document.getElementById('visitorCount');
    const approveListingsBtn = document.getElementById('approveListingsBtn');
    const stopAdsBtn = document.getElementById('stopAdsBtn');
    const flagReportsBtn = document.getElementById('flagReportsBtn');

    // Listings Management elements
    const listingsTableBody = document.querySelector('#listingsTable tbody');
    const addNewListingBtn = document.getElementById('addNewListingBtn');
    const bulkUploadListingsBtn = document.getElementById('bulkUploadListingsBtn');
    const bulkUploadArea = document.getElementById('bulkUploadArea');
    const csvFileInput = document.getElementById('csvFileInput');
    const dropArea = document.getElementById('dropArea');
    const uploadCsvBtn = document.getElementById('uploadCsvBtn');
    const csvPreview = document.getElementById('csvPreview');
    const csvContentPreview = document.getElementById('csvContentPreview');
    const confirmCsvUploadBtn = document.getElementById('confirmCsvUploadBtn');
    const listingModal = document.getElementById('listingModal');
    const listingModalTitle = document.getElementById('listingModalTitle');
    const listingForm = document.getElementById('listingForm');
    const listingIdInput = document.getElementById('listingId');
    const listingNameInput = document.getElementById('listingName');
    const listingDescriptionInput = document.getElementById('listingDescription');
    const listingCityInput = document.getElementById('listingCity');
    const listingServiceTypeInput = document.getElementById('listingServiceType');
    const listingContactInput = document.getElementById('listingContact');
    const listingStatusSelect = document.getElementById('listingStatus');
    const listingCityFilter = document.getElementById('listingCityFilter');
    const listingServiceTypeFilter = document.getElementById('listingServiceTypeFilter');
    const listingStatusFilter = document.getElementById('listingStatusFilter');
    const applyListingFiltersBtn = document.getElementById('applyListingFiltersBtn');

    // Anchor Ads Manager elements
    const adsTableBody = document.querySelector('#adsTable tbody');
    const adStatusFilter = document.getElementById('adStatusFilter');
    const applyAdFiltersBtn = document.getElementById('applyAdFiltersBtn');

    // Offers Management elements
    const offersTableBody = document.querySelector('#offersTable tbody');
    const addNewOfferBtn = document.getElementById('addNewOfferBtn');
    const offerModal = document.getElementById('offerModal');
    const offerModalTitle = document.getElementById('offerModalTitle');
    const offerForm = document.getElementById('offerForm');
    const offerIdInput = document.getElementById('offerId');
    const offerTitleInput = document.getElementById('offerTitle');
    const offerDescriptionInput = document.getElementById('offerDescription');
    const offerBannerInput = document.getElementById('offerBanner'); // URL input
    const offerBannerUpload = document.getElementById('offerBannerUpload'); // File input
    const offerBannerPreview = document.getElementById('offerBannerPreview');
    const offerExpiryInput = document.getElementById('offerExpiry');
    const previewBanner = document.getElementById('previewBanner');
    const previewTitle = document.getElementById('previewTitle');
    const previewValidity = document.getElementById('previewValidity');

    // User Management elements
    const usersTableBody = document.querySelector('#usersTable tbody');

    // Visitor Analytics elements
    const analyticsPeriodSelect = document.getElementById('analyticsPeriod');
    const generateAnalyticsBtn = document.getElementById('generateAnalyticsBtn');
    const exportAnalyticsBtn = document.getElementById('exportAnalyticsBtn');
    const analyticsChartCanvas = document.getElementById('analyticsChart');
    let analyticsChart; // To store the Chart.js instance
    const totalViews = document.getElementById('totalViews');
    const totalSearches = document.getElementById('totalSearches');
    const listingClicks = document.getElementById('listingClicks');

    // Feedback & Reports elements
    const feedbackTableBody = document.querySelector('#feedbackTable tbody');

    // Settings elements
    const newCityInput = document.getElementById('newCity');
    const addCityBtn = document.getElementById('addCityBtn');
    const removeCitySelect = document.getElementById('removeCity');
    const removeCityBtn = document.getElementById('removeCityBtn');
    const newStateInput = document.getElementById('newState');
    const addStateBtn = document.getElementById('addStateBtn');
    const removeStateSelect = document.getElementById('removeState');
    const removeStateBtn = document.getElementById('removeStateBtn');
    const newCategoryInput = document.getElementById('newCategory');
    const addCategoryBtn = document.getElementById('addCategoryBtn');
    const removeCategorySelect = document.getElementById('removeCategory');
    const removeCategoryBtn = document.getElementById('removeCategoryBtn');
    const currentPasswordInput = document.getElementById('currentPassword');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmNewPasswordInput = document.getElementById('confirmNewPassword');
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const themeSelect = document.getElementById('themeSelect');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const languageSelect = document.getElementById('languageSelect');

    // Settings CSV Upload elements
    const cityCsvUpload = document.getElementById('cityCsvUpload');
    const uploadCityCsvBtn = document.getElementById('uploadCityCsvBtn');
    const stateCsvUpload = document.getElementById('stateCsvUpload');
    const uploadStateCsvBtn = document.getElementById('uploadStateCsvBtn');
    const categoryCsvUpload = document.getElementById('categoryCsvUpload');
    const uploadCategoryCsvBtn = document.getElementById('uploadCategoryCsvBtn');


    // Data Export elements
    const exportListingsCsvBtn = document.getElementById('exportListingsCsvBtn');
    const exportAdsCsvBtn = document.getElementById('exportAdsCsvBtn');
    const exportOffersCsvBtn = document.getElementById('exportOffersCsvBtn');
    const exportUsersCsvBtn = document.getElementById('exportUsersCsvBtn');
    const manualBackupBtn = document.getElementById('manualBackupBtn');

    // Modal close buttons
    document.querySelectorAll('.modal .close-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.target.closest('.modal').style.display = 'none';
            resetForm(e.target.closest('.modal').querySelector('form'));
        });
    });

    // --- Dummy Data (Will be replaced by API calls) ---
    // This dummyData object will primarily serve as a fallback or initial state
    // before real data is fetched. For most operations, data will be updated
    // directly from simulated API responses.
    let dummyData = {
        listings: [],
        ads: [],
        offers: [],
        users: [],
        cities: [],
        states: [],
        categories: [],
        feedback: [],
        analytics: {
            daily: { labels: [], views: [], searches: [], clicks: [] },
            weekly: { labels: [], views: [], searches: [], clicks: [] },
            monthly: { labels: [], views: [], searches: [], clicks: [] }
        }
    };

    // --- API Call Utility (Replaces simulateApiCall) ---
    /**
     * Makes a fetch call to the backend API.
     * Handles authentication, JSON parsing, and basic error handling.
     * @param {string} method HTTP method (GET, POST, PUT, DELETE).
     * @param {string} endpoint API endpoint (e.g., '/api/listings').
     * @param {Object|FormData} [bodyData=null] Data payload for POST/PUT. If FormData, Content-Type is handled automatically by fetch.
     * @param {boolean} [isFormData=false] Set to true if bodyData is FormData (for file uploads).
     * @returns {Promise<Object>} A promise that resolves with the API response data.
     */
    async function apiCall(method, endpoint, bodyData = null, isFormData = false) {
        const token = localStorage.getItem('adminAuthToken');
        const headers = {};

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const options = {
            method: method,
            headers: headers,
        };

        if (bodyData) {
            if (isFormData) {
                // For FormData, fetch automatically sets 'Content-Type: multipart/form-data'
                // Do NOT manually set Content-Type header for FormData
                options.body = bodyData;
            } else {
                headers['Content-Type'] = 'application/json';
                options.body = JSON.stringify(bodyData);
            }
        }

        console.log(`Real API Call (Mocked): ${method} ${endpoint}`, bodyData); // Log for debugging

        try {
            // --- Mock Backend Simulation ---
            const mockResponse = await new Promise(resolve => {
                setTimeout(() => {
                    let status = 200;
                    let responseData = { success: true, message: 'Operation successful (mocked).' };

                    // Basic mock logic based on endpoint and method
                    if (endpoint.includes('/api/login')) {
                        // Handled in login.js
                    } else if (endpoint.includes('/api/listings')) {
                        if (method === 'GET') responseData.data = dummyData.listings;
                        else if (method === 'POST' && endpoint === '/api/listings/bulk-upload') responseData.message = 'Bulk upload received for processing.';
                        else if (method === 'POST' || method === 'PUT') responseData.data = bodyData; // Return the data sent
                        else if (method === 'DELETE') responseData.message = 'Item deleted.';
                    } else if (endpoint.includes('/api/ads')) {
                        if (method === 'GET') responseData.data = dummyData.ads;
                        else if (method === 'POST' || method === 'PUT') responseData.data = bodyData;
                        else if (method === 'DELETE') responseData.message = 'Item deleted.';
                    } else if (endpoint.includes('/api/offers')) {
                        if (method === 'GET') responseData.data = dummyData.offers;
                        else if (method === 'POST' || method === 'PUT') responseData.data = bodyData;
                        else if (method === 'DELETE') responseData.message = 'Item deleted.';
                    } else if (endpoint.includes('/api/users')) {
                        if (method === 'GET') responseData.data = dummyData.users;
                        else if (method === 'POST' || method === 'PUT') responseData.data = bodyData;
                    } else if (endpoint.includes('/api/feedback')) {
                        if (method === 'GET') responseData.data = dummyData.feedback;
                        else if (method === 'POST' || method === 'PUT') responseData.data = bodyData;
                        else if (method === 'DELETE') responseData.message = 'Item deleted.';
                    } else if (endpoint.includes('/api/config')) {
                        if (method === 'GET') {
                            const type = endpoint.split('/').pop(); // e.g., 'cities'
                            responseData.data = dummyData[type];
                        } else if (method === 'POST' || method === 'DELETE') {
                            responseData.message = 'Configuration updated.';
                        } else if (endpoint.includes('/api/config/upload')) {
                            responseData.message = 'CSV upload received.';
                        }
                    } else if (endpoint.includes('/api/analytics')) {
                        const period = new URLSearchParams(endpoint.split('?')[1]).get('period');
                        responseData.data = dummyData.analytics[period] || { labels: [], views: [], searches: [], clicks: [] };
                    } else if (endpoint.includes('/api/upload/banner')) {
                        // Simulate a successful image upload
                        responseData.data = { url: 'https://placehold.co/150x80/007bff/ffffff?text=Uploaded+Banner' };
                        responseData.message = 'Image uploaded successfully.';
                    } else if (endpoint.includes('/api/export')) {
                        responseData.message = 'Export initiated.';
                    } else if (endpoint.includes('/api/auth/change-password')) {
                        responseData.message = 'Password changed.';
                    } else if (endpoint.includes('/api/backup/manual')) {
                        responseData.message = 'Backup initiated.';
                    }

                    // Simulate 401 for unauthorized access if no token or invalid token
                    if (!token && !endpoint.includes('/api/login')) {
                        status = 401;
                        responseData = { success: false, message: 'Unauthorized: No token provided.' };
                    }
                    // Add more specific error simulations if needed

                    resolve({
                        ok: status >= 200 && status < 300,
                        status: status,
                        json: () => Promise.resolve(responseData)
                    });
                }, 700); // Simulate network delay
            });
            // --- End Mock Backend Simulation ---

            const responseData = await mockResponse.json();

            if (mockResponse.status === 401) {
                showMessageBox('Session expired. Please log in again.', true);
                localStorage.removeItem('adminAuthToken');
                setTimeout(() => { window.location.href = 'login.html'; }, 1500);
                return Promise.reject('Unauthorized'); // Reject the promise to stop further execution
            }

            if (!mockResponse.ok) {
                const errorMsg = responseData.message || `API Error: ${mockResponse.status}`;
                showMessageBox(errorMsg, true);
                return Promise.reject(errorMsg);
            }

            return responseData;

        } catch (error) {
            console.error('Network or API error:', error);
            showMessageBox('Network error or unable to connect to server.', true);
            return Promise.reject('Network error');
        }
    }

    /**
     * Displays a temporary message box.
     * @param {string} message The message to display.
     * @param {boolean} isError If true, shows an error message.
     */
    function showMessageBox(message, isError = false) {
        messageBox.textContent = message;
        messageBox.classList.remove('error', 'show'); // Reset classes
        if (isError) {
            messageBox.classList.add('error');
        }
        messageBox.classList.add('show');
        setTimeout(() => {
            messageBox.classList.remove('show');
        }, 3000);
    }

    /**
     * Shows a specific admin section and hides others.
     * @param {HTMLElement} sectionToShow The section element to display.
     */
    function showSection(sectionToShow) {
        sections.forEach(section => section.classList.add('hidden'));
        sectionToShow.classList.remove('hidden');

        // Update active class in sidebar
        navItems.forEach(item => item.classList.remove('active'));
        const activeNavItem = document.getElementById(`${sectionToShow.id.replace('Section', 'Nav')}`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }
    }

    /**
     * Resets a given form.
     * @param {HTMLFormElement} form The form element to reset.
     */
    function resetForm(form) {
        form.reset();
        // Clear hidden inputs if any
        form.querySelectorAll('input[type="hidden"]').forEach(input => input.value = '');
        // Hide image previews
        const imgPreview = form.querySelector('img[alt$="Preview"]');
        if (imgPreview) {
            imgPreview.src = '';
            imgPreview.classList.add('hidden');
        }
    }

    /**
     * Populates a select element with options from an array.
     * @param {HTMLSelectElement} selectElement The select element.
     * @param {string[]} optionsArray The array of options.
     * @param {string} defaultOptionText Text for the default "All" or "Select" option.
     */
    function populateSelect(selectElement, optionsArray, defaultOptionText = 'Select...') {
        selectElement.innerHTML = `<option value="">${defaultOptionText}</option>`;
        optionsArray.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            selectElement.appendChild(opt);
        });
    }

    /**
     * Handles modal display.
     * @param {HTMLElement} modal The modal element.
     * @param {boolean} show True to show, false to hide.
     */
    function toggleModal(modal, show) {
        modal.style.display = show ? 'flex' : 'none';
        if (!show) {
            // Reset form when modal is hidden
            const form = modal.querySelector('form');
            if (form) resetForm(form);
        }
    }

    /**
     * Converts an array of objects to CSV format.
     * @param {Array<Object>} data The array of objects.
     * @returns {string} The CSV string.
     */
    function convertToCsv(data) {
        if (!data || data.length === 0) return '';

        const headers = Object.keys(data[0]);
        const csvRows = [];
        csvRows.push(headers.join(',')); // Add header row

        for (const row of data) {
            const values = headers.map(header => {
                const escaped = ('' + row[header]).replace(/"/g, '""'); // Escape double quotes
                return `"${escaped}"`; // Enclose values in double quotes
            });
            csvRows.push(values.join(','));
        }
        return csvRows.join('\n');
    }

    /**
     * Triggers a CSV file download.
     * @param {string} csvString The CSV content.
     * @param {string} filename The desired filename (e.g., "data.csv").
     */
    function downloadCsv(csvString, filename) {
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) { // Feature detection
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    // --- Dashboard Logic ---
    async function updateDashboardCounts() {
        try {
            const listingsResponse = await apiCall('GET', '/api/listings');
            dummyData.listings = listingsResponse.data || [];
            const adsResponse = await apiCall('GET', '/api/ads');
            dummyData.ads = adsResponse.data || [];
            const offersResponse = await apiCall('GET', '/api/offers');
            dummyData.offers = offersResponse.data || [];

            totalListingsCount.textContent = dummyData.listings.length;
            pendingListingsCount.textContent = dummyData.listings.filter(l => l.status === 'pending').length;
            activeAdsCount.textContent = dummyData.ads.filter(ad => ad.status === 'active').length;
            todaysOffersCount.textContent = dummyData.offers.filter(o => new Date(o.expiry).toDateString() === new Date().toDateString()).length;
            // Dummy visitor count, could be dynamic in real app
            visitorCount.textContent = Math.floor(Math.random() * 1000) + 500;
        } catch (error) {
            console.error("Failed to update dashboard counts:", error);
            // Error message handled by apiCall
        }
    }

    // Quick Access Button Handlers (redirect to relevant sections)
    approveListingsBtn.addEventListener('click', () => {
        showSection(document.getElementById('listingsSection'));
        listingStatusFilter.value = 'pending'; // Pre-filter to pending
        renderListings();
    });
    stopAdsBtn.addEventListener('click', () => {
        showSection(document.getElementById('adsSection'));
        adStatusFilter.value = 'active'; // Pre-filter to active
        renderAds();
    });
    flagReportsBtn.addEventListener('click', () => {
        showSection(document.getElementById('feedbackSection'));
        // No specific filter for reports, just show section
    });

    // --- Listings Management Logic ---
    async function renderListings() {
        listingsTableBody.innerHTML = '';
        try {
            const response = await apiCall('GET', '/api/listings');
            dummyData.listings = response.data || [];

            const cityFilter = listingCityFilter.value.toLowerCase();
            const serviceTypeFilter = listingServiceTypeFilter.value.toLowerCase();
            const statusFilter = listingStatusFilter.value.toLowerCase();

            const filteredListings = dummyData.listings.filter(listing => {
                const matchesCity = !cityFilter || (listing.city && listing.city.toLowerCase().includes(cityFilter));
                const matchesServiceType = !serviceTypeFilter || (listing.serviceType && listing.serviceType.toLowerCase().includes(serviceTypeFilter));
                const matchesStatus = !statusFilter || (listing.status && listing.status.toLowerCase() === statusFilter);
                return matchesCity && matchesServiceType && matchesStatus;
            });

            if (filteredListings.length === 0) {
                listingsTableBody.innerHTML = `<tr><td colspan="6" class="text-center">No listings found.</td></tr>`;
                return;
            }

            filteredListings.forEach(listing => {
                const row = listingsTableBody.insertRow();
                row.innerHTML = `
                    <td>${listing.id}</td>
                    <td>${listing.name}</td>
                    <td>${listing.city || 'N/A'}</td>
                    <td>${listing.serviceType || 'N/A'}</td>
                    <td><span class="status-${listing.status}">${listing.status ? listing.status.charAt(0).toUpperCase() + listing.status.slice(1) : 'N/A'}</span></td>
                    <td class="actions">
                        <button class="btn btn-success btn-sm ${listing.status === 'active' ? 'hidden' : ''}" data-action="approve" data-id="${listing.id}"><i class="fas fa-check"></i> Approve</button>
                        <button class="btn btn-primary btn-sm" data-action="edit" data-id="${listing.id}"><i class="fas fa-edit"></i> Edit</button>
                        <button class="btn btn-danger btn-sm" data-action="delete" data-id="${listing.id}"><i class="fas fa-trash"></i> Delete</button>
                        <button class="btn btn-warning btn-sm ${listing.status === 'rejected' ? 'hidden' : ''}" data-action="reject" data-id="${listing.id}"><i class="fas fa-times"></i> Reject</button>
                    </td>
                `;
            });
        } catch (error) {
            console.error("Failed to render listings:", error);
        }
    }

    async function handleListingAction(action, id) {
        const listingIndex = dummyData.listings.findIndex(l => l.id === id);
        if (listingIndex === -1) {
            showMessageBox('Listing not found!', true);
            return;
        }

        const listing = dummyData.listings[listingIndex];

        switch (action) {
            case 'approve':
                if (confirm(`Approve listing ${id}?`)) {
                    const response = await apiCall('POST', `/api/listings/approve/${id}`);
                    if (response.success) {
                        listing.status = 'active';
                        showMessageBox(`Listing ${id} approved.`);
                    }
                }
                break;
            case 'edit':
                openListingModal(listing);
                break;
            case 'delete':
                if (confirm(`Are you sure you want to delete listing ${id}?`)) {
                    const response = await apiCall('DELETE', `/api/listings/${id}`);
                    if (response.success) {
                        dummyData.listings.splice(listingIndex, 1);
                        showMessageBox(`Listing ${id} deleted.`);
                    }
                }
                break;
            case 'reject':
                if (confirm(`Reject listing ${id}?`)) {
                    const response = await apiCall('POST', `/api/listings/reject/${id}`);
                    if (response.success) {
                        listing.status = 'inactive'; // Or 'rejected' if you have a specific status
                        showMessageBox(`Listing ${id} rejected.`);
                    }
                }
                break;
        }
        renderListings();
        updateDashboardCounts();
    }

    function openListingModal(listing = null) {
        toggleModal(listingModal, true);
        if (listing) {
            listingModalTitle.textContent = 'Edit Listing';
            listingIdInput.value = listing.id;
            listingNameInput.value = listing.name;
            listingDescriptionInput.value = listing.description;
            listingCityInput.value = listing.city;
            listingServiceTypeInput.value = listing.serviceType;
            listingContactInput.value = listing.contact;
            listingStatusSelect.value = listing.status;
        } else {
            listingModalTitle.textContent = 'Add New Listing';
            resetForm(listingForm);
        }
    }

    listingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = listingIdInput.value;
        const listingData = {
            name: listingNameInput.value.trim(),
            description: listingDescriptionInput.value.trim(),
            city: listingCityInput.value.trim(),
            serviceType: listingServiceTypeInput.value.trim(),
            contact: listingContactInput.value.trim(),
            status: listingStatusSelect.value
        };

        if (id) {
            // Edit existing listing
            const response = await apiCall('PUT', `/api/listings/${id}`, listingData);
            if (response.success) {
                const index = dummyData.listings.findIndex(l => l.id === id);
                if (index !== -1) dummyData.listings[index] = { ...dummyData.listings[index], ...listingData };
                showMessageBox(`Listing ${id} updated successfully!`);
            }
        } else {
            // Add new listing
            // In a real backend, the ID would be generated by the DB
            listingData.id = 'L' + (dummyData.listings.length + 1).toString().padStart(3, '0'); // Dummy ID for frontend
            const response = await apiCall('POST', '/api/listings', listingData);
            if (response.success) {
                dummyData.listings.push(listingData); // Add to local dummy data
                showMessageBox(`Listing ${listingData.id} added successfully!`);
            }
        }
        toggleModal(listingModal, false);
        renderListings();
        updateDashboardCounts();
    });

    // Bulk Upload Listings Logic
    let uploadedCsvData = null;

    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.classList.add('border-blue-500', 'bg-blue-50');
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('border-blue-500', 'bg-blue-50');
    });

    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dropArea.classList.remove('border-blue-500', 'bg-blue-50');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            csvFileInput.files = files;
            handleCsvFile();
        }
    });

    csvFileInput.addEventListener('change', handleCsvFile);

    function handleCsvFile() {
        const file = csvFileInput.files[0];
        if (file && file.type === 'text/csv') {
            const reader = new FileReader();
            reader.onload = (e) => {
                const csvText = e.target.result;
                csvContentPreview.textContent = csvText;
                csvPreview.classList.remove('hidden');
                uploadCsvBtn.disabled = false;
                uploadedCsvData = parseCsv(csvText);
            };
            reader.readAsText(file);
        } else {
            showMessageBox('Please select a CSV file.', true);
            csvPreview.classList.add('hidden');
            uploadCsvBtn.disabled = true;
            uploadedCsvData = null;
        }
    }

    function parseCsv(csvText) {
        const lines = csvText.trim().split('\n');
        if (lines.length === 0) return [];

        const headers = lines[0].split(',').map(h => h.trim());
        const data = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim());
            if (values.length !== headers.length) {
                console.warn(`Skipping row ${i + 1} due to column mismatch.`);
                continue;
            }
            const rowObject = {};
            headers.forEach((header, index) => {
                rowObject[header] = values[index];
            });
            data.push(rowObject);
        }
        return data;
    }

    uploadCsvBtn.addEventListener('click', async () => {
        if (uploadedCsvData) {
            const response = await apiCall('POST', '/api/listings/bulk-upload', uploadedCsvData);
            if (response.success) {
                showMessageBox('CSV file uploaded for processing. Data will appear after validation.');
                // Simulate backend processing and re-fetch data
                setTimeout(async () => {
                    await renderListings(); // Re-fetch all listings after simulated upload
                    updateDashboardCounts();
                    bulkUploadArea.classList.add('hidden');
                    csvFileInput.value = ''; // Clear file input
                    csvPreview.classList.add('hidden');
                    uploadCsvBtn.disabled = true;
                    uploadedCsvData = null;
                    showMessageBox('Bulk upload processed successfully!');
                }, 2000); // Simulate processing time
            }
        } else {
            showMessageBox('No CSV data to upload.', true);
        }
    });

    confirmCsvUploadBtn.addEventListener('click', () => {
        uploadCsvBtn.click(); // Trigger the actual upload
    });

    // Event delegation for listings table actions
    listingsTableBody.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (target) {
            const action = target.dataset.action;
            const id = target.dataset.id;
            handleListingAction(action, id);
        }
    });

    // Listing filters
    applyListingFiltersBtn.addEventListener('click', renderListings);

    // --- Anchor Ads Manager Logic ---
    async function renderAds() {
        adsTableBody.innerHTML = '';
        try {
            const response = await apiCall('GET', '/api/ads');
            dummyData.ads = response.data || [];

            const statusFilter = adStatusFilter.value.toLowerCase();

            const filteredAds = dummyData.ads.filter(ad => {
                const matchesStatus = !statusFilter || (ad.status && ad.status.toLowerCase() === statusFilter);
                return matchesStatus;
            });

            if (filteredAds.length === 0) {
                adsTableBody.innerHTML = `<tr><td colspan="8" class="text-center">No ads found.</td></tr>`;
                return;
            }

            filteredAds.forEach(ad => {
                const expiry = ad.expiryDate ? new Date(ad.expiryDate) : null;
                const now = new Date();
                const isExpired = expiry && expiry < now;

                // Update status to 'expired' if the ad has passed its expiry date
                if (isExpired && ad.status !== 'expired') {
                    ad.status = 'expired';
                    // Simulate backend call for auto-expiry
                    apiCall('PUT', `/api/ads/${ad.id}`, { status: 'expired' }); // Update status on backend
                }

                const row = adsTableBody.insertRow();
                row.innerHTML = `
                    <td>${ad.id}</td>
                    <td><img src="${ad.imageUrl || 'https://placehold.co/100x60/cccccc/333333?text=No+Image'}" alt="Ad Banner" class="w-24 h-auto rounded"></td>
                    <td>${ad.description || 'N/A'}</td>
                    <td>${ad.planDuration || 'N/A'}</td>
                    <td><span class="status-${(ad.paymentStatus || 'unknown').toLowerCase()}">${ad.paymentStatus || 'N/A'}</span></td>
                    <td><span class="status-${ad.status}">${ad.status ? ad.status.charAt(0).toUpperCase() + ad.status.slice(1) : 'N/A'}</span></td>
                    <td>${ad.expiryDate || 'N/A'} ${isExpired ? '(Expired)' : ''}</td>
                    <td class="actions">
                        <button class="btn btn-success btn-sm ${ad.status === 'pending' ? '' : 'hidden'}" data-action="approve" data-id="${ad.id}"><i class="fas fa-check"></i> Approve</button>
                        <button class="btn btn-danger btn-sm ${ad.status === 'pending' ? '' : 'hidden'}" data-action="reject" data-id="${ad.id}"><i class="fas fa-times"></i> Reject</button>
                        <button class="btn btn-primary btn-sm ${ad.status === 'active' ? '' : 'hidden'}" data-action="edit" data-id="${ad.id}"><i class="fas fa-edit"></i> Edit</button>
                        <button class="btn btn-warning btn-sm ${ad.status === 'active' ? '' : 'hidden'}" data-action="stop" data-id="${ad.id}"><i class="fas fa-stop"></i> Stop</button>
                        <button class="btn btn-danger btn-sm" data-action="delete" data-id="${ad.id}"><i class="fas fa-trash"></i> Delete</button>
                    </td>
                `;
            });
        } catch (error) {
            console.error("Failed to render ads:", error);
        }
    }

    adsTableBody.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (target) {
            const action = target.dataset.action;
            const id = target.dataset.id;
            handleAdAction(action, id);
        }
    });

    async function handleAdAction(action, id) {
        const adIndex = dummyData.ads.findIndex(ad => ad.id === id);
        if (adIndex === -1) {
            showMessageBox('Ad not found!', true);
            return;
        }
        const ad = dummyData.ads[adIndex];

        switch (action) {
            case 'approve':
                if (confirm(`Approve Ad ${id}?`)) {
                    const response = await apiCall('POST', `/api/ads/approve/${id}`);
                    if (response.success) {
                        ad.status = 'active';
                        showMessageBox(`Ad ${id} approved.`);
                    }
                }
                break;
            case 'reject':
                if (confirm(`Reject Ad ${id}?`)) {
                    const response = await apiCall('POST', `/api/ads/reject/${id}`);
                    if (response.success) {
                        ad.status = 'rejected'; // Assuming a 'rejected' status for ads
                        showMessageBox(`Ad ${id} rejected.`);
                    }
                }
                break;
            case 'edit':
                showMessageBox(`Editing Ad ${id} (Feature to be implemented).`);
                // In a real app, open a modal to edit ad details
                break;
            case 'stop':
                if (confirm(`Stop Ad ${id}?`)) {
                    const response = await apiCall('POST', `/api/ads/stop/${id}`);
                    if (response.success) {
                        ad.status = 'inactive'; // Or 'stopped'
                        showMessageBox(`Ad ${id} stopped.`);
                    }
                }
                break;
            case 'delete':
                if (confirm(`Are you sure you want to delete ad ${id}?`)) {
                    const response = await apiCall('DELETE', `/api/ads/${id}`);
                    if (response.success) {
                        dummyData.ads.splice(adIndex, 1);
                        showMessageBox(`Ad ${id} deleted.`);
                    }
                }
                break;
        }
        renderAds();
        updateDashboardCounts();
    }

    applyAdFiltersBtn.addEventListener('click', renderAds);

    // --- Offers Management Logic ---
    async function renderOffers() {
        offersTableBody.innerHTML = '';
        try {
            const response = await apiCall('GET', '/api/offers');
            dummyData.offers = response.data || [];

            if (dummyData.offers.length === 0) {
                offersTableBody.innerHTML = `<tr><td colspan="6" class="text-center">No offers found.</td></tr>`;
                return;
            }
            dummyData.offers.forEach(offer => {
                const row = offersTableBody.insertRow();
                row.innerHTML = `
                    <td>${offer.id}</td>
                    <td><img src="${offer.bannerUrl || 'https://placehold.co/100x60/cccccc/333333?text=No+Image'}" alt="Offer Banner" class="w-24 h-auto rounded"></td>
                    <td>${offer.title || 'N/A'}</td>
                    <td>${offer.description || 'N/A'}</td>
                    <td>${offer.expiry || 'N/A'}</td>
                    <td class="actions">
                        <button class="btn btn-primary btn-sm" data-action="edit" data-id="${offer.id}"><i class="fas fa-edit"></i> Edit</button>
                        <button class="btn btn-danger btn-sm" data-action="remove" data-id="${offer.id}"><i class="fas fa-trash"></i> Remove</button>
                        <button class="btn btn-secondary btn-sm" data-action="preview" data-id="${offer.id}"><i class="fas fa-eye"></i> Preview</button>
                    </td>
                `;
            });
        } catch (error) {
            console.error("Failed to render offers:", error);
        }
    }

    addNewOfferBtn.addEventListener('click', () => {
        openOfferModal();
    });

    function openOfferModal(offer = null) {
        toggleModal(offerModal, true);
        if (offer) {
            offerModalTitle.textContent = 'Edit Offer';
            offerIdInput.value = offer.id;
            offerTitleInput.value = offer.title;
            offerDescriptionInput.value = offer.description;
            offerBannerInput.value = offer.bannerUrl; // Set URL input
            offerExpiryInput.value = offer.expiry;
            offerBannerPreview.src = offer.bannerUrl;
            offerBannerPreview.classList.remove('hidden');
            offerBannerUpload.value = ''; // Clear file input when editing with URL
        } else {
            offerModalTitle.textContent = 'Add New Offer';
            resetForm(offerForm);
            offerBannerPreview.classList.add('hidden');
        }
        updateOfferPreview(); // Initial preview update
    }

    offerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = offerIdInput.value;
        const offerData = {
            title: offerTitleInput.value.trim(),
            description: offerDescriptionInput.value.trim(),
            expiry: offerExpiryInput.value
        };

        let bannerUrl = offerBannerInput.value.trim(); // Start with URL from text input

        // Handle file upload if a file is selected
        if (offerBannerUpload.files && offerBannerUpload.files[0]) {
            const file = offerBannerUpload.files[0];
            const formData = new FormData();
            formData.append('banner', file); // 'banner' is the field name expected by backend

            try {
                const uploadResponse = await apiCall('POST', '/api/upload/banner', formData, true); // true for FormData
                if (uploadResponse.success && uploadResponse.data && uploadResponse.data.url) {
                    bannerUrl = uploadResponse.data.url; // Use the URL returned by the upload API
                    showMessageBox('Banner uploaded successfully!');
                } else {
                    showMessageBox('Failed to upload banner image.', true);
                    return; // Stop submission if banner upload fails
                }
            } catch (error) {
                showMessageBox('Error during banner upload.', true);
                return;
            }
        } else if (offerBannerPreview.src && !offerBannerPreview.classList.contains('hidden') && !bannerUrl) {
            // If there's a preview from a previous edit but no new URL/file, keep the existing preview src
            bannerUrl = offerBannerPreview.src;
        }

        offerData.bannerUrl = bannerUrl; // Assign the final banner URL

        if (id) {
            // Edit existing offer
            const response = await apiCall('PUT', `/api/offers/${id}`, offerData);
            if (response.success) {
                const index = dummyData.offers.findIndex(o => o.id === id);
                if (index !== -1) dummyData.offers[index] = { ...dummyData.offers[index], ...offerData };
                showMessageBox(`Offer ${id} updated successfully!`);
            }
        } else {
            // Add new offer
            // In a real backend, the ID would be generated by the DB
            offerData.id = 'O' + (dummyData.offers.length + 1).toString().padStart(3, '0'); // Dummy ID for frontend
            const response = await apiCall('POST', '/api/offers', offerData);
            if (response.success) {
                dummyData.offers.push(offerData); // Add to local dummy data
                showMessageBox(`Offer ${offerData.id} added successfully!`);
            }
        }
        toggleModal(offerModal, false);
        renderOffers();
        updateDashboardCounts();
    });

    // Offer banner upload preview
    offerBannerUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                offerBannerPreview.src = event.target.result;
                offerBannerPreview.classList.remove('hidden');
                updateOfferPreview();
            };
            reader.readAsDataURL(file);
        } else {
            offerBannerPreview.src = '';
            offerBannerPreview.classList.add('hidden');
            updateOfferPreview();
        }
    });

    // Live offer preview update
    offerTitleInput.addEventListener('input', updateOfferPreview);
    offerDescriptionInput.addEventListener('input', updateOfferPreview);
    offerExpiryInput.addEventListener('input', updateOfferPreview);
    offerBannerInput.addEventListener('input', updateOfferPreview);

    function updateOfferPreview() {
        previewTitle.textContent = offerTitleInput.value || 'Offer Title Preview';
        previewValidity.textContent = `Validity: ${offerExpiryInput.value || 'DD/MM/YYYY'}`;
        // Prioritize file preview, then URL input, then placeholder
        previewBanner.src = offerBannerPreview.src && !offerBannerPreview.classList.contains('hidden')
                            ? offerBannerPreview.src
                            : (offerBannerInput.value || 'https://placehold.co/150x80/cccccc/333333?text=Offer+Banner');
    }

    offersTableBody.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (target) {
            const action = target.dataset.action;
            const id = target.dataset.id;
            handleOfferAction(action, id);
        }
    });

    async function handleOfferAction(action, id) {
        const offerIndex = dummyData.offers.findIndex(o => o.id === id);
        if (offerIndex === -1) {
            showMessageBox('Offer not found!', true);
            return;
        }
        const offer = dummyData.offers[offerIndex];

        switch (action) {
            case 'edit':
                openOfferModal(offer);
                break;
            case 'remove':
                if (confirm(`Are you sure you want to remove offer ${id}?`)) {
                    const response = await apiCall('DELETE', `/api/offers/${id}`);
                    if (response.success) {
                        dummyData.offers.splice(offerIndex, 1);
                        showMessageBox(`Offer ${id} removed.`);
                    }
                }
                break;
            case 'preview':
                alert(`Offer Preview:\nTitle: ${offer.title}\nDescription: ${offer.description}\nExpiry: ${offer.expiry}\nBanner: ${offer.bannerUrl}`);
                break;
        }
        renderOffers();
        updateDashboardCounts();
    }

    // --- User Management Logic ---
    async function renderUsers() {
        usersTableBody.innerHTML = '';
        try {
            const response = await apiCall('GET', '/api/users');
            dummyData.users = response.data || [];

            if (dummyData.users.length === 0) {
                usersTableBody.innerHTML = `<tr><td colspan="6" class="text-center">No users found.</td></tr>`;
                return;
            }
            dummyData.users.forEach(user => {
                const row = usersTableBody.insertRow();
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name || 'N/A'}</td>
                    <td>${user.contact || 'N/A'}</td>
                    <td>${user.role || 'N/A'}</td>
                    <td><span class="status-${user.status}">${user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'N/A'}</span></td>
                    <td class="actions">
                        <button class="btn btn-warning btn-sm" data-action="reset-password" data-id="${user.id}"><i class="fas fa-lock"></i> Reset Pass</button>
                        <button class="btn btn-secondary btn-sm ${user.status === 'active' ? '' : 'hidden'}" data-action="disable" data-id="${user.id}"><i class="fas fa-user-slash"></i> Disable</button>
                        <button class="btn btn-success btn-sm ${user.status === 'disabled' ? '' : 'hidden'}" data-action="enable" data-id="${user.id}"><i class="fas fa-user-check"></i> Enable</button>
                        <button class="btn btn-primary btn-sm ${user.role === 'Agent' && user.status === 'pending' ? '' : 'hidden'}" data-action="approve-agent" data-id="${user.id}"><i class="fas fa-user-plus"></i> Approve Agent</button>
                    </td>
                `;
            });
        } catch (error) {
            console.error("Failed to render users:", error);
        }
    }

    usersTableBody.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (target) {
            const action = target.dataset.action;
            const id = target.dataset.id;
            handleUserAction(action, id);
        }
    });

    async function handleUserAction(action, id) {
        const userIndex = dummyData.users.findIndex(u => u.id === id);
        if (userIndex === -1) {
            showMessageBox('User not found!', true);
            return;
        }
        const user = dummyData.users[userIndex];

        switch (action) {
            case 'reset-password':
                if (confirm(`Are you sure you want to reset password for ${user.name}?`)) {
                    const response = await apiCall('POST', `/api/users/reset-password/${id}`);
                    if (response.success) {
                        showMessageBox(`Password reset for ${user.name}.`);
                    }
                }
                break;
            case 'disable':
                if (confirm(`Are you sure you want to disable account for ${user.name}?`)) {
                    const response = await apiCall('POST', `/api/users/disable/${id}`);
                    if (response.success) {
                        user.status = 'disabled';
                        showMessageBox(`Account disabled for ${user.name}.`);
                    }
                }
                break;
            case 'enable':
                if (confirm(`Are you sure you want to enable account for ${user.name}?`)) {
                    const response = await apiCall('POST', `/api/users/enable/${id}`);
                    if (response.success) {
                        user.status = 'active';
                        showMessageBox(`Account enabled for ${user.name}.`);
                    }
                }
                break;
            case 'approve-agent':
                if (confirm(`Approve ${user.name} as an Agent?`)) {
                    const response = await apiCall('POST', `/api/users/approve-agent/${id}`);
                    if (response.success) {
                        user.role = 'Agent'; // Assuming 'Agent' is the approved role
                        user.status = 'active';
                        showMessageBox(`${user.name} approved as Agent.`);
                    }
                }
                break;
        }
        renderUsers();
    }

    // --- Visitor Analytics Logic ---
    async function renderAnalyticsChart(period) {
        try {
            const response = await apiCall('GET', `/api/analytics?period=${period}`);
            const data = response.data || { labels: [], views: [], searches: [], clicks: [] };
            dummyData.analytics[period] = data; // Update local dummy data with fetched data

            totalViews.textContent = data.views.reduce((sum, val) => sum + val, 0);
            totalSearches.textContent = data.searches.reduce((sum, val) => sum + val, 0);
            listingClicks.textContent = data.clicks.reduce((sum, val) => sum + val, 0);

            if (analyticsChart) {
                analyticsChart.destroy(); // Destroy existing chart before creating a new one
            }

            const ctx = analyticsChartCanvas.getContext('2d');
            analyticsChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.labels,
                    datasets: [
                        {
                            label: 'Views',
                            data: data.views,
                            borderColor: '#007bff',
                            backgroundColor: 'rgba(0, 123, 255, 0.2)',
                            fill: true,
                            tension: 0.3
                        },
                        {
                            label: 'Searches',
                            data: data.searches,
                            borderColor: '#28a745',
                            backgroundColor: 'rgba(40, 167, 69, 0.2)',
                            fill: true,
                            tension: 0.3
                        },
                        {
                            label: 'Listing Clicks',
                            data: data.clicks,
                            borderColor: '#ffc107',
                            backgroundColor: 'rgba(255, 193, 7, 0.2)',
                            fill: true,
                            tension: 0.3
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0,0,0,0.05)' // Light grid lines
                            }
                        },
                        x: {
                            grid: {
                                color: 'rgba(0,0,0,0.05)'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                color: getComputedStyle(document.body).color // Match text color
                            }
                        }
                    }
                }
            });

            // Update chart colors for dark mode
            updateChartColors();
        } catch (error) {
            console.error("Failed to render analytics chart:", error);
        }
    }

    function updateChartColors() {
        if (analyticsChart) {
            const isDarkMode = document.body.classList.contains('dark-mode');
            const gridColor = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
            const textColor = isDarkMode ? '#e2e8f0' : '#333';

            analyticsChart.options.scales.x.grid.color = gridColor;
            analyticsChart.options.scales.y.grid.color = gridColor;
            analyticsChart.options.scales.x.ticks.color = textColor;
            analyticsChart.options.scales.y.ticks.color = textColor;
            analyticsChart.options.plugins.legend.labels.color = textColor;
            analyticsChart.update();
        }
    }

    generateAnalyticsBtn.addEventListener('click', () => {
        renderAnalyticsChart(analyticsPeriodSelect.value);
    });

    exportAnalyticsBtn.addEventListener('click', async () => {
        const period = analyticsPeriodSelect.value;
        try {
            const response = await apiCall('GET', `/api/analytics?period=${period}`);
            const data = response.data;
            if (data && data.labels.length > 0) {
                const exportData = data.labels.map((label, index) => ({
                    Period: label,
                    Views: data.views[index],
                    Searches: data.searches[index],
                    Clicks: data.clicks[index]
                }));
                downloadCsv(convertToCsv(exportData), `${period}_analytics.csv`);
                showMessageBox(`Exported ${period} analytics data.`);
            } else {
                showMessageBox('No data to export for this period.', true);
            }
        } catch (error) {
            console.error("Failed to export analytics:", error);
        }
    });

    // --- Feedback & Reports Logic ---
    async function renderFeedback() {
        feedbackTableBody.innerHTML = '';
        try {
            const response = await apiCall('GET', '/api/feedback');
            dummyData.feedback = response.data || [];

            if (dummyData.feedback.length === 0) {
                feedbackTableBody.innerHTML = `<tr><td colspan="5" class="text-center">No feedback or reports found.</td></tr>`;
                return;
            }
            dummyData.feedback.forEach(entry => {
                const row = feedbackTableBody.insertRow();
                row.innerHTML = `
                    <td>${entry.id}</td>
                    <td>${entry.user || 'N/A'}</td>
                    <td>${'⭐'.repeat(entry.rating || 0)}</td>
                    <td>${entry.comment || 'N/A'}</td>
                    <td><span class="status-${entry.status}">${entry.status ? entry.status.charAt(0).toUpperCase() + entry.status.slice(1) : 'N/A'}</span></td>
                    <td class="actions">
                        <button class="btn btn-primary btn-sm ${entry.status === 'pending' ? '' : 'hidden'}" data-action="mark-reviewed" data-id="${entry.id}"><i class="fas fa-check"></i> Mark Reviewed</button>
                        <button class="btn btn-secondary btn-sm" data-action="archive" data-id="${entry.id}"><i class="fas fa-archive"></i> Archive</button>
                    </td>
                `;
            });
        } catch (error) {
            console.error("Failed to render feedback:", error);
        }
    }

    feedbackTableBody.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (target) {
            const action = target.dataset.action;
            const id = target.dataset.id;
            handleFeedbackAction(action, id);
        }
    });

    async function handleFeedbackAction(action, id) {
        const feedbackIndex = dummyData.feedback.findIndex(f => f.id === id);
        if (feedbackIndex === -1) {
            showMessageBox('Feedback entry not found!', true);
            return;
        }
        const entry = dummyData.feedback[feedbackIndex];

        switch (action) {
            case 'mark-reviewed':
                if (confirm(`Mark feedback ${id} as reviewed?`)) {
                    const response = await apiCall('POST', `/api/feedback/mark-reviewed/${id}`);
                    if (response.success) {
                        entry.status = 'reviewed';
                        showMessageBox(`Feedback ${id} marked as reviewed.`);
                    }
                }
                break;
            case 'archive':
                if (confirm(`Are you sure you want to archive feedback ${id}?`)) {
                    const response = await apiCall('DELETE', `/api/feedback/${id}`);
                    if (response.success) {
                        dummyData.feedback.splice(feedbackIndex, 1); // Remove for simplicity
                        showMessageBox(`Feedback ${id} archived.`);
                    }
                }
                break;
        }
        renderFeedback();
    }

    // --- Settings Logic ---
    async function renderSettings() {
        try {
            const citiesResponse = await apiCall('GET', '/api/config/cities');
            dummyData.cities = citiesResponse.data || [];
            populateSelect(removeCitySelect, dummyData.cities, 'Select city to remove');
            populateSelect(listingCityFilter, dummyData.cities, 'All Cities'); // Also update listings filter

            const statesResponse = await apiCall('GET', '/api/config/states');
            dummyData.states = statesResponse.data || [];
            populateSelect(removeStateSelect, dummyData.states, 'Select state to remove');

            const categoriesResponse = await apiCall('GET', '/api/config/categories');
            dummyData.categories = categoriesResponse.data || [];
            populateSelect(removeCategorySelect, dummyData.categories, 'Select category to remove');
            populateSelect(listingServiceTypeFilter, dummyData.categories, 'All Services'); // Also update listings filter

        } catch (error) {
            console.error("Failed to load settings data:", error);
        }

        // Load saved UI preferences
        const savedTheme = localStorage.getItem('adminTheme') || 'default';
        themeSelect.value = savedTheme;
        document.body.className = ''; // Clear existing theme classes
        if (savedTheme !== 'default') {
            document.body.classList.add(`${savedTheme}-theme`);
        }

        const savedDarkMode = localStorage.getItem('adminDarkMode') === 'true';
        darkModeToggle.checked = savedDarkMode;
        if (savedDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }

        const savedLanguage = localStorage.getItem('adminLanguage') || 'en';
        languageSelect.value = savedLanguage;
        // In a real app, you'd load language specific text here.
        // For this demo, we'll just set the select value.
    }

    // Cities & States
    addCityBtn.addEventListener('click', async () => {
        const newCity = newCityInput.value.trim();
        if (newCity && !dummyData.cities.includes(newCity)) {
            const response = await apiCall('POST', '/api/config/cities', { name: newCity });
            if (response.success) {
                dummyData.cities.push(newCity);
                dummyData.cities.sort();
                populateSelect(removeCitySelect, dummyData.cities, 'Select city to remove');
                populateSelect(listingCityFilter, dummyData.cities, 'All Cities');
                newCityInput.value = '';
                showMessageBox(`City "${newCity}" added.`);
            }
        } else if (newCity) {
            showMessageBox('City already exists or invalid name.', true);
        }
    });

    removeCityBtn.addEventListener('click', async () => {
        const cityToRemove = removeCitySelect.value;
        if (cityToRemove) {
            if (confirm(`Are you sure you want to remove city "${cityToRemove}"?`)) {
                const response = await apiCall('DELETE', `/api/config/cities/${cityToRemove}`);
                if (response.success) {
                    dummyData.cities = dummyData.cities.filter(c => c !== cityToRemove);
                    populateSelect(removeCitySelect, dummyData.cities, 'Select city to remove');
                    populateSelect(listingCityFilter, dummyData.cities, 'All Cities');
                    showMessageBox(`City "${cityToRemove}" removed.`);
                }
            }
        } else {
            showMessageBox('Please select a city to remove.', true);
        }
    });

    addStateBtn.addEventListener('click', async () => {
        const newState = newStateInput.value.trim();
        if (newState && !dummyData.states.includes(newState)) {
            const response = await apiCall('POST', '/api/config/states', { name: newState });
            if (response.success) {
                dummyData.states.push(newState);
                dummyData.states.sort();
                populateSelect(removeStateSelect, dummyData.states, 'Select state to remove');
                newStateInput.value = '';
                showMessageBox(`State "${newState}" added.`);
            }
        } else if (newState) {
            showMessageBox('State already exists or invalid name.', true);
        }
    });

    removeStateBtn.addEventListener('click', async () => {
        const stateToRemove = removeStateSelect.value;
        if (stateToRemove) {
            if (confirm(`Are you sure you want to remove state "${stateToRemove}"?`)) {
                const response = await apiCall('DELETE', `/api/config/states/${stateToRemove}`);
                if (response.success) {
                    dummyData.states = dummyData.states.filter(s => s !== stateToRemove);
                    populateSelect(removeStateSelect, dummyData.states, 'Select state to remove');
                    showMessageBox(`State "${stateToRemove}" removed.`);
                }
            }
        } else {
            showMessageBox('Please select a state to remove.', true);
        }
    });

    // Categories
    addCategoryBtn.addEventListener('click', async () => {
        const newCategory = newCategoryInput.value.trim();
        if (newCategory && !dummyData.categories.includes(newCategory)) {
            const response = await apiCall('POST', '/api/config/categories', { name: newCategory });
            if (response.success) {
                dummyData.categories.push(newCategory);
                dummyData.categories.sort();
                populateSelect(removeCategorySelect, dummyData.categories, 'Select category to remove');
                populateSelect(listingServiceTypeFilter, dummyData.categories, 'All Services');
                newCategoryInput.value = '';
                showMessageBox(`Category "${newCategory}" added.`);
            }
        } else if (newCategory) {
            showMessageBox('Category already exists or invalid name.', true);
        }
    });

    removeCategoryBtn.addEventListener('click', async () => {
        const categoryToRemove = removeCategorySelect.value;
        if (categoryToRemove) {
            if (confirm(`Are you sure you want to remove category "${categoryToRemove}"?`)) {
                const response = await apiCall('DELETE', `/api/config/categories/${categoryToRemove}`);
                if (response.success) {
                    dummyData.categories = dummyData.categories.filter(c => c !== categoryToRemove);
                    populateSelect(removeCategorySelect, dummyData.categories, 'Select category to remove');
                    populateSelect(listingServiceTypeFilter, dummyData.categories, 'All Services');
                    showMessageBox(`Category "${categoryToRemove}" removed.`);
                }
            }
        } else {
            showMessageBox('Please select a category to remove.', true);
        }
    });

    // CSV Upload for Settings
    uploadCityCsvBtn.addEventListener('click', () => handleSettingsCsvUpload(cityCsvUpload, 'cities'));
    uploadStateCsvBtn.addEventListener('click', () => handleSettingsCsvUpload(stateCsvUpload, 'states'));
    uploadCategoryCsvBtn.addEventListener('click', () => handleSettingsCsvUpload(categoryCsvUpload, 'categories'));

    function handleSettingsCsvUpload(fileInput, type) {
        const file = fileInput.files[0];
        if (file && file.type === 'text/csv') {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const csvText = e.target.result;
                const newItems = parseSettingsCsv(csvText);

                if (newItems.length > 0) {
                    const response = await apiCall('POST', `/api/config/upload/${type}`, { items: newItems });
                    if (response.success) {
                        // Update dummyData and dropdowns after successful API call
                        dummyData[type] = [...new Set([...dummyData[type], ...newItems])].sort(); // Merge and deduplicate
                        if (type === 'cities') {
                            populateSelect(removeCitySelect, dummyData.cities, 'Select city to remove');
                            populateSelect(listingCityFilter, dummyData.cities, 'All Cities');
                        }
                        if (type === 'states') {
                            populateSelect(removeStateSelect, dummyData.states, 'Select state to remove');
                        }
                        if (type === 'categories') {
                            populateSelect(removeCategorySelect, dummyData.categories, 'Select category to remove');
                            populateSelect(listingServiceTypeFilter, dummyData.categories, 'All Services');
                        }
                        showMessageBox(`Successfully uploaded and updated ${type}.`);
                    }
                } else {
                    showMessageBox(`No valid data found in ${type} CSV.`, true);
                }
                fileInput.value = ''; // Clear file input
            };
            reader.readAsText(file);
        } else {
            showMessageBox('Please select a CSV file.', true);
        }
    }

    function parseSettingsCsv(csvText) {
        // Assuming simple CSV: one item per line, no header
        return csvText.trim().split('\n').map(item => item.trim()).filter(item => item !== '');
    }


    // Change Password
    changePasswordBtn.addEventListener('click', async () => {
        const currentPass = currentPasswordInput.value;
        const newPass = newPasswordInput.value;
        const confirmNewPass = confirmNewPasswordInput.value;

        // Dummy password check: assume current password is 'admin'
        if (currentPass !== 'admin') {
            showMessageBox('Incorrect current password.', true);
            return;
        }
        if (newPass.length < 6) {
            showMessageBox('New password must be at least 6 characters long.', true);
            return;
        }
        if (newPass !== confirmNewPass) {
            showMessageBox('New password and confirmation do not match.', true);
            return;
        }

        const response = await apiCall('POST', '/api/auth/change-password', { currentPassword: currentPass, newPassword: newPass });
        if (response.success) {
            showMessageBox('Password changed successfully!');
            resetForm(currentPasswordInput.closest('div').parentElement); // Reset password fields
        }
    });

    // UI Preferences
    themeSelect.addEventListener('change', (e) => {
        const selectedTheme = e.target.value;
        document.body.className = ''; // Clear existing theme classes
        if (selectedTheme !== 'default') {
            document.body.classList.add(`${selectedTheme}-theme`);
        }
        localStorage.setItem('adminTheme', selectedTheme);
        updateChartColors(); // Update chart colors if theme changes
    });

    darkModeToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        localStorage.setItem('adminDarkMode', e.target.checked);
        updateChartColors(); // Update chart colors for dark mode
    });

    languageSelect.addEventListener('change', (e) => {
        const selectedLanguage = e.target.value;
        localStorage.setItem('adminLanguage', selectedLanguage);
        showMessageBox(`Language set to ${selectedLanguage}. (UI text not translated in this demo)`);
        // In a real application, you'd load and apply language-specific text here.
    });

    // --- Data Export / Backup Logic ---
    exportListingsCsvBtn.addEventListener('click', async () => {
        try {
            const response = await apiCall('GET', '/api/export/listings');
            if (response.success && response.data) {
                downloadCsv(convertToCsv(response.data), 'local_mitra_listings.csv');
                showMessageBox('Listings data exported.');
            } else {
                showMessageBox('No listings data to export.', true);
            }
        } catch (error) {
            console.error("Failed to export listings:", error);
        }
    });

    exportAdsCsvBtn.addEventListener('click', async () => {
        try {
            const response = await apiCall('GET', '/api/export/ads');
            if (response.success && response.data) {
                downloadCsv(convertToCsv(response.data), 'local_mitra_ads.csv');
                showMessageBox('Ads data exported.');
            } else {
                showMessageBox('No ads data to export.', true);
            }
        } catch (error) {
            console.error("Failed to export ads:", error);
        }
    });

    exportOffersCsvBtn.addEventListener('click', async () => {
        try {
            const response = await apiCall('GET', '/api/export/offers');
            if (response.success && response.data) {
                downloadCsv(convertToCsv(response.data), 'local_mitra_offers.csv');
                showMessageBox('Offers data exported.');
            } else {
                showMessageBox('No offers data to export.', true);
            }
        } catch (error) {
            console.error("Failed to export offers:", error);
        }
    });

    exportUsersCsvBtn.addEventListener('click', async () => {
        try {
            const response = await apiCall('GET', '/api/export/users');
            if (response.success && response.data) {
                downloadCsv(convertToCsv(response.data), 'local_mitra_users.csv');
                showMessageBox('Users data exported.');
            } else {
                showMessageBox('No users data to export.', true);
            }
        } catch (error) {
            console.error("Failed to export users:", error);
        }
    });

    manualBackupBtn.addEventListener('click', async () => {
        if (confirm('Are you sure you want to trigger a manual database backup? This might take some time.')) {
            const response = await apiCall('POST', '/api/backup/manual');
            if (response.success) {
                showMessageBox('Manual database backup initiated.');
            }
        }
    });

    // --- Initialization and Event Listeners ---
    async function initializeAdminPanel() {
        // Check for authentication token, redirect to login if not found
        const authToken = localStorage.getItem('adminAuthToken');
        if (!authToken) {
            window.location.href = 'login.html';
            return;
        }

        // Set initial admin user name
        adminUserName.textContent = 'Admin'; // Or fetch from a dummy user session

        // Sidebar toggle
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            mainContent.classList.toggle('shifted');
        });

        // Navigate to sections
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const sectionId = item.id.replace('Nav', 'Section');
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    showSection(targetSection);
                    // Render content for the selected section
                    if (sectionId === 'dashboardSection') {
                        updateDashboardCounts();
                    } else if (sectionId === 'listingsSection') {
                        renderListings();
                        // Ensure filters are populated with current data
                        renderSettings(); // This will refresh city/category dropdowns
                    } else if (sectionId === 'adsSection') {
                        renderAds();
                    } else if (sectionId === 'offersSection') {
                        renderOffers();
                    } else if (sectionId === 'usersSection') {
                        renderUsers();
                    } else if (sectionId === 'analyticsSection') {
                        renderAnalyticsChart(analyticsPeriodSelect.value); // Render default analytics
                    } else if (sectionId === 'feedbackSection') {
                        renderFeedback();
                    } else if (sectionId === 'settingsSection') {
                        renderSettings();
                    } else if (sectionId === 'dataExportSection') {
                        // No specific render function, just display section
                    }
                } else if (item.id === 'logoutNav') {
                    if (confirm('Are you sure you want to log out?')) {
                        localStorage.removeItem('adminAuthToken'); // Clear token
                        window.location.href = 'login.html'; // Redirect to login page
                    }
                }
            });
        });

        // Initial setup for the panel
        await renderSettings(); // Load initial settings data (cities, states, categories)
        showSection(document.getElementById('dashboardSection')); // Show dashboard first
        updateDashboardCounts(); // Populate dashboard counts
    }

    initializeAdminPanel();
});
