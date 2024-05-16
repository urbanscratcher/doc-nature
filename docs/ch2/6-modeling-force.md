---
sidebar_position: 6
---

# 6. 힘의 모방

- 이전 예제는 바람의 힘은 잘 나타낼 수 있습니다.
- 하지만 질량이 다른 물체의 중력 가속도는 동일하므로, 중력을 잘 나타내지는 못합니다. (피사의 사탑)
- 중력은 물체의 질량이 클수록 더 크게 작용하기 때문이죠.
- 따라서 크기가 크면 중력을 더 강하게 작용해줘야 합니다.

```js
const wind = createVector(0.001, 0);
movers.forEach((m) => {
  // 중력 보정
  const gravity = createVector(0, 0.1 * m.mass);

  m.applyForce(wind);
  m.applyForce(gravity);

  m.update();
  m.display();
  m.checkEdges();
});
```

## 질량에 따라 중력 다르게 작용하기

```js
let gravity = createVector(0, 0.1);

let gravityA = p5.Vector.mult(gravity, moverA.mass);
moverA.applyForce(gravityA);
let gravityB = p5.Vector.mult(gravity, moverB.mass);
moverB.applyForce(gravityB);
```

<iframe width="650" height="340" src="https://editor.p5js.org/urbanscratcher/full/8HLucS8br"></iframe>

## 다른 힘들

- 중력, 전자기력, 마찰력, 장력, 탄성력 등 다른 힘도 모방할 수 있습니다.
