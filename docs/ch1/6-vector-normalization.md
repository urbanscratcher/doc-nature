---
sidebar_position: 6
---

# 6. 벡터 정규화

- 벡터에서 표준은 길이가 1인 벡터인 **단위 벡터(unit vector)**
- 벡터를 정규화한다는 것은 방향은 유지하고, 길이만 1로 변경하는 것
- <img width="200px" src="https://natureofcode.com/static/cceaa06da952441c0e507fc131e6875a/a7874/01_vectors_15.webp"/>
- 단위 벡터는 방향을 알려줄 수 있어 유용함
- 벡터 정규화 식: $\hat{u} = \frac{\overrightarrow{u}}{||\overrightarrow{u}||}$

```js
function normalize() {
  const m = mag();

  // 길이가 0인 경우 나눗셈이 불가능하므로 제외
  m > 0 && this.div(m);
}
```

```js
function draw() {
  background(255);

  let mouse = createVector(mouseX, mouseY);
  let center = createVector(width / 2, height / 2);
  mouse.sub(center);

  translate(width / 2, height / 2);
  stroke(200);
  strokeWeight(2);
  line(0, 0, mouse.x, mouse.y);

  // 벡터 정규화
  mouse.normalize();
  // 길이 * 50 (늘 50px의 길이를 가짐)
  mouse.mult(50);

  stroke(0);
  strokeWeight(8);
  line(0, 0, mouse.x, mouse.y);
}
```

<iframe width="640px" height="282px" src="https://editor.p5js.org/urbanscratcher/full/8bnhmE3P5"></iframe>
