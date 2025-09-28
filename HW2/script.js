const SYMBOLS = [
  { name: "cherry", path: "assets/cherry.svg", multiplier: 2 },
  { name: "bar", path: "assets/bar.svg", multiplier: 3 },
  { name: "seven", path: "assets/seven.svg", multiplier: 5 },
];

const betInput = document.getElementById('betInput');
const placeBetBtn = document.getElementById('placeBetBtn');
const spinBtn = document.getElementById('spinBtn');
const spinBtn2 = document.getElementById('spinBtn2');
const resetBtn = document.getElementById('resetBtn');
const reels = [...document.querySelectorAll('#reels img')];
const betStatus = document.getElementById('betStatus');
const balanceEl = document.getElementById('balance');
const payoutEl = document.getElementById('payout');
const logList = document.getElementById('logList');
const themeToggle = document.getElementById('themeToggle');

let balance = 100;
let currentBet = 0;
let spinning = false;


function randomSymbol() {
  const i = Math.floor(Math.random() * SYMBOLS.length);
  return SYMBOLS[i];
}

function setReels(symbols) {
  symbols.forEach((sym, idx) => {
    reels[idx].src = sym.path;
    reels[idx].alt = sym.name;
  });
}

function evaluate(symbols) {
  const names = symbols.map(s => s.name);
  const counts = {};
  for (const n of names) {
    counts[n] = (counts[n] || 0) + 1;
  }

  let result = { type: 'loss', payout: 0, multiplier: 0 };
  for (const sym of SYMBOLS) { 
    const c = counts[sym.name] || 0;
    if (c === 3) {
      result = { type: 'win', payout: currentBet * sym.multiplier, multiplier: sym.multiplier };
    } else if (c === 2 && result.type !== 'win') {
      result = { type: 'even', payout: currentBet, multiplier: 1 };
    }
  }
  return result;
}

function log(message) {
  const li = document.createElement('li');
  li.textContent = message;
  logList.prepend(li);
}

placeBetBtn.addEventListener('click', () => {
  const amt = parseInt(betInput.value, 10);
  if (!amt || amt <= 0) {
    betStatus.textContent = 'Please enter a valid whole-dollar amount.';
    return;
  }
  if (amt > balance) {
    betStatus.textContent = 'You cannot bet more than your balance.';
    return;
  }
  currentBet = amt;
  betStatus.textContent = `Bet placed: $${currentBet}. Click Spin!`;
  spinBtn.disabled = false;
  spinBtn2.disabled = false;
});

betInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') placeBetBtn.click();
});

themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark', themeToggle.checked);
});

function doSpin() {
  if (spinning || currentBet <= 0) return;
  spinning = true;
  balance -= currentBet;
  balanceEl.textContent = balance;

  const steps = 12;
  let i = 0;
  const timer = setInterval(() => {
    const temp = [randomSymbol(), randomSymbol(), randomSymbol()];
    setReels(temp);
    if (++i >= steps) {
      clearInterval(timer);
      const finalSymbols = [randomSymbol(), randomSymbol(), randomSymbol()];
      setReels(finalSymbols);
      const result = evaluate(finalSymbols);
      const machine = document.querySelector('.machine');
      machine.classList.remove('win', 'loss');
      if (result.type === 'win') {
        balance += result.payout;
        payoutEl.textContent = result.payout;
        machine.classList.add('win');
        log(`WIN! ×${result.multiplier} — You won $${result.payout}.`);
      } else if (result.type === 'even') {
        balance += result.payout;
        payoutEl.textContent = 0;
        log('Two of a kind — bet returned.');
      } else {
        payoutEl.textContent = 0;
        machine.classList.add('loss');
        log('No match — you lost the bet.');
      }
      balanceEl.textContent = balance;
      spinning = false;
    }
  }, 80);
}

spinBtn.addEventListener('click', doSpin);
spinBtn2.addEventListener('click', doSpin);
resetBtn.addEventListener('click', () => {
  balance = 100;
  currentBet = 0;
  betInput.value = '';
  betStatus.textContent = 'Game reset. Place a new bet!';
  payoutEl.textContent = 0;
  balanceEl.textContent = balance;
  spinBtn.disabled = true;
  spinBtn2.disabled = true;
  document.querySelector('.machine').classList.remove('win','loss');
});

setReels([SYMBOLS[0], SYMBOLS[1], SYMBOLS[2]]);
