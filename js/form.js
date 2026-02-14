// Form handling for Google Forms submission
document.addEventListener('DOMContentLoaded', () => {
    const messageForm = document.getElementById('messageForm');
    const userMessage = document.getElementById('userMessage');
    const charCount = document.getElementById('charCount');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');

    // Check elements
    if (!messageForm || !userMessage || !charCount || !formMessage || !submitBtn) {
        console.error('❌ Form elements not found!');
        return;
    }

    // Character counter
    userMessage.addEventListener('input', () => {
        const length = userMessage.value.length;
        charCount.textContent = length;
        charCount.style.color = length > 900 ? '#f5576c' : '#666';
    });

    // Form submission
    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const message = userMessage.value.trim();

        // Validate
        if (!message) {
            showMessage('error', 'Viết gì đó đii!');
            return;
        }

        // Disable button & show loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span class="icon-spinner">${typeof Icons !== 'undefined' ? Icons.spinner : '⏳'}</span>
            <span class="btn-text">Đang gửi...</span>
        `;

        try {
            // Use URLSearchParams (not FormData) for Google Forms
            const params = new URLSearchParams();
            params.append(CONFIG.MESSAGE_FIELD_ID, message);

            // Send to Google Form with no-cors mode
            await fetch(CONFIG.GOOGLE_FORM_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params.toString()
            });

            // Success (no-cors always assumes success)
            showMessage('success', 'Lời nhắn đã được gửi:3 Thanks ạ!');
            messageForm.reset();
            charCount.textContent = '0';

            // Trigger confetti
            if (typeof createConfettiBurst === 'function') {
                createConfettiBurst();
            }

        } catch (error) {
            console.error('❌ Submission error:', error);
            showMessage('error', '❌ Lỗi gửi. Hãy thử lại!');
        } finally {
            // Reset button after delay
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = `
                    <span class="icon-send">${typeof Icons !== 'undefined' ? Icons.send : '📤'}</span>
                    <span class="btn-text">Gửi Lời Nhắn</span>
                `;
            }, 2000);
        }
    });

    // Show message helper
    function showMessage(type, text) {
        formMessage.className = `form-message ${type}`;
        formMessage.textContent = text;
        formMessage.style.display = 'block';
        setTimeout(() => { formMessage.style.display = 'none'; }, 5000);
    }

    console.log('✅ Form initialized');
});
