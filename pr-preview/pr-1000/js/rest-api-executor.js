/**
 * REST API Executor - Handles interactive API requests from documentation
 * Supports GET requests with parameter substitution and response formatting
 */

class RESTAPIExecutor {
  constructor() {
    this.activeRequest = null;
    this.requestCache = new Map();
    this.init();
  }

  /**
   * Initialize the executor by setting up event listeners
   */
  init() {
    this.setupExecuteButtons();
    this.setupParameterInputs();
  }

  /**
   * Set up click handlers for execute buttons
   */
  setupExecuteButtons() {
    const buttons = document.querySelectorAll('[data-execute-request]');
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const operationId = button.dataset.operationId;
        this.executeRequest(operationId);
      });
    });
  }

  /**
   * Set up input listeners for real-time parameter updates using event delegation
   */
  setupParameterInputs() {
    document.addEventListener('change', (e) => {
      const panel = e.target.closest('[data-operation-panel]');
      if (panel) {
        if (e.target.matches('[data-parameter-input]') || e.target.matches('[data-server-select]')) {
          this.updatePreviewUrl(panel);
        }
      }
    });
    document.addEventListener('input', (e) => {
      if (e.target.matches('[data-parameter-input]')) {
        const panel = e.target.closest('[data-operation-panel]');
        if (panel) this.updatePreviewUrl(panel);
      }
    });
  }

  /**
   * Execute an API request for the given operation
   * @param {string} operationId - The ID of the operation to execute
   */
  async executeRequest(operationId) {
    const operationPanel = document.querySelector(`[data-operation-id="${operationId}"]`);
    if (!operationPanel) {
      console.error(`Operation panel not found for ${operationId}`);
      return;
    }

    try {
      // Get operation metadata from data attributes
      const operation = this.getOperationMetadata(operationPanel);
      
      // Build the complete URL with parameters
      const url = this.buildRequestUrl(operationPanel, operation);
      
      // Extract headers (including auth token if provided)
      const headers = this.buildRequestHeaders(operationPanel);

      // Show loading state
      this.setLoadingState(operationPanel, true);

      // Abort previous request if any
      if (this.activeRequest) {
        this.activeRequest.abort();
      }

      // Execute the request
      const controller = new AbortController();
      this.activeRequest = controller;

      const startTime = performance.now();
      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
        signal: controller.signal,
        mode: 'cors',
      });
      const endTime = performance.now();
      const duration = endTime - startTime;

      // Parse response
      const contentType = response.headers.get('content-type');
      let responseData;
      let responseText;

      if (contentType && contentType.includes('application/json')) {
        responseText = await response.text();
        try {
          responseData = JSON.parse(responseText);
        } catch (e) {
          responseData = null;
        }
      } else {
        responseText = await response.text();
        responseData = null;
      }

      // Display response
      this.displayResponse(operationPanel, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: responseData,
        text: responseText,
        duration: duration,
        url: url,
        success: response.ok,
      });

      this.setLoadingState(operationPanel, false);
    } catch (error) {
      if (error.name === 'AbortError') {
        this.setLoadingState(operationPanel, false);
        return;
      }
      
      try {
        this.displayError(operationPanel, error);
      } catch (displayError) {
        console.error('Error displaying error:', displayError);
      }
      this.setLoadingState(operationPanel, false);
    }
  }

  /**
   * Get operation metadata from the panel
   * @param {Element} operationPanel - The operation panel element
   * @returns {Object} Operation metadata
   */
  getOperationMetadata(operationPanel) {
    return {
      id: operationPanel.dataset.operationId,
      pathId: operationPanel.dataset.pathId,
      method: this.extractMethod(operationPanel),
      path: this.extractPath(operationPanel),
      servers: this.extractServers(operationPanel),
    };
  }

  /**
   * Extract HTTP method from panel
   * @param {Element} operationPanel - The operation panel element
   * @returns {string} HTTP method
   */
  extractMethod(operationPanel) {
    return operationPanel.dataset.operationMethod || 'get';
  }

  /**
   * Extract path from panel
   * @param {Element} operationPanel - The operation panel element
   * @returns {string} API path
   */
  extractPath(operationPanel) {
    const pathElement = operationPanel.querySelector('.rest-api-operation__path');
    return pathElement ? pathElement.textContent.trim() : '';
  }

  /**
   * Extract available servers from panel
   * @param {Element} operationPanel - The operation panel element
   * @returns {Array} Server URLs from the server selector dropdown
   */
  extractServers(operationPanel) {
    const serverSelect = operationPanel.querySelector('[data-server-select]');
    if (!serverSelect) return ['https://cloud.layer5.io'];

    const servers = [];
    const options = serverSelect.querySelectorAll('option');
    options.forEach(option => {
      const url = option.value;
      if (url && !servers.includes(url)) {
        servers.push(url);
      }
    });

    return servers.length > 0 ? servers : ['https://cloud.layer5.io'];
  }

  /**
   * Build the complete request URL with parameters
   * @param {Element} operationPanel - The operation panel element
   * @param {Object} operation - Operation metadata
   * @returns {string} Complete URL
   */
  buildRequestUrl(operationPanel, operation) {
    let path = operation.path;
    let baseUrl = this.getSelectedServer(operationPanel) || operation.servers[0];

    // Replace path parameters
    const pathParams = this.getParameterValues(operationPanel, 'path');
    Object.entries(pathParams).forEach(([name, value]) => {
      path = path.replace(`{${name}}`, encodeURIComponent(value));
    });

    // Build query string
    const queryParams = this.getParameterValues(operationPanel, 'query');
    const queryString = this.buildQueryString(queryParams);

    return `${baseUrl}${path}${queryString}`;
  }

  /**
   * Build query string from parameters
   * @param {Object} params - Query parameters
   * @returns {string} Query string
   */
  buildQueryString(params) {
    const entries = Object.entries(params)
      .filter(([, value]) => value !== null && value !== '')
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    
    return entries.length > 0 ? `?${entries.join('&')}` : '';
  }

  /**
   * Get parameter values from inputs
   * @param {Element} operationPanel - The operation panel element
   * @param {string} location - Parameter location (path, query, header, cookie)
   * @returns {Object} Parameter values
   */
  getParameterValues(operationPanel, location) {
    const params = {};
    const inputs = operationPanel.querySelectorAll(
      `[data-parameter-input][data-parameter-location="${location}"]`
    );

    inputs.forEach(input => {
      const name = input.dataset.parameterName;
      if (name) {
        params[name] = input.value;
      }
    });

    return params;
  }

  /**
   * Get the selected server URL
   * @param {Element} operationPanel - The operation panel element
   * @returns {string|null} Selected server URL
   */
  getSelectedServer(operationPanel) {
    const select = operationPanel.querySelector('[data-server-select]');
    return select ? select.value : null;
  }

  /**
   * Build request headers
   * @param {Element} operationPanel - The operation panel element
   * @returns {Object} Headers object
   */
  buildRequestHeaders(operationPanel) {
    const headers = {
      'Accept': 'application/json',
    };

    // Add custom headers if provided
    const headerInputs = this.getParameterValues(operationPanel, 'header');
    Object.assign(headers, headerInputs);

    // Add authorization token if provided
    const authInput = operationPanel.querySelector('[data-auth-token-input]');
    if (authInput && authInput.value) {
      headers['Authorization'] = `Bearer ${authInput.value}`;
    }

    return headers;
  }

  /**
   * Update the preview URL when parameters change
   * @param {Element} operationPanel - Optional specific panel to update. If not provided, updates all panels.
   */
  updatePreviewUrl(operationPanel) {
    const panels = operationPanel ? [operationPanel] : document.querySelectorAll('[data-operation-panel]');
    panels.forEach(panel => {
      const preview = panel.querySelector('[data-url-preview]');
      if (preview) {
        const operation = this.getOperationMetadata(panel);
        const url = this.buildRequestUrl(panel, operation);
        preview.textContent = url;
      }
    });
  }

  /**
   * Display API response in the UI
   * @param {Element} operationPanel - The operation panel element
   * @param {Object} response - Response data
   */
  displayResponse(operationPanel, response) {
    try {
      let responseSection = operationPanel.querySelector('.rest-api-response-display');
      
      if (!responseSection) {
        responseSection = this.createResponseSection(operationPanel);
      }

      // Update status
      const statusElement = responseSection.querySelector('[data-response-status]');
      if (statusElement) {
        statusElement.textContent = `${response.status} ${response.statusText}`;
        statusElement.className = `rest-api-response-status ${response.success ? 'success' : 'error'}`;
      }

      // Update duration
      const durationElement = responseSection.querySelector('[data-response-duration]');
      if (durationElement) {
        durationElement.textContent = `${response.duration.toFixed(0)}ms`;
      }

      // Update body
      const bodyElement = responseSection.querySelector('[data-response-body]');
      if (bodyElement) {
        if (response.data) {
          bodyElement.textContent = JSON.stringify(response.data, null, 2);
          bodyElement.classList.add('language-json');
        } else if (response.text) {
          bodyElement.textContent = response.text;
        } else {
          bodyElement.textContent = '(empty response)';
        }
        
        // Re-highlight if using a syntax highlighter
        if (window.hljs) {
          window.hljs.highlightElement(bodyElement);
        }
      }

      responseSection.style.display = 'block';
    } catch (err) {
      console.error('Error displaying response:', err);
    }
  }

  /**
   * Create the response display section
   * @param {Element} operationPanel - The operation panel element
   * @returns {Element} Response section
   */
  createResponseSection(operationPanel) {
    try {
      const section = document.createElement('section');
      section.className = 'rest-api-response-display';
      section.innerHTML = `
        <div class="rest-api-response-header">
          <h4>Response</h4>
          <div class="rest-api-response-meta">
            <span class="rest-api-response-status" data-response-status>200 OK</span>
            <span class="rest-api-response-duration" data-response-duration>0ms</span>
          </div>
        </div>
        <pre class="rest-api-response-body"><code data-response-body></code></pre>
      `;

      // Find insertion point (after request section or at end)
      const requestSection = operationPanel.querySelector('.rest-api-section--try') ||
                            operationPanel.lastElementChild;
      if (requestSection) {
        requestSection.after(section);
      } else {
        operationPanel.appendChild(section);
      }

      return section;
    } catch (err) {
      console.error('Error creating response section:', err);
      throw err;
    }
  }

  /**
   * Display an error message
   * @param {Element} operationPanel - The operation panel element
   * @param {Error} error - The error object
   */
  displayError(operationPanel, error) {
    const errorMessage = error.message || 'An error occurred while executing the request';
    const detailedMessage = this.getDetailedError(error);

    const errorSection = document.createElement('div');
    errorSection.className = 'rest-api-error-display';
    errorSection.innerHTML = `
      <div class="rest-api-error-header">
        <span class="rest-api-error-icon">⚠️</span>
        <h4>Error</h4>
      </div>
      <p class="rest-api-error-message">${this.escapeHtml(errorMessage)}</p>
      ${detailedMessage ? `<details class="rest-api-error-details">
        <summary>Details</summary>
        <pre>${this.escapeHtml(detailedMessage)}</pre>
      </details>` : ''}
    `;

    // Replace or create response section
    let responseSection = operationPanel.querySelector('.rest-api-response-display');
    if (responseSection) {
      responseSection.replaceWith(errorSection);
    } else {
      const requestSection = operationPanel.querySelector('.rest-api-section--try');
      if (requestSection) {
        requestSection.after(errorSection);
      } else {
        operationPanel.appendChild(errorSection);
      }
    }

    errorSection.classList.add('rest-api-error-display--active');
  }

  /**
   * Get detailed error information
   * @param {Error} error - The error object
   * @returns {string} Detailed error message
   */
  getDetailedError(error) {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      return 'CORS Error: The API server may not allow requests from this domain. Try using a CORS proxy or configuring CORS headers on the API server.';
    }

    if (error.response && error.response.statusText) {
      return `${error.response.status} ${error.response.statusText}`;
    }

    return error.stack || error.message;
  }

  /**
   * Set loading state
   * @param {Element} operationPanel - The operation panel element
   * @param {boolean} isLoading - Whether loading
   */
  setLoadingState(operationPanel, isLoading) {
    const button = operationPanel.querySelector('[data-execute-request]');
    if (button) {
      button.disabled = isLoading;
      button.classList.toggle('is-loading', isLoading);
      button.textContent = isLoading ? 'Executing...' : 'Execute Request';
    }
  }

  /**
   * Escape HTML to prevent XSS
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   */
  escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.restAPIExecutor = new RESTAPIExecutor();
  });
} else {
  window.restAPIExecutor = new RESTAPIExecutor();
}
