document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const mobileNumberInput = document.getElementById('mobileNumber');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');

    /**
     * Handles user login by making a POST request to the backend API.
     * In a real application, this would send credentials and receive a JWT token.
     * @param {string} phone Mobile number of the admin.
     * @param {string} password Password of the admin.
     * @returns {Promise<Object>} A promise that resolves with the API response.
     */
    async function loginUser(phone, password) {
        const endpoint = '/api/login';
        console.log(`API Call: POST ${endpoint}`, { phone, password });

        try {
            // Simulate a fetch call to a backend API
            const response = await new Promise(resolve => {
                setTimeout(() => {
                    // Dummy validation for now
                    if (phone === '9876543210' && password === 'admin') {
                        resolve({
                            ok: true,
                            json: () => Promise.resolve({ success: true, token: 'dummy_admin_jwt_token_12345', message: 'Login successful!' })
                        });
                    } else {
                        resolve({
                            ok: false,
                            status: 401,
                            json: () => Promise.resolve({ success: false, message: 'Invalid credentials.' })
                        });
                    }
                }, 500); // Simulate network delay
            });

            const data = await response.json();

            if (!response.ok) {
                console.error(`Login failed: ${response.status} - ${data.message}`);
                return { success: false, message: data.message || 'Login failed due to server error.' };
            }

            return data; // Contains success:true and token
        } catch (error) {
            console.error('Network or parsing error during login:', error);
            return { success: false, message: 'Network error or unable to connect to server.' };
        }
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default form submission

        const mobileNumber = mobileNumberInput.value;
        const password = passwordInput.value;

        errorMessage.style.display = 'none'; // Hide error message initially

        const result = await loginUser(mobileNumber, password);

        if (result.success) {
            // Store the token (e.g., JWT) received from the backend
            localStorage.setItem('adminAuthToken', result.token);
            console.log('Login successful! Redirecting to dashboard...');
            window.location.href = 'index.html'; // Redirect to the main admin panel
        } else {
            errorMessage.textContent = result.message + ' (Hint: Use 9876543210 and "admin")';
            errorMessage.style.display = 'block'; // Show error message
            console.log('Login failed!');
        }
    });
});
