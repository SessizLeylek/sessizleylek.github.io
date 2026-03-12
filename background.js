const v1 = document.getElementById('video-1');
const v2 = document.getElementById('video-2');
const idlePath = "res/background-idle.webm";
const birdsPath = "res/background-birds.webm";

let current = v1;
let next = v2;

// Initial source
current.src = idlePath;

// Parallax scroll
window.addEventListener('scroll', () => {
    const offset = window.scrollY * -0.3;
    v1.style.transform = `translateY(${offset}px)`;
    v2.style.transform = `translateY(${offset}px)`;
});

// Preloader for the birds video
const birdsPreloader = document.createElement('video');
birdsPreloader.src = birdsPath;
birdsPreloader.preload = "auto";

function swap() {
    const isPlayingBirds = current.src.includes("background-birds.webm");
    let nextPath = idlePath;

    if (!isPlayingBirds) {
        // 20% chance to play birds IF loaded
        if (Math.random() < 0.20 && birdsPreloader.readyState >= 3) {
            nextPath = birdsPath;
        } else {
            // Restart current idle video
            current.currentTime = 0;
            current.play();
            return;
        }
    }

    // Prepare next video
    next.src = nextPath;
    next.load();

    next.play().then(() => {
        // Instant swap: toggle classes
        next.classList.add('active');
        current.classList.remove('active');

        // Switch references
        const temp = current;
        current = next;
        next = temp;

        // Move the event listener to the new active video
        next.removeEventListener('ended', swap);
        current.addEventListener('ended', swap);
    });
}

current.addEventListener('ended', swap);