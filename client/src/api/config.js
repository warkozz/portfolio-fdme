// Central API base configuration
// Usage: set REACT_APP_API_BASE in your environment for production,
// fallback defaults to the local path used in development with Apache/XAMPP.
// Examples:
//   REACT_APP_API_BASE=/server/api
//   REACT_APP_API_BASE=https://example.com/server/api

const API_BASE = process.env.REACT_APP_API_BASE || '/portfolio-fdme/server/api';

export default API_BASE;
