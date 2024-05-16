---
sidebar_position: 5
---

# 5. 힘 생성

- 오른쪽에서 부는 약한 바람, 중력 적용해 보아요.

```js
const wind = new createVector(0.01, 0);
const gravity = new createVector(0, 0.1);
mover.applyForce(wind);
mover.applyForce(gravity);
```

<iframe width="660" height="340" src="https://editor.p5js.org/urbanscratcher/full/oUuWWS-FI"></iframe>

## 질량이 다른 객체들

- Mover 클래스를 정의해요.

```js
class Mover {
  // 질량, 위치를 매개변수화
  constructor(m, x, y) {
    this.location = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = m;
  }

  applyForce(force) {
    const f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    stroke(0);
    fill(175);

    // 질량만큼의 크기를 가진 객체
    ellipse(this.location.x, this.location.y, this.mass * 16, this.mass * 16);
  }

  // 모서리에 닿으면 반대 방향으로 튕기도록 함
  checkEdges() {
    if (this.location.x > width) {
      this.location.x = width;
      this.velocity.x *= -1;
    } else if (this.location.x < 0) {
      this.velocity.x *= -1;
      this.location.x = 0;
    }

    if (this.location.y > height) {
      this.velocity.y *= -1;
      this.location.y = height;
    }
  }
}
```

### 객체 100개 만들기

```js
let movers;
function setup() {
  createCanvas(400, 400);
  movers = Array.from({ length: 100 }, () => new Mover(random(0.1, 5), 0, 0));
}

function draw() {
  background(255);

  // 힘 생성
  const wind = createVector(0.01, 0);
  const gravity = createVector(0, 0.1);

  movers.forEach((m) => {
    // 힘 적용
    m.applyForce(wind);
    m.applyForce(gravity);

    m.update();
    m.display();
    m.checkEdges();
  });
}
```

- 질량과 가속도가 반비례하는 모습을 볼 수 있습니다.
<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/O_Q0rnZVe"></iframe>

:::info[연습문제 2.3]
원이 화면의 모서리에 닿으면 튕기지 않고, 다른 힘으로 밀어보아요. 힘을 따로 만들어주고, 원을 밀어 화면 안에 유지시켜보아요. 모서리에서 멀고 가까운 강도 조절해봅시다. 예를 들어 모서리에 가까울수록 강한 힘으로 밀어요.

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/tumz-TO_n"></iframe>
<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/lZJTD9oXV"></iframe>
:::

:::info[연습문제 2.4]
원의 중심이 아니라 가장자리가 측면에 닿을 때 원의 방향이 변경되도록 수정해 보아요.

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/4F2UkkQSV"></iframe>
:::

:::info[연습문제 2.5]
바람을 변수로 만들어 상호작용이 가능하도록 만들어 봅시다. 예를 들어, 마우스 위치에서 원 쪽으로 바람을 불게 해 보아요.

<iframe  width="640" height="450" src="https://editor.p5js.org/urbanscratcher/full/KOLL4Xyau"></iframe>
:::
