---
sidebar_position: 6
---

# 6. 상속과 다형성 소개

- 다양한 색상과 모양의 색종이 조각을 만들어 뿌리려면 각 색종이 조각을 입자로 하는 파티클 시스템을 만들면 되겠죠?
- 색상, 모양, 움직임 등을 저장하는 변수를 **`Particle`** 클래스에 추가하고 랜덤하게 변수를 초기화해줍니다.
- 그런데 더 다양한 모양을 만들려면 어떻게 할까요?
- 같은 클래스 내부에서 모든 처리를 하려면 코드가 굉장히 복잡해집니다. 그러면 다음과 같이 클래스를 따로 만들면 되겠죠?
  ```js
  class HappyConfetti {}
  class FunConfetti {}
  class WackyConfetti {}
  ```
- **`Emitter`** 클래스의 생성자에서는 이러한 클래스를 무작위로 선택할 수 있겠죠.
  ```js
  class Emitter {
    constructor(num) {
      this.particles = [];
      for (let i = 0; i < num; i++) {
        let r = random(1);
        if (r < 0.33) {
          this.particles.push(new HappyConfetti());
        } else if (r < 0.67) {
          this.particles.push(new FunConfetti());
        } else {
          this.particles.push(new WackyConfetti());
        }
      }
    }
  }
  ```

## 상속과 다형성의 필요성

- 그런데 이렇게 하면 각 클래스는 위치, 속도, 가속도, **`update()`** 등 많은 변수나 메서드를 공유하게 될 것입니다.
- 여기서 **상속(inheritance)** 이 필요합니다. 상속을 사용하면 다른 클래스의 변수와 메서드를 가져오기도 하고, 고유한 기능을 정의할 수도 있습니다.
- 또, 하나의 **`particles`** 배열에서는 모든 유형의 클래스가 추가되기 때문에 별도의 배열로 분리해줘야 합니다.
  ```js
  constructor(){
    this.happyParticles = [];
    this.funParticles = [];
    this.wackyParticles = [];
  }
  ```
- 그런데 이런 분리는 불편하기 때문에 하나의 배열로 관리하는 게 편합니다. 자바스크립트는 **다형성(polymorphism)** 을 통해 다양한 유형의 객체가 동일한 유형인 것처럼 할 수 있습니다.
- 이러한 상속과 다형성이 적용되는 파티클 시스템을 만들어 봅시다.

## 상속의 기본

- 개, 고양이, 원숭이 등 동물을 예로 들어 보겠습니다.
- 동물들은 변수(나이)나 행동(먹고, 자고)이 동일한 경우가 많죠.

```js
class Dog {
  constructor() {
    this.age = 0;
  }
  eat() {
    print("Yum!");
  }
  sleep() {
    print("Zzzz");
  }
  bark() {
    // 고유
    print("WOOF");
  }
}
```

```js
class Cat {
  constructor() {
    this.age = 0;
  }
  eat() {
    print("Yum!");
  }
  sleep() {
    print("Zzzz");
  }
  meow() {
    // 고유
    print("MEOW");
  }
}
```

- **`Animal`** 클래스로 일반화 해 봅시다.
  - 개는 동물이고, 동물의 모든 특성을 갖고 있으며 동물이 하는 모든 일을 할 수 있습니다. 또한 짖을 수 있습니다.
  - 고양이는 동물이고, 동물의 모든 특성을 갖고 있으며 동물이 하는 모든 일을 할 수 있습니다. 또한 야옹 소리를 낼 수 있습니다.
- 나무 구조와 같이 상위 클래스(슈퍼 클래스)와 하위 클래스를 두고, 상속을 통해 일반화가 가능합니다.
  <img src="https://natureofcode.com/static/92b90e5064bc06b49247c9dbc3e78708/45130/04_particles_3.webp" class="img-full" />

```js
class Animal {
  constructor() {
    this.age = 0;
  }
  eat() {
    print("Yum!");
  }
  sleep() {
    print("Zzzz");
  }
}

// extends: Animal 클래스의 변수, 메서드 상속받음
class Dog extends Animal {
  constructor() {
    // 상위 클래스의 생성자 호출
    super();

    // 하위 클래스는 상위 클래스에 없는 새로운 변수를 도입할 수 있음
    this.hairColor = color(210, 105, 30);
  }

  // 상위 클래스의 메서드 재정의 (오버라이드)
  eat() {
    // 상위 클래스 메서드 호출
    super.eat();
    print("Woof! Woof! Slurp.");
  }

  // 메서드 추가
  bark() {
    print("WOOF!");
  }
}

// extends: Animal 클래스의 변수, 메서드 상속받음
class Dog extends Animal {
  constructor() {
    super();
  }
  // 메서드 추가
  meow() {
    print("MEOW!");
  }
}
```

