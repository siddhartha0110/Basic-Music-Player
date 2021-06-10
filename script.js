const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const title = document.querySelector('.title');
const cover = document.querySelector('#cover');
const progressContainer = document.querySelector('.progress-container');

const songs = ['hey', 'summer', 'ukulele']; //Song Titles

let songIndex = 2; //Current Song

loadSong(songs[songIndex]);


//Load Song
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

function playSong() {
    audio.play();
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
}
function pauseSong() {
    audio.pause();
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(event) {
    const { duration, currentTime } = event.srcElement;
    const progressPercent = (currentTime / duration) * 100;

    progress.style.width = `${progressPercent}%`
}

function setSongProgress(event) {
    const width = this.clientWidth;
    const clickPosX = event.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickPosX / width) * duration;
}

//Event Listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    }
    else {
        playSong();
    }
})

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setSongProgress);

audio.addEventListener('ended', nextSong);