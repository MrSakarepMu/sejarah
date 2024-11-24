// Daftar gambar target: penghianat dan pahlawan
const targets = [
    { image: 'image/musso.jpg', type: 'penghianat' },
    { image: 'image/aidit.jpg', type: 'penghianat' },
    { image: 'image/teungku.jpg', type: 'penghianat' },
    { image: 'image/soekarno.jpg', type: 'pahlawan' },
    { image: 'image/haryono.jpg', type: 'pahlawan' },
];

// Elemen HTML
const gameArea = document.getElementById("game-area");
const story = document.getElementById("story");
const feedback = document.getElementById("feedback");
const coinsElement = document.getElementById("coins");
const startShootingGameBtn = document.getElementById("start-shooting-game");
const endShootingGameBtn = document.getElementById("end-shooting-game");

let coins = 0;
let shootingScore = 0;
let shootingInterval;

// Fungsi untuk menampilkan cerita
function displayStory(message) {
    console.log("Menampilkan cerita:", message); // Log untuk memastikan cerita dipanggil
    story.textContent = message;
    story.style.display = 'block';  // Pastikan cerita tampil
}

// Fungsi untuk memulai permainan tembak
function startShootingGame() {
    shootingScore = 0;
    coinsElement.textContent = `Koin: ${coins}`;
    feedback.textContent = "";
    startShootingGameBtn.style.display = "none";
    displayStory("Anda berada di masa sejarah pemberontakan. Pilih target yang benar, tetapi hati-hati! Jangan tembak pahlawan!");
    shootingInterval = setInterval(spawnTarget, 1000); // Spawn target setiap 1 detik
}

// Fungsi untuk mengakhiri permainan tembak
function endShootingGame() {
    clearInterval(shootingInterval);
    startShootingGameBtn.style.display = "block";
    coins += shootingScore; // Tambah koin sesuai skor
    coinsElement.textContent = `Koin: ${coins}`;
    feedback.textContent = `Permainan berakhir. Skor Anda: ${shootingScore}`;
    displayStory("Permainan selesai! Terima kasih telah bermain. Anda berhasil mengumpulkan koin dan belajar tentang sejarah.");
}

// Fungsi untuk membuat target tembak
function spawnTarget() {
    const target = document.createElement("div");
    target.classList.add("target");

    // Pilih target secara acak (penghianat atau pahlawan)
    const randomTarget = targets[Math.floor(Math.random() * targets.length)];

    // Tentukan gambar yang akan ditampilkan pada target
    const img = document.createElement("img");
    img.src = randomTarget.image;  // Path yang sudah diperbaiki
    img.alt = randomTarget.type;
    img.classList.add("target-image");

    // Posisi acak
    const x = Math.random() * (gameArea.offsetWidth - 50);
    const y = Math.random() * (gameArea.offsetHeight - 50);

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    target.appendChild(img);
    target.dataset.type = randomTarget.type; // Simpan tipe target (penghianat atau pahlawan)

    // Event klik untuk menembak target
    target.addEventListener("click", () => {
        if (target.dataset.type === "penghianat") {
            shootingScore++;
            feedback.textContent = `Skor: ${shootingScore}`;
            displayStory("Anda menembak penghianat! Skor bertambah.");
        } else {
            // Jika mengenai pahlawan Indonesia, permainan berakhir
            feedback.textContent = "Anda menembak pahlawan! Permainan berakhir.";
            feedback.style.color = "red";
            displayStory("Anda menembak pahlawan Indonesia! Permainan berakhir.");
            endShootingGame();
        }

        gameArea.removeChild(target); // Hapus target setelah ditembak
    });

    gameArea.appendChild(target);

    // Hapus target setelah 2 detik jika tidak ditembak
    setTimeout(() => {
        if (target.parentElement) {
            gameArea.removeChild(target);
        }
    }, 2000);
}

// Event untuk memulai dan mengakhiri permainan tembak
startShootingGameBtn.addEventListener("click", startShootingGame);
endShootingGameBtn.addEventListener("click", endShootingGame);

function displayStory(message) {
    console.log("Menampilkan cerita: ", message);  // Log untuk memastikan fungsi dipanggil
    story.textContent = message;
    story.style.display = 'block';  // Pastikan cerita tampil
}
