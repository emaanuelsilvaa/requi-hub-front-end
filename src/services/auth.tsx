export const TOKEN_KEY = "@requiHub-Token";
export const EMAIL_USER = "@requiHub-email-user";
export const ID_USER = "@requiHub-id-user";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUserId = () => localStorage.getItem(ID_USER);
export const getUseEmail = () => localStorage.getItem(EMAIL_USER);
export const login = (data: any) => {
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(EMAIL_USER, data.email);
  localStorage.setItem(ID_USER, data.userId);
  
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_USER);
  localStorage.removeItem(ID_USER);
};