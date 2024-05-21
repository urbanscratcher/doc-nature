---
sidebar_position: 4
---

# 4. Matter.js와 p5.js

- Matter.js는 세계에 존재하는 모든 보디를 가지고 있으며, **`Render`**와 **`Runner`** 객체를 통해 보디들(**`engine.world.bodies`** 에 저장됩니다)을 그리고 동작하게 만들 수 있습니다.
- p5.js를 사용해 Matter.js 보디들을 그리기 위해, 자체적으로 Matter.js 보디 목록을 유지하는 기법을 알아봅시다.
  - 이 방법은 약간 중복되고, 비효율적일 수 있지만, 편리하고 커스터마이징이 가능합니다.

## Box 클래스

- 먼저 **`Box`** 클래스를 작성해 봅시다.
  ```js
  class Box {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.w = 16;
    }
    display() {
      rectMode(CENTER);
      fill(127);
      stroke(0);
      strokeWeight(2);
      square(this.x, this.y, this.w);
    }
  }
  ```
- 마우스를 클릭할 때마다 새 객체를 생성하고, 모든 객체를 배열에 저장하도록 만듭니다.

### 예제 코드 6.2: 익숙한 p5.js 코딩 방식

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/aBTzwDL-b"></iframe>

```js
let boxes = []; // 모든 Box 객체를 저장할 배열

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(255);
  if (mouseIsPressed) {
    let box = new Box(mouseX, mouseY);
    boxes.push(box); // 마우스를 클릭할 때마다 새로운 Box 객체를 추가
  }

  for (let box of boxes) {
    box.display(); // 모든 Box 객체를 표시
  }
}

// Box 클래스
class Box {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 16;
  }

  display() {
    rectMode(CENTER);
    fill(127);
    stroke(0);
    strokeWeight(2);
    square(this.x, this.y, this.w);
  }
}
```

- 문제는 상자가 고정돼 있다는 점입니다. Matter.js를 이용해 움직이는 상자를 그려봅시다.

## 1단계: p5.js 스케치에 Matter.js 추가

- p5.js의 **`draw()`** 가 반복하는 매 프레임마다 물리 엔진이 업데이트됩니다.
- 이 메커니즘은 예제 6.1에서 사용한 Matter.js의 **`Runner`** 객체를 대체합니다.

```js
const { Engine, Bodies, Composite } = Matter;
let engine;
function setup() {
  // 엔진 생성
  engine = Engine.create();
}

function draw() {
  // 엔진 호출
  Engine.update(engine);
}
```

## 2단계: 모든 상자 객체를 Matter.js에 연결

- Matter.js의 세계를 설정했습니다.
- 이제 **`Box`** 객체를 세계와 연결해야 합니다.
- **`this.x`**와 **`this.y`**를 지정하지 않아도 됩니다. Matter.js가 추적하는 것으로 위임했기 때문이죠.

```js
class Box {
  constructor(x, y) {
    this.w = 16;
    this.body = Bodies.rectangle(x, y, this.w, this.w);
    Composite.add(engine.world, this.body);
  }
}
```

## 3단계: 보디 그리기

```js
display(){
  rectMode(CENTER);
  fill(127);
  stroke(0);
  strokeWeight(2);

  // 보디로부터 위치와 각도 읽기
  let position = this.body.position;
  let angle = this.body.angle;
  // square(this.x, this.y, this.w);

  push();
  // 위치와 각도를 사용해 상자를 이동하고 회전
  translate(position.x, position.y);
  rotate(angle);
  square(0, 0, this.w);
  pop();
}
```

- **`Box`** 배열에서 객체를 삭제하는 경우 해당 객체와 보디도 명시적으로 제거해야 합니다.
- **`splice()`** 로도 해당 객체를 제거해야 합니다.
  ```js
  // Matter.js의 세계에서 보디 제거
  removeBody(){
    Composite.remove(engine.world, this.body);
  }
  ```

:::info[연습 문제 6.2]
예제 6.2의 코드를 이용해 Matter.js 를 사용해보세요. 캔버스를 벗어난 보디는 삭제하세요. 상자를 그리는 방식에 대해 자유롭게 창의력을 발휘해 보세요!

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/cWcPtcdJE"></iframe>

:::
