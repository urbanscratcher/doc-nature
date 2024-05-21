---
sidebar_position: 3
---

# 3. Matter.js 개요

## 기본 구성

### p5.js 수도코드

- 지금까지 모든 예제를 수도코드(pseudocode)로 일반화 해 봅시다.
- **`setup()`**
  1. 객체들을 생성합니다.
- **`draw()`**
  1. 힘을 계산합니다.
  2. 객체들에 힘을 적용합니다 ($F=M\times A$)
  3. 가속도와 속도를 기반으로 객체의 위치를 변경합니다.
  4. 객체를 그립니다.

### Matter.js 수도코드

- Matter.js에서는,
  - **`setup()`**
    1. 객체들을 생성합니다.
  - **`draw()`**
    1. 객체를 그립니다.

## Matter.js의 핵심 개념

- **엔진(Engine)**
  - 물리 시뮬레이션 자체를 관리하는 요소입니다.
  - 시뮬레이션 세계와 세계를 업데이트 하는 다양한 속성들을 관리합니다.
- **보디(Bodies)**
  - 세계의 기본 요소로, 시뮬레이션되는 물리적 객체를 의미합니다.
  - 보디는 위치와 속도를 가집니다. 지금까지 우리가 만든 클래스와 유사하죠.
  - 또한 형상을 정의하는 기하학적 모양도 가지고 있습니다.
  - _보디_ 는 _입자_ 처럼, 물리 엔진 세계에 있는 _물체_ 를 설명하기 위해 사용하는 일반적인 용어로 신체와 관련이 없습니다.
- **복합체(Composite)**
  - 여러 보디로 이루어진 복합 엔터티를 생성할 수 있게 해주는 컨테이너입니다.
  - 세계 자체가 복합체의 예시이며, 생성된 모든 보디는 세계에 추가되어야 합니다.
- **제약 조건(Constraints)**
  - 보디 간 연결 역할을 합니다.

### Matter.js에서의 벡터

- 또 다른 중요한 요소로 벡터가 있죠.
- x, y 요소를 사용해 위치, 속도, 힘을 정의하는, 크기와 방향이 있는 엔터티입니다.
- 그런데 **`p5.Vector`** 객체와 문법이 약간 다릅니다.

<div style={{display:'flex', gap:'10px'}}>
  <div style={{flex:'1'}}>
    <h3>p5.js</h3>
    <p>

    ```js
    // 벡터 정의
    let v = createVector(1, -1);

    // 벡터 덧셈
    let a = createVector(1, -1);
    let b = createVector(3, 4);
    a.add(b);
    let c = p5.Vecotr.add(a, b);

    // 벡터 스칼라 곱
    let m = createVector(1, -1);
    m.mult(4);

    // 벡터 크기, 정규화
    let n = createVector(3, 4);
    let size = n.mag();
    n.normalize();
    ```

    </p>

  </div>
  <div style={{flex:'1'}}>
    <h3>Matter.js</h3>
    <p>

    ```js
    // 벡터 정의
    let v = Matter.Vector.create(1, -1);

    // 벡터 덧셈
    let a = Matter.Vector.create(1, -1);
    let b = Matter.Vector.create(3, 4);
    Matter.Vector.add(a, b, a);
    let c = Matter.Vector.add(a, b);

    // 벡터 스칼라 곱
    let m = Matter.Vector.create(1, -1);
    m = Matter.Vector.mult(4);

    // 벡터 크기, 정규화
    let n = Matter.Vector.create(3, 4);
    let size = Matter.Vector.magnitude(n);
    n = Matter.Vector.normalise(n);
    ```

    </p>

  </div>
</div>

### 엔진(Engine)

- 물리 엔진들은 대부분 **`world`** 객체를 포함하고 있습니다.
- 이는 보통 좌표 공간와 시뮬레이션하는 보디들을 관리하고, 시간을 제어하는 등의 물리 세계와 시뮬레이션의 컨트롤러 역할을 합니다.

```js
let Engine = Matter.Engine; // Matter.js Engine 클래스의 별칭
let engine; // Matter.js 물리 엔진의 참조
function setup() {
  createCanvas(640, 360);
  engine = Engine.create(); // Matter.js 엔진 생성
}
```

- 코드 첫 줄에서는 **`Engine`** 변수를 생성하고, **`Matter.Engine`** 를 할당합니다.
- **`Engine`** 의 **`create()`** 를 호출하면 Matter.js는 기본 중력이 아래로 향하는 벡터(0, 1)인 물리 엔진과 **`world`** 를 반환합니다.
  - 다음과 같이 조정할 수도 있죠.
  ```js
  engine.gravity.x = 1;
  engine.gravity.y = 0; // 엔진의 중력을 수평으로 설정
  ```
- 물론 중력은 시뮬레이션 동안 동적으로 조정하거나 (0, 0) 벡터로 설정해 비활성화 할 수 있습니다.

:::note[객체 구조 분해 할당(Object Destructuring)]
다음과 같이 자바스크립트의 객체 구조 분해 할당 문법을 사용할 수 있습니다.

```js
const { Engine } = Matter;
```

외부 라이브러리를 사용할 때는 **`const`** 를 사용하는 것이 좋습니다. 초기화 후 값이 재할당 되지 않는 변수를 선언할 때 사용하는데요, 나중에 코드에서 **`Engine`** 변수를 실수로 덮어쓰는 것을 방지할 수 있습니다.

```js
const { Engine, Vector } = Matter;
```

코드를 단순화 할 수 있습니다.
:::

### 보디(Bodies)

