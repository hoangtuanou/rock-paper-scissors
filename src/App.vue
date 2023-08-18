<script>
import ScoreBoard from './components/ScoreBoard.vue'
import Options from './components/Options.vue'

export default {
  data() {
    return { score: 0, openTutorial: false, }
  },
  methods: {
    increScore() {
      this.score += 1
    },
    decreScore() {
      this.score -= 1
    }
  },
  components: {
    ScoreBoard,
    Options,
  }
}
</script>

<template>
  <div class="container">
    <ScoreBoard :score="score" />
    <Options @increscore="increScore" @decrescore="decreScore" />
    <section class="footer">
      <button class="rules-btn" @click="openTutorial = true">rules</button>
    </section>
  </div>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="openTutorial" class="modal">
        <div class="modal-inner">
          <h1>rules</h1>
          <div class="rules">
            <img src="./assets/images/image-rules.svg" alt="rules">
          </div>
          <button @click="openTutorial = false">
            <img src="./assets/images/icon-close.svg" alt="close">
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100dvh;

  @media screen and (min-width: 768px) {
    justify-content: space-evenly;
  }
}

.footer {
  padding: 1rem 0;
}

.rules-btn {
  border-radius: 8px;
  border: 1px solid var(--white);
  text-transform: uppercase;
  background-color: transparent;
  color: var(--white);
  font-weight: 600;
  padding: .5rem 2rem;
  cursor: pointer;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    text-transform: uppercase;
    font-size: 1.5 rem;
  }

  button {
    border: none;
    background-color: transparent;

    &:focus {
      outline: none;
    }
  }

  @media screen and (min-width: 768px) {
    align-items: center;
    background-color: transparent;
  }
}


.modal-inner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 80vh;
  background-color: var(--white);

  @media screen and (min-width: 768px) {
    width: 500px;
    height: 500px;
    border-radius: 18px;
    padding: 30px 20px;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
