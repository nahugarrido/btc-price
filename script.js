const API_URL = "https://api.coincap.io/v2";

const xhr = new XMLHttpRequest();

/* Variable cambiar color display de bitcoin */
let lastPrice = 0;

function onRequestHandler() {
  if (this.readyState === 4 && this.status === 200) {
    // 0 = UNSET, no se ha llamado al metodo open.
    // 1 = OPENED, se ha llamado al metodo open.
    // 2 = HEADERS_RECEIVED, se está llamando al metood send()
    // 3 =  LOADING, está cargando, es decir, está recibiendo la respuesta.
    // 4 = DONE, se ha completado la operación.
    const btc = JSON.parse(this.response);
    console.log(btc);

    const BTCPrice = document.querySelector("#btc-price");
    const BTCName = document.querySelector("#btc-name");
    const BTCEmoji = document.querySelector("#btc-emoji");

    let rounded = parseFloat(btc.data.priceUsd).toFixed(2);
    BTCPrice.innerText = `$${rounded}`;
    // BTCName.innerText = `${btc.data.name}`;
    /* Cambiar colores display */

    if (lastPrice < rounded) {
      BTCPrice.style.color = "green";
      BTCEmoji.innerText = "To the moon! 🚀";
    } else if (lastPrice > rounded) {
      BTCPrice.style.color = "red";
      BTCEmoji.innerText = "Red flag! 🚩";
    }
    lastPrice = rounded;

    console.log("rounded: ", rounded);
  }
}

xhr.addEventListener("load", onRequestHandler);
xhr.open("GET", `${API_URL}/assets/bitcoin`);
xhr.send();

setInterval(() => {
  onRequestHandler();
  xhr.open("GET", `${API_URL}/assets/bitcoin`);
  xhr.send();
}, 5000);
