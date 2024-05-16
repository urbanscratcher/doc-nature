---
sidebar_position: 10
---

# 10. 객체 간 만유인력 (n-body)

- 지금까지 하나의 Attractor 객체에 다른 Mover 객체들이 끌려들어가는 예제를 살펴
  보았습니다.
- 이번에는 각 Mover들이 서로를 끌어당기도록 해 볼게요.

## Body 클래스 정의

- 이전에는 편의상 Attractor와 Mover를 구분했지만, 뉴턴 제3법칙에 따르면 모든 힘
  은 쌍으로 발생합니다.
- 즉, Attractor가 움직이는 물체를 끌어당기면 그 물체도 Attractor를 끌어당겨야 하
  죠.
- 따라서 두 클래스로 구분하는 대신, 모든 Body가 다른 Body를 끌어당기는 동작을 구
  현해 봅시다.
- Body가 늘어날 수록 복잡해지는데, 일반적으로 이를 n-body 문제라고 부릅니다.
- 이제 Mover나 Attractor를 Body로 정의할게요
- **`attract()`** 메서드를 Body 클래스에서 정의하겠습니다.
  ```js
  class Body {
    ...
    attract(body) {
      let force = p5.Vector.sub(this.position, body.position);
      let d = constrain(force.mag(), 5, 25);
      let strength = (G * (this.mass * body.mass)) / (d * d); // 만유인력
      force.setMag(strength);
      body.applyForce(force);
    }
  }
  ```

## 2개의 Body

- 2개의 Body 객체가 서로 끌어당기는지 확인해 봅시다.

  ```js
  let bodyA;
  let bodyB;
  const G = 1.0;

  function setup() {
    createCanvas(640, 300);

    // Body 객체 A, B 생성
    // mass가 다르면 두 객체는 mass가 강한 객체의 방향으로 움직임
    bodyA = new Body(320, 40, 8);
    bodyB = new Body(320, 200, 8);
  }

  function draw() {
    background(255);

    // A는 B를 끌어당기고, B는 A를 끌어당김
    bodyA.attract(bodyB);
    bodyB.attract(bodyA);

    bodyA.update();
    bodyA.display();
    bodyB.update();
    bodyB.display();
  }

  class Body {
    constructor(x, y, m) {
      this.position = createVector(x, y);
      this.velocity = createVector();
      this.acceleration = createVector();
      this.mass = m;
      this.radius = sqrt(this.mass) * 2;
    }

    attract(body) {
      let force = p5.Vector.sub(this.position, body.position);
      let d = constrain(force.mag(), 5, 25);
      let strength = (G * this.mass * body.mass) / (d * d); // universal gravity
      force.setMag(strength);
      body.applyForce(force);
    }

    applyForce(force) {...}
    update() {...}
    display() {
      circle(this.position.x, this.position.y, this.radius * 4);
    }
  }
  ```

- n-body 문제에서 동작 패턴은 초기 조건에 따라 달라집니다.
- **`setup()`** 에서 각 Body에 대해 하나는 오른쪽을 가리키고, 다른 하나는 왼쪽을
  가리키는 속도 벡터를 할당하면 두 Body는 원형 궤도로 돌게 됩니다.

### 예제 코드 2.8: 원형 궤도를 도는 두 Body

```js
function setup() {
  ...
  // 각 몸체에 수평 속도(반대 방향) 할당
  bodyA.velocity = createVector(1, 0);
  bodyB.velocity = createVector(-1, 0);
}
```

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/Bg4Wc-Zwc"></iframe>

- Body를 생성할 때 속도를 할당하도록 생성자에 velocity를 할당할 수도 있겠지만,
  지금은 이렇게 두겠습니다.

