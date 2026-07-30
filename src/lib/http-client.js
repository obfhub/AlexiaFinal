/**
 * Lightweight fetch-based client compatible with the previous axios wrapper.
 * Provides `get` and `post` methods and returns either the response data
 * or rejects with an object { status, message, data, extra_data } to match
 * the previous error shape used across the app.
 */
export const createAxiosClient = (config = {}) => {
  const {
    baseURL = '/api',
    headers = {},
    token = null,
    interceptResponses = false,
  } = config;

  const buildHeaders = (extra = {}) => {
    return {
      'Content-Type': 'application/json',
      ...headers,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...extra,
    };
  };

  const parseResponse = async (resp) => {
    const text = await resp.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      data = text;
    }
    return { status: resp.status, data };
  };

  const request = async (method, url, body, opts = {}) => {
    const fullUrl = url.startsWith('http') ? url : `${baseURL}${url}`;
    try {
      const resp = await fetch(fullUrl, {
        method,
        headers: buildHeaders(opts.headers),
        body: body ? JSON.stringify(body) : undefined,
      });

      const { status, data } = await parseResponse(resp);

      if (!resp.ok) {
        const errorObj = {
          status,
          message: (data && data.message) || resp.statusText,
          data,
          extra_data: data?.extra_data,
        };
        return Promise.reject(errorObj);
      }

      return interceptResponses ? data : { status, data };
    } catch (err) {
      return Promise.reject({ status: null, message: err.message, data: null });
    }
  };

  return {
    get: (url, opts) => request('GET', url, null, opts),
    post: (url, body, opts) => request('POST', url, body, opts),
    // expose request for other HTTP verbs if needed
    request,
  };
};