- 보디는 이전 장에서 만들었던 **`Vehicle`**, **`Particle`**, **`Mover`** 등의 클래스와 동일하며, 공간을 이동하고 힘을 경험하는 객체입니다.
- Matter.js의 보디는 **`Matter.Bodies`**에 있는 팩토리 메서드를 사용해 생성됩니다.
  - 다양한 종류의 보디를 생성할 수 있는 메서드들이 있습니다.
  - 팩토리 메서드는 객체를 생성하는 함수입니다.
  - **`new`** 키워드를 사용하는 대신 **`createVector()`**가 **`p5.Vector`** 객체를 생성하는 팩토리 메서드인 것처럼 말입니다.
  - 객체가 생성자에서 생성되느냐 팩토리 메서드에서 생성되느냐는 라이브러리 제작자의 스타일과 디자인 선택에 달려 있습니다.
- 먼저 **`rectangle()`** 메서드로 보디를 생성해보죠.
  ```js
  let box = Bodies.rectangle(x, y, w, h);
  ```
- 이제 위치와 크기를 가진 보디가 생성되었고, 참조는 **`box`** 변수에 저장됩니다.
- 보디에는 많은 속성이 있으며, 이는 움직임에 영향을 줍니다.
  - 예를 들어, 밀도는 결국 그 보디의 질량을 결정합니다.
  - 마찰과 복원력(탄성)은 다른 보디와 접촉할 때의 상호작용 방식을 결정합니다.
  - 대부분의 경우 기본값이면 되지만, Matter.js는 추가적인 인수를 받아 이러한 속성을 지정할 수 있습니다.
  - JavaScript 객체 리터럴 형태로 키-값 쌍을 쉼표로 구분하고 중괄호로 감싸서 전달합니다.
    ```js
    let options = {
      friction: 0.5,
      restitution: 0.8,
      density: 0.002,
    };
    let box = Bodies.rectangle(x, y, w, h, options);
    ```
- 속도나 각속도 등은 정적 메서드로 지정할 수 있습니다.
  ```js
  const v = Vector.create(2, 0);
  Body.setVelocity(box, v);
  Body.setAngularVelocity(box, 0.1);
  ```

### 복합체(Composite)

- 이렇게 생성된 보디는 명시적으로 세계에 추가되어야 합니다. 물리 세계는 엔진 자체에 저장된 **`world`** 라는 **`Composite`** 객체입니다.
  ```js
  // box 객체를 엔진의 world에 추가
  Composite.add(engine.world, box);
  ```

:::info[연습 문제 6.1]
지금까지 배운 내용을 바탕으로, 원형(circular) 보디를 만들기 위해 다음 코드의 빈칸을 채워보세요.

```js
let options = {
  friction: 0.5,
  restitution: 0.8,
};
let ball = Bodies.circle(x, y, radius, options);
```

:::

## 렌더(Render)

- 이제 보디를 그려봅시다.
- 먼저 **`Render`** 클래스를 호출합니다.
  - 특정 캔버스에 렌더러가 그리도록 지정하기 위해 캔버스를 변수에 저장합니다.
  - Matter.js는 p5.js를 모르기 때문에, 여기에 할당된 캔버스는 p5.js 캔버스 객체의 **`elt`** 속성에 저장된 네이티브 HTML5 캔버스입니다.
  - Matter.js의 기본 캔버스 크기는 800x600 이므로 다른 크기를 원한다면 **`options`** 에 이를 지정해야 합니다.
  ````js
  let canvas = createCanvas(640, 360); // 캔버스를 변수에 저장
  let params = {
    canvas: canvas.elt,
    engine: engine,
    options: { width: width, height: height },
  }; // 렌더러 설정
  let render = Render.create(params); // 렌더러 생성
  ```제
  ````
- 렌더 객체를 실행합니다.
  ```js
  Render.run(render); // 렌더러 실행
  ```
- 기본 프레임 속도인 초당 60프레임으로 엔진을 실행하는 내장 러너를 사용해야 합니다. 이는 p5.js의 **`draw()`** 루프를 사용하는 과정입니다.
  ```js
  Runner.run(engine); // 엔진을 실행합니다.
  ```

### 예제 코드 6.1: Matter.js 기본 렌더와 러너

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/1UyRuorB3"></iframe>

```js
// Mattejs 기본 클래스
const { Engine, Bodies, Composite, Body, Vector, Render } = Matter;

function setup() {
  // 캔버스에 대한 참조 저장
  let canvas = createCanvas(640, 240);

  // 물리 엔진 생성
  let engine = Engine.create();

  // 렌더러 생성 및 캔버스 할당
  let render = Render.create({
    canvas: canvas.elt,
    engine,
    options: { width: width, height, height },
  });
  Render.run(render);

  // 마찰력과 탄성력을 가진 상자 생성
  let options = {
    friction: 0.01,
    restitution: 0.75,
  };
  let box = Bodies.rectangle(100, 100, 50, 50, options);

  // 상자에 각도 및 각속도 할당
  let v = Vector.create(5, 0);
  Body.setVelocity(box, v);
  Body.setAngularVelocity(box, 0.1);

  // 시뮬레이션 세계에 박스 추가
  Composite.add(engine.world, box);

  // 지면에 대한 정적 보디 생성 및 추가
  let ground = Bodies.rectangle(width / 2, height - 5, width, 10, {
    isStatic: true,
  });
  Composite.add(engine.world, ground);

  // 러너 생성
  let runner = Matter.Runner.create();

  // 엔진 실행
  Matter.Runner.run(runner, engine);
}
```
