---
sidebar_position: 5
---

# 5. 벡터 크기

- 벡터 크기는 피타고라스 정리를 이용해 거리를 구하면 되는데, p5js에서는 **`mag()`** 함수를 이용

```js
mag(){
  return sqrt(this.x * this.x + this.y * this.y);
}
```

```js
function draw() {
  background(255);

  let mouse = createVector(mouseX, mouseY);
  let center = createVector(width / 2, height / 2);
  mouse.sub(center);

  // 길이 구하기
  const m = mouse.mag();
  fill("#f194a4");
  text(round(m, 1) + "px", 20, 40);

  translate(width / 2, height / 2);
  line(0, 0, mouse.x, mouse.y);
}
```

<iframe width="640px" height="282px" src="https://editor.p5js.org/urbanscratcher/full/ikHsKrdW2"></iframe>
