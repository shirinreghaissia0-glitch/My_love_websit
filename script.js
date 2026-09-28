/* =========================================
   OUR LOVE STORY
   COMPLETE JAVASCRIPT
========================================= */


/* =========================================
   1. OPEN THE BOOK
========================================= */

const intro =
    document.getElementById("intro");

const book =
    document.getElementById("book");

const openBook =
    document.getElementById("openBook");


if (openBook) {

    openBook.addEventListener(
        "click",
        () => {

            intro.classList.add("hide");

            setTimeout(() => {

                book.classList.add("show");

            }, 500);

        }
    );

}


/* =========================================
   2. PAGE TURNING
========================================= */

const pages =
    document.querySelectorAll(".page");

let currentPage = 0;


/* Show first page */

function showPage(index) {

    if (index < 0) {
        index = 0;
    }

    if (index >= pages.length) {
        index = pages.length - 1;
    }


    pages.forEach((page, i) => {

        page.classList.remove("active");

        if (i === index) {

            page.classList.add("active");

        }

    });


    currentPage = index;

}


/* NEXT BUTTONS */

const nextButtons =
    document.querySelectorAll(".next");


nextButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            if (
                currentPage <
                pages.length - 1
            ) {

                showPage(
                    currentPage + 1
                );

            }

        }
    );

});


/* PREVIOUS BUTTONS */

const prevButtons =
    document.querySelectorAll(".prev");


prevButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            if (currentPage > 0) {

                showPage(
                    currentPage - 1
                );

            }

        }
    );

});


/* =========================================
   3. SWIPE ON PHONE
========================================= */

let touchStartX = 0;

let touchEndX = 0;


document.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    { passive: true }
);


document.addEventListener(
    "touchend",
    event => {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    },
    { passive: true }
);


function handleSwipe() {

    const difference =
        touchEndX - touchStartX;


    /* Swipe right */

    if (difference > 70) {

        if (currentPage > 0) {

            showPage(
                currentPage - 1
            );

        }

    }


    /* Swipe left */

    if (difference < -70) {

        if (
            currentPage <
            pages.length - 1
        ) {

            showPage(
                currentPage + 1
            );

        }

    }

}


/* =========================================
   4. TRANSLATION BUTTONS
========================================= */

const translateButtons =
    document.querySelectorAll(".translate");


translateButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            /*
             Find the translation
             belonging to this page.
            */

            const page =
                button.closest(".page");


            if (!page) {
                return;
            }


            const translation =
                page.querySelector(
                    ".translation"
                );


            if (!translation) {
                return;
            }


            translation.classList.toggle(
                "show"
            );


            if (
                translation.classList
                    .contains("show")
            ) {

                button.textContent =
                    "إخفاء الترجمة ♡";

            } else {

                button.textContent =
                    "اضغط للترجمة ♡";

            }

        }
    );

});


/* =========================================
   5. FLOATING HEARTS
========================================= */

const hearts =
    document.getElementById("hearts");


function createHeart() {

    if (!hearts) {
        return;
    }


    const heart =
        document.createElement("span");


    heart.className =
        "heart";


    heart.textContent =
        Math.random() > .5
            ? "♡"
            : "♥";


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.fontSize =
        (12 + Math.random() * 22) + "px";


    const duration =
        5 + Math.random() * 7;


    heart.style.animationDuration =
        duration + "s";


    heart.style.animationDelay =
        (Math.random() * 2) + "s";


    hearts.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, (duration + 3) * 1000);

}


/* Create hearts */

setInterval(
    createHeart,
    650
);


/* Initial hearts */

for (
    let i = 0;
    i < 8;
    i++
) {

    setTimeout(
        createHeart,
        i * 300
    );

}


/* =========================================
   6. MUSIC PLAYER
========================================= */

const music =
    document.getElementById("music");

const playMusic =
    document.getElementById("playMusic");

const progress =
    document.getElementById("progress");

const volume =
    document.getElementById("volume");

const currentTime =
    document.getElementById("currentTime");

const totalTime =
    document.getElementById("totalTime");


/* =========================================
   TIME FORMAT
========================================= */

