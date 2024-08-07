import axios from "axios";
export const handleFetch = async (url, options = {}) => {
  console.log("Fetching choies...");
  const completeUrl = `http://127.0.0.1:8000${url}`;
  try {
    const response = await axios({
      url: completeUrl,
      method: options.method || "GET",
      headers: options.headers || {},
    });
    console.log("getChoicesg response: " + response.data);
    return response.data;
  } catch (error) {
    // Extract the error message from the response if available
    const errors = error.response.data;
    const keys = Object.values(errors);
    let finalErrors = keys.flat();
    const errorMessage = finalErrors.join("\n");
    throw new Error(errorMessage);
  }
};

export const handleCreate = async (url, options = {}) => {
  const completeUrl = `http://127.0.0.1:8000${url}`;
  try {
    const response = await axios({
      url: completeUrl,
      method: options.method || "GET",
      headers: options.headers || {},
      data: options.body || {},
    });
    console.log("add choice response: " + response.data);
    return response.data;
  } catch (error) {
    // Check if the error response exists
    if (error.response && error.response.data) {
      const errors = error.response.data;

      // Handle non-field errors
      if (errors.non_field_errors) {
        const nonFieldErrors = errors.non_field_errors.non_field_errors;
        if (nonFieldErrors && Array.isArray(nonFieldErrors)) {
          throw new Error(nonFieldErrors.join("\n"));
        }
      }

      // Handle other specific errors like authentication
      if (errors.detail) {
        throw new Error(errors.detail);
      }

      // Handle other field-specific errors
      const fieldErrors = Object.keys(errors)
        .filter((key) => key !== "non_field_errors")
        .map((key) => errors[key])
        .flat();

      if (fieldErrors.length > 0) {
        throw new Error(fieldErrors.join("\n"));
      }

      // General fallback for unexpected error structures
      throw new Error("An unexpected error occurred. Please try again.");
    } else {
      // Handle generic network or unexpected errors
      throw new Error("Network error or server did not respond.");
    }
  }
};

// Utility function to handle fetch requests
export const handleUpdate = async (url, options = {}) => {
  const completeUrl = `http://127.0.0.1:8000${url}`;
  try {
    const response = await axios({
      url: completeUrl,
      method: options.method || "GET",
      headers: options.headers || {},
      data: options.body || {},
    });
    console.log("updateChoice response: " + response.data);
    return response.data;
  } catch (error) {
    // Check if the error response exists
    if (error.response && error.response.data) {
      const errors = error.response.data;

      // Handle non-field errors
      if (errors.non_field_errors) {
        const nonFieldErrors = errors.non_field_errors.non_field_errors;
        if (nonFieldErrors && Array.isArray(nonFieldErrors)) {
          throw new Error(nonFieldErrors.join("\n"));
        }
      }

      // Handle other specific errors like authentication
      if (errors.detail) {
        throw new Error(errors.detail);
      }

      // Handle other field-specific errors
      const fieldErrors = Object.keys(errors)
        .filter((key) => key !== "non_field_errors")
        .map((key) => errors[key])
        .flat();

      if (fieldErrors.length > 0) {
        throw new Error(fieldErrors.join("\n"));
      }

      // General fallback for unexpected error structures
      throw new Error("An unexpected error occurred. Please try again.");
    } else {
      // Handle generic network or unexpected errors
      throw new Error("Network error or server did not respond.");
    }
  }
};

export const handleDelete = async (url, options = {}) => {
  const completeUrl = `http://127.0.0.1:8000${url}`;
  try {
    const response = await axios({
      url: completeUrl,
      method: options.method || "DELETE",
      headers: options.headers || {},
    });
    return response.data;
  } catch (error) {
    // Check if the error response exists
    if (error.response && error.response.data) {
      const errors = error.response.data;

      // Handle specific errors like authentication
      if (errors.detail) {
        throw new Error(errors.detail);
      }
      // General fallback for unexpected error structures
      throw new Error("An unexpected error occurred. Please try again.");
    } else {
      // Handle generic network or unexpected errors
      throw new Error("Network error or server did not respond.");
    }
  }
};
