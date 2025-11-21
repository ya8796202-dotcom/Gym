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

let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = "block"; // أظهر الزر
});

installBtn.addEventListener("click", () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("✅ User accepted the install prompt");
      } else {
        console.log("❌ User dismissed the install prompt");
      }
      deferredPrompt = null;
    });
  }
});
let deferredPrompt;
const installBtn = document.getElementById("installBtn");
const installMsg = document.getElementById("installMsg");

installBtn.style.display = "block"; // الزر دايمًا ظاهر

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log("✅ beforeinstallprompt event captured");
});

installBtn.addEventListener("click", () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("✅ User accepted the install prompt");
        installMsg.style.display = "none";
      } else {
        console.log("❌ User dismissed the install prompt");
        installMsg.textContent = "تم إلغاء التثبيت.";
        installMsg.style.display = "block";
      }
      deferredPrompt = null;
    });
  } else {
    installMsg.textContent = "⚠️ التثبيت غير متاح حاليًا. افتح الموقع من متصفح يدعم التثبيت مثل Chrome أو Edge.";
    installMsg.style.display = "block";
  }
});
