// ==UserScript==
// @name         soundcloud shuffle likes
// @version      1.7
// @description  Adds a shuffle play button to "Likes" and playlists
// @author       bhackel
// @match        https://soundcloud.com/*
// @grant        none
// @run-at       document-end
// @license MIT
// @noframes
// @namespace https://greasyfork.org/en/users/324178-bhackel
// @downloadURL https://update.greasyfork.org/scripts/393088/soundcloud%20shuffle%20likes.user.js
// @updateURL https://update.greasyfork.org/scripts/393088/soundcloud%20shuffle%20likes.meta.js
// ==/UserScript==

(function() {
    'use strict';

    /* Injects Button into the page once it has loaded,
     *  then tries to re-add it if it disappears due to page change
     */
    function insertButtonLoop() {
        let url = window.location.href;
        url = url.split('?')[0];
        let btnShuffle = document.querySelector('.icebro-theme-class');

        // Check if button does not exist already, and that user is on likes or a playlist
        if (!btnShuffle && (url.includes("/"))) {
            btnShuffle = document.createElement('Button');
            btnShuffle.innerHTML = 'button real';
            btnShuffle.onclick = function(){ setupLoad(this); };
            btnShuffle.scrolling = false;
            btnShuffle.interval = 0;

            btnShuffle.className = 'bhackel-shuffle-likes sc-button sc-button-large';
            btnShuffle.pageType = "Likes";
            // Check if top bar has loaded
            let collectionTop = document.querySelector('.streamSidebar');
            if (collectionTop) {
                // Insert the button above the grid of tracks
                collectionTop.insertBefore(btnShuffle, collectionTop.children[1]);
            } else {
                setTimeout(insertButtonLoop, 1000);
            }
        }
        // Perform another check in 3 seconds, in the case button has been removed
        setTimeout(insertButtonLoop, 3000);
    }

    /* Changes the text of the button, resets the queue to have the user's
     *  likes, then starts the scrolling loop. Or it stops the loop from running.
     */
    function setupLoad(btn) {
        // log in the console 
        console.log('setupLoad');
    }

    /* Scrolls the queue down, ensuring that the queue is open by opening it
     */
    function scrollQueue(btn) {
        let queue = document.querySelector('.queue');
        // Check if the queue is open
        if (queue.classList.contains('m-visible')) {
            // Scroll the queue to the bottom, loading new tracks below
            let scrollableQueue = document.querySelector('.queue__scrollableInner');
            let queueContainer = document.querySelector('.queue__itemsHeight');
            let scrollToHeight = parseInt(queueContainer.style.height);
            scrollableQueue.scroll(0,scrollToHeight);

            // Check if all tracks are loaded, then play
            let autoplayDiv = document.querySelector('.queue__fallback');
            if (autoplayDiv) {
                clearInterval(btn.interval);
                btn.scrolling = false;
                btn.interval = 0;
                play(btn);
            }
        } else {
            // Open the queue if it is closed
            toggleQueue('open');
        }
    }

    /* Shuffles the queue, skips the first track, then plays it
     */
    function play(btn) {
        btn.innerHTML = 'Shuffle Play';
        let playButton = document.querySelector('.playControl');
        let shuffleButton = document.querySelector('.shuffleControl');
        let skipButton = document.querySelector(".skipControl__next");

        // Re-Shuffle tracks if shuffle is enabled, and enable shuffle if it is disabled
        if (shuffleButton.classList.contains('m-shuffling')) {
            shuffleButton.click();
            shuffleButton.click();
        } else if (!shuffleButton.classList.contains('m-shuffling')) {
            shuffleButton.click();
        }

        // Skip the duplicate first track that was added previously
        // This also begins playback
        skipButton.click();

        // Close the queue if it is open
        toggleQueue('close');

        // Add focus back to the play/pause button so keybinds work
        playButton.focus()
    }

    /* Opens or closes the song queue
     */
    function toggleQueue(changeToState) {
        let queue = document.querySelector('.queue');
        let isQueueOpen = queue.classList.contains('m-visible');
        // Toggle queue if the queue is open and it should be closed, or if it's closed and should be open
        if ((isQueueOpen && changeToState === 'close') || (!isQueueOpen && changeToState === 'open')) {
            let queueTrigger = document.querySelector('.playbackSoundBadge__queueCircle');
            queueTrigger.click();
        }
    }

    insertButtonLoop();

})();
