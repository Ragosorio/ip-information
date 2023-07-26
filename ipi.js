const OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "4c543c5543msh50b189c77d175edp129b4ajsne572e616645d",
    "X-RapidAPI-Host": "ip-reputation-geoip-and-detect-vpn.p.rapidapi.com",
  },
};

const ipAddressPattern = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
const $ = (r) => document.querySelector(r);
const $form = $("#form");
const $btn = $("#btn");
const $input = $("#input");
const $results = $("#results");

const fetchIpInfo = (ip) => {
  if (!ipAddressPattern.test(ip)) {
    $input.setAttribute("aria-invalid", "true");
    $input.value = "Dirección ip invalida";

    setTimeout(() => {
      $input.removeAttribute("aria-invalid", "true");
      $input.value = "";
    }, 3000);
    return;
  }

  // Agregar la dirección IP a los parámetros del objeto OPTIONS
 const url = `https://ip-reputation-geoip-and-detect-vpn.p.rapidapi.com/?ip=${ip}`

  // Usar la URL del objeto OPTIONS en la llamada fetch
  return fetch(url, OPTIONS)
    .then((res) => res.json()) // Parsear la respuesta a JSON
    .catch((err) => console.error(err));
};

$form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { value } = $input;
  if (!value) return;

  $btn.setAttribute("disabled", "");
  $btn.setAttribute("aria-busy", "true");

  const ipInfo = await fetchIpInfo(value);

  if (ipInfo) {
    $results.innerHTML = JSON.stringify(ipInfo, null, 2);
  }

  $btn.removeAttribute("disabled", "");
  $btn.removeAttribute("aria-busy", "true");
  if (ipAddressPattern.test(value)) {
    $input.setAttribute("placeholder", "Other IP?");
    $input.setAttribute("aria-invalid", "false");
  }

});