let currentScreen = 1;
const messages = [
  "My dearest love,",
  "Happy 21st birthday! 🎉",
  "You are the sunshine in my darkest days,",
  "The peace in my chaos,",
  "And the reason I believe in soulmates.",
  "One day closer to forever.",
  "I love you endlessly. ❤️",
  "Yours forever."
];

const alphabetPraises = {
    'A': 'Adorable', 'B': 'Brightest Star', 'C': 'Charming', 'D': 'Dazzling', 'E': 'Elegant',
    'F': 'Fabulous', 'G': 'Gorgeous', 'H': 'Heavenly', 'I': 'Incredible', 'J': 'Joyful',
    'K': 'Kindest Soul', 'L': 'Lovely', 'M': 'Magnificent', 'N': 'Noble Heart', 'O': 'Outstanding',
    'P': 'Precious', 'Q': 'Queen of my Heart', 'R': 'Radiant Smile', 'S': 'Sweetest', 'T': 'Treasure',
    'U': 'Unique Gem', 'V': 'Vibrant Spirit', 'W': 'Wonderful', 'X': 'Xtra Special',
    'Y': 'Youthful Glow', 'Z': 'Zest for Life'
};

let sparklingHeartsInterval;
let praiseSequenceTimeout;

function startAudioAndNextScreen() {
  const audio = document.getElementById('bgMusic');
  
  // Start the audio when the user clicks the button
  audio.play().catch(error => {
    console.warn("Background music autoplay was blocked.", error);
  });
  
  // Move to the next screen after starting the audio
  nextScreen();
}

function nextScreen() {
  const currentScreenElement = document.getElementById(`screen${currentScreen}`);
  if (currentScreenElement) {
    currentScreenElement.classList.remove("active");
    if (currentScreen === 1 || currentScreen === 2) {
      stopHopping21Animation(currentScreenElement);
    } else if (currentScreen === 3) {
      clearSubtleBackgroundEffects(currentScreenElement);
    } else if (currentScreen === 4) {
      stopSparklingHearts();
    } else if (currentScreen === 5) {
      clearTimeout(praiseSequenceTimeout);
      const letterDisplay = document.getElementById('praise-letter-display');
      const meaningDisplay = document.getElementById('praise-meaning-display');
      const titleDisplay = document.getElementById('praiseScreenTitle');
      if (letterDisplay) { letterDisplay.textContent = ''; letterDisplay.classList.remove('visible'); }
      if (meaningDisplay) { meaningDisplay.textContent = ''; meaningDisplay.classList.remove('visible'); }
      if (titleDisplay) titleDisplay.textContent = "A Special Acrostic For You...";
    }
  }

  currentScreen++;
  const nextScreenElement = document.getElementById(`screen${currentScreen}`);
  if (nextScreenElement) {
    nextScreenElement.classList.add("active");

    if (currentScreen === 1 || currentScreen === 2) {
      startHopping21Animation(nextScreenElement);
    } else if (currentScreen === 3) {
      addSubtleBackgroundEffects(nextScreenElement);
    } else if (currentScreen === 4) {
      showMessage();
      startSparklingHearts('sparkling-hearts-container');
    } else if (currentScreen === 5) {
      const inputEl = document.getElementById('customPhraseInput');
      if (inputEl) {
          const userInput = inputEl.value.trim().toUpperCase().replace(/[^A-Z]/g, '');
          if (userInput.length > 0) {
              window.PRAISE_TARGET_PHRASE = userInput;
          }
      }
      startAlphabetPraiseSequence();
    } else if (currentScreen === 6) {
      const video = document.getElementById('loveVideo');
      if (video) {
        video.currentTime = 0;
        video.play().catch(error => console.error("Video play failed.", error));
        setTimeout(() => {
          if (currentScreen === 6) nextScreen();
        }, 7000);
      } else {
        nextScreen();
      }
    }
  } else {
    console.log("End of screens or screen not found.");
  }
}

function startHopping21Animation(screenElement) {
    if (!screenElement) return;
    stopHopping21Animation(screenElement); 
    const count = 8;
    for (let i = 0; i < count; i++) {
        const textEl = document.createElement('span');
        textEl.classList.add('bg-animated-text');
        textEl.textContent = '21'; 
        textEl.style.top = `${10 + Math.random() * 80}%`;
        textEl.style.left = `${10 + Math.random() * 80}%`;
        textEl.style.animationDelay = `${Math.random() * 4}s`;
        textEl.style.animationDuration = `${8 + Math.random() * 6}s`;
        screenElement.appendChild(textEl);
    }
}
function stopHopping21Animation(screenElement) {
    if (!screenElement) return;
    const animatedTexts = screenElement.querySelectorAll('.bg-animated-text');
    animatedTexts.forEach(textEl => textEl.remove());
}

