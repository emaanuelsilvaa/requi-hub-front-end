export const TOKEN_KEY = "@requiHub-Token";
export const EMAIL_USER = "@requiHub-email-user";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (data: any) => {
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(EMAIL_USER, data.email);
  
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_USER);
};