function formatTime(seconds) {

    if (
        !Number.isFinite(seconds)
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(seconds / 60);


    const secondsLeft =
        Math.floor(seconds % 60);


    return (
        minutes +
        ":" +
        String(secondsLeft)
            .padStart(2, "0")
    );

}


/* =========================================
   DEFAULT VOLUME
========================================= */

if (music && volume) {

    music.volume =
        Number(volume.value);

}


/* =========================================
   PLAY / PAUSE
========================================= */

if (
    music &&
    playMusic
) {

    playMusic.addEventListener(
        "click",
        async () => {

            if (music.paused) {

                try {

                    await music.play();

                    playMusic.textContent =
                        "❚❚";

                    playMusic.classList.add(
                        "playing"
                    );

                } catch (error) {

                    console.log(
                        "Music could not play:",
                        error
                    );

                    alert(
                        "تأكدي بلي حطيتي music.mp3 داخل نفس فولدر الموقع 🎵"
                    );

                }

            } else {

                music.pause();

                playMusic.textContent =
                    "▶";

                playMusic.classList.remove(
                    "playing"
                );

            }

        }
    );

}


/* =========================================
   WHEN MUSIC STARTS
========================================= */

if (music) {

    music.addEventListener(
        "play",
        () => {

            if (playMusic) {

                playMusic.textContent =
                    "❚❚";

                playMusic.classList.add(
                    "playing"
                );

            }

        }
    );


    music.addEventListener(
        "pause",
        () => {

            if (playMusic) {

                playMusic.textContent =
                    "▶";

                playMusic.classList.remove(
                    "playing"
                );

            }

        }
    );

}


/* =========================================
   GET MUSIC DURATION
========================================= */

if (music) {

    music.addEventListener(
        "loadedmetadata",
        () => {

            if (totalTime) {

                totalTime.textContent =
                    formatTime(
                        music.duration
                    );

            }

        }
    );

}


/* =========================================
   UPDATE PROGRESS
========================================= */

if (music) {

    music.addEventListener(
        "timeupdate",
        () => {

            if (!music.duration) {
                return;
            }


            const percent =
                (
                    music.currentTime /
                    music.duration
                ) * 100;


            if (progress) {

                progress.value =
                    percent;

            }


            if (currentTime) {

                currentTime.textContent =
                    formatTime(
                        music.currentTime
                    );

            }

        }
    );

}


/* =========================================
   MOVE THROUGH SONG
========================================= */

if (
    progress &&
    music
) {

    progress.addEventListener(
        "input",
        () => {

            if (!music.duration) {
                return;
            }


            music.currentTime =
                (
                    Number(
                        progress.value
                    ) / 100
                ) *
                music.duration;

        }
    );

}


/* =========================================
   VOLUME CONTROL
========================================= */

if (
    volume &&
    music
) {

    volume.addEventListener(
        "input",
        () => {

            music.volume =
                Number(
                    volume.value
                );

        }
    );

}


/* =========================================
   MUSIC ERROR
========================================= */

if (music) {

    music.addEventListener(
        "error",
        () => {

            console.log(
                "Music file could not be loaded."
            );

        }
    );

}


/* =========================================
   7. KEYBOARD CONTROLS
========================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
         Arrow Right
         = next page
        */

        if (
            event.key ===
            "ArrowRight"
        ) {

            if (
                currentPage <
                pages.length - 1
            ) {

                showPage(
                    currentPage + 1
                );

            }

        }


        /*
         Arrow Left
         = previous page
        */

        if (
            event.key ===
            "ArrowLeft"
        ) {

            if (currentPage > 0) {

                showPage(
                    currentPage - 1
                );

            }

        }


        /*
         Space
         = play / pause music
        */

        if (
            event.code ===
            "Space"
        ) {

            /*
             Don't interfere with
             buttons or inputs.
            */

            const tag =
                document.activeElement
                    ?.tagName;


            if (
                tag !== "BUTTON" &&
                tag !== "INPUT"
            ) {

                event.preventDefault();


                if (
                    music &&
                    playMusic
                ) {

                    playMusic.click();

                }

            }

        }

    });


/* =========================================
   8. INITIAL PAGE
========================================= */

showPage(0);


console.log(
    "♡ Our Love Story is ready ♡"
);