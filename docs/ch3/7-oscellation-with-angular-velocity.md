---
sidebar_position: 7
---

# 7. 각속도와 진동

- 단순 조화 운동에 관한 예제를 더 쉽게 만드는 방법이 있습니다.
- 진동에 관련된 공식을 살펴보죠.

```js
let x = amplitude * cos(TWO_PI * (frameCount / period));
// 이를 간단히 표현하면
let x = amplitude * cos(조금씩 증가하는 값);
```

- 정확한 진동 주기가 없는 경우, 삼각함수 내부에서는 조금씩 증가하는 값만 있다면 객체가 프레임 간 부드럽게 움직이는 것처럼 보일 것입니다.
- 이 값이 $2\pi$의 배수를 지날 때마다 객체는 한 주기의 진동을 완료합니다.
- 이는 [0장](../ch0/6-perlin-noise.md)에서 펄린 노이즈를 다룰 때와 유사한 방식입니다.
- 그때는 **`offset`** 변수를 증가시켜 **`noise()`** 에서 다양한 출력값을 샘플링해 값의 부드러운 전환을 만들었습니다.
- 이제는 **`sin()`** 에 전달될 값(**`angle`** 이라고 부를게요)을 증가시킬 것입니다.
- 차이점은 **`sin()`** 의 출력값이 부드럽게 반복되는 사인파이며 무작위성이 없다는 점입니다.
- 조금씩 증가하는 값을 **`angle`** 부르는 이유는, 삼각함수가 받는 값이 보통 각도이기 때문입니다.

## 각속도 개념 적용

- 각속도와 각가속도 개념을 다시 사용해보죠.

```js
let angle = 0;
let angleVelocity = 0.05;
```

- 이것을 다시 쓰면,

```js
function draw() {
  angle += angleVelocity;
  let x = amplitude * sin(angle);
}
```

- 여기서 **`angle`** 가 바로 **조금씩 증가하는 값** 이고, 증가량은 **`angleVelocity`** 입니다.

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/ZtfSaA2Nb"></iframe>

```js
let angle;
let angleVelocity;

function setup() {
  createCanvas(640, 240);
  angle = 0;
  angleVelocity = 0.05;
}

function draw() {
  background(255);

  let amplitude = 100;
  let x = amplitude * sin(angle);
  angle += angleVelocity; // 각속도 개념 사용

  translate(width / 2, height / 2);
  strokeWeight(2);
  fill(127);
  line(0, 0, x, 0);
  circle(x, 0, 40);
}
```

- 주기(period)는 나타나 있지 않지만, 결국 각속도가 클수록 원은 더 빠르게 진동하고, 주기는 짧아집니다.
- 한마디로 주기는 **`angle`** 이 $2\pi$ 만큼 증가하는 데 걸리는 프레임 수입니다.
- **`angle`** 증가량은 각속도에 의해 제어됩니다. 따라서,
- $주기=\frac{2\pi}{각속도}$

## Oscillator 클래스

- **`Oscillator`** 클래스로 이 개념을 더 확장해보죠.
- 이 클래스의 객체는 x축, y축을 모두로 진동하는데요, 2개의 각, 2개의 각속도, 2개의 진폭이 필요합니다. 벡터 클래스를 사용하면 편리하겠죠?

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/G3k8QjBXo"></iframe>

```js
class Oscillator {
  constructor() {
    // 벡터 클래스 사용
    this.angle = createVector();
    this.angleVelocity = createVector(random(-0.05, 0.05), random(-0.05, 0.05));
    this.amplitude = createVector(
      random(20, width / 2),
      random(20, height / 2)
    );
  }

  update() {
    this.angle.add(this.angleVelocity);
  }

  show() {
    let x = sin(this.angle.x) * this.amplitude.x;
    let y = sin(this.angle.y) * this.amplitude.y;

    push();
    translate(width / 2, height / 2);
    stroke(0);
    fill(127);
    line(0, 0, x, y);
    circle(x, y, 32);
    pop();
  }
}
```

- 이 클래스를 이해하는 데 있어 요점은, **`this.angle`**, **`this.angleVelocity`**, **`this.amplitude`** 의 **`x`**, **`y`** 가 더이상 공간 벡터와 관련 없다는 점입니다.
- 대신 이 속성들은 x축, y축에 대한 진동을 위해 각각 존재합니다.
- 이러한 진동은 최종적으로 **`display()`** 에서 진동을 물체에 대한 위치로 계산될 때 공간적으로 표현됩니다.

:::info[연습 문제 3.8]
Oscillator 객체 각각에 무작위가 아닌 속도와 진폭으로 초기화하여 일종의 규칙적인 패턴을 만들어 보세요. oscillator들이 곤충과 같은 생물체의 다리처럼 보이게 할 수 있을까요?
:::

:::info[연습 문제 3.9]
Oscillator 객체에 각가속도 개념을 적용해 보세요.
:::
