import RockIcon from "./assets/images/icon-rock.svg"
import PaperIcon from "./assets/images/icon-paper.svg"
import ScissorsIcon from "./assets/images/icon-scissors.svg"

const OPTIONS_IMAGES = {
  ROCK: RockIcon,
  PAPER: PaperIcon,
  SCISSORS: ScissorsIcon,
}

export const OPTIONS = [
  {
    name: "rock",
    img: OPTIONS_IMAGES.ROCK,
  },
  {
    name: "paper",
    img: OPTIONS_IMAGES.PAPER,
  },
  {
    name: "scissors",
    img: OPTIONS_IMAGES.SCISSORS,
  },
]
