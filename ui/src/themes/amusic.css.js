const stylesheet = `

.react-jinke-music-player-main svg:active, .react-jinke-music-player-main svg:hover {
    color: #FF4E6B
}

.react-jinke-music-player-main .music-player-panel .panel-content .rc-slider-handle, .react-jinke-music-player-main .music-player-panel .panel-content .rc-slider-track {
    background-color: #FF0436
}

.react-jinke-music-player-main ::-webkit-scrollbar-thumb {
    background-color: #FF0436;
}

.react-jinke-music-player-main .music-player-panel .panel-content .rc-slider-handle:active {
    box-shadow: 0 0 2px #FF0436
}

.react-jinke-music-player-main .audio-item.playing svg {
    color: #FF0436
}

.react-jinke-music-player-main .audio-item.playing .player-singer {
    color: #FF0436 !important
}

.audio-lists-panel-content .audio-item.playing, .audio-lists-panel-content .audio-item.playing svg {
    color: #FF0436
}
.audio-lists-panel-content .audio-item:active .group:not([class=".player-delete"]) svg, .audio-lists-panel-content .audio-item:hover .group:not([class=".player-delete"]) svg {
    color: #FF0436
}
`

export default stylesheet
