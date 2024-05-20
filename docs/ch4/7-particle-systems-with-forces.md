---
sidebar_position: 7
---

# 7. 힘을 이용하는 파티클 시스템

- 이제 **`applyForce()`** 를 위한 변수를 더 추가해 봅시다.

  ```js
  class Particle {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.velocity = createVector(random(-1, 1), random(-2, 0));
      // (0, 0)의 가속도로 시작
      this.acceleration = createVector(0, 0);
      this.lifespan = 255.0;
      // 질량 추가
      this.mass = 1;
    }

    applyForce(force) {
      let f = force.copy();
      // 힘을 질량으로 나누기
      f.div(this.mass);
      this.acceleration.add(f);
    }
  }
  ```

- **`applyForce()`** 를 적용해 봅시다. 어디서 호출해야 할까요?

  ```js
  // 메서드 내부 호출
  run(){
    let gravity = createVector(0, 0.05);
    this.applyForce(gravity);
    this.update();
    this.display();
  }

  // draw() 전역적 호출
  function draw(){
    background(255);

    let gravity = createVector(0, 0.1);
    emitter.applyForce(gravity);

    emitter.addParticle();
    emitter.run();
  }
  ```

- **`applyForce()`** 도 정의돼야 합니다.

  ```js
  applyForce(force){
    for (let particle of this.particles){
      particle.applyForce(force);
    }
  }
  ```

## 예제 코드 4.6: 힘을 이용하는 파티클 시스템

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/k0PB5p518"></iframe>

```js
let emitter;

function setup() {
  createCanvas(640, 240);
  emitter = new Emitter(createVector(width / 2, 20));
}

function draw() {
  background(255);

  // 모든 입자에 힘을 적용
  let gravity = createVector(0, 0.1);
  emitter.applyForce(gravity);

  emitter.addParticle();
  emitter.run();
}

class Emitter {
  constructor(x, y) {
    this.origin = createVector(x, y);
    this.particles = [];
  }

  addParticle() {
    this.particles.push(new Particle(this.origin.x, this.origin.y));
  }

  // for...of 루프를 사용하여 모든 입자에 힘을 적용
  applyForce(force) {
    for (let particle of this.particles) {
      particle.applyForce(force);
    }
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let particle = this.particles[i];
      particle.run();
      if (particle.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
}
```
