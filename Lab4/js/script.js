// Event Listeners
document.querySelector("#zip").addEventListener("input", displayCity);              
document.querySelector("#password").addEventListener("focus", displayPassword);
document.querySelector("#username").addEventListener("input", availability);
document.querySelector("#state").addEventListener("change", displayCounty);
document.querySelector("#submit").addEventListener("click", handleSubmit);

displayStates();

async function displayCity() {
  const zipCode = document.querySelector("#zip").value.trim();
  const cityEl = document.querySelector("#city");
  const latEl  = document.querySelector("#lat");
  const longEl = document.querySelector("#long");
  const zipMsg = document.querySelector("#zipMsg");

  zipMsg.textContent = "";
  zipMsg.className = "msg";

  if (zipCode.length < 5) {
    cityEl.textContent = "";
    latEl.textContent = "";
    longEl.textContent = "";
    return;
  }

  try {
    const url = "https://csumb.space/api/cityInfoAPI.php?zip=" + encodeURIComponent(zipCode);
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.city) {
      cityEl.textContent = data.city ?? "";
      latEl.textContent  = data.latitude ?? "";
      longEl.textContent = data.longitude ?? "";
    } else {
      cityEl.textContent = "";
      latEl.textContent  = "";
      longEl.textContent = "";
      zipMsg.textContent = "Zip code not found";
      zipMsg.className = "msg error";
    }
  } catch (e) {
    cityEl.textContent = "";
    latEl.textContent  = "";
    longEl.textContent = "";
    zipMsg.textContent = "Zip code not found";
    zipMsg.className = "msg error";
  }
}

async function displayStates() {
  const url = "https://csumb.space/api/allStatesAPI.php";
  const response = await fetch(url);
  const data = await response.json();

  const stateSel = document.querySelector("#state");
  stateSel.innerHTML = ""; 
  const ph = document.createElement("option");
  ph.value = "";
  ph.textContent = "Select a state…";
  stateSel.append(ph);

  for (const i of data) {
    const optionElement = document.createElement("option");
    optionElement.textContent = i.state;
    optionElement.value = i.usps;
    stateSel.append(optionElement);
  }
}

async function displayCounty() {
  const state = document.querySelector("#state").value;
  const countySel = document.querySelector("#county");
  countySel.innerHTML = ""; 

  if (!state) return;

  const url = "https://csumb.space/api/countyListAPI.php?state=" + encodeURIComponent(state);
  const response = await fetch(url);
  const data = await response.json();

  const ph = document.createElement("option");
  ph.value = "";
  ph.textContent = "Select a county…";
  countySel.append(ph);

  for (const i of data) {
    const optionElement = document.createElement("option");
    optionElement.textContent = i.county;
    optionElement.value = i.county;
    countySel.append(optionElement);
  }
}

async function displayPassword() {
  const url = "https://csumb.space/api/suggestedPassword.php?length=12";
  const response = await fetch(url);
  const data = await response.json();
  document.querySelector("#suggestedPassword").textContent = data.password;
}

async function availability() {
  const availabilityEl = document.querySelector("#availability");
  const usernameEl = document.querySelector("#username");
  const username = usernameEl.value.trim();

  if (username.length === 0) {
    availabilityEl.textContent = "";
    availabilityEl.className = "msg";
    usernameEl.classList.remove("is-valid","is-invalid");
    return;
  }
  if (username.length < 3) {
    availabilityEl.textContent = "Username must be at least 3 characters";
    availabilityEl.className = "msg error";
    usernameEl.classList.add("is-invalid");
    usernameEl.classList.remove("is-valid");
    return;
  }

  try {
    const url = "https://csumb.space/api/usernamesAPI.php?username=" + encodeURIComponent(username);
    const response = await fetch(url);
    const data = await response.json();

    if (!data.available) {
      availabilityEl.textContent = "Username is not available";
      availabilityEl.className = "msg error";
      usernameEl.classList.add("is-invalid");
      usernameEl.classList.remove("is-valid");
    } else {
      availabilityEl.textContent = "Username is available!";
      availabilityEl.className = "msg ok";
      usernameEl.classList.add("is-valid");
      usernameEl.classList.remove("is-invalid");
    }
  } catch (e) {
    availabilityEl.textContent = "Couldn’t verify username";
    availabilityEl.className = "msg warn";
    usernameEl.classList.remove("is-valid","is-invalid");
  }
}

function handleSubmit(evt){
  evt.preventDefault();

  const feedback = document.querySelector("#feedback");
  const user = document.querySelector("#username").value.trim();
  const pass = document.querySelector("#password").value;
  const pass2= document.querySelector("#password2").value;

  if (user.length < 3){
    feedback.textContent = "Username must be at least 3 characters.";
    feedback.style.color = "var(--error)";
    return;
  }

  if (pass.length < 6){
    feedback.textContent = "Password must be at least 6 characters.";
    feedback.style.color = "var(--error)";
    return;
  }

  if (pass !== pass2){
    feedback.textContent = "Passwords do not match.";
    feedback.style.color = "var(--error)";
    return;
  }

  feedback.textContent = "Congrats! You are all signed up!";
  feedback.style.color = "var(--ok)";
}
