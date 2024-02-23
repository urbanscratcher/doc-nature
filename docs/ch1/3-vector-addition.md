---
sidebar_position: 3
---

# 3. 벡터 덧셈

## 벡터 덧셈 기본

- 벡터: $\overrightarrow{u}$
- 스칼라: $x$
- 2개의 벡터를 더하려면 각각의 x와 y를 더해주면 됨
  <img width="500px" src="https://natureofcode.com/static/7b9db07b6ab3e8cdbf6bb466a8517e6d/3b1b3/01_vectors_7.webp"/>

:::note[벡터 덧셈의 연산법칙]
벡터 덧셈은 교환법칙, 결합법칙이 성립
:::

## 벡터 클래스

- 벡터 클래스 및 덧셈 함수 (p5js에서도 유사하게 구현돼 있음)

  ```js
  class Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    add(v) {
      this.x = this.x + v.x;
      this.y = this.y + v.y;
    }
  }
  ```

- 벡터를 활용한 튕기는 공

  ```js
  let position;
  let velocity;

  function setup() {
    createCanvas(640, 240);
    background(255);

    // 벡터 생성
    position = createVector(100, 100);
    velocity = createVector(2.5, 2);
  }

  function draw() {
    background(255);

    position = position.add(velocity);

    // x, y는 따로 꺼내서 사용해야 함
    if (position.x > width || position.x < 0) {
      velocity.x = -1 * velocity.x;
    }
    if (position.y > height || position.y < 0) {
      velocity.y = -1 * velocity.y;
    }

    stroke(0);
    fill(200);
    circle(position.x, position.y, 48);
  }
  ```

  <iframe width="640px" height="282px" src="https://editor.p5js.org/urbanscratcher/full/GmszeLppO"></iframe>

:::info[연습문제 1.1]
이전에 만든 예제가 있다면 x, y가 따로 작성된 코드를 벡터 클래스를 사용해 변경해보기
:::

:::info[연습문제 1.2]
소개 부분에서 만들었던 랜덤 워크 예제를 벡터 클래스를 사용해 변경해보기
:::

:::info[연습문제 1.3]
튕기는 공 예제를 3차원으로 만들어 보기. 공이 사각형 평면이 아니라 3차원 정육면체에서 돌아다니도록 만들기.

<iframe width="420px" height="450px" src="https://editor.p5js.org/urbanscratcher/full/LZpMiPnm5"></iframe>
:::
