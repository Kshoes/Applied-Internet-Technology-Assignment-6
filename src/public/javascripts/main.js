// main.js

function main(){

    const play = document.querySelector('.playBtn');
    play.addEventListener('click', function(evt) {
        document.querySelector('form').style.display = "none";
        evt.preventDefault();
    })

}
document.addEventListener('DOMContentLoaded', main);

