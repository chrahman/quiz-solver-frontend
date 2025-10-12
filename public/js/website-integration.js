/**
 * Website Integration Code for Quiz Solver Extension Authentication
 *
 * This code should be integrated into your website to send authentication tokens
 * to the Quiz Solver Chrome extension.
 *
 * Usage:
 * 1. Call sendAuthToExtension() after successful login
 * 2. Call sendLogoutToExtension() when user logs out
 * 3. The extension ID should be updated to match your actual extension ID
 */

// Configuration
const EXTENSION_ID = "ajdgfcjkghfponpmbikgecgdelokekae"; // Replace with actual extension ID

/**
 * Check if the extension is installed
 * @returns {Promise<boolean>} True if extension is installed and responsive
 */
async function isExtensionInstalled() {
  return new Promise((resolve) => {
    try {
      chrome.runtime.sendMessage(EXTENSION_ID, { type: "ping" }, (response) => {
        if (chrome.runtime.lastError) {
          console.log("Extension not installed or not responding:", chrome.runtime.lastError.message);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    } catch (error) {
      console.log("Chrome runtime not available:", error);
      resolve(false);
    }
  });
}

/**
 * Send authentication tokens to the extension
 * @param {string} accessToken - JWT access token
 * @param {string} refreshToken - JWT refresh token
 * @param {Object} user - User information
 * @returns {Promise<boolean>} True if successful
 */
async function sendAuthToExtension(accessToken, refreshToken, user) {
  if (!accessToken || !refreshToken) {
    console.error("SendAuthToExtension: Missing tokens");
    return false;
  }

  try {
    // Check if extension is installed first
    const extensionInstalled = await isExtensionInstalled();
    if (!extensionInstalled) {
      console.log("Quiz Solver extension is not installed");
      return false;
    }

    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        EXTENSION_ID,
        {
          type: "auth",
          accessToken: accessToken,
          refreshToken: refreshToken,
          user: user,
        },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error("Failed to send auth to extension:", chrome.runtime.lastError.message);
            resolve(false);
          } else if (response && response.success) {
            console.log("Authentication sent to extension successfully");

            // Optional: Show success notification
            showNotification("Quiz Solver extension authenticated successfully!", "success");
            resolve(true);
          } else {
            console.error("Extension rejected authentication:", response?.error || "Unknown error");
            resolve(false);
          }
        }
      );
    });
  } catch (error) {
    console.error("Error sending auth to extension:", error);
    return false;
  }
}

/**
 * Send logout message to the extension
 * @returns {Promise<boolean>} True if successful
 */
async function sendLogoutToExtension() {
  try {
    // Check if extension is installed first
    const extensionInstalled = await isExtensionInstalled();
    if (!extensionInstalled) {
      console.log("Quiz Solver extension is not installed");
      return false;
    }

    return new Promise((resolve) => {
      chrome.runtime.sendMessage(EXTENSION_ID, { type: "logout" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Failed to send logout to extension:", chrome.runtime.lastError.message);
          resolve(false);
        } else if (response && response.success) {
          console.log("Logout sent to extension successfully");

          // Optional: Show success notification
          showNotification("Logged out from Quiz Solver extension", "info");
          resolve(true);
        } else {
          console.error("Extension rejected logout:", response?.error || "Unknown error");
          resolve(false);
        }
      });
    });
  } catch (error) {
    console.error("Error sending logout to extension:", error);
    return false;
  }
}

/**
 * Show notification to user (optional)
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, error, info)
 */
function showNotification(message, type = "info") {
  // This is a simple implementation. Adapt to your notification system.

  // Option 1: Use browser notification API
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("Quiz Solver", {
      body: message,
      icon: "/favicon.ico",
    });
    return;
  }

  // Option 2: Show in-page notification
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 16px;
    border-radius: 6px;
    color: white;
    font-family: system-ui, sans-serif;
    font-size: 14px;
    z-index: 10000;
    max-width: 300px;
    background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#3b82f6"};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  `;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateY(-20px)";
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

