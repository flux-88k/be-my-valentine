window.addEventListener("DOMContentLoaded", function() {
    let music = document.getElementById("backgroundMusic");

    // Try to play the music as soon as the page loads
    let playPromise = music.play();

    // Check if autoplay is blocked
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Auto-play blocked by browser. Waiting for user interaction.");
        });
    }
});

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");

    // Array of different emojis
    const heartColors = ["❤️", "🌹", "💖"];
    heart.innerHTML = heartColors[Math.floor(Math.random() * heartColors.length)];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 2 + "s"; // Random float speed

    document.querySelector(".heart-container").appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 4000);
}

// generate hearts on page load
window.onload = function() {
    setInterval(createHeart, 100);
};

// When "No" is clicked, change image to sad cat
let noClicks = 0; // Track the number of times "No" is clicked
let scaleFactorNo = 1; // Initial scale (100%)
let scaleFactorYes = 1;
let stopGrowth = false;

// When "Yes" is clicked, change image to happy cat
document.getElementById("yesButton").addEventListener("click", function() {
    document.getElementById("valentineImage").src = "funny-yes.gif"; // Change image
    document.getElementById("message").innerText = "Yay! I knew you'd say yes! ❤️"; // Update message
    document.getElementById("message-2").innerText = "EXCITED FOR FRIDAY !!! (if it doenst snow lol)"; // Update message

// hide button after clicking yes
    document.getElementById("yesButton").style.display = "none";
    document.getElementById("noButton").style.display = "none";
});


document.getElementById("noButton").addEventListener("click", function() {
    noClicks++; // Increase the click count

    // Move button to a random position
    let newX = Math.random() * (window.innerWidth - 100); // Random X position
    let newY = Math.random() * (window.innerHeight - 50); // Random Y position
    this.style.position = "absolute";
    this.style.left = `${newX}px`;
    this.style.top = `${newY}px`;

    // Reduce the size of the entire button
    scaleFactorNo *= 0.8; // Shrink by 20% each time
    this.style.transform = `scale(${scaleFactorNo})`; // Apply scaling

    // Increase the size of "Yes" button
    scaleFactorYes *= 1.2; // Grow by 20% each time
    document.getElementById("yesButton").style.transform = `scale(${scaleFactorYes})`;

    // After 3 clicks, stop "Yes" from growing and make it wiggle
    if (noClicks >= 3) {
        document.getElementById("valentineImage").src = "gato-triste.jpeg"; // Change to sad cat
        document.getElementById("message").innerText = "Oh no...PLEASE? 😢";
        stopGrowth = true; // Stop "Yes" from increasing in size
        document.getElementById("yesButton").classList.add("wiggle"); // Start wiggling
    }
});

