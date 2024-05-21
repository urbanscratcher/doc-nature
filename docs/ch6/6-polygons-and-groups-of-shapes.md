---
sidebar_position: 6
---

# 6. 폴리곤과 셰이프 그룹

- 여러 모양으로 구성된 복합적인 보디를 상상해보세요.
  <img src="https://natureofcode.com/static/c5454d110953f31a394391813b390e5e/d94c5/06_libraries_5.webp" class="img-full" />
- **`Bodies.polygon()`** 을 이용해 다각형을 만들거나, **`Bodies.trapezoid()`** 사다리꼴을 만들 수 있습니다.
  ```js
  // 정육각형
  let hexagon = Bodies.polygon(x, y, 6, radius);
  // 사다리꼴
  let trapezoid = Bodies.trapezoid(x, y, width, height, slope);
  ```
- 더 일반적인 방식은 **`Bodies.fromVertices()`** 을 이용해 벡터 배열 내 꼭지점(vertex)들이 연결된 도형으로 다루는 것입니다.
- **`CustomShape`** 클래스로 이 로직을 캡슐화하겠습니다.

## 예제 코드 6.4: 폴리곤 셰이프

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/Qsl5iCxEo"></iframe>

```js
class CustomShape {
  constructor(x, y) {
    let vertices = [];
    vertices[0] = Vector.create(-10, -10);
    vertices[1] = Vector.create(20, -15);
    vertices[2] = Vector.create(15, 0);
    vertices[3] = Vector.create(0, 10);
    vertices[4] = Vector.create(-20, 15);

    // 꼭지점들이 이어진 모양의 보디
    let options = { restitution: 1 };
    this.body = Bodies.fromVertices(x, y, vertices, options);

    Body.setVelocity(this.body, Vector.create(random(-5, 5), 0));
    Body.setAngularVelocity(this.body, 0.1);
    Composite.add(engine.world, this.body);
  }
}
```

## 다각형 생성시 주의할 점

1. 꼭지점을 시계방향 순서로 생성해야 합니다.

  <img src="https://natureofcode.com/static/cc0dfdf2934354c216e41668aa61f1ea/0f46f/06_libraries_6.webp" class="img-2to3" />

2. 각 모양은 오목형(concave)이 아니라 볼록형(convex)이어야 합니다. 볼록한 모양의 모든 내부 각도는 180도 이하여야 합니다.

   <img src="https://natureofcode.com/static/a665c13e3d4b69e64a1e7b16e5352d25/dab04/06_libraries_7.webp" class="img-full" />

3. 꼭지점을 그릴 때는 **`beginShape()`** 로 시작해 **`endShape()`** 로 끝냅니다.

- 이렇게 하면 Matter.js 보디가 꼭지점의 위치를 절대적 위치로 받아들이기 때문에 **`translate()`** 이나 **`rotate()`** 를 사용하지 않아도 됩니다.

```js
show() {
  fill(127);
  stroke(0);
  strokeWeight(2);

  // 모양 시작
  beginShape();
  // 꼭지점 그리기
  for (let v of this.body.vertices) {
    vertex(v.x, v.y);
  }
  // 모양 끝내기
  endShape(CLOSE);
}
```

:::info[연습 문제 6.3]
**`Bodies.fromVertices()`** 를 사용해 자신만의 다각형 디자인을 만듭니다(볼록형이어야 합니다). 몇 가지 예시가 있습니다.
<img src="https://natureofcode.com/static/266f0f7ab5a973280bf80dfa405ea62f/b7c09/06_libraries_8.webp" class="img-full" />
:::

## 여러 다각형 조합하기

- 막대 사탕을 그려봅시다.
- **`parts`** 배열을 이용해 각 부분의 도형들을 한 보디로 만들 수 있습니다.
  ```js
  let part1 = Bodies.rectangle(x, y, w, h);
  let part2 = Bodies.circle(x, y, r);
  let body = Body.create({ parts: [part1, part2] });
  Composite.add(engine.world, body);
  ```
- 그런데 이를 실행하면 모두 동일한 (x, y)에 중심점을 두게 됩니다.
  <img src="https://natureofcode.com/static/e393d1bb396343f191f68ccf9257a6fb/7858c/06_libraries_9.webp" class="img-full" />
- 원의 중심을 이동시키기 위해서는 수평으로 오프셋 값을 줘야 합니다.
  <img src="https://natureofcode.com/static/cf52a857a97e998863a54c7a5afc0d47/8442e/06_libraries_10.webp" class="img-full" />
- 직사각형 폭의 1/2을 오프셋 값으로 설정해 봅시다.
  ```js
  let part1 = Bodies.rectangle(x, y, w, h);
  // 수평의 오프셋 값 추가
  let offset = w / 2;
  let part2 = Bodies.circle(x + offset, y, r);
  ```

### 예제 코드 6.5: 한 보디 내 여러 다각형

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/1xnvLQSwW"></iframe>

```js
  display() {
    let angle = this.body.angle;

    // 각 부분의 위치 가져오기
    let position1 = this.part1.position;
    let position2 = this.part2.position;

    fill(200);
    stroke(0);

    // 직사각형(part1)을 변환하고 회전
    push();
    translate(position1.x, position1.y);
    rotate(angle);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();

    // 원(part2)을 변환하고 회전
    push();
    translate(position2.x, position2.y);
    rotate(angle);
    circle(0, 0, this.r * 2);
    pop();

  }
```

- 각 부분 뿐만 아니라 복합체 자체에도 위치(**`this.body.position`**)가 있습니다.
  ```js
  show() {
    // 복합체 자체로부터 위치 얻기
    let position = this.body.position;
    let angle = this.body.angle;
    push();
    translate(position.x, position.y);
    rotate(angle);
    rect(0, 0, this.w, this.h);
    circle(0, this.h / 2, this.r * 2);
    pop();
  }
  ```
- 그런데 복합체 자체에서 정보를 얻으면 이상한 방식으로 겹쳐집니다.
- 보디 위치가 직사각형의 중심이 아니라 직사각형과 원 사이의 질량 중심으로 설정되기 때문이죠.
- 즉, Matter.js는 각 보디를 잘못된 위치에 그리고 있습니다.

:::info[연습 문제 6.4]
하나의 보디에 여러 도형들을 붙여 작은 외계 생명체를 만들어보세요.

p5.js의 기본 도형 그리기 기능만 사용할 수 있는 것은 아니란 걸 기억하세요. 이미지와 색상을 사용하고, 선으로 머리카락을 추가하는 등의 작업을 할 수 있습니다.
:::
