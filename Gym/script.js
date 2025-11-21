if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/Gym/sw.js")
    .then(() => console.log("✅ Service Worker مسجل"))
    .catch((err) => console.error("❌ فشل التسجيل:", err));
}

let deferredPrompt = null;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = "inline-block";
  console.log("📲 beforeinstallprompt جاهز");
});

installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const choice = await deferredPrompt.userChoice;
  console.log("نتيجة:", choice.outcome);
  deferredPrompt = null;
  installBtn.style.display = "none";
});

window.addEventListener("appinstalled", () => {
  console.log("🎉 التطبيق اتثبت");
  installBtn.style.display = "none";
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/Gym/sw.js')
      .then(reg => console.log('✅ Service Worker Registered', reg))
      .catch(err => console.error('❌ Service Worker Error', err));
  });
}
