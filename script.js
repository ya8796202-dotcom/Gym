// ✅ تسجيل الـ Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/Gym/sw.js')
      .then(reg => console.log('✅ Service Worker Registered', reg))
      .catch(err => console.error('❌ Service Worker Error', err));
  });
}

// ✅ التعامل مع زر التثبيت
let deferredPrompt;
const installBtn = document.getElementById("installBtn");
const installMsg = document.getElementById("installMsg");

installBtn.style.display = "block";

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log("📲 beforeinstallprompt جاهز");
});

installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) {
    installMsg.textContent = "⚠️ التثبيت غير متاح حاليًا. افتح الموقع من متصفح يدعم التثبيت مثل Chrome أو Edge.";
    installMsg.style.display = "block";
    return;
  }

  deferredPrompt.prompt();
  const choice = await deferredPrompt.userChoice;

  if (choice.outcome === "accepted") {
    console.log("✅ User accepted the install prompt");
    installMsg.style.display = "none";
  } else {
    console.log("❌ User dismissed the install prompt");
    installMsg.textContent = "تم إلغاء التثبيت.";
    installMsg.style.display = "block";
  }

  deferredPrompt = null;
  installBtn.style.display = "none";
});

window.addEventListener("appinstalled", () => {
  console.log("🎉 التطبيق اتثبت");
  installBtn.style.display = "none";
});