function addSubtleBackgroundEffects(screenElement) {
    if (!screenElement) return;
    clearSubtleBackgroundEffects(screenElement);
    const numHearts = 7;
    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('span');
        heart.classList.add('subtle-heart-effect');
        heart.innerHTML = '💖';
        heart.style.left = `${Math.random() * 95}%`;
        heart.style.top = `${10 + Math.random() * 80}%`;
        heart.style.animationDelay = `${Math.random() * 7}s`;
        heart.style.fontSize = `${1 + Math.random() * 1.2}rem`;
        screenElement.appendChild(heart);
    }
}
function clearSubtleBackgroundEffects(screenElement) {
    if (!screenElement) return;
    const effects = screenElement.querySelectorAll('.subtle-heart-effect');
    effects.forEach(el => el.remove());
}

function startSparklingHearts(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    function createHeart() {
        if (currentScreen !== 4) return; 
        const heart = document.createElement('div');
        heart.classList.add('sparkling-heart');
        heart.innerHTML = ['💖', '💕', '✨', '🌟'][Math.floor(Math.random() * 4)];
        const randomX = Math.random() * 100;
        const randomDelay = Math.random() * 3; 
        const randomDuration = 2 + Math.random() * 2.5; 
        const randomSize = 0.8 + Math.random() * 1.2; 
        const randomColor = `hsl(${300 + Math.random() * 60}, 100%, ${60 + Math.random() * 20}%)`;
        heart.style.left = `${randomX}vw`;
        heart.style.bottom = `${Math.random() * -20}vh`; 
        heart.style.fontSize = `${randomSize}rem`;
        heart.style.color = randomColor;
        heart.style.animation = `sparkleAnim ${randomDuration}s linear ${randomDelay}s forwards`;
        container.appendChild(heart);
        setTimeout(() => { if (heart.parentElement) heart.remove(); }, (randomDuration + randomDelay + 0.5) * 1000);
    }
    stopSparklingHearts();
    sparklingHeartsInterval = setInterval(createHeart, 250);
    for(let i=0; i < 10; i++) createHeart();
}
function stopSparklingHearts() {
    clearInterval(sparklingHeartsInterval);
    const container = document.getElementById('sparkling-hearts-container');
    if (container) container.innerHTML = '';
}
function showMessage() {
    const box = document.getElementById("messageText");
    if (!box) return;
    box.innerHTML = ""; 
    let messageLineIndex = 0;
    function typeLine() {
        if (messageLineIndex < messages.length) {
            let charIndex = 0;
            const line = messages[messageLineIndex];
            const p = document.createElement('p');
            if(messageLineIndex > 0) {
                const prevPs = box.querySelectorAll('p');
                if (prevPs.length > 0) prevPs[prevPs.length-1].style.marginBottom = "1em";
            }
            box.appendChild(p);
            function typeChar() {
                if (charIndex < line.length) {
                    p.textContent += line.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeChar, 60); 
                } else {
                    messageLineIndex++;
                    setTimeout(typeLine, 700); 
                }
            }
            typeChar();
        }
    }
    typeLine();
}

function startAlphabetPraiseSequence() {
    const phrase = window.PRAISE_TARGET_PHRASE?.toUpperCase() || 'JANHAVI';
    const letterDisplay = document.getElementById('praise-letter-display');
    const meaningDisplay = document.getElementById('praise-meaning-display');
    const titleDisplay = document.querySelector('#screen5 .praise-screen-title');

    if (!letterDisplay || !meaningDisplay || !titleDisplay) {
        console.error("Praise display elements for Screen 5 not found!");
        if (currentScreen === 5) nextScreen();
        return;
    }

    titleDisplay.textContent = "A Special Acrostic For You...";
    letterDisplay.textContent = '';
    meaningDisplay.textContent = '';
    letterDisplay.classList.remove('visible');
    meaningDisplay.classList.remove('visible');

    let charIndex = 0;
    const displayTimePerPraise = 3500;
    const animationOutBuffer = 600;

    function showNextPraise() {
        letterDisplay.classList.remove('visible');
        meaningDisplay.classList.remove('visible');
        clearTimeout(praiseSequenceTimeout);

        if (charIndex < phrase.length) {
            const char = phrase.charAt(charIndex);
            const praise = alphabetPraises[char] || `Is for how Special you are!`;

            praiseSequenceTimeout = setTimeout(() => {
                if (currentScreen !== 5) return;
                letterDisplay.textContent = char;
                meaningDisplay.textContent = praise;
                letterDisplay.classList.add('visible');
                setTimeout(() => {
                    if (currentScreen === 5) meaningDisplay.classList.add('visible');
                }, 400);

                charIndex++;
                praiseSequenceTimeout = setTimeout(showNextPraise, displayTimePerPraise);

            }, animationOutBuffer);

        } else {
            if (currentScreen === 5) {
                titleDisplay.textContent = "You're all this & so much more! ❤️";
                letterDisplay.innerHTML = "💖";
                letterDisplay.classList.add('visible');
                meaningDisplay.textContent = "";
                meaningDisplay.classList.remove('visible');

                praiseSequenceTimeout = setTimeout(() => {
                    if (currentScreen === 5) nextScreen();
                }, 3000);
            }
        }
    }
    showNextPraise();

  }

  document.addEventListener('DOMContentLoaded', () => {
  const initialScreen = document.getElementById('screen1');
  if (initialScreen && initialScreen.classList.contains('active')) {
  startHopping21Animation(initialScreen);
  }
  });
