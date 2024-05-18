---
sidebar_position: 2
---

# 2. 회전 운동

## 회전 운동 공식

- 위치, 속도, 가속도의 관계처럼,
  - [속도] = [속도] + [가속도]
  - [위치] = [위치] + [속도]
- 회전하는 객체에도 같은 논리를 적용할 수 있습니다.
  - 각속도 = 각속도 + 각가속도
  - 각도 = 각도 + 각속도
- 2D 공간에서 각도는 벡터가 아니라 스칼라 양이기 때문에 더 간단하죠. 2D 공간에는 하나의 회전 축이 있기 때문입니다.
- 3D 공간에서는 각도가 벡터가 됩니다.
  - 보통 시간의 변화($\Delta t$)에 의한 곱셈을 합니다.
  - p5.js에서 $1$프레임$=1\Delta t$ 입니다.

### 예제 코드 3.1: rotate()를 사용한 각운동

- 연습문제 3.1에서 가속이 붙는 각운동을 표현해 봅시다.

```js
let angle = 0; // 각도 (위치)
let angleVelocity = 0; // 각속도 (속도)
let angleAcceleration = 0.0001; // 각가속도 (가속도)

function setup() {
  createCanvas(640, 240);
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

  rotate(angle); // 회전

  stroke(0);
  fill(127);
  line(-60, 0, 60, 0);
  circle(60, 0, 16);
  circle(-60, 0, 16);

  angleVelocity += angleAcceleration; // 각속도 = 각속도 + 각가속도
  angle += angleVelocity; // 각도 = 각도 + 각속도
}
```

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/zUg5c5ufz"></iframe>

:::info[연습문제 3.2]
마우스로 가속도를 제어해 봅시다. 각속도를 점점 감소시켜서 지휘봉이 정지하게 되는 항력을 나타내 보아요.

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/eyMSVh3j4"></iframe>
:::

## Mover 클래스 적용

- **`Mover`** 클래스를 도입해 봅시다.

```js
class Mover {
  constructor() {
    this.position = createVector();
    this.velocity = createVector();
    this.acceleration = createVector();
    this.mass = 1.0;

    // 각운동 관련 변수
    this.angle = 0;
    this.angleVelocity = 0;
    this.angleAcceleration = 0;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    // 각운동 적용
    this.angleVelocity += this.angleAcceleration;
    this.angle += this.angleVelocity;

    this.acceleration.mult(0);
  }

  display() {
    stroke(0);
    fill(175, 200);

    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    circle(0, 0, this.mass * 20);
    line(0, 0, this.mass * 10, 0);
    pop();
  }
}
```

- 그런데 이 객체는 이전처럼 회전하지 않습니다.
- 각가속도가 0 (**`this.angleAccelration = 0`**)으로 초기화 돼 있기 때문이죠.
- 물체가 회전하려면 이 초기화 값을 하드코딩 해야 합니다.
  ```js
  this.angleAcceleration = 0.01;
  ```

### 각가속도 값

- 토크(toque)와 관성 모멘트(mement of inertia)를 적용하면 이 운동을 좀 더 흥미롭게 만들 수 있습니다.
  - 추후 [진자의 운동]과 [6장]에서 더 살펴볼게요.
- 지금은 그냥 가속도 벡터로 값을 임의로 입력해 각가속도를 계산하겠습니다.

  ```js
  this.angleAcceleration = this.acceleration.x;
  ```

- 이렇게 두면, 바퀴처럼 객체가 오른쪽으로 가속할 때는 각가속도가 시계 방향으로, 왼쪽으로 가속할 때는 반시계 방향으로 회전합니다.
- 각가속도가 너무 크니 임의의 수로 나누어 주거나 값을 제한합니다.

### 예제 코드 3.2: 임의의 회전 운동

```js
update(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);

  // 가속도의 x 성분에 따라 각가속도 계산
  this.angleAcceration = this.acceleration.x / 10.0;
  this.angleVelocity += this.angleAcceleration;

  // 각속도 값 제어
  this.angleVelocity = constrain(this.angleVelocity, -0.1, 0.1);
  this.angle += this.angleVelocity;

  this.acceleration.mult(0);
}
```

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/BE55jVzFJ"></iframe>

:::info[]

- 1단계: 대포에서 물체가 발사되는 시뮬레이션을 만듭시다. 각 물체는 발사될 때 일회성의 강한 힘(발사력)을 받아야 하며, 항상 중력도 작용해야 합니다.
- 2단계: 물체에 회전을 추가해 대포에서 발사될 때의 회전 동작을 모델링해 봅시다. 가능한 한 사실적으로 보이도록 만듭니다.
  :::
