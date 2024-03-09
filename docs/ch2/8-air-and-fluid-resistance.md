---
sidebar_position: 8
---

# 8. 공기 저항과 유체 저항

- 기체나 액체를 지나는 경우에도 마찰력이 발생함
- 이런 경우 마찰력 대신 점성력(viscous force), 저항력(drag force), 유체 저항(fluid resistance)라고 함

<img width="50%" src ="https://natureofcode.com/static/d81ff2fa249f101addd4ea5a4290b24e/51199/02_forces_5.webp"/>

## 저항력 공식

- $F_d = - \frac{1}{2} \rho v^2 A C_d \hat v$
  - $F_d$: 저항력
  - $- \frac{1}{2}$: 상수. -1을 곱하므로 속도와 방향과 반대
  - $\rho$: 액체의 밀도. 1로 가정
  - $v$: 움직이는 객체의 속력. 속도 벡터의 길이
  - $C_d$: 저항 계수(coefficient of drag)
  - $\hat v$: 속도의 방향을 나타내는 단위 벡터

### 간략화된 공식

- $F_d = ||v||^2 \times c_d \times \hat v \times -1$
  - $||v||^2 \times c_d$: 벡터의 크기
  - $\hat v \times -1$: 벡터의 방향

```js
const c = 0.1;
const speed = this.velocity.mag();
// 크기
const dragMagnitude = c * speed * speed;
const drag = this.velocity.copy();
// 방향
drag.mult(-1);
drag.setMag(dragMagnitude);
```

## 저항력 적용

- 위치, 너비, 높이, 저항력을 갖는 Liquid 클래스 정의

```js
class Liquid {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    // 저항계수
    this.c = c;
  }

  show() {
    noStroke();
    fill(175);
    rect(this.x, this.y, this.w, this.h);
  }
}

let liquid;
function setup() {
  // 약한 저항력을 정의하기 위해 c = 0.1 적용
  liquid = new Liquid(0, height / 2, width, height / 2, 0.1);
}
```

## Mover 객체가 Liquid 객체의 영역을 지날 때

```js
if (liquid.contains(mover)) {
  let dragForce = liquid.calculateDrag(mover);
  mover.applyForce(dragForce);
}
```

- Liquid 클래스에 함수를 추가해야 함
  1. **`contains()`** : Mover 객체가 Liquid 객체의 영역 내에 있는지 확인
  2. **`calculateDrag()`** : Mover 객체에 적용될 저항력을 계산해 리턴

### contains()

```js
contains(mover){
  const loc = mover.location;
  return (loc.x > this.x && loc.x < this.x + this.w && loc.y > this.y && loc.y < this.y + this.h);
}
```

### calculateDrag()

- 저항력 = 속력 $\times$ 속력 $\times$ 저항계수 $\times$ 속도의 반대 방향

```js
calculateDrag(mover){
  const speed = mover.velocity.mag();
  const dragMagnitude = this.c * speed * speed;
  const dragForce = mover.velocity.copy();
  dragForce.mult(-1);
  dragForce.setMag(dragMagnitude);
  return dragForce;
}
```

### 예제 코드 2.5: 유체 저항력

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/3ukZ2y8cu"></iframe>

```js
let movers = [];
let liquid;

function setup() {
  createCanvas(640, 240);
  reset();

  movers = Array.from({ length: 9 }, (m, i) => {
    const mass = random(0.1, 5);
    return new Mover(40 + i * 70, 0, mass);
  });

  liquid = new Liquid(0, height / 2, width, height / 2, 0.1);
}

function draw() {
  background(255);
  liquid.display();

  movers.forEach((m, i) => {
    // Mover가 Liquid 영역에 있는지 확인
    if (liquid.contains(m)) {
      // 저항력
      let dragForce = liquid.calculateDrag(m);
      m.applyForce(dragForce);
    }

    // 중력
    let gravity = createVector(0, 0.1 * m.mass);
    m.applyForce(gravity);

    m.update();
    m.display();
    m.checkEdges();
  });
}
```

:::info[연습문제 2.5]
저항력의 크기 = 저항 계수 $\times$ 속력 $\times$ 속력. 따라서 물체의 속력이 빠를수록 저항력은 크게 작용함. 참고로 공식에 따라 물 속에서 움직이지 않는(속력이 0) 물체는 저항력이 0임. 이를 실험하기 위해 같은 크기의 물체를 다른 높이에서 떨어뜨려보기
:::
:::info[연습문제 2.6]
원래 저항력 공식에는 액체나 기체와 닿는 앞쪽 면적인 A라는 기호가 있음. 상자를 만들고, 상자의 크기에 따라 저항력이 적용되도록 만들어 보기
:::
:::info[연습문제 2.7]
사실 유체 저항은 속도의 반대 방향으로만 작용하지 않음. 직각 방향으로도 작용하는데, 이러한 것을 양력(lift-induced drag())라고 함. 비행기의 날개가 조금 기울어져서 유체 저항을 받을 때 날 수 있게 만드는 힘이 양력임. 직접 구현해보기.
:::
