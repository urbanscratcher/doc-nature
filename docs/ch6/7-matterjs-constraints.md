---
sidebar_position: 7
---

# 7. Matter.js 제약 조건

- Matter.js의 제약 조건은 흔들리는 진자, 탄성 있는 다리, 물렁한 캐릭터, 회전하는 바퀴 등 시뮬레이션을 가능하게 해 한 보디를 다른 보디에 연결하는 메커니즘입니다.
- 제약 조건에는
  - **`Constraint`** 클래스로 관리되는 거리 제약 조건과 회전 제약 조건
  - **`MouseConstraint`** 클래스로 관리되는 마우스 제약 조건이 존재합니다.

## 거리 제약 조건

- **거리 제약 조건(distance constraints)** 은 [3장](../ch3/1-angles.md)에서 두 객체를 연결하는 용수철 힘과 같이, 두 보디 사이를 연결합니다.
- 이 제약 조건은 보디의 중심점인 **고정점(anchor)** 들을 연결합니다.
- 이렇게 고정된 길이는 용수철의 탄성력과 같은 특성을 띌 수 있습니다.

<img src="https://natureofcode.com/static/48167e3561fde027b58ec7b67dfc6734/aa94e/06_libraries_11.webp" class="img-half" />

- 두 **`Particle`** 객체를 만들어 봅시다.

  ```js
  let particleA = new Particle();
  let particleB = new Particle();
  ```

- 이 객체들 간 거리 제약 조건을 설정하려면 옵션들을 정해야 합니다.
  - **`bodyA`**: 제약 조건이 연결하는 첫 번째 보디로, 제약 조건의 한쪽 끝을 형성합니다.
  - **`bodyB`**: 제약 조건이 연결하는 두 번째 보디로, 제약 조건의 다른 한쪽 끝을 형성합니다.
  - **`pointA`**: 첫 번째 보디에 제약 조건이 고정되는 지점으로, **`bodyA`**에 대한 상대적인 위치입니다.
  - **`pointB`**: 두 번째 보디에 제약 조건이 고정되는 지점으로, **`bodyB`**에 대한 상대적인 위치입니다.
  - **`length`**: 제약 조건의 고정 길이 혹은 목표 길이로, 시뮬레이션 동안 제약 조건이 이 길이를 유지하려고 합니다.
  - **`stiffness`**: 제약 조건의 강성을 나타내는 값(0~1)으로, 1은 완전히 강성이고 0은 완전히 부드럽습니다.
- 다음과 같이 옵션을 만들 수 있습니다. 필수 옵션은 bodyA와 bodyB이며 추가 옵션을 지정하지 않으면 기본 값이 설정됩니다.
  - 다른 옵션으로는,
  - **`damping`** 제약 조건의 동작에 대한 저항에 영향을 줍니다. 값이 클수록 제약 조건이 더 빨리 에너지를 잃도록 합니다.
  - **`angularStiffness`** 제약 조건의 각운동 강성을 조정합니다. 값이 클수록 두 보디 간 각운동의 유연성을 떨어뜨립니다.
  ```js
  let options = {
    bodyA: particleA.body,
    bodyB: particleB.body,
    pointA: Vector.create(0, 0), // 기본값: (0, 0)
    pointB: Vector.create(0, 0), // 기본값: (0, 0)
    length: 100, // 기본값: 두 객체 사이 거리
    stiffness: 0.5, // 기본값: 0.7
  };
  ```
- 제약 조건을 생성하고 적용합니다.
  ```js
  let constraint = Constraint.create(options);
  Composite.add(engine.world, constraint);
  ```

## 예제 코드 6.6: Matter.js 진자

```js
class Pendulum {
  constructor(x, y, len) {
    this.r = 12;
    this.len = len;

    // 2개의 보디 생성. 하나는 고정정, 하나는 추
    this.anchor = Bodies.circle(x, y, this.r, { isStatic: true });
    this.bob = Bodies.circle(x + len, y, this.r, { restitution: 0.6 });

    // 고정점과 추를 연결하는 제약 조건
    let options = {
      bodyA: this.anchor,
      bodyB: this.bob,
      length: this.len,
    };
    this.arm = Constraint.create(options);

    // 모든 보디와 제약 조건을 세계에 추가
    Composite.add(engine.world, this.anchor);
    Composite.add(engine.world, this.bob);
    Composite.add(engine.world, this.arm);
  }

  display() {
    fill(127);
    stroke(0);

    // 진자 암을 나타내는 선 그리기
    line(
      this.anchor.position.x,
      this.anchor.position.y,
      this.bob.position.x,
      this.bob.position.y
    );

    // 고정점 그리기
    push();
    translate(this.anchor.position.x, this.anchor.position.y);
    rotate(this.anchor.angle);
    circle(0, 0, this.r * 2);
    line(0, 0, this.r, 0);
    pop();

    // 추 그리기
    push();
    translate(this.bob.position.x, this.bob.position.y);
    rotate(this.bob.angle);
    circle(0, 0, this.r * 2);
    line(0, 0, this.r, 0);
    pop();
  }
}
```

- 예제 6.6에서는 **`stiffness`** 의 기본값 0.7을 사용합니다.

:::info[연습 문제 6.5]
다음과 같이 일련의 원(혹은 직사각형)을 연결하는 제약 조건을 사용해 다리 시뮬레이션을 만들어 보아요. **`isStatic`** 속성을 사용해 끝 점을 고정시킵시다. 다리를 조금 탄력 있게 만들기 위해 다양한 값을 실험해 보십시오. 조인트에는 물리적인 구조가 없으므로 다리에 구멍이 생기지 않도록 노드 간 간격이 중요합니다.
:::
