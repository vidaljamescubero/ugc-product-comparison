const track = document.querySelector(".ugc-cate-comp-cards");
let initialPosition = null;
let initialPositionY = null;
let moving = false;
let transform = 0;

window.gestureStart = (e) => {
    initialPosition = e.pageX;
    initialPositionY = e.pageY;
    moving = true;
    const transformMatrix = window.getComputedStyle(track).getPropertyValue('transform')
    
    if (transformMatrix !== "none") {
        transform = parseInt(transformMatrix.split(',')[4].trim());
   
    }
}

window.gestureMove = (e) => {
    if (moving) {
        const currentPosition = e.pageX;
        const currentPositionY = e.pageY;
        const diff = currentPosition - initialPosition;
        let transformValue = transform + diff;

        if (transform + diff > 0) {
            transformValue = 0
        } 
        
        if (transform + diff < track.offsetWidth - 853.5){
            transformValue = track.offsetWidth - 853.5
        } 

        track.style.transform = `translateX(${transformValue}px)`;

        if (screen.width < 768) {
            let heightValue =initialPositionY - currentPositionY;
            window.scrollBy(0, heightValue);
        }
    }
}

window.gestureStop = (e) => {
    moving = false;
}

track.addEventListener('mousedown', gestureStart)

track.addEventListener('mousemove', gestureMove)

track.addEventListener('mouseup', gestureStop)

track.addEventListener('touchdown', gestureStart)

track.addEventListener('touchmove', gestureMove)

track.addEventListener('touchup', gestureStop)

track.addEventListener('pointerdown', gestureStart)

track.addEventListener('pointermove', gestureMove)

track.addEventListener('pointerup', gestureStop)

