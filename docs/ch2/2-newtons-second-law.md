---
sidebar_position: 2
---

# 2. 뉴턴의 운동 2법칙

- $\vec F = m \times \vec A$
- $\vec A = \frac{\vec F}{m}$
- 물체에 가하는 힘이 커질 수록 가속도도 커지고, 빠른 속도로 움직일 것임
- 그런데 물체가 무겁다면 가속도가 작아지기 때문에 느리게 움직일 것임
- 즉, 힘과 가속도는 반비례 관계

:::note[무게와 질량]

- **질량(mass)**: 어떤 물체가 가지고 있는 물질의 양 ($kg$)
- **무게(weight)**: 중력이 해당 물체에 얼마나 큰 힘을 작용하는지 의미. ($N$)
- **밀도(density)**: 특정한 부피에서의 질량 ($kg/m^3$)
  :::

## 물체의 움직임과 힘

- p5js에서 질량은 1이라고 가정하면, $\vec F = \vec A$
- 1장에서 우리는 물체의 움직임을 제어하는 핵심 요소로 가속도를 사용했음
- 사실상 모든 움직임의 시작은 **힘**

## p5js와 힘

```js
class Mover {
  constructor() {
    this.position = createVector();
    this.velocity = createVector();
    this.acceleration = createVector();
  }
}
```

- 여기에 힘 벡터를 적용하는 함수를 구현

```js
mover.applyForce(wind);
// or
mover.applyForce(gravity);

applyForce(force){
  this.acceleration = force;
}
```

### 문제점

```js
mover.applyForce(wind);
mover.applyForce(gravity);
mover.update(); // gravity만 적용
mover.display();

// update 함수 내부
update() {
  this.velocity.add(this.acceleration)
}
```

- 위 코드는 wind, gravity와 같은 여러 힘을 모두 적용할 수 없음
- 힘을 축적하는 방법이 필요
