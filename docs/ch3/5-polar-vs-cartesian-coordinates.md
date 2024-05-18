---
sidebar_position: 5
---

# 5. 극 좌표계와 직교 좌표계

- 지금까지 물체를 화면에 그릴 때 x좌표와 y좌표를 사용했습니다.
  - 이런 좌표계를 직교 좌표계(Cartesian Coordinates)라고 부르는데, 이는 프랑스 수학자 르네 데카르트가 개발해 데카르트 좌표계라고도 합니다.
- 이외에 극 좌표계(Polar Coordinates)는 좌표를 원점으로부터의 거리와 회전 각도($\theta$)로 나타냅니다.
- 정리하면,
  - 직교 좌표계: 벡터의 x, y 요소
  - 극 좌표계: 벡터 크기(길이)와 방향(각도) 요소

<img class="img-4to5" src="https://natureofcode.com/static/fbe7911ff98aeec466adcd6eab5876c0/6bd07/03_oscillation_9.webp" />

## 극 좌표계

- 회전을 사용할 때는 극 좌표계를 사용하는 것이 편리할 수 있습니다.
- $\sin(\theta)=\frac{y}{r} \to x=r\times\sin(\theta)$
- $\cos(\theta)=\frac{x}{r} \to y=r\times\cos(\theta)$

```js
let r = 75;
let theta = PI / 4;

// 극 좌표계 변환
let x = r * cos(theta);
let y = r * sin(theta);
```

### 예제 코드 3.4: 극 좌표에서 직교 좌표로의 변환

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/UI98Z7ZR-"></iframe>

```js
let r;
let theta;

function setup() {
  createCanvas(640, 240);

  // 초기화
  r = height * 0.45;
  theta = 0;
}

function draw() {
  background(255);
  translate(width / 2, height / 2); // 원점을 화면 중앙으로 이동

  // 극 좌표계 -> 직교 좌표계 변환
  let x = r * cos(theta);
  let y = r * sin(theta);

  fill(127);
  stroke(0);
  line(0, 0, x, y);
  circle(x, y, 48);

  // 각도 더하기
  theta += 0.02;
}
```

- p5에서는 이러한 변환을 용이하게 하기 위해 **`p5.Vector`** 의 정적 메서드 **`fromAngle()`** 을 내장하고 있습니다.

```js
// 각도의 방향을 가리키는 단위 벡터 생성
let position = p5.Vector.fromAngle(theta);
// 위치를 r만큼 늘리기
position.mult(r);
// 벡터 x, y 성분을 이용해 원 그리기
circle(position.x, position.y, 40);
```

:::info[연습 문제 3.5]
예제 3.4를 기반으로 나선형 경로를 그려 봅시다. 중심에서 시작하여 바깥쪽으로 이동해야 합니다. 단 한 줄의 코드를 변경하고, 한 줄의 코드를 추가하기만 하면 됩니다.
:::

:::info[연습 문제 3.6]
_Asteroids_ 게임의 우주선을 시뮬레이션하세요.

*Asteroids*에 대해 잘 모르시는 분들을 위해 간단히 설명하자면: 삼각형 모양의 우주선이 2D 공간에서 운행합니다. 왼쪽 화살표 키를 누르면 우주선이 반시계 방향으로 회전하고, 오른쪽 화살표 키를 누르면 시계 방향으로 회전합니다. Z 키를 누르면 우주선이 향하고 있는 방향으로 추진력이 가해집니다.
:::
