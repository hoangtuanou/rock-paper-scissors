<template>
  <Transition name="bot-move">
    <div class="options-chose" v-if="!!Object.keys(playerMove).length">
      <div class="option-wrapper">
        <div class="option" :class="[playerMove.name, { active: result === 'you win' }]">
          <div class="ring ring-1"></div>
          <div class="ring ring-2"></div>
          <div class="ring ring-3"></div>
          <div class="ring ring-4"></div>
          <img :src="playerMove.img" alt="scissors-option">
        </div>
        <p>you picked</p>
      </div>
      <div class="option-wrapper">
        <div class="option" :class="[botMove.name, {
          'no-option': !botMove.name, active: result === 'you lose'
        }]">
          <div class="ring ring-1"></div>
          <div class="ring ring-2"></div>
          <div class="ring ring-3"></div>
          <div class="ring ring-4"></div>
          <Transition name="bot-move">
            <img :src="botMove.img" alt="scissors-option" v-if="botMove.img">
          </Transition>
        </div>
        <p>the house picked</p>
      </div>
    </div>
  </Transition>

  <Transition name="bot-move">
    <div class="options-wrapper" v-if="!Object.keys(playerMove).length">
      <div class="options">
        <img src="../assets/images/bg-triangle.svg" alt="background-img">
        <div class="option " :class="option.name" v-for="option in options" @click="selectOption(option)">
          <img :src="option.img" alt="paper-option">
        </div>
      </div>
    </div>
  </Transition>

  <div class="result" :class="{ show: result !== 'TEMP' }" v-if="Object.keys(playerMove).length">
    <p>{{ result }}</p>
    <button class="again-btn" @click="playAgain">play again</button>
  </div>
</template>

<style lang="scss">
.options-wrapper {
  width: min(55vw, 200px);
  margin: 0 auto;
}

.option {
  width: 130px;
  height: 130px;
  background-color: var(--white);
  border-radius: 50%;
  border: 15px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  cursor: pointer;
}

.no-option {
  border-color: var(--dark-text);
  background-color: var(--header-outline);
}

.rock {
  border-color: var(--rock-gradient);
}

.paper {
  border-color: var(--paper-gradient);
}

.scissors {
  border-color: var(--scissors-gradient);
}

.options {
  position: relative;

  .option {
    position: absolute;
  }

  .rock {
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 50%);
  }

  .paper {
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
  }

  .scissors {
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
  }
}

.options-chose {
  width: min(80vw, 350px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  .option-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
  }

  .option {
    position: relative;
  }

  p {
    color: var(--white);
    font-size: 1.1rem;
    font-weight: 600;
    text-transform: uppercase;
    margin-top: 1.5rem;
  }
}

.result {
  visibility: hidden;

  p {
    font-size: 4rem;
    font-weight: 600;
    color: var(--white);
    text-transform: uppercase;
    text-align: center;
  }
}

.again-btn {
  width: 100%;
  text-transform: uppercase;
  text-align: center;
  font-size: 1rem;
  color: var(--dark-text);
  font-weight: 600;
  border-radius: 10px;
  padding: .6rem 0;
  border: none;
}

.show {
  visibility: visible;
  animation: show-up 0.8s ease-out;
}

@keyframes show-up {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.active {
  position: relative;

  .ring {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    display: block;
    animation: scale 4s ease-out infinite;
    background-color: red;
    border-radius: 50%;
    z-index: -1;
    background-color: rgba(225, 225, 225, 0.2);
  }

  .ring-2 {
    animation-delay: 1s;
  }

  .ring-3 {
    animation-delay: 2s;
  }

  .ring-4 {
    animation-delay: 3s;
  }
}

@keyframes scale {
  0% {
    opacity: 1;
  }

  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}

.bot-move-enter-active {
  transition: all 0.3s ease-out;
}

.bot-move-enter-from {
  transform: scale(0);
  opacity: 0;
}

.bot-move-enter-to {
  transform: scale(1);
  opacity: 1;
}
</style>

<script>
import { OPTIONS } from '../constants'

const RULE_MAP = {
  rock: {
    paper: 1,
    scissors: 0,
  },
  paper: {
    scissors: 1,
    rock: 0,
  },
  scissors: {
    rock: 1,
    paper: 0,
  },
}

const RESULT = ['drawn', 'you win', 'you lose']

const WAITING_BOT_MOVE_TIME = 1000;

export default {
  emits: { increscore: null, decrescore: null },
  data() {
    return {
      options: OPTIONS,
      playerMove: {},
      botMove: {},
      score: 0,
      result: ''
    }
  },
  computed: {
    result() {
      if (Object.keys(this.playerMove).length && this.playerMove.name === this.botMove.name) return RESULT[0];

      if (this.playerMove.name && this.botMove.name) {
        const index = RULE_MAP[this.playerMove.name][this.botMove.name];

        if (index === 1) {
          this.$emit('decrescore')
        } else {
          this.$emit('increscore')
        }

        this.result = RESULT[index + 1]
        return RESULT[index + 1]
      }

      return 'TEMP';
    }
  },
  methods: {
    selectOption(option) {
      this.playerMove = option;

      setTimeout(() => {
        this.botPlayMove();
      }, WAITING_BOT_MOVE_TIME);
    },
    botPlayMove() {
      const randomIndex = Math.floor(Math.random() * OPTIONS.length);
      this.botMove = OPTIONS[randomIndex];
    },
    playAgain() {
      this.playerMove = {}
      this.botMove = {}
    }
  }
}
</script>