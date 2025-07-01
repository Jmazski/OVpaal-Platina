# Bussie OV-Paal Passagiers

Een interactieve webapplicatie waarmee je het in- en uitstappen van passagiers in een fictieve OV-bus simuleert. De app bevat animaties, geluidseffecten en een achtergrondmuziekje voor een echte OV-ervaring.

## Features

- **Passagiersbeheer:** Instappen, uitstappen, OV opzeggen, automatisch nieuwe passagiers toevoegen tot maximaal 10.
- **Saldo en woonplaats:** Elke passagier heeft een eigen saldo, woonplaats en telefoonnummer.
- **Nieuw label:** Nieuwe passagiers krijgen het label “Nieuw” totdat ze voor het eerst uitstappen.
- **Saldo op = verwijderd:** Passagiers met €0 worden automatisch uit de bus verwijderd.
- **OV opzeggen:** Handmatig een passagier verwijderen via OV opzeggen.
- **Meldingen:** Meldingen zoals “Saldo op” en “Bus is vol!” worden getoond.
- **Herstart:** Als er niemand meer is, kun je de app volledig herstarten.
- **Video-animaties:**
  - **bus.mp4** (rechtsonder, speelt altijd in een loop behalve tijdens instappen)
  - **Instap.mp4** (vervangt de busvideo tijdelijk bij instappen)
- **Geluidsbeleving:**
  - **Muz.mp3**: Achtergrondmuziek, begint bij de eerste instap en blijft spelen.
  - **Beep.mp3**: Instap-geluid, klinkt direct bij elke instapactie.
- **Responsief design:** Ziet er goed uit op desktop en mobiel.

## Bestanden en structuur

```
.
├── index.html
├── ovpaal.js
└── Effects/
    ├── bus.mp4
    ├── Instap.mp4
    ├── Muz.mp3
    └── Beep.mp3
```

- **index.html:** UI, video/audio-elementen en layout.
- **ovpaal.js:** Alles qua logica, animaties, geluiden en interactie.
- **Effects/**: Zet hier al je video- en geluidsbestanden.

## Installatie & Gebruik

1. Zet alle bestanden in dezelfde map, met de map `Effects` erbij.
2. Open `index.html` in je browser.
3. Geniet van de interactieve OV-bus!

## Demo

![Screenshot](screenshot.png)

## Credits

Gemaakt door [Jmazski] met hulp van GitHub Copilot.  
Voor demo/doeleinde en plezier!

---

Veel plezier! 🚍🔊🎶
