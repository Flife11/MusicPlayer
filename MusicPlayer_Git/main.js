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
    loopState: false,
    playState: false,
    index: 0,
    songs: data,

    createPlaylist: function(songs) {
        var playlist = $('.playlist');
        songs.forEach(song => {
            const html = `  <div class="song-thumbnail" style="background-image: url(${song.image})"></div>
                            <div class="description">
                                <h3 class="song-name">${song.name}</h3>
                                <h5 class="author">${song.author}</h5>
                            </div>
                            <div class="option"><i class="bi bi-three-dots"></i></div>` 
            var div = document.createElement("div");
            div.className = `${song.id} song`;
            div.innerHTML = html;
            playlist.appendChild(div);
        })
    },

    loadCurrentSong: function() {
        const playlist = $$(".song");
        var active = $(".song.active");
        var header = $(".header>h2");
        var thumbnail = $(".cd-thumbnail");
        var audio = $("audio");
        header.innerHTML = `${this.songs[this.index].name}`;
        thumbnail.style.backgroundImage = `url(${this.songs[this.index].image})`;
        audio.src = `${this.songs[this.index].audio}`;
        if(active) active.classList.remove("active");
        playlist[this.index].classList.add("active");
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
                pause.children[0].classList.add("paused");
                pause.children[1].classList.remove("paused");
            } else {
                audio.play();
                pause.children[0].classList.remove("paused");
                pause.children[1].classList.add("paused");
            }
            app.playState = !app.playState;
        }

        // Progress bar
        const input = $("#progress");

        input.onchange = function(e) {
            audio.currentTime = (audio.duration*e.target.value)/100;
            // console.log(audio.currentTime);
        }
        audio.ontimeupdate = function() {
            if (audio.duration) input.value = (audio.currentTime*100)/audio.duration;
            // console.log(input.value);
        }

        // Next, Previous events
        const next = $(".next");
        const previous = $(".previous");

        next.onclick = function() {
            app.index = (app.index+1)%(app.songs.length);
            app.loadCurrentSong();
            app.playState = 0;
            pause.onclick();
        }
        previous.onclick = function() {
            app.index = (app.index-1+app.songs.length)%(app.songs.length);
            app.loadCurrentSong();
            app.playState = 0;
            pause.onclick();
        }
        audio.onended = function() {
            next.onclick();
        }

        // Loop event
        const loop = $(".loop")

        loop.onclick = function() {
            if (app.loopState) {
                loop.classList.remove("loopping");
                audio.loop = false;
            } else {
                loop.classList.add("loopping");
                audio.loop = true;
            }
            app.loopState = !app.loopState
        }

        // Pick song event
        var playlist = $$(".song");
        playlist.forEach(song => {
            song.onclick = function() {
                const index = song.classList[0];
                app.index = index-1;
                app.loadCurrentSong();
                app.playState = 0;
                pause.onclick();
            }
        })
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