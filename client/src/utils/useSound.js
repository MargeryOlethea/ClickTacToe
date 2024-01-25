import useSound from "use-sound";
import errorSfx from "../sounds/Error.mp3";
import winSfx from "../sounds/Win.mp3";
import loseSfx from "../sounds/Lose.mp3";
import successSfx from "../sounds/Success.mp3";
import tieSfx from "../sounds/Tie.mp3";

const [play] = useSound(errorSfx);

play();

const [playError] = useSound(errorSfx);
const [playSuccess] = useSound(successSfx);
const [playWin] = useSound(winSfx);
const [playLose] = useSound(loseSfx);
const [playTie] = useSound(tieSfx);
