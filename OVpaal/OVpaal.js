// ----------- Data & helpers (Dutch) -----------
const plaatsen = ["Roermond", "Koningsbosch", "Reewoude", "Rotterdam"];
const origineleNamen = [
    "Ceylan", "Jonas", "Jan", "MX", "Pico",
    "Boyfriend", "Girlfriend", "Darnell", "Sharugina", "Roan"
];
const nieuweNamenLijst = [
    "Raymond", "Luuk", "Kyano", "Thijs", "Nando",
    "Elias", "Maks", "Mr L", "Ruhican", "Stan smith"
];
let nieuweNamenQueue = [...nieuweNamenLijst];

function randomTelefoon() {
    return "06" + Math.floor(10000000 + Math.random() * 90000000);
}
function randomSaldo() {
    return Math.floor(69 + Math.random() * (420 - 68));
}
function randomPlaats() {
    return plaatsen[Math.floor(Math.random() * plaatsen.length)];
}
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function maakPassagier(naam, isNieuw) {
    return {
        naam: naam,
        saldo: randomSaldo(),
        plaats: randomPlaats(),
        telefoon: randomTelefoon(),
        isNieuw: !!isNieuw,
        ooitUitgestapt: false
    };
}

let allePassagiers = origineleNamen.map(naam => maakPassagier(naam, false));
let wachtlijst = [];
let bus = [];

function resetWachtlijst() {
    wachtlijst = allePassagiers.filter(p => !bus.includes(p));
    shuffle(wachtlijst);
}

// ----------- UI Elements -----------
const addBtn = document.getElementById("addBtn");
const exitBtn = document.getElementById("exitBtn");
const outputDiv = document.getElementById("output");
const listDiv = document.getElementById("list");
const actionPassengerDiv = document.getElementById("actionPassenger");
const showListBtn = document.getElementById("showListBtn");
const saldoMeldingDiv = document.getElementById("saldoMelding");
const busVideo = document.getElementById("busVideo");
const instapVideo = document.getElementById("instapVideo");
const busVideoContainer = document.getElementById("busVideoContainer");
const bgMusic = document.getElementById("bgMusic");
const beepSound = document.getElementById("beepSound");
let musicStarted = false;

// ----------- UI Functions -----------
function renderPassengerList() {
    if (bus.length === 0) {
        listDiv.innerHTML = "<em>Niemand in de bus.</em>";
        return;
    }
    listDiv.innerHTML = bus.map((p) =>
        `<li>${p.naam}${p.isNieuw && !p.ooitUitgestapt ? ' <span style="font-size:0.85em;color:#fff;background:#b0885a;padding:2px 9px;border-radius:10px;margin-left:6px;">Nieuw</span>' : ''}</li>`
    ).join("");
}

function showActionPassenger(persoon, type) {
    if (!persoon) {
        actionPassengerDiv.innerHTML = "";
        return;
    }
    let naamTekst = persoon.naam;
    if (persoon.isNieuw && !persoon.ooitUitgestapt) {
        naamTekst += ' <span style="font-size:0.85em;color:#fff;background:#b0885a;padding:2px 9px;border-radius:10px;margin-left:6px;">Nieuw</span>';
    }
    if (type === "in") {
        actionPassengerDiv.innerHTML = `
            <span style="color:#1e90ff;">${naamTekst}</span> is ingestapt!<br><br>
            <strong>Saldo:</strong> €${persoon.saldo}<br>
            <strong>Woonplaats:</strong> ${persoon.plaats}<br>
            <strong>Telefoon:</strong> ${persoon.telefoon}
        `;
    } else if (type === "uit") {
        actionPassengerDiv.innerHTML = `
            <span style="color:#e53935;">${naamTekst}</span> is uitgestapt.<br><br>
            <strong>Nieuw saldo:</strong> €${persoon.saldo}<br>
            <strong>Woonplaats:</strong> ${persoon.plaats}<br>
            <strong>Telefoon:</strong> ${persoon.telefoon}
        `;
    }
}

