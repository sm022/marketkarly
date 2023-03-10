
//데이터 가져와서 fetch 사용

export const defaultOptions = {
  method: "GET",
  mode: 'cors',
  body: null,
  cache: 'no-cache',
  credential: 'same-origin',
  redirect:'follow',
  referrerPolicy:'no-referrer',
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

parse.post = (url,body,options) =>{
  return parse({
    method:'POST',
    url,
    body:JSON.stringify(body),
    ...options
  })
}

parse.delete = (url,options) =>{
  return parse({
    method:'DELETE',
    url,
    ...options
  })
}
