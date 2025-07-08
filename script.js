console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('./songs/1.mp3');
let masterPlay = document.getElementById("masterplay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
    { songName: "Dewane hum nhi hote", FilePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Guzareshein", FilePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Baby", FilePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Bewafa", FilePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Jhol", FilePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Bad Liar", FilePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Jo Tu Na Mila", FilePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Tera Mera Jahain", FilePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Ab Tu Ye Haal Hai", FilePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Tarastein Hai Nigahein", FilePath: "songs/10.mp3", coverPath: "covers/10.jpg" }
];

// Populate song items
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
});

// Handle Play/Pause
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0;
    }
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Seek bar control
myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Make all play buttons normal
const makeAllPlay = () => {
    Array.from(document.getElementsByClassName("songItemsPlay")).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Handle song item play click
Array.from(document.getElementsByClassName("songItemsPlay")).forEach((element, i) => {
    element.addEventListener("click", (e) => {
        makeAllPlay();
        songIndex = i;
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].FilePath;
        masterSongName.innerHTML = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
    });
});

// Next button
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].FilePath;
    masterSongName.innerHTML = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
});

// Previous button
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].FilePath;
    masterSongName.innerHTML = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
});
