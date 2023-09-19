const tokenSuffix = '';
const XAccessToken = `authorization${tokenSuffix}`;

/* 存储token */
const storeToken = (response: Response) => {
  const { headers } = response;
  if (headers?.has('authorization')) {
      const token = headers?.get('authorization');
      if (token) {
          const tokenStored = localStorage.getItem(XAccessToken);
          if (!tokenStored || tokenStored !== token) {
            localStorage.setItem(XAccessToken, token);
          }
      }
  }
  // return response;
};

/* 获取token */
const getToken = () => {
  const auth = localStorage.getItem(XAccessToken);
  return `${auth || ''}`;
};

/* 清除token */
const clearToken = () => {
  localStorage.removeItem(XAccessToken)
};

export { getToken, storeToken, clearToken };
