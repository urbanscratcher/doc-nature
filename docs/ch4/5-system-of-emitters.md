---
sidebar_position: 5
---

# 5. 파티클 방출구 시스템

- 파티클 방출구의 집합, 즉, 시스템의 시스템을 구축해 봅시다.
- 마우스를 클릭할 때마다 입자를 방출해 봅니다.

## 예제 코드 4.4: 시스템의 시스템

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/7CSzQeXf_"></iframe>

```js
let emitters = [];

function setup() {
  createCanvas(640, 240);
}

function mousePressed() {
  emitters.push(new Emitter(mouseX, mouseY));
}

function draw() {
  background(255);

  for (let emitter of emitters) {
    emitter.addParticle();
    emitter.run();
  }
}
```

:::info[연습 문제 4.5]
예시 4.4를 재작성해 각 입자 시스템이 영원히 존재하지 않도록 만들어 봅시다. 각 시스템이 생성할 수 있는 입자 수에 제한을 둡니다. 그리고 입자 시스템에 남아있는 입자가 없으면(비어 있으면) **`emitters`** 배열에서 제거합니다.
:::

:::info[연습 문제 4.6]
물체가 많은 조각으로 부서지는 시뮬레이션을 만들어 봅시다. 어떻게 하나의 큰 도형을 많은 작은 입자로 만들까요? 화면에 여러 개의 큰 도형을 만들고 각각을 클릭하면 산산조각 나도록 할 수 있을까요?
:::
