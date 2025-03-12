const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Canvas settings
canvas.width = 800;
canvas.height = 400;

const numBars = 128; // Number of bars
const barWidth = canvas.width / numBars;
let array = [];

const timerElement = document.getElementById('timer'); // Access timer div

// Generate random array
function generateArray() {
    array = [];

    for (let i = 0; i < numBars; i++) {
        array.push((i * canvas.height / numBars) + 1);
    }
    
    for (let i = 0; i < array.length; i++) {
        let randomIndex = Math.floor(Math.random() * array.length);
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }

    drawArray();
}

// Draw the array as bars
function drawArray(highlight1 = -1, highlight2 = -1) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < array.length; i++) {
        ctx.fillStyle = (i === highlight1 || i === highlight2) ? "red" : "white";
        ctx.fillRect(i * barWidth, canvas.height - array[i], barWidth -2, array[i]);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to play sound based on bar height
function playSound(frequency) {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "triangle"; // "sine", "square", "triangle", "sawtooth" for different sounds
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime); // Set pitch
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); // Initial volume

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();

    // Smooth fade-out instead of abrupt stop
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1); 
    oscillator.stop(audioCtx.currentTime + 0.1);
}

async function cuntTimer(startTime) {
    const elapsedTime = (Date.now() - startTime) / 1000; // Elapsed time in seconds
    timerElement.innerText = `Time: ${elapsedTime.toFixed(3)} s`; // Display with 3 decimals
}

async function merge(l, m, r, startTime) {
    let n1 = m - l + 1;
    let n2 = r - m;

    let L = array.slice(l, m + 1);
    let R = array.slice(m + 1, r + 1);

    let i = 0, j = 0, k = l;

    // Merge the two halves back into arr
    while (i < n1 && j < n2) {
        drawArray(i, j); // Visualize before each comparison
        playSound(array[k]); // Play sound based on bar height
        cuntTimer(startTime); // Update timer
        await sleep(1000); // Pause for animation

        if (L[i] <= R[j]) {
            array[k++] = L[i++];
        } else {
            array[k++] = R[j++];
        }
    }

    // Copy the remaining elements of L[] and R[] if any
    while (i < n1) {
        array[k++] = L[i++];
    }
    while (j < n2) {
        array[k++] = R[j++];
    }

    drawArray(i, j); // Visualize after the merge
    playSound(array[k - 1]); // Play sound based on the final element merged
    cuntTimer(startTime); // Update timer
    await sleep(1000); // Pause for animation
}

// Merge Sort function
async function mergeSort(l, r, startTime) {

    if (l < r) {
        drawArray(l, r); // Highlight elements being compared
        playSound(array[l]); // Play sound based on height
        cuntTimer(startTime); // Update timer
        await sleep(1000); // Pause for animation

        const m = Math.floor(l + (r - l) / 2); // Calculate the mid point
        await mergeSort(l, m, startTime); // Recursively sort the left half
        await mergeSort(m + 1, r, startTime); // Recursively sort the right half
        await merge(l, m, r, startTime); // Merge the two halves
    }
}


async function goThrowArray() {
    for (let i = 0; i < array.length; i++) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before redrawing

        // Draw all bars, highlighting the current one
        for (let j = 0; j < array.length; j++) {
            ctx.fillStyle = (j === i) ? "red" : "white"; // Highlight current bar
            ctx.fillRect(j * barWidth, canvas.height - array[j], barWidth - 2, array[j]);
        }

        playSound(array[i]); // Play sound based on bar height

        await sleep(25); // Pause for animation
    }
}

// Sleep function for animation
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Start sorting when button is clicked
function startSorting() {
    timerElement.innerText = "Time: 0.000 s";
    startTime = Date.now(); // Start timer
    mergeSort(0, array.length - 1, startTime);
}

// Generate random array on page load
timerElement.innerText = "Time: 0.000 s";
generateArray();


/* Bubble Sort
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            drawArray(j, j + 1); // Highlight elements being compared
            playSound(array[j]); // Play sound based on height
            await sleep(10); // Pause for animation

            if (array[j] > array[j + 1]) {
                // Swap elements
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                drawArray(j, j + 1);
                playSound(array[j]); // Play sound based on height
            }

            cuntTimer(startTime); // Update timer            
        }
    }
*/

/* Mine Selection Sort
    for (let i = 0; i < Math.floor(array.length / 2); i++) {
        let minP = i, maxP = i;

        for (let j = i; j < array.length - i; j++) {
            drawArray(j, j - 1);
            
            if (array[j] < array[minP]) minP = j;
            if (array[j] > array[maxP]) maxP = j;

            cuntTimer(startTime);
            
            await sleep(10);
        }

        [array[i], array[minP]] = [array[minP], array[i]];

        if (maxP === i) maxP = minP;

        [array[array.length - i - 1], array[maxP]] = [array[maxP], array[array.length - i - 1]];
        
        cuntTimer(startTime);

        await sleep(10);

        // Draw array after the swap and highlight the elements being compared
        drawArray(minP, maxP);
        playSound(array[minP]); // Play sound for the min element
        playSound(array[maxP]); // Play sound for the max element
    }
*/
