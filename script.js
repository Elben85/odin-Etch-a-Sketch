const BLACK_WHITE = 0;
const RAINBOW = 1;
const GREYSCALE = 2;

const GREY1 = "rgb(229, 229, 229)";
const GREY2 = "rgb(204, 204, 204)";
const GREY3 = "rgb(178, 178, 178)";
const GREY4 = "rgb(153, 153, 153)";
const GREY5 = "rgb(127, 127, 127)";
const GREY6 = "rgb(101, 101, 101)";
const GREY7 = "rgb(76, 76, 76)";
const GREY8 = "rgb(50, 50, 50)";
const GREY9 = "rgb(25, 25, 25)";

let colorScheme = BLACK_WHITE;
let activeColorScheme = document.getElementById("active");
const canvasPanel = document.getElementById("canvas");
const clearButton = document.getElementsByClassName("clear")[0];
const blackButton = document.getElementsByClassName("black")[0];
const greyscaleButton = document.getElementsByClassName("greyscale")[0];
const rainbowButton = document.getElementsByClassName("rainbow")[0];
const sizeAdjustor = document.getElementById("size_bar");
const sizePanel = document.getElementsByClassName("canvas_size")[0];
clearButton.addEventListener("click", clearCanvas);
blackButton.addEventListener("click", () => changeActiveColorScheme(blackButton));
rainbowButton.addEventListener("click", () => changeActiveColorScheme(rainbowButton));
greyscaleButton.addEventListener("click", () => changeActiveColorScheme(greyscaleButton));
sizeAdjustor.addEventListener("change", () => { handleCanvasSizeChange(parseInt(sizeAdjustor.value)) });

function changeActiveColorScheme(element) {
    activeColorScheme.removeAttribute("id");
    activeColorScheme = element;
    element.setAttribute("id", "active");

    if (element === blackButton) {
        colorScheme = BLACK_WHITE;
    } else if (element === rainbowButton) {
        colorScheme = RAINBOW;
    } else {
        colorScheme = GREYSCALE;
    }
}

function paintPixel(element) {
    if (colorScheme === BLACK_WHITE) {
        paintBlack(element);
    } else if (colorScheme === RAINBOW) {
        paintRainbow(element);
    } else {
        paintGreyscale(element);
    }
}

//getRandomNumber output ranges from 0 - 255
function getRandomNumber() {
    return Math.floor(256 * Math.random());
}

function getRandomColor() {
    const R = getRandomNumber();
    const G = getRandomNumber();
    const B = getRandomNumber();

    return `rgb(${R}, ${G}, ${B})`;
}

function paintRainbow(element) {
    element.style.backgroundColor = getRandomColor();
}

function paintBlack(element) {
    element.style.backgroundColor = "black";
}

function paintGreyscale(element) {
    if (element.style.backgroundColor === "black") {
        return;
    } else if (element.style.backgroundColor === GREY9) {
        element.style.backgroundColor = "black";
    } else if (element.style.backgroundColor === GREY8) {
        element.style.backgroundColor = GREY9;
    } else if (element.style.backgroundColor === GREY7) {
        element.style.backgroundColor = GREY8;
    } else if (element.style.backgroundColor === GREY6) {
        element.style.backgroundColor = GREY7;
    } else if (element.style.backgroundColor === GREY5) {
        element.style.backgroundColor = GREY6;
    } else if (element.style.backgroundColor === GREY4) {
        element.style.backgroundColor = GREY5;
    } else if (element.style.backgroundColor === GREY3) {
        element.style.backgroundColor = GREY4;
    } else if (element.style.backgroundColor === GREY2) {
        element.style.backgroundColor = GREY3;
    } else if (element.style.backgroundColor === GREY1) {
        element.style.backgroundColor = GREY2;
    } else {
        element.style.backgroundColor = GREY1;
    }
}

function clearCanvas() {
    const individualPixels = document.getElementsByClassName("individualPixel");

    for (let i = 0; i < individualPixels.length; ++i) {
        individualPixels[i].style.background = "none";
    }
}

function createIndividualCanvasPixel(size) {
    for (let i = 0; i < size; ++i) {
        const canvasRow = document.createElement("div");
        canvasRow.className = "canvasRow";

        for (let i = 0; i < size; ++i) {
            const singleCanvasPixel = document.createElement("div");
            singleCanvasPixel.className = "individualPixel";
            singleCanvasPixel.addEventListener("mouseover", () => paintPixel(singleCanvasPixel));
            canvasRow.appendChild(singleCanvasPixel);
        }

        canvasPanel.appendChild(canvasRow);
    }
}

function handleCanvasSizeChange(size) {
    sizePanel.textContent = `${size} x ${size}`;
    const oldPixel = document.getElementsByClassName("canvasRow");

    for (let i = oldPixel.length - 1; i >= 0; --i) {
        oldPixel[i].remove();
    }

    createIndividualCanvasPixel(size);
}

handleCanvasSizeChange(16);

