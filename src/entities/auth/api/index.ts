export const handleLogin = () => {
  const clientId = "535684";
  const redirectUri = encodeURIComponent("https://localhost/callback");
  const state = "Ert2q5Z";
  const loginUrl = `https://edu.donstu.ru/WebApp/#/Authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;

  window.open(loginUrl, "_blank", "width=500,height=600");
};
