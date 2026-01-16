# Cookie Management System - Complete Implementation Guide

## Overview

A comprehensive, GDPR-compliant cookie management system with preference modal, persistent storage, and placeholder integration points for tracking services.

---

## 🏗️ Architecture

### Components Created

#### 1. **CookieBanner** (`src/components/common/CookieBanner.js`)

- Initial consent banner that appears on first visit
- Three quick action buttons: Reject, Customize, Accept All
- Close button (X) to dismiss
- Links to Privacy Policy and Cookie Policy
- Integrates with CookiePreferencesModal for detailed preferences
- Loads essential cookies automatically

#### 2. **CookiePreferencesModal** (`src/components/common/CookiePreferencesModal.js`)

- Full-screen modal with 4 cookie categories
- Toggle switches for each category (except Essential which is always on)
- Shows example tracking code placeholders
- Save, Accept All, Reject All buttons
- Beautiful UI with gradient backgrounds

#### 3. **CookiePreferencesLink** (`src/components/common/CookiePreferencesLink.js`)

- Reusable button component to open preferences modal
- Can be placed anywhere (footer, settings page, etc.)
- Currently added to footer

#### 4. **useCookieTracking Hook** (`src/hooks/useCookieTracking.js`)

- Centralized cookie management utilities
- Functions for tracking service integration
- Placeholder functions with setup instructions for:
  - Google Analytics
  - Meta Pixel (Facebook)
  - Google Ads
  - Custom Personalization

---

## 📊 Cookie Categories

### 1. **Essential** ✓ Always On

- Session management
- CSRF protection
- Security tokens
- Authentication
- Cannot be disabled

### 2. **Analytics** (Optional)

- Google Analytics
- Page view tracking
- User behavior analysis
- **Placeholder**: `loadGoogleAnalytics()`

### 3. **Marketing** (Optional)

- Meta Pixel (Facebook conversion tracking)
- Google Ads remarketing
- Ad performance tracking
- **Placeholder**: `loadMetaPixel()`, `loadGoogleAds()`

### 4. **Personalization** (Optional)

- Theme preference
- Language selection
- User preference memory
- **Placeholder**: `loadPersonalizationTracking()`

---

## 💾 Data Storage

### localStorage Keys

```javascript
// User's consent choice
localStorage.getItem("cookieConsent");
// Values: "all" | "essential-only" | "custom"

// Detailed preferences (for custom)
localStorage.getItem("cookiePreferences");
// Format: { essential: true, analytics: false, marketing: true, personalization: false }
```

---

## 🔄 User Flow

### First Visit

```
User visits website
  ↓
No cookieConsent in localStorage
  ↓
CookieBanner appears at bottom
  ↓
User chooses: Reject | Customize | Accept All | Close
```

### User Choices

| Choice         | Storage                           | Tracking Enabled          |
| -------------- | --------------------------------- | ------------------------- |
| **Accept All** | `cookieConsent: "all"`            | ✓ All trackers            |
| **Reject**     | `cookieConsent: "essential-only"` | Only essential            |
| **Customize**  | `cookieConsent: "custom"`         | Based on modal selections |
| **Close (X)**  | No change                         | Shows again next visit    |

### Subsequent Visits

```
User returns to site
  ↓
cookieConsent exists in localStorage
  ↓
Banner hidden automatically
  ↓
Tracking scripts load based on preferences
```

### Change Preferences

```
User clicks "Cookie Preferences" in footer
  ↓
Modal opens with current settings
  ↓
User adjusts toggles
  ↓
Clicks "Save Preferences"
  ↓
Settings updated in localStorage
```

---

## 🔌 Integrating Tracking Services

### Google Analytics

**File**: `src/hooks/useCookieTracking.js` → `loadGoogleAnalytics()`

```javascript
// Add this code to loadGoogleAnalytics():
const script = document.createElement("script");
script.async = true;
script.src = "https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID";
document.head.appendChild(script);

window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "GA_MEASUREMENT_ID");
```

### Meta Pixel (Facebook)

**File**: `src/hooks/useCookieTracking.js` → `loadMetaPixel()`

```javascript
// Add this code to loadMetaPixel():
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
// ... (full Meta Pixel code)
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
```

### Google Ads Conversion

**File**: `src/hooks/useCookieTracking.js` → `loadGoogleAds()`

```javascript
// Add this code to loadGoogleAds():
gtag("config", "AW-CONVERSION_ID", {
  allow_google_signals: true,
  allow_ad_personalization_signals: true,
});
```

---

## 🎯 Console Logging

