<template>
  <div class="score-board">
    <section class="text">
      <p>rock</p>
      <p>paper</p>
      <p>scissors</p>
    </section>
    <section class="score">
      <p class="title">score</p>
      <p class="score-text">{{ score }}</p>
    </section>
  </div>
</template>

<style scoped lang="scss">
.score-board {
  width: min(80vw, 500px);
  margin: 12px auto;
  border: 3px solid var(--header-outline);
  border-radius: 8px;
  padding: .6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .text {
    color: var(--white);
    text-transform: uppercase;

    p {
      font-weight: 600;
      font-size: 1.2rem;
      line-height: .8;
    }
  }

  .score {
    background-color: var(--white);
    border-radius: 4px;
    text-align: center;
    padding: .5rem 1.2rem;
    text-align: center;
    line-height: 1;

    .title {
      color: var(--score-text);
      text-transform: uppercase;
      font-size: .8rem;
    }

    .score-text {
      color: var(--dark-text);
      font-size: 2rem;
      font-weight: 700;
    }
  }
}
</style>

<script>
export default {
  props: {
    score: Number,
  }
}
</script>