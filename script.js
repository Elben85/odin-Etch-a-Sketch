const BLACK_WHITE = 0;
const RAINBOW = 1;
const GREYSCALE = 2;

const GREYSCALE_COLORS = ["rgb(229, 229, 229)", "rgb(204, 204, 204)", "rgb(178, 178, 178)", "rgb(153, 153, 153)",
    "rgb(127, 127, 127)", "rgb(101, 101, 101)", "rgb(76, 76, 76)", "rgb(50, 50, 50)", "rgb(25, 25, 25)", "black"];

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
    const pixelColor = element.style.backgroundColor;
    const indexNumber = GREYSCALE_COLORS.findIndex(x => x === pixelColor);

    if (indexNumber === 9) {
        return;
    }

    element.style.backgroundColor = GREYSCALE_COLORS[indexNumber + 1];
}

function clearCanvas() {
    const individualPixels = document.getElementsByClassName("individualPixel");
    (Array.from(individualPixels)).forEach(pixel => {
        pixel.style.background = "none";
    });
}

function createIndividualCanvasPixel(size) {
    for (let _ = 0; _ < size; ++_) {
        const canvasRow = document.createElement("div");
        canvasRow.className = "canvasRow";

        for (let _ = 0; _ < size; ++_) {
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
    (Array.from(oldPixel)).forEach(pixel => pixel.remove());
    createIndividualCanvasPixel(size);
}

handleCanvasSizeChange(16);

