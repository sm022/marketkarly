
//데이터 가져와서 fetch 사용

export const defaultOptions = {
  method: "GET",
  mode: "cors",
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
};

export const parse = async (options = {}) => {
  const { url, ...restOptions } = {
    ...defaultOptions,
    ...options,
  };

  let response = await fetch(url, restOptions);

  if (response.ok) {
    response.data = await response.json();
  }

  return response;
};

parse.get = async (url, options) => {
  return parse({
    url,
    ...options,
  });
};