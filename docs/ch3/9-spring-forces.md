---
sidebar_position: 9
---

# 9. 용수철 힘

- 중력, 바람 등 다양한 힘의 영향을 받는 진자 운동을 시뮬레이션 하려면 벡터로 용수철 힘을 모델링해야 합니다.

<img class="img-half" src="https://natureofcode.com/static/70f4ca8729ecd7ccddf0cb9d1c75c705/02303/03_oscillation_11.webp" />

## 훅의 법칙

> **용수철의 힘은 용수철이 늘어나는 길이와 정비례한다.**

- 용수철 힘은 1660년 영국의 물리학자 로버트 훅의 이름을 따 **훅의 법칙(Hooke's Law)** 에 따라 계산된 벡터로 구현합니다.
  - 훅은 이 법칙을 라틴어로 *Ut tension, sic vis*라고 표현했는데, 이는 "늘어나는 만큼 힘이 존재한다"라는 의미입니다.
  - 추를 강하게 당겨서 용수철을 많이 늘리면 용수철의 힘이 강해지지만, 반대로 추를 약하게 당겨서 조금만 늘리면 용수철의 힘이 약해집니다.
- $F_{spring}=-k\times x$
  - $k$ : 용수철의 탄성을 나타내는 상수입니다. 용수철의 탄성이 강하면 높고, 약하면 낮습니다.
  - $x$ : 용수철의 변위(기본 길이와 정지 시점에서의 길이 차이)를 나타냅니다. 이때 기본 길이는 원래 용수철이 평형 상태(그냥 두었을 때)일 때의 길이입니다.

## 훅의 법칙 적용

- 힘은 벡터이므로 크기와 방향을 모두 계산해야 합니다.
  - 고정점(anchor), 추(bob), 기본 길이(restLength)를 변수로 둡니다.
  ```js
  let anchor = createVector(0, 0);
  let bob = createVector(0, 120);
  let restLength = 100;
  ```
- 탄성 상수는 임의로 둡니다.
  ```js
  let k = 0.1;
  ```
- 용수철의 변위 $x$ 를 알기 위해서는 현재 길이와 기본 길이의 차이를 알아야 합니다.
  - 현재 길이는 고정점과 추 간의 거리를 구하면 됩니다.
  ```js
  let dir = p5.Vector.sub(bob, anchor);
  let currentLength = dir.mag();
  let x = currentLength - restLength;
  ```
- 이제 힘의 방향을 가리키는 단위 벡터를 알아내야 합니다.
  - 이는 고정 지점부터 추의 위치를 가리키는 벡터의 방향입니다.
  - 아래 그림처럼 용수철은 기본 길이 이상 늘어났을 때 고정점으로 돌아가려는 힘이 생깁니다.
  - 반대로 기본 길이보다 짧아지면 고정점으로부터 멀어지는 힘이 생기지요.
  - 이렇게 변위와 반대로 나아가려는 성질이 공식에서 $-1$ 로 표현돼 있습니다.
    <img class="img-full" src="https://natureofcode.com/static/a83ebf2c4bd1d97ae8d6d572bb889fbd/63860/03_oscillation_13.webp"/>
- 최종적으로 코드로 나타내면,
  ```js
  // 훅의 법칙에 따른 스프링력의 크기
  let k = 0.1;
  let force = p5.Vector.sub(bob, anchor);
  let currentLength = force.mag();
  let x = currentLength - restLength;
  // 방향과 크기를 하나로 합치기
  force.setMag(-1 * k * x);
  ```

## 클래스로 캡슐화

- 추가 운동하려면 위치, 속도, 가속도를 나타내는 변수가 모두 있어야 하는데, **`Mover`** 클래스에 이미 존재하죠. 용수철 힘을 적용할 **`applyForce()`** 도요. 이를 활용하면,

```js
let bob;

function setup() {
  bob = new Bob();
}

function draw() {
  // 중력 적용
  let gravity = createVector(0, 1);
  bob.applyForce(gravity);

  // 스프링 힘 계산 및 적용
  let springForce = ___;
  bob.applyForce(springForce);

  bob.update();
  bob.display();
}
```

- **`draw()`** 에서 여러 힘을 모두 적용할 수 있지만, **`Bob`** 객체와 용수철이 많아지만 코드가 복잡해질 수 있습니다.
- 용수철 힘만을 적용하기 위해 **`Spring`** 클래스를 만들어 사용해 보겠습니다.
- 다음과 같이 **`Bob`** 클래스는 움직임과 관련된 기본적인 속성이 포함돼 있습니다.

<img class="img-full" src="https://natureofcode.com/static/99f58e3c6d9469af3a5c0a23079e354f/aae9d/03_oscillation_14.webp" />

- **`Spring`** 클래스는 용수철의 고정점과 기본 길이라는 속성을 가지고 **`Bob`** 객체를 끌어당기는 힘을 계산하도록 구현해보겠습니다.

```js
let bob;
let spring; // Spring 객체 추가

function setup() {
  bob = new Bob();
  spring = new Spring();
}

function draw() {
  let gravity = createVector(0, 1);
  bob.applyForce(gravity);

  // Spring 클래스의 connect()는 추에 가해지는 용수철 힘을 계산합니다.
  spring.connect(bob);

  bob.update();
  bob.display();
  spring.display();
}
```

- 이는 [예제 코드 2.6](../ch2/9-gravitational-attraction.md#예제-코드-26-하나의-객체-끌어들이기)에서 살펴본 **`Attractor`** 객체와 유사합니다. 이를 적용하면,
  ```js
  // attract()
  let force = attractor.attract(mover);
  mover.applyForce(force);
  // connect()
  let force = spring.connect(bob);
  bob.applyForce(force);
  ```
- **`connect()`** 는 내부적으로 **`bob`** 인자를 받아 **`applyForce()`** 를 호출하게 됩니다.
  ```js
  connect(bob){
    let force = some_calculation;
    bob.applyForce(force);
  }
  ```
- 이전에 **`Attractor`** 클래스를 구현할 때는 힘이라는 것을 공부하기 위해 **`applyForce()`** 를 **`draw()`** 에서 작성했지만, 이제는 객체 자체에 힘을 구현한 것입니다.

### 예제 코드 3.10: 스프링 연결

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/2kMavnpFR"></iframe>

```js
class Spring {
  constructor(x, y, length) {
    this.anchor = createVector(x, y);
    this.restLength = length;
    this.k = 0.2;
  }

  // 훅의 법칙 계산
  connect(bob) {
    let force = p5.Vector.sub(bob.position, this.anchor);
    let currentLength = force.mag();
    let stretch = currentLength - this.restLength;
    force.setMag(-1 * this.k * stretch);
    bob.applyForce(force);
  }

  // 고정점 그리기
  display() {
    fill(127);
    circle(this.anchor.x, this.anchor.y, 10);
  }

  // 용수철 그리기
  displayLine(bob) {
    stroke(0);
    line(bob.position.x, bob.position.y, this.anchor.x, this.anchor.y);
  }
}
```

:::info[연습 문제 3.13]
위 예제를 확인하기 전에 **`constrainLength`** 함수 구성을 생각해 보세요.

```js
constrainLength(bob, minlen, maxlen) {
  // 추에서 고정점을 가리키는 벡터
  let direction = p5.Vector.sub(bob.position, this.anchor);
  let length = direction.mag();

  // 너무 짧을 경우
  if (length < minlen) {
    direction.setMag(minlen);
    // 제약 조건 내 위치 유지
    bob.position = p5.Vector.add(this.anchor, direction);
    bob.velocity.mult(0);

  // 너무 긴 경우
  } else if (length > maxlen) {
    direction.setMag(maxlen);
    // 제약 조건 내 위치 유지
    bob.position = p5.Vector.add(this.anchor, direction);
    bob.velocity.mult(0);
  }
}
```

:::

:::info[연습 문제 3.14]
여러 개의 추와 용수철을 연결해 봅시다. 고정점 없이 추를 다른 추에 연결하는 것을 어떨까요?
:::