function showPassengerTable() {
    if (bus.length === 0) {
        outputDiv.innerHTML = "";
        return;
    }
    let html = `<table>
        <tr>
            <th>#</th>
            <th>Naam</th>
            <th>Saldo</th>
            <th>Woonplaats</th>
            <th>Telefoon</th>
        </tr>`;
    bus.forEach((p, i) => {
        html += `<tr>
            <td>${i + 1}</td>
            <td>${p.naam}${p.isNieuw && !p.ooitUitgestapt ? ' <span style="font-size:0.85em;color:#fff;background:#b0885a;padding:2px 9px;border-radius:10px;margin-left:6px;">Nieuw</span>' : ''}</td>
            <td>€${p.saldo}</td>
            <td>${p.plaats}</td>
            <td>${p.telefoon}</td>
        </tr>`;
    });
    html += "</table>";
    outputDiv.innerHTML = html;
}

function showSaldoMelding(naam) {
    if (!saldoMeldingDiv) return;
    saldoMeldingDiv.textContent = `${naam} heeft geen geld meer.`;
    saldoMeldingDiv.style.display = "block";
    setTimeout(() => {
        saldoMeldingDiv.style.display = "none";
    }, 2500);
}

// ----------- Video Switch Logic -----------
function setAllButtonsDisabled(state) {
    addBtn.disabled = state;
    exitBtn.disabled = state;
    if (showListBtn) showListBtn.disabled = state;
    const ovOpzegBtn = document.getElementById("ovOpzegBtn");
    if (ovOpzegBtn) ovOpzegBtn.disabled = state;
}

function playInstapVideo(callback) {
    busVideo.style.display = "none";
    instapVideo.style.display = "block";
    instapVideo.currentTime = 0;
    instapVideo.muted = false;
    instapVideo.play();
    setAllButtonsDisabled(true);
    instapVideo.onended = () => {
        instapVideo.style.display = "none";
        busVideo.style.display = "block";
        busVideo.currentTime = 0;
        busVideo.play();
        setAllButtonsDisabled(false);
        if (callback) callback();
    };
}

// ----------- Event handlers -----------
addBtn.addEventListener("click", () => {
    // Start muziek bij de eerste instap!
    if (!musicStarted && bus.length === 0 && bgMusic) {
        bgMusic.volume = 0.45; // Optioneel iets zachter
        bgMusic.play();
        musicStarted = true;
    }
    // Speel beep-effect direct bij instappen
    if (beepSound) {
        beepSound.currentTime = 0;
        beepSound.play();
    }
    playInstapVideo(() => {
        if (wachtlijst.length > 0) {
            const persoon = wachtlijst.shift();
            bus.push(persoon);
            showActionPassenger(persoon, "in");
            renderPassengerList();
            showPassengerTable();
            if (wachtlijst.length === 0) {
                addBtn.disabled = true;
                if (allePassagiers.length === 10) {
                    addBtn.innerText = "Bus is vol!";
                } else {
                    addBtn.innerText = "Er zijn niet meer mensen om in te stappen";
                }
            }
            if (bus.length > 0) {
                exitBtn.disabled = false;
            }
        }
    });
});

exitBtn.addEventListener("click", () => {
    if (bus.length === 0) {
        actionPassengerDiv.innerHTML = "<em>Niemand kan uitstappen!</em>";
        return;
    }
    const index = Math.floor(Math.random() * bus.length);
    const persoon = bus[index];
    persoon.saldo = Math.max(0, persoon.saldo - 3);
    if (persoon.isNieuw) {
        persoon.ooitUitgestapt = true;
    }
    bus.splice(index, 1);

    if (persoon.saldo === 0) {
        showSaldoMelding(persoon.naam);
        allePassagiers = allePassagiers.filter(q => q !== persoon);
        bus = bus.filter(q => q !== persoon);
        wachtlijst = wachtlijst.filter(q => q !== persoon);
        if (allePassagiers.length < 10 && nieuweNamenQueue.length > 0) {
            const nieuweNaam = nieuweNamenQueue.shift();
            const nieuwePassagier = maakPassagier(nieuweNaam, true);
            allePassagiers.push(nieuwePassagier);
            wachtlijst.push(nieuwePassagier);
        }
        renderRemoveModal();
        renderPassengerList();
        showPassengerTable();
        if (bus.length === 0) exitBtn.disabled = true;
        if (addBtn.disabled && wachtlijst.length > 0) {
            addBtn.disabled = false;
            addBtn.innerText = "Instappen";
        }
        checkIedereenRijbewijs();
        showActionPassenger(persoon, "uit");
        return;
    }

    showActionPassenger(persoon, "uit");
    renderPassengerList();
    showPassengerTable();
    wachtlijst.push(persoon);

    if (bus.length === 0) {
        exitBtn.disabled = true;
    }
    if (addBtn.disabled && wachtlijst.length > 0) {
        addBtn.disabled = false;
        addBtn.innerText = "Instappen";
    }
});

