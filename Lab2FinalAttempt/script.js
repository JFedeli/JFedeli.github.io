
(function(){
  var maxAttempts = 7;
  var secret = Math.floor(Math.random()*99) + 1;
  var attempts = 0;
  var finished = false;
  var wins = 0;
  var losses = 0;

  var guessInput = document.getElementById('guess');
  var guessBtn = document.getElementById('guessBtn');
  var resetBtn = document.getElementById('resetBtn');
  var error = document.getElementById('error');
  var result = document.getElementById('result');
  var attemptsEl = document.getElementById('attempts');
  var past = document.getElementById('past');
  var winsEl = document.getElementById('wins');
  var lossesEl = document.getElementById('losses');

  function addPast(n){
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(n));
    past.appendChild(li);
  }

  function endGame(type){
    finished = true;
    guessBtn.disabled = true;
    guessInput.disabled = true;
    resetBtn.className = '';
    if(type === 'win'){
      wins = wins + 1;
      result.innerHTML = 'Congratulations! You guessed it!';
      result.style.color = '#16a34a';
    }else{
      losses = losses + 1;
      result.innerHTML = 'You Lost — the number was ' + secret + '.';
      result.style.color = '#ef4444';
    }
    winsEl.innerHTML = '' + wins;
    lossesEl.innerHTML = '' + losses;
  }

  guessBtn.addEventListener('click', function(){
    if(finished){ return; }

    var value = guessInput.value;
    var n = parseInt(value, 10);

    if(isNaN(n)){
      error.innerHTML = 'Please enter a number.';
      return;
    }
    if(n < 1 || n > 99){
      error.innerHTML = 'Number must be between 1 and 99.';
      return;
    }
    error.innerHTML = '';

    attempts = attempts + 1;
    attemptsEl.innerHTML = '' + attempts;
    addPast(n);

    if(n === secret){
      endGame('win');
      return;
    }

    if(n < secret){
      result.innerHTML = 'Too low.';
      result.style.color = 'white';
    }else if(n > secret){
      result.innerHTML = 'Too high.';
      result.style.color = 'white';
    }

    if(attempts >= maxAttempts){
      endGame('lose'); 
    }
  });

  resetBtn.addEventListener('click', function(){
    secret = Math.floor(Math.random()*99) + 1;
    attempts = 0;
    finished = false;
    attemptsEl.innerHTML = '0';
    result.innerHTML = '—';
    result.style.color = 'white';
    past.innerHTML = '';
    guessInput.value = '';
    guessInput.disabled = false;
    guessBtn.disabled = false;
    resetBtn.className = 'hidden';
    error.innerHTML = '';
  });
})();