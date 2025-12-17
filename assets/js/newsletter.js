// Newsletter subscription form handler
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('newsletter-email');
  const messageDiv = document.getElementById('newsletter-message');
  
  if (!form || !emailInput || !messageDiv) return;
  
  /**
   * Display a message to the user
   * @param {string} text - Message text to display
   * @param {boolean} isError - Whether this is an error message
   */
  function showMessage(text, isError) {
    messageDiv.textContent = text;
    messageDiv.style.color = isError ? '#ff6b6b' : '#00d3a9';
    messageDiv.setAttribute('role', isError ? 'alert' : 'status');
    messageDiv.setAttribute('aria-live', 'polite');
  }
  
  /**
   * Clear the message display
   */
  function clearMessage() {
    messageDiv.textContent = '';
    messageDiv.removeAttribute('role');
    messageDiv.removeAttribute('aria-live');
  }
  
  /**
   * Validate email format
   * @param {string} email - Email address to validate
   * @returns {boolean} Whether the email is valid
   */
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Clear message when user starts typing
  emailInput.addEventListener('input', clearMessage);
  
  // Handle form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    // Check if email is empty
    if (!email) {
      showMessage('Please enter your email address', true);
      emailInput.focus();
      return false;
    }
    
    // Validate email format
    if (!isValidEmail(email)) {
      showMessage('Please enter a valid email address', true);
      emailInput.focus();
      return false;
    }
    
    // Success message
    showMessage('Thank you for subscribing!', false);
    emailInput.value = '';
    
    return false;
  });
});