/**
 * Handle successful login - call this after your login API succeeds
 * @param {Object} loginResponse - Response from your login API
 * @param {string} loginResponse.accessToken - JWT access token
 * @param {string} loginResponse.refreshToken - JWT refresh token
 * @param {Object} loginResponse.user - User information
 */
async function handleSuccessfulLogin(loginResponse) {
  const { accessToken, refreshToken, user } = loginResponse;

  if (accessToken && refreshToken && user) {
    // Send tokens to extension
    const success = await sendAuthToExtension(accessToken, refreshToken, user);

    if (success) {
      console.log("Extension authentication successful");
    } else {
      console.log("Extension authentication failed or extension not installed");
    }
  }
}

/**
 * Handle logout - call this when user logs out
 */
async function handleLogout() {
  // Send logout to extension
  const success = await sendLogoutToExtension();

  if (success) {
    console.log("Extension logout successful");
  } else {
    console.log("Extension logout failed or extension not installed");
  }
}

// Export functions for global use or module import
if (typeof module !== "undefined" && module.exports) {
  // Node.js/CommonJS
  module.exports = {
    sendAuthToExtension,
    sendLogoutToExtension,
    handleSuccessfulLogin,
    handleLogout,
    isExtensionInstalled,
  };
} else if (typeof window !== "undefined") {
  // Browser global
  window.QuizSolverExtension = {
    sendAuthToExtension,
    sendLogoutToExtension,
    handleSuccessfulLogin,
    handleLogout,
    isExtensionInstalled,
  };
}

/*
 * USAGE EXAMPLES:
 *
 * 1. After successful login:
 *
 * fetch('/api/login', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ email, password })
 * })
 * .then(response => response.json())
 * .then(async (data) => {
 *   if (data.success) {
 *     // Your normal login handling
 *     localStorage.setItem('accessToken', data.accessToken);
 *     localStorage.setItem('refreshToken', data.refreshToken);
 *
 *     // Send to extension
 *     await handleSuccessfulLogin(data);
 *
 *     // Redirect or update UI
 *     window.location.href = '/dashboard';
 *   }
 * });
 *
 * 2. On logout:
 *
 * async function logout() {
 *   // Your normal logout handling
 *   localStorage.removeItem('accessToken');
 *   localStorage.removeItem('refreshToken');
 *
 *   // Send logout to extension
 *   await handleLogout();
 *
 *   // Redirect
 *   window.location.href = '/login';
 * }
 *
 * 3. React Integration Example:
 *
 * import { useEffect } from 'react';
 *
 * function LoginPage() {
 *   const [credentials, setCredentials] = useState({ email: '', password: '' });
 *
 *   const handleLogin = async (e) => {
 *     e.preventDefault();
 *
 *     try {
 *       const response = await fetch('/api/login', {
 *         method: 'POST',
 *         headers: { 'Content-Type': 'application/json' },
 *         body: JSON.stringify(credentials)
 *       });
 *
 *       const data = await response.json();
 *
 *       if (data.success) {
 *         // Store tokens
 *         localStorage.setItem('accessToken', data.accessToken);
 *         localStorage.setItem('refreshToken', data.refreshToken);
 *
 *         // Send to extension
 *         if (window.QuizSolverExtension) {
 *           await window.QuizSolverExtension.handleSuccessfulLogin(data);
 *         }
 *
 *         // Redirect
 *         navigate('/dashboard');
 *       }
 *     } catch (error) {
 *       console.error('Login failed:', error);
 *     }
 *   };
 *
 *   return (
 *     <form onSubmit={handleLogin}>
 *       // Your login form
 *     </form>
 *   );
 * }
 *
 * 4. Check Extension Installation:
 *
 * useEffect(() => {
 *   async function checkExtension() {
 *     const installed = await window.QuizSolverExtension?.isExtensionInstalled();
 *     if (installed) {
 *       console.log('Quiz Solver extension is installed');
 *     } else {
 *       console.log('Extension not installed - maybe show installation prompt');
 *     }
 *   }
 *
 *   checkExtension();
 * }, []);
 */
