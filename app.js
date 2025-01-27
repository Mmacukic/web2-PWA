document.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
        navigator.serviceWorker.register('/sw.js').then(reg => {
            console.log('Service Worker registered');
            document.getElementById('sync-button').addEventListener('click', () => {
                reg.sync.register('sync-data').then(() => {
                    console.log('Sync event registered');
                }).catch(err => {
                    console.error('Sync registration failed', err);
                });
            });
        });
    }

    if ('Notification' in window && Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
            console.log(`Notification permission: ${permission}`);
        });
    }

    // Example of progressive enhancement: Using camera API
    const cameraButton = document.getElementById('camera-button');
    const video = document.getElementById('camera-preview');

    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        cameraButton.addEventListener('click', () => {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    video.srcObject = stream;
                    video.play();
                })
                .catch(err => {
                    console.error('Camera access failed:', err);
                });
        });
    } else {
        cameraButton.disabled = true;
        cameraButton.textContent = 'Camera not supported';
    }
});