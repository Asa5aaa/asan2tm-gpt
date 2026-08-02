// ============================================
// منطق اصلی برنامه
// ============================================

const API_URL = 'https://asan2gpt.onrender.com';

function showLogin() {
    document.getElementById('loginModal').style.display = 'block';
}

function copyEmail() {
    navigator.clipboard.writeText('asa.ss.hc@gmail.com').then(() => {
        alert('✅ ایمیل کپی شد!');
    }).catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = 'asa.ss.hc@gmail.com';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('✅ ایمیل کپی شد!');
    });
}

function showPurchase() {
    document.getElementById('purchaseModal').style.display = 'block';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

function copyEmail() {
    navigator.clipboard.writeText('asa.ss.hc@gmail.com').then(() => {
        alert('✅ ایمیل کپی شد!');
    }).catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = 'asa.ss.hc@gmail.com';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('✅ ایمیل کپی شد!');
    });
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showLoginError('لطفاً ایمیل و رمز را وارد کنید');
        return;
    }
    
    // دریافت Device ID خودکار (بدون دخالت کاربر)
    const deviceId = getDeviceId();
    
    // نمایش وضعیت بارگذاری
    const btn = event.target.querySelector('.btn-primary');
    const originalText = btn.textContent;
    btn.textContent = '⏳ در حال بررسی...';
    btn.disabled = true;
    
    fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, deviceId })
    })
    .then(res => res.json())
    .then(data => {
        btn.textContent = originalText;
        btn.disabled = false;
        
        if (data.success) {
            localStorage.setItem('user_email', email);
            localStorage.setItem('user_data', JSON.stringify(data.user));
            window.location.href = 'chat.html';
        } else {
            showLoginError(data.message || 'خطا در ورود');
        }
    })
    .catch((error) => {
        btn.textContent = originalText;
        btn.disabled = false;
        showLoginError('خطا در اتصال به سرور: ' + error.message);
    });
}

function showLoginError(message) {
    const errorEl = document.getElementById('loginError');
    errorEl.textContent = message;
    errorEl.style.display = 'block';
}

// بررسی وضعیت سیستم
function checkSystemStatus() {
    fetch(`${API_URL}/status`)
        .then(res => res.json())
        .then(data => {
            const statusEl = document.getElementById('systemStatus');
            if (data.active === false) {
                statusEl.innerHTML = '⛔ سیستم غیرفعال است';
                statusEl.style.color = '#f44336';
            }
        })
        .catch(() => {
            // سرور در دسترس نیست
            const statusEl = document.getElementById('systemStatus');
            statusEl.innerHTML = '⚠️ اتصال به سرور برقرار نیست';
            statusEl.style.color = '#FF9800';
        });
}

// دریافت Device ID هنگام بارگذاری صفحه
document.addEventListener('DOMContentLoaded', function() {
    getDeviceId();
    checkSystemStatus();
});
