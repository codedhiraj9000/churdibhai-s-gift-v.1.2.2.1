const draggableDivs = document.querySelectorAll('.draggable');
let isDragging = false;
let offsetX, offsetY, activeDiv;

draggableDivs.forEach((div) => {
    div.addEventListener('mousedown', startDragging);
    div.addEventListener('touchstart', startDragging, { passive: false });
});

function startDragging(e) {
    isDragging = true;
    activeDiv = this;
    const rect = activeDiv.getBoundingClientRect();

    if (e.type === 'mousedown') {
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        document.addEventListener('mousemove', moveDiv);
        document.addEventListener('mouseup', stopDragging);
    } else if (e.type === 'touchstart') {
        offsetX = e.touches[0].clientX - rect.left;
        offsetY = e.touches[0].clientY - rect.top;
        document.addEventListener('touchmove', moveDiv, { passive: false });
        document.addEventListener('touchend', stopDragging);
    }

    activeDiv.style.cursor = 'grabbing';
}

function moveDiv(e) {
    e.preventDefault();

    if (isDragging && activeDiv) {
        if (e.type === 'mousemove') {
            activeDiv.style.left = e.clientX - offsetX + 'px';
            activeDiv.style.top = e.clientY - offsetY + 'px';
        } else if (e.type === 'touchmove') {
            activeDiv.style.left = e.touches[0].clientX - offsetX + 'px';
            activeDiv.style.top = e.touches[0].clientY - offsetY + 'px';
        }
    }
}

function stopDragging() {
    isDragging = false;

    if (activeDiv) {
        activeDiv.style.cursor = 'pointer';
        activeDiv = null;
    }

    document.removeEventListener('mousemove', moveDiv);
    document.removeEventListener('touchmove', moveDiv);
    document.removeEventListener('mouseup', stopDragging);
    document.removeEventListener('touchend', stopDragging);
}


window.addEventListener('load', function () {
    const loadingScreen = document.getElementById('loadingScreen');
    const content = document.querySelector('.content');

    // Simulate a delay (e.g., 3 seconds) for demonstration
    setTimeout(function () {
        loadingScreen.style.opacity = '0';
        loadingScreen.addEventListener('transitionend', function () {
            loadingScreen.style.display = 'none';
        });
        
        content.style.display = 'block';
    }, 3000); // Change the time as needed
});
