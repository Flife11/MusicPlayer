function getPlaylist(callBack) {
    const url = "http://localhost:3000/songs";
    fetch(url)
        .then(response => response.json())
        .then(callBack)
}

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document);

function Run(data) { const app =
{
    playState: false,
    index: 0,
    songs: data,

    createPlaylist: function(songs) {
        const playlist = songs.map(song => {
            return `<div class="song">
                        <div class="song-thumbnail" style="background-image: url(${song.image})"></div>
                        <div class="description">
                            <h3 class="song-name">${song.name}</h3>
                            <h5 class="author">${song.author}</h5>
                        </div>
                        <div class="option"><i class="bi bi-three-dots"></i></div>
                    </div>`;
        })
        $('.playlist').innerHTML = playlist.join("");
    },

    loadCurrentSong: function() {
        var header = $(".header>h2");
        var thumbnail = $(".cd-thumbnail");
        var audio = $("audio");
        header.innerHTML = `${this.songs[this.index].name}`;
        thumbnail.style.backgroundImage = `url(${this.songs[this.index].image})`;
        audio.src = `${this.songs[this.index].audio}`;
    },

    handelerEvent: function() {
        // Shrink thumbnail onscroll
        const cd = $(".cd");
        const offsetWidth = cd.offsetWidth;

        document.onscroll = function() {
            const scrollTop = window.scrollY;
            const newWidth = window.Math.max(offsetWidth - scrollTop,0);
            cd.style.width = newWidth+"px";
        }

        // Play, pause events
        const pause = $(".pause");
        const audio = $("audio");
        
        pause.onclick = function() {
            if (app.playState) {
                audio.pause();
                pause.children[0].style.display = "none";
                pause.children[1].style.display = "initial";
            } else {
                audio.play();
                pause.children[1].style.display = "none";
                pause.children[0].style.display = "initial";
            }
            app.playState = !app.playState;
        }

        //
    },

    start: function() {
        // Create playlist
        this.createPlaylist(this.songs);

        this.loadCurrentSong();

        this.handelerEvent();
    }
}
app.start();
}

getPlaylist(Run);