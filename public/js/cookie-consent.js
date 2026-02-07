// Cookie consent management
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function loadGoogleAnalytics() {
  // Create script element for Google Analytics
  var gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-GKW9BN5J16";
  document.head.appendChild(gaScript);

  // Initialize Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-GKW9BN5J16');
}

// Check for existing consent when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  var cookieConsent = document.getElementById('cookie-consent');
  var cookieAccept = document.getElementById('cookie-accept');
  var cookieDecline = document.getElementById('cookie-decline');

  // Check if user has already made a choice
  var consentCookie = getCookie('cookie-consent');

  if (consentCookie === 'accepted') {
    if (cookieConsent) cookieConsent.style.display = 'none';
    loadGoogleAnalytics();
  } else if (consentCookie === 'declined') {
    if (cookieConsent) cookieConsent.style.display = 'none';
  }

  // Handle accept button click
  if (cookieAccept) {
      cookieAccept.addEventListener('click', function() {
        setCookie('cookie-consent', 'accepted', 365);
        if (cookieConsent) cookieConsent.style.display = 'none';
        loadGoogleAnalytics();
      });
  }

  // Handle decline button click
  if (cookieDecline) {
      cookieDecline.addEventListener('click', function() {
        setCookie('cookie-consent', 'declined', 365);
        if (cookieConsent) cookieConsent.style.display = 'none';
      });
  }
});
