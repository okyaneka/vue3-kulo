const script = document.createElement("script");
script.src = "https://apis.google.com/js/api.js";
script.async = true;
script.defer = true;
document.body.append(script);

function start() {
  const interval = setInterval(() => {
    try {
      if (window.gapi) {
        const gapi = window.gapi;
        gapi.load("client", () => {
          gapi.client.init({
            apiKey: import.meta.env.VITE_APP_G_KEY,
            clientId: import.meta.env.VITE_APP_G_CLIENT_ID,
            scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
            discoveryDocs: [
              "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
            ],
            // discoveryDocs: ["https://people.googleapis.com/$discovery/rest"],
          });
        });
      }
    } catch (error) {
      console.error(error);
    }
    if (window.gapi) {
      clearInterval(interval);
    }
  }, 250);
}

export { start };