// ----------- Initialisatie -----------
resetWachtlijst();
renderPassengerList();
showActionPassenger();
showPassengerTable();
exitBtn.disabled = true;

document.addEventListener("DOMContentLoaded", function () {
    let lijstZichtbaar = false;
    if (showListBtn && outputDiv) {
        showListBtn.addEventListener('click', () => {
            lijstZichtbaar = !lijstZichtbaar;
            if (lijstZichtbaar) {
                outputDiv.classList.add('visible');
                showListBtn.innerText = 'Verberg Lijst';
            } else {
                outputDiv.classList.remove('visible');
                showListBtn.innerText = 'De Lijst';
            }
        });
        outputDiv.classList.remove('visible');
        showListBtn.innerText = 'De Lijst';
    }
});

// ----------- OV opzeggen functionaliteit -----------
const ovOpzegBtn = document.getElementById("ovOpzegBtn");
const removeModal = document.getElementById("removeModal");
const modalNames = document.getElementById("modalNames");
const closeModalBtn = document.getElementById("closeModalBtn");
const rijbewijsModal = document.getElementById("rijbewijsModal");
const herstartBtn = document.getElementById("herstartBtn");

function checkIedereenRijbewijs() {
    if (allePassagiers.length === 0) {
        rijbewijsModal.classList.add("active");
    }
}

if (herstartBtn) {
    herstartBtn.addEventListener("click", () => {
        location.reload();
    });
}

function renderRemoveModal() {
    modalNames.innerHTML = "";
    allePassagiers.forEach((p) => {
        const btn = document.createElement("button");
        btn.textContent = p.naam + (p.isNieuw && !p.ooitUitgestapt ? ' (Nieuw)' : '');
        btn.className = "removeNameBtn";
        btn.onclick = () => {
            allePassagiers = allePassagiers.filter(q => q !== p);
            bus = bus.filter(q => q !== p);
            wachtlijst = wachtlijst.filter(q => q !== p);

            if (allePassagiers.length < 10 && nieuweNamenQueue.length > 0) {
                const nieuweNaam = nieuweNamenQueue.shift();
                const nieuwePassagier = maakPassagier(nieuweNaam, true);
                allePassagiers.push(nieuwePassagier);
                wachtlijst.push(nieuwePassagier);
            }

            renderRemoveModal();
            renderPassengerList();
            showPassengerTable();
            if (bus.length === 0) exitBtn.disabled = true;
            if (addBtn.disabled && wachtlijst.length > 0) {
                addBtn.disabled = false;
                addBtn.innerText = "Instappen";
            }
            checkIedereenRijbewijs();
        };
        modalNames.appendChild(btn);
    });
    if (allePassagiers.length === 0) {
        modalNames.innerHTML = "<em>Geen passagiers meer over!</em>";
    }
}

if (ovOpzegBtn && removeModal && modalNames && closeModalBtn) {
    ovOpzegBtn.addEventListener("click", () => {
        renderRemoveModal();
        removeModal.classList.add("active");
    });
    closeModalBtn.addEventListener("click", () => {
        removeModal.classList.remove("active");
    });
    window.addEventListener("keydown", (e) => {
        if (removeModal.classList.contains("active") && e.key === "Escape") {
            removeModal.classList.remove("active");
        }
    });
    removeModal.addEventListener("click", function (e) {
        if (e.target === removeModal) {
            removeModal.classList.remove("active");
        }
    });
}