:::info[연습문제 2.14]
제임스 몬탈디(James Montaldi)와 카트리나 스테클스(Katrina Steckles)의 [평면 n-body 안무의 대칭 그룹 분류](https://www.cambridge.org/core/journals/forum-of-mathematics-sigma/article/classification-of-symmetry-groups-for-planar-nbody-choreographies/710D0EC787DED736B64A94D0E5CD01E1)라는 논문에서는 n-body 문제(규칙적인 간격으로 서로를 따라가는 body들의 주기적인 움직임으로 정의)에 대한 안무적(Choreographic)[^1] 솔루션을 탐구했습니다.
교육자이자 예술가 댄 그리스(Dan Gries)는 이러한 안무에 대한 [대화형 시연 프로그램](https://dangries.com/rectangleworld/demos/nBody/)을 만들었어요.

예제 2.8에 3개 이상의 body를 추가하고, 위치와 속도를 다양하게 설정해 보세요. 어떤 안무를 만들 수 있나요?

<iframe width="100%" height="550" src="https://editor.p5js.org/urbanscratcher/full/22Q47fgNp"></iframe>
:::

[^1]: 여기서 안무란 N개의 물체가 주기적으로 움직이며 특정한 패턴을 만드는 것을 의미합니다. 마치 무용에서 여러 무용수가 조화롭게 움직이는 것과 유사합니다.

## n개의 Body

- Body 배열을 통해 여러 개의 Body 객체를 생성해 봅시다.

  ```js
  let bodies;
  function setup() {
    createCanvas(640, 240);

    // 10개의 Body 객체로 채워진 배열
    bodies = Array.from(
      { length: 10 },
      () => new Body(random(width), random(height), 8)
    );
  }

  function draw() {
    background(255);
    // 배열을 반복하여 모든 Body를 업데이트하고 표시
    for (let i = 0; i < bodies.length; i++) {
      bodies[i].update();
      bodies[i].display();
    }
  }
  ```

- body들이 서로 끌어당기도록 하려면 bodies 배열 내에 루프를 한 번 더 돌려야 합니다.
  ```js
  for (let i = 0; i < bodies.length; i++) {
    for (let j = 0; j < bodies.length; j++) {
      let force = bodies[j].attract(bodies[i]);
      movers[i].applyForce(force);
    }
    movers[i].update();
    movers[i].show();
  }
  ```
- 그런데 이 코드에는 문제가 있습니다.
- i와 j 값이 동일한 경우, 자신이 자신을 끌어당기게 되는데, 이를 제외해야 하기 때문에 조건문을 추가해야 합니다.

  ```js
  let bodies = [];
  function setup() {
    createCanvas(640, 240);
    for (let i = 0; i < 10; i++) {
      bodies[i] = new Body(random(width), random(height), random(0.1, 2));
    }
  }
  function draw() {
    background(255);
    for (let i = 0; i < bodies.length; i++) {
      for (let j = 0; j < bodies.length; j++) {
        // 조건문 추가
        if (i !== j) {
          let force = bodies[j].attract(bodies[i]);
          bodies[i].applyForce(force);
        }
      }
      bodies[i].update();
      bodies[i].show();
    }
  }
  ```

### 예제코드 2.9: N개의 Body

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/iKdgUJUjF"></iframe>
- 위 중첩 루프문은 시간 복잡성이 $N^2$ 인 알고리즘입니다. 즉, 계산 횟수가 Body 수의 제곱과 같죠.
- Body 수가 늘어나면 계산 횟수가 제곱으로 늘어나기 때문에 시뮬레이션 속도가 매우 느려질 수 있습니다.
- 5장에서는 공간 분할 알고리즘을 통해 이를 최적화할 수 있는 전략을 알아볼 예정입니다.
  - 쿼드 트리와 반즈-허트(Barnes-Hut) 알고리즘이 결합한 공간 세분화 개념이 나올텐데요.
  - 이것은 여기서 논의된 n-body와 같은 시뮬레이션의 효율성을 높이는 데 특히 효과적입니다.

:::info[연습문제 2.15]
예제 2.9에서 인력을 척력으로 바꿔봅시다.
모든 Body 객체들이 마우스에 이끌리면서도 서로 밀어내도록 만들 수 있을까요?
힘의 상대적인 세기를 어떻게 균형 잡을 것인지, 그리고 힘을 계산할 때 거리를 가장 효과적으로 사용하는 방법에 대해 생각해 보세요.
:::

:::info[연습문제 2.16]
캔버스를 중심으로 n-body 객체들을 나선형 은하 패턴으로 공전하도록 배치할 수 있을까요?
모든 것을 하나로 묶어줄 큰 객체를 중심에 추가해야 할 수도 있습니다.
해답은 코딩 트레인 웹사이트의 네이처 오브 코드 시리즈에 있는 ["상호 인력" 영상](https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/2-forces/6-mutual-attraction)에서 확인할 수 있습니다.
:::

## 생태계 프로젝트

여러분의 생태계에 힘을 도입해 보세요. 다른 환경적 요인들(예를 들어, 물과 진흙의 차이, 또는 강의 흐름)이 생물이 생태계를 통해 이동하는 방식에 어떤 영향을 미칠 수 있을까요?
생물이 상호작용할 수 있는 다른 요소들(먹이, 포식자)을 환경에 도입해 보세요. 생물이 자신의 세계에 있는 것들에 대해 끌림 또는 밀침을 경험하나요? 더 추상적으로 생각하여 생물의 욕구나 목표에 기반한 힘을 설계할 수 있을까요?
<img src="https://natureofcode.com/static/5eb1528e31cef0659c33c8cd669f381d/2e9c6/02_forces_12.webp" />
