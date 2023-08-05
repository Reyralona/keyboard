function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function keyPressSound(type) {
    if (type === 'default') {
        let rand = randomIntFromInterval(2, 2)
        let sound = new Audio(`sounds/keysound${rand}.mp3`)
        sound.play()
    }
    else if (type === 'spacebar') {
        let sound = new Audio(`sounds/spacebar.mp3`)
        sound.play()
    }
}

async function toggleAnimation(animation, keyElement) {
    if (animation === 'default') {
        keyElement.classList.add("key-press-animation")
        await sleep(200)
        keyElement.classList.remove("key-press-animation")
    }
    else if (animation === 'spacebar') {
        keyElement.classList.add("key-press-animation-spacebar")
        await sleep(200)
        keyElement.classList.remove("key-press-animation-spacebar")
    }
}

function keyPress(e) {
    const bypass = ['Meta', 'Shift', 'Control', 'Alt', 'Tab', 'CapsLock', 'Dead', 'Escape']
    var keynum = e.keyCode;

    if (!bypass.includes(e.key)) {
        if (e.key == 'Backspace') {
            displayText = displayText.slice(0, displayText.length - 1)
            keyPressSound('default')
        }

        else if (e.key == 'Enter') {
            displayText += `\n`
            keyPressSound('spacebar')
        }

        else if (keynum == 32) {
            displayText += e.key
            toggleAnimation('spacebar', document.querySelector("#spacebar"))
            keyPressSound('spacebar')
        }
        else {
            displayText += e.key
            var key = String.fromCharCode(keynum).toLocaleUpperCase()
            toggleAnimation('default', document.querySelector(`#key${key}`))
            keyPressSound('default')
        }


        writeToDisplay()
        textarea.scrollIntoView(false);
    }

}

function writeToDisplay() {
    textarea.innerHTML = displayText
}

const textarea = document.querySelector("#textarea")
const keys = document.getElementsByClassName("key")
var displayText = ""