Check browser console to verify consent workflow:

```javascript
// On banner interaction:
"✓ All cookies accepted";
"✓ Only essential cookies enabled";
"✓ Essential cookies loaded (security, session, etc.)";

// When analytics enabled:
"✓ Analytics enabled - Google Analytics tag should load here";

// When marketing enabled:
"✓ Marketing enabled - Meta Pixel tag should load here";
"✓ Marketing enabled - Google Ads conversion tag should load here";

// When personalization enabled:
"✓ Personalization enabled - Custom tracking should load here";
```

---

## 📍 UI Placements

### 1. CookieBanner

- **Location**: Bottom of page (fixed position, z-50)
- **When**: First visit only
- **Auto-hides**: When user makes choice

### 2. Footer Links

Added to footer bottom bar:

```
Privacy Policy | Terms of Service | Cookie Policy | Cookie Preferences | Security
```

### 3. CookiePreferencesLink

- **Component**: Button that opens modal
- **Style**: Text link with underline
- **Hover**: Changes to brand-primary color

---

## 🛡️ Compliance Features

✅ **GDPR Compliant**

- Explicit opt-in for non-essential cookies
- Easy opt-out mechanism
- Clear cookie descriptions
- Data retention information

✅ **User Control**

- Can change preferences anytime
- Can reject all non-essential cookies
- Transparent about cookie purposes
- Clear contact information

✅ **Essential Only**

- Essential cookies always enabled
- Cannot be disabled (security requirement)
- Never requires consent

---

## 📝 Environment Setup

### 1. Verify All Files Exist

```
src/
├── components/
│   ├── common/
│   │   ├── CookieBanner.js ✓
│   │   ├── CookiePreferencesModal.js ✓
│   │   └── CookiePreferencesLink.js ✓
│   └── layout/
│       └── Footer.js ✓ (updated)
├── hooks/
│   └── useCookieTracking.js ✓
├── pages/
│   ├── Privacy.js ✓
│   ├── CookiePolicy.js ✓
│   └── TermsOfService.js ✓
└── App.js ✓ (updated)
```

### 2. Routes Available

```javascript
/privacy
/cookie-policy
/terms-of-service
```

### 3. Component Imports in App.js

```javascript
import CookieBanner from "./components/common/CookieBanner";
import Privacy from "./pages/Privacy";
import CookiePolicy from "./pages/CookiePolicy";
import TermsOfService from "./pages/TermsOfService";
```

---

## 🧪 Testing Checklist

- [ ] First visit → Banner appears
- [ ] Click "Accept All" → Banner closes, tracking scripts ready
- [ ] Click "Reject" → Banner closes, only essential cookies
- [ ] Click "Customize" → Modal opens with toggles
- [ ] Toggle analytics/marketing/personalization on/off
- [ ] Click "Save Preferences" → Settings saved
- [ ] Refresh page → Banner doesn't appear (preference remembered)
- [ ] Click "Cookie Preferences" in footer → Modal opens
- [ ] Clear localStorage → Banner appears again on next page load
- [ ] Check console → See appropriate logging messages

---

## 🔐 Security Notes

1. **localStorage is not secure for sensitive data**

   - Don't store authentication tokens here
   - Use httpOnly cookies for sensitive auth data

2. **Third-party scripts**

   - All tracking scripts (GA, Meta, etc.) should be loaded conditionally
   - Never load them before getting user consent

3. **Consent Management**
   - Always load essential cookies (security, session)
   - Require explicit opt-in for analytics/marketing

---

## 🚀 Next Steps

1. **Add GA Measurement ID**: Replace `GA_MEASUREMENT_ID` placeholder
2. **Add Meta Pixel ID**: Replace `YOUR_PIXEL_ID` placeholder
3. **Add Google Ads ID**: Replace `AW-CONVERSION_ID` placeholder
4. **Test with Google Tag Manager**: Set up GTM container
5. **Monitor Cookie Consent Rate**: Track acceptance/rejection metrics

---

## 📞 Files Modified/Created

### Created:

- `CookiePreferencesModal.js` - Modal for detailed preferences
- `CookiePreferencesLink.js` - Reusable link component
- `useCookieTracking.js` - Hook with placeholder integrations
- `Privacy.js` - Privacy policy page
- `CookiePolicy.js` - Cookie policy page
- `TermsOfService.js` - Terms of service page

### Modified:

- `CookieBanner.js` - Integrated modal functionality
- `Footer.js` - Added Cookie Preferences Link and fixed route
- `App.js` - Added routes and CookieBanner component

---

Last Updated: January 13, 2026
