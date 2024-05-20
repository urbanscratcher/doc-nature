---
sidebar_position: 2
---

# 2. 입자 하나

- 먼저 입자 하나를 작성하기 위해 [2장](../ch2/1-forces-and-newtons.md)의 **`Mover`** 클래스를 템플릿으로 사용합시다.
  ```js
  class Particle {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.velocity = createVector();
      this.acceleration = createVector();
    }
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
    display() {
      stroke(0);
      fill(175);
      circle(this.position.x, this.position.y, 8);
    }
  }
  ```
- 이를 기반으로 여러 기능을 추가할 수 있습니다.
  - 예를 들어 **`applyForce()`** 를 추가하면 입자에 힘을 줄 수 있습니다.
  - 색상과 모양을 나타내는 변수를 추가하거나 **`p5.Image`** 를 사용할 수도 있어요.

## 입자의 수명

- 지금은 **수명(life span)** 에 집중해 봅시다.
- 파티클 시스템에는 일반적으로 **방출구(emitter)** 를 갖습니다.
  - 방출구는 입자가 만들어지는 곳으로, 입자를 만들 때 초기 위치, 속도 등을 설정할 수 있습니다.
  - 입자를 하나씩 방출하기도 하고, 연속적으로 쏟아내기도 합니다.
- 방출구에서 생성된 입자는 영원히 살아 있을 수 없습니다. 파티클이 무한히 늘어나 프로그램이 중단될 것이기 때문입니다.
- 새 입자가 생성되면 사라져야 프로그램에 무리 없이 입자가 계속 생성되는 것처럼 보이게 할 수 있습니다.
- 입자를 언제 소멸시킬 지 결정하는 방법은 다양합니다.
  - 다른 입자와 충돌하는 경우
  - 화면을 벗어나는 경우 등
- 여기서는 **`lifespan`** 이라는 변수를 만들어 특정 시간 동안만 입자가 살아있게 만들 것입니다.
- 이 변수는 255에서 시작해 시간이 경과하면 0이 되고, 0이 되는 순간 해당 입자를 제거할 것입니다.
  ```js
  class Particle {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.velocity = createVector();
      this.acceleration = createVector();
      this.lifespan = 255; // 입자의 수명
    }
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
      this.lifespan -= 2.0; // 수명 감소
    }
    display() {
      // 수명은 0~255 값이므로 투명도 값에도 사용 가능
      stroke(0, this.lifespan);
      fill(175, this.lifespan);
      circle(this.position.x, this.position.y, 8);
    }
  }
  ```
- **`lifespan`** 변수로 입자가 살아있는지 판단하는 함수를 추가합니다.
  ```js
  boolean isDead(){
    return (this.lifespan < 0.0);
  }
  ```

## 예제 코드 4.1: 입자 하나

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/juk6MixI3"></iframe>

```js
let particle;

function setup() {
  createCanvas(640, 240);
  particle = new Particle(width / 2, 20);
}

function draw() {
  background(255);

  particle.update();
  particle.display();

  // 중력 적용
  let gravity = createVector(0, 0.1);
  particle.applyForce(gravity);

  // 파티클 소멸과 생성
  if (particle.isDead()) {
    particle = new Particle(width / 2, 20);
    console.log("The particle is dead!");
  }
}

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-2, 0)); // 임의의 속도 부여
    this.acceleration = createVector(0, 0);
    this.lifespan = 255.0;
  }

  isDead() {
    return this.lifespan < 0.0;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 2.0;
  }

  display() {
    stroke(0, this.lifespan);
    fill(127, this.lifespan);
    strokeWeight(2);
    circle(this.position.x, this.position.y, 8);
  }
}
```

- 입자의 수명이 다할 때마다 **`particle`** 변수는 새 **`Particle`** 인스턴스로 대체됩니다.
- 이전 **`Particle`** 인스턴스는 삭제된 것이 아니라 코드 내에서 더 이상 접근할 수 없거나 사용할 수 없습니다.

:::info[연습 문제 4.1]
**`Particle`** 클래스에 **`update()`**, **`display()`**, **`applyForce()`** 를 처리하는 **`run()`** 메소드를 만드세요. 이 접근 방식의 장단점은 무엇일까요?
:::

:::info[연습 문제 4.2]
파티클에 각속도(회전)를 추가하고, 파티클이 원이 아닌 모양이 되도록 디자인해 회전 운동이 드러나게 해보세요.
:::
