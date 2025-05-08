function calcolaTasse() {
  const reddito = parseFloat(document.getElementById('reddito').value);
  let tasse = 0;

  if (isNaN(reddito) || reddito <= 0) {
    document.getElementById('risultato').innerText = "Inserisci un importo valido.";
    return;
  }

  if (reddito <= 15000) {
    tasse = reddito * 0.23;
  } else if (reddito <= 28000) {
    tasse = 15000 * 0.23 + (reddito - 15000) * 0.25;
  } else if (reddito <= 50000) {
    tasse = 15000 * 0.23 + (28000 - 15000) * 0.25 + (reddito - 28000) * 0.35;
  } else {
    tasse = 15000 * 0.23 + (28000 - 15000) * 0.25 + (50000 - 28000) * 0.35 + (reddito - 50000) * 0.43;
  }

  const netto = reddito - tasse;
  const aliquotaMedia = (tasse / reddito) * 100;

  document.getElementById('risultato').innerHTML = `
    <p><strong>Tasse da pagare:</strong> €${tasse.toFixed(2)}</p>
    <p><strong>Reddito netto:</strong> €${netto.toFixed(2)}</p>
  `;

  document.getElementById('val-reddito').innerText = `€${reddito.toFixed(2)}`;
  document.getElementById('val-tasse').innerText = `€${tasse.toFixed(2)}`;
  document.getElementById('val-aliquota').innerText = `${aliquotaMedia.toFixed(2)}%`;
  document.getElementById('val-netto').innerText = `€${netto.toFixed(2)}`;
}

document.getElementById('reddito').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    calcolaTasse();
  }
});

let tassoCorrente = null;

async function aggiornaTassoCambio() {
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/EUR');
    const data = await response.json();
    tassoCorrente = data.rates.USD;
    document.getElementById('eur-usd-rate').innerText = `Tasso attuale: 1 EUR = ${tassoCorrente.toFixed(4)} USD`;
  } catch (error) {
    console.error('Errore nel recupero del tasso di cambio:', error);
    document.getElementById('eur-usd-rate').innerText = 'Errore nel caricamento tasso.';
  }
}

function convertiValuta() {
  const importo = parseFloat(document.getElementById('valutaInput').value);
  const direzione = document.getElementById('conversione').value;

  if (isNaN(importo) || importo <= 0 || tassoCorrente === null) {
    document.getElementById('risultatoConversione').innerText = "Inserisci un importo valido.";
    return;
  }

  let risultato = 0;
  if (direzione === 'eurToUsd') {
    risultato = importo * tassoCorrente;
    document.getElementById('risultatoConversione').innerText = `Risultato: $${risultato.toFixed(2)}`;
  } else if (direzione === 'usdToEur') {
    risultato = importo / tassoCorrente;
    document.getElementById('risultatoConversione').innerText = `Risultato: €${risultato.toFixed(2)}`;
  } else if (direzione === 'eurToGbp') {
    risultato = importo * 0.75; // Tasso ipotetico
    document.getElementById('risultatoConversione').innerText = `Risultato: £${risultato.toFixed(2)}`;
  } else if (direzione === 'gbpToEur') {
    risultato = importo / 0.75;
    document.getElementById('risultatoConversione').innerText = `Risultato: €${risultato.toFixed(2)}`;
  } else if (direzione === 'eurToJpy') {
    risultato = importo * 130; // Tasso ipotetico
    document.getElementById('risultatoConversione').innerText = `Risultato: ¥${risultato.toFixed(2)}`;
  } else if (direzione === 'jpyToEur') {
    risultato = importo / 130;
    document.getElementById('risultatoConversione').innerText = `Risultato: €${risultato.toFixed(2)}`;
  } else if (direzione === 'eurToChf') {
    risultato = importo * 0.94; // Tasso ipotetico
    document.getElementById('risultatoConversione').innerText = `Risultato: CHF${risultato.toFixed(2)}`;
  } else if (direzione === 'chfToEur') {
    risultato = importo / 0.94;
    document.getElementById('risultatoConversione').innerText = `Risultato: €${risultato.toFixed(2)}`;
  } else if (direzione === 'eurToCad') {
    risultato = importo * 1.35; // Tasso ipotetico
    document.getElementById('risultatoConversione').innerText = `Risultato: CAD${risultato.toFixed(2)}`;
  } else if (direzione === 'cadToEur') {
    risultato = importo / 1.35;
    document.getElementById('risultatoConversione').innerText = `Risultato: €${risultato.toFixed(2)}`;
  }
}

document.getElementById('valutaInput').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    convertiValuta();
  }
});

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const darkModeButton = document.querySelector('.dark-mode-toggle');
  
  if (document.body.classList.contains('dark-mode')) {
    darkModeButton.innerHTML = '☀️';
    darkModeButton.setAttribute('title', 'Passa alla modalità chiara');
  } else {
    darkModeButton.innerHTML = '🌙';
    darkModeButton.setAttribute('title', 'Passa alla modalità scura');
  }
}

aggiornaTassoCambio();