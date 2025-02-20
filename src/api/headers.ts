interface Options {
  isJson?: boolean;
  useAuth?: boolean;
  additionalHeaders?: { name: string; value: string }[];
}

export const generateHeaders = (options: Options = {}) => {
  const { isJson, useAuth, additionalHeaders } = options;

  const headers = new Headers();

  if (isJson) {
    headers.append('Content-Type', 'application/json');
  }

  if (useAuth) {
    headers.append(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token') ?? ''}`
    );
  }

  additionalHeaders?.forEach(({ name, value }) => headers.append(name, value));

  return headers;
};
