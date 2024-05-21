---
sidebar_position: 5
---

# 5. 정적 Matter.js 보디

- 연습 문제 6.2에서는 **`Box`** 객체가 마우스 위치에 나타나고, 중력으로 인해 아래로 떨어집니다.
- 떨어지는 물체를 받치는 경계선을 추가하려면 **`isStatic`** 을 이용하면 됩니다.
  ```js
  let options = { isStatic: true };
  let boundary = Bodies.rectangle(x, y, w, h, options);
  ```

## 예제 코드 6.3: 경계선에 부딪히는 떨어지는 상자

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/p3l1DmWlW"></iframe>

- 정적 보디(Static bodies)들은 **`restitution`** 이나 **`friction`** 과 같은 재료의 성질을 포함하지 않습니다.
- 이러한 성질이 필요하다면 동적인 보디로 만드세요.

```js
class Boundary {
  // 경계는 x, y, 너비 및 높이가 있는 간단한 직사각형
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    // isStatic을 true로 설정해 제자리에 고정
    let options = { isStatic: true };

    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options);
    Composite.add(engine.world, this.body);
  }

  // 경계는 절대 이동할 수 없으므로 show()는 원래 변수를 사용해 기존 방식으로 경계를 그릴 수 있음
  // Matter.js를 사용하지 않아도 됨
  show() {
    rectMode(CENTER);
    fill(127);
    stroke(0);
    strokeWeight(2);
    rect(this.x, this.y, this.w, this.h);
  }
}
```
