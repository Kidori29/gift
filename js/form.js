// Form handling for message submission to webhook
document.addEventListener('DOMContentLoaded', () => {
    const messageForm = document.getElementById('messageForm');
    const userMessage = document.getElementById('userMessage');
    const charCount = document.getElementById('charCount');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');

    // Check if all elements exist
    if (!messageForm || !userMessage || !charCount || !formMessage || !submitBtn) {
        console.error('Form elements not found!');
        return;
    }

    // Character counter
    userMessage.addEventListener('input', () => {
        const length = userMessage.value.length;
        charCount.textContent = length;

        if (length > 900) {
            charCount.style.color = '#f5576c';
        } else {
            charCount.style.color = '#666';
        }
    });

    // Form submission
    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Check if CONFIG is defined
        if (typeof CONFIG === 'undefined') {
            showMessage('error', '⚠️ File config.js chưa được load. Vui lòng kiểm tra console!');
            console.error('CONFIG is not defined. Make sure config.js is loaded before form.js');
            return;
        }

        // Check if webhook URL is configured
        if (!CONFIG.WEBHOOK_URL || CONFIG.WEBHOOK_URL === 'YOUR_WEBHOOK_URL_HERE') {
            showMessage('error', '⚠️ Webhook URL chưa được cấu hình. Vui lòng cập nhật trong file js/config.js');
            return;
        }

        // Get form data
        const formData = {
            name: document.getElementById('userName').value.trim(),
            email: document.getElementById('userEmail').value.trim(),
            message: userMessage.value.trim(),
            timestamp: new Date().toISOString(),
            source: 'valentine-greeting-website'
        };

        // Validate required fields
        if (!formData.name || !formData.message) {
            showMessage('error', '⚠️ Vui lòng điền tên và lời nhắn!');
            return;
        }

        // Disable submit button and show loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span class="icon-spinner">
                ${typeof Icons !== 'undefined' ? Icons.spinner : '⏳'}
            </span>
            <span class="btn-text">Đang gửi...</span>
        `;

        console.log('Sending to webhook:', CONFIG.WEBHOOK_URL);
        console.log('Payload:', formData);

        try {
            // Send to webhook
            const response = await fetch(CONFIG.WEBHOOK_URL, {
                method: 'POST',
                headers: CONFIG.WEBHOOK_HEADERS,
                body: JSON.stringify(formData)
            });

            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            // Check if response is ok (status 200-299)
            if (response.ok) {
                // Success message
                showMessage('success', '✨ Lời nhắn đã được gửi thành công! Cảm ơn bạn! 💝');

                // Reset form
                messageForm.reset();
                charCount.textContent = '0';

                // Reset button with custom send icon
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `
                        <span class="icon-send">
                            ${typeof Icons !== 'undefined' ? Icons.send : '📤'}
                        </span>
                        <span class="btn-text">Gửi Lời Nhắn</span>
                    `;
                }, 2000);

                // Trigger confetti celebration if function exists
                if (typeof createConfettiBurst === 'function') {
                    createConfettiBurst();
                }
            } else {
                // Try to get error message from response
                let errorMessage = `Lỗi ${response.status}: ${response.statusText}`;
                try {
                    const errorData = await response.text();
                    console.log('Error response:', errorData);
                    if (errorData) {
                        try {
                            const json = JSON.parse(errorData);
                            errorMessage = json.message || json.error || errorMessage;
                        } catch (e) {
                            errorMessage = errorData;
                        }
                    }
                } catch (e) {
                    console.error('Error parsing response:', e);
                }
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error('Error submitting message:', error);

            // Check error type and show appropriate message
            if (error.name === 'TypeError') {
                showMessage('error', '❌ Không thể kết nối đến webhook. Kiểm tra URL và kết nối internet!');
            } else if (error.message.includes('CORS') || error.message.includes('cors')) {
                showMessage('error', '❌ Lỗi CORS. Webhook cần hỗ trợ CORS hoặc sử dụng no-cors mode!');
            } else if (error.message.includes('Failed to fetch')) {
                showMessage('error', '❌ Không thể fetch. Kiểm tra URL webhook và CORS!');
            } else {
                showMessage('error', `❌ ${error.message}`);
            }

            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <span class="icon-send">
                    ${typeof Icons !== 'undefined' ? Icons.send : '📤'}
                </span>
                <span class="btn-text">Gửi Lời Nhắn</span>
            `;
        }
    });

    // Show form message
    function showMessage(type, text) {
        formMessage.className = `form-message ${type}`;
        formMessage.textContent = text;
        formMessage.style.display = 'block';

        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }

    // Initialize send icon
    if (submitBtn) {
        submitBtn.innerHTML = `
            <span class="icon-send">
                ${typeof Icons !== 'undefined' ? Icons.send : '📤'}
            </span>
            <span class="btn-text">Gửi Lời Nhắn</span>
        `;
    }

    console.log('Form handler initialized successfully');
    console.log('Webhook URL:', typeof CONFIG !== 'undefined' ? CONFIG.WEBHOOK_URL : 'CONFIG not loaded');
});
