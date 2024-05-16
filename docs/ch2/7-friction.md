---
sidebar_position: 7
---

# 7. 마찰력

## 마찰력이란

- $\vec {Friction} = -\mu N \hat v $
  - $\mu$: 마찰 계수. 특정 물체의 표면에서 발생하는 마찰력의 강도
  - $N$: 수직력
  - $\hat v$: 단위 벡터
- 마찰력은 흩어지는 힘(dissipative force)으로, 물체가 움직일 때 전체 에너지를 감소시키는 힘을 의미합니다.
- 2개의 표면이 만나면 마찰력이 발생하는데, 마찰력은 크게 정지 마찰력(static friction)과 운동 마찰력(kinetic friction)으로 나뉩니다. (여기서는 운동 마찰력만 다룹니다)

<img width="60%" src="https://natureofcode.com/static/dd34ffadda4093e094eb5762e0fb8aec/fbdf6/02_forces_4.webp" />
### 예: 자동차 브레이크

- 자동차를 타고 달리다 브레이크를 밟으면 타이어의 움직임이 마찰력에 의해 감소돼요.
- 그리고 운동 에너지가 열 에너지로 변경됩니다.

## 마찰력의 방향

- 공식에 따르면, $-1 \times \hat v$ 는 마찰력의 방향으로, 속도의 반대 방향으로 발생해요.
- 따라서 속도를 나타내는 벡터를 정규화하고, -1을 곱해 마찰력의 방향을 구할 수 있습니다.

```js
const friction = mover.velocity.copy();
friction.normalize();
friction.mult(-1); // 속도의 반대 방향
```

## 마찰력의 크기

- 나머지 $\mu \times N$ 를 계산해 벡터의 크기를 구해요.

### 마찰계수

- 마찰계수 $\mu$ 가 클수록 마찰력은 강해지고, 작을수록 약해집니다.
  - 예: 얼음 표면은 나무 표면보다 마찰 계수가 작아요.
- 여기서는 임의의 마찰계수 부여해 보아요.

```js
const c = 0.01;
```

### 수직력

- 수직력 $\N$ 은 움직임의 방향과 수직되는 힘입니다.
  - 예: 자동차는 중력으로 도로를 누르지만, 뉴턴의 운동 3법칙에 따라 길도 자동차를 미는데, 이 힘이 수직력
- 중력으로 생성된 힘이 강할수록 수직력은 강해집니다.
  - 예: 가벼운 스포츠카는 무거운 포크레인보다 마찰력이 작아요.
- 경사진 곳에서 이동하는 경우 수직력은 중력과 같지 않으며 삼각법을 이용해야 합니다. (이 장에서는 1로 가정합니다)

```js
const normal = 1;
```

## 마찰력의 방향과 크기

```js
const c = 0.01;
const normal = 1;

// 마찰력의 크기
const frictionMag = c * normal;
const friction = mover.velocity.copy();

// 마찰력의 방향
friction.normalize();
friction.mult(-1);

// 방향을 나타내는 단위 벡터와 크기를 곱해 마찰력을 구함
friction.mult(frictionMag);
```

## 마찰력 적용

- 여기서는 무버가 1픽셀 내에 있을 때 가장자리에 닿는 경우 마찰력을 적용해 보아요.

```js
contactEdge(){
  return (this.position.y > height - this.radius - 1)
}
```

- 실제 가장자리에서 튀어오르는 것은 이상적인 탄성 충돌에 가까워요.
- 탄성 충돌에서는 원과 가장자리가 충돌할 때 운동 에너지가 손실되지 않습니다.
- 비탄성 충돌을 쉽게 흉내내려면 공이 튕길 때마다 속도의 크기를 비율적으로 줄이면 돼요.

```js
bounceEdge(){
  let bounce = -0.9;
if (this.position.y > height - this.radius) {
    this.position.y = height - this.radius;
    this.velocity.y *= bounce;
  }}
```

### 예제 코드 2.4: 마찰력 적용

- 마찰력을 적용하면 공의 속도가 느려지면서 정지합니다.
<iframe width="650" height="340" src="https://editor.p5js.org/urbanscratcher/full/u607sQtbx"></iframe>

```js
function draw() {
  background(255);

  let gravity = createVector(0, 1);

  // 더 정확하게 하려면 질량을 기준으로 크기를 조정해야 하지만, 이 예에는 원이 하나만 존재하므로 생략
  mover.applyForce(gravity);

  if (mouseIsPressed) {
    let wind = createVector(0.5, 0);
    mover.applyForce(wind);
  }

  if (mover.contactEdge()) {
    let c = 0.1;
    let friction = mover.velocity.copy();
    friction.mult(-1);
    friction.setMag(c);

    // 마찰력 벡터를 객체에 적용
    mover.applyForce(friction);
  }

  // 비탄성 충돌
  mover.bounceEdges();
  mover.update();
  mover.show();
}
```

:::info[연습문제 2.6]
예제 코드 2.4에 공을 하나 더 추가해 보아요. 각 물체가 바닥 표면에 대해 고유한 마찰 계수를 가지고 있다면? Mover 클래스 내 메서드로 마찰력 계산을 캡슐화 하는 것이 적절할까요?
:::

:::info[연습문제 2.7]
바람을 이용하는 대신, 마우스 조작을 통해 공을 던지도록 기능 추가해요.
:::