## 다형성의 기본

- 다양한 동물은 어떻게 관리할까요?

```js
// 각 동물마다 별도의 배열
let dogs = [];
let cats = [];
let turtles = [];
let kiwis = [];

for (let i = 0; i < 10; i++) {
  dogs.push(new Dog());
}
for (let i = 0; i < 15; i++) {
  cats.push(new Cat());
}
for (let i = 0; i < 6; i++) {
  turtles.push(new Turtle());
}
for (let i = 0; i < 98; i++) {
  kiwis.push(new Kiwi());
}
```

- 동물들은 모두 배가 고파 먹을 것을 찾고 있습니다. 각 배열마다 반복문을 작성해야 하죠.

```js
for (let dog of dogs) {
  dog.eat();
}
for (let cat of cats) {
  cat.eat();
}
for (let turtle of turtles) {
  turtle.eat();
}
for (let kiwi of kiwis) {
  kiwi.eat();
}
```

- 하나의 배열만 사용해 여러 종류의 동물로 채운다면요?
- 자바스크립트에서는 다음과 같이 다형성(다양한 형태)가 작동합니다.

```js
// 모든 동물에 대한 단 하나의 배열!
let kingdom = [];

for (let i = 0; i < 10; i++) {
  kingdom.push(new Dog());
}
for (let i = 0; i < 15; i++) {
  kingdom.push(new Cat());
}
for (let i = 0; i < 6; i++) {
  kingdom.push(new Turtle());
}
for (let i = 0; i < 98; i++) {
  kingdom.push(new Kiwi());
}

// 모든 동물에 대한 단 하나의 반복문!
for (let animal of kingdom) {
  animal.eat();
}
```

## 상속과 다형성을 갖는 입자

- 이제 **`Particle`** 에 대한 예제를 작성해 봅시다.

```js
class Particle {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-2, 0));
    this.position = createVector(x, y);
    this.lifespan = 255.0;
  }

  run() {
    this.update();
    this.show();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2.0;
    this.acceleration.mult(0);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  isDead() {
    return this.lifespan < 0;
  }

  show() {
    fill(0, this.lifespan);
    circle(this.position.x, this.position.y, 8);
  }
}
```

- **`Particle`** 을 상속 받는 **`Confetti`** 클래스를 작성할 수 있습니다.

```js
class Confetti extends Particle {
  constructor(x, y) {
    super(x, y);
    // 변수 추가 가능
  }

  // 다른 메서드 추가 가능

  // display() 재정의
  display() {
    rectMode(CENTER);
    fill(0);
    square(this.position.x, this.position.y, 12);
  }
}
```

- 이 클래스를 [3장](../ch3/1-angles.md)에서 설명한 각속도와 각가속도를 통해 더 정교하게 만들어 보죠.
- **`angle`** 에서 $4\pi$ 로 계산한 것은 회전을 더 주기 위함입니다.

```js
display(){
  let angle = map(this.position.x, 0, width, 0, TWO_PI * 2);

  rectMode(CENTER);
  fill(0, this.lifespan);
  stroke(0, this.lifespan);

  push();
  translate(this.position.x, this.position.y);
  rotate(angle);
  rectMode(CENTER);
  square(0, 0, 12);
  pop();
}
```

### 예제 코드 4.5: 상속과 다형성을 이용한 파티클 시스템

<iframe src="https://editor.p5js.org/urbanscratcher/full/-6-VlspaC" class="editor"></iframe>

```js
class Emitter {
  constructor(x, y) {
    this.origin = createVector(x, y);
    // 모든 종류의 입자를 관리하는 하나의 배열
    this.particles = [];
  }

  addParticle() {
    let r = random(1);
    // 다른 종류의 파티클을 추가할 확률 50%
    if (r < 0.5) {
      this.particles.push(new Particle(this.origin.x, this.origin.y));
    } else {
      this.particles.push(new Confetti(this.origin.x, this.origin.y));
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

:::info[연습 문제 4.8]
2가지 이상의 파티클로 파티클 시스템을 만들어 보세요. 파티클 모양 외에 동작도 다양하게 변경해 보세요.
:::
