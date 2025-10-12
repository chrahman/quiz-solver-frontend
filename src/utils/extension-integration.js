/**
 * Extension Integration Code for Quiz Solver Extension Authentication
 *
 * This code integrates with the Quiz Solver Chrome extension
 * to send authentication tokens and sync login state.
 *
 */

// Configuration - Update this with your actual extension ID
const EXTENSION_ID = process.env.NEXT_PUBLIC_EXTENSION_ID || "ajdgfcjkghfponpmbikgecgdelokekae";

/**
 * Check if the extension is installed
 * @returns {Promise<boolean>} True if extension is installed and responsive
 */
export async function isExtensionInstalled() {
  return new Promise((resolve) => {
    try {
      // Check if chrome runtime is available
      if (typeof chrome === "undefined" || !chrome.runtime) {
        resolve(false);
        return;
      }

      // @ts-expect-error - Chrome runtime is available in browser
      chrome.runtime.sendMessage(EXTENSION_ID, { type: "ping" }, (response) => {
        if (chrome.runtime.lastError) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    } catch (error) {
      resolve(false);
    }
  });
}

/**
 * Send authentication token to the extension
 * @param {string} accessToken - JWT access token
 * @param {Object} user - User data
 * @returns {Promise<boolean>} True if successful
 */
export async function sendAuthToExtension(accessToken, user) {
  if (!accessToken || !user) {
    return false;
  }

  try {
    // Check if extension is installed first
    const extensionInstalled = await isExtensionInstalled();
    if (!extensionInstalled) {
      return false;
    }

    return new Promise((resolve) => {
      // @ts-expect-error - Chrome runtime is available in browser
      chrome.runtime.sendMessage(
        EXTENSION_ID,
        {
          type: "auth",
          accessToken: accessToken,
          user: user,
        },
        (response) => {
          if (chrome.runtime.lastError) {
            resolve(false);
          } else if (response && response.success) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });
  } catch (error) {
    return false;
  }
}

/**
 * Send logout message to the extension
 * @returns {Promise<boolean>} True if successful
 */
export async function sendLogoutToExtension() {
  try {
    // Check if extension is installed first
    const extensionInstalled = await isExtensionInstalled();
    if (!extensionInstalled) {
      return false;
    }

    return new Promise((resolve) => {
      // @ts-expect-error - Chrome runtime is available in browser
      chrome.runtime.sendMessage(EXTENSION_ID, { type: "logout" }, (response) => {
        if (chrome.runtime.lastError) {
          resolve(false);
        } else if (response && response.success) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  } catch (error) {
    return false;
  }
}

/**
 * Handle successful login - call this after your login API succeeds
 * @param {Object} loginResponse - Response from your login API
 * @param {string} loginResponse.accessToken - JWT access token
 * @param {Object} loginResponse.user - User data
 */
export async function handleSuccessfulLogin(loginResponse) {
  const { accessToken, user } = loginResponse;

  if (accessToken && user) {
    await sendAuthToExtension(accessToken, user);
  }
}

/**
 * Handle logout - call this when user logs out
 */
export async function handleLogout() {
  await sendLogoutToExtension();
}
