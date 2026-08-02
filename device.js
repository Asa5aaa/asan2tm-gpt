// ============================================
// مدیریت Device ID (خودکار و نامرئی)
// ============================================

function getDeviceId() {
    let deviceId = localStorage.getItem('device_id');
    if (!deviceId) {
        if (typeof Fingerprint2 !== 'undefined') {
            Fingerprint2.get({
                excludeMobile: false,
                excludeUserAgent: false,
                excludeLanguage: false,
                excludeColorDepth: false,
                excludeScreenResolution: false,
                excludeTimezoneOffset: false,
                excludeSessionStorage: false,
                excludeLocalStorage: false,
                excludePlugins: false,
                excludeCanvas: false,
                excludeWebgl: false,
                excludeAdBlock: false,
                excludeFonts: false
            }, function(components) {
                const values = components.map(function(component) {
                    return component.value;
                });
                deviceId = Fingerprint2.x64hash128(values.join(''), 31);
                localStorage.setItem('device_id', deviceId);
            });
        } else {
            deviceId = 'dev_' + Date.now() + '_' + Math.random().toString(36).substring(7);
            localStorage.setItem('device_id', deviceId);
        }
    }
    return localStorage.getItem('device_id') || 'unknown';
}

// تابع برای دریافت Device ID در صورت نیاز (برای نمایش در پنل ادمین)
function getDeviceIdForDisplay() {
    return localStorage.getItem('device_id') || 'هنوز ثبت نشده';
}

// تابع برای کپی Device ID (برای ارسال به ادمین)
function copyDeviceIdForSupport() {
    const deviceId = getDeviceId();
    navigator.clipboard.writeText(deviceId).then(() => {
        alert('✅ Device ID کپی شد! این کد را برای پشتیبانی ارسال کنید.');
    }).catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = deviceId;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('✅ Device ID کپی شد! این کد را برای پشتیبانی ارسال کنید.');
    });
}

// دریافت Device ID هنگام بارگذاری صفحه
document.addEventListener('DOMContentLoaded', function() {
    getDeviceId();
});
