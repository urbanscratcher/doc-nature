---
sidebar_position: 3
---

# 3. 입자 배열

## 배열 적용

- 자바스크립트에서 배열은 **Array** 클래스에서 생성된 객체로, 많은 [내장 메서드](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)가 있습니다.
- 이러한 메서드들을 통해 **`Particle`** 입자 추가, 제거 등 많은 수의 입자를 관리할 수 있습니다.
  ```js
  let total = 10;
  let particles = [];
  function setup() {
    for (let i = 0; i < total; i++) {
      particles[i] = new Particle(width / 2, height / 2);
    }
  }
  function draw() {
    for (let i = 0; i < particles.length; i++) {
      let particle = particles[i];
      particle.run();
    }
  }
  ```

## 자바스크립트의 반복문

- 간단히 자바스크립트의 for 문의 종류를 알아봅시다.
  - **`for`** 기존 반복문과 동일
  - **`for...in`** 객체의 모든 속성 반복
  - **`forEach()`** 고차 함수 사용 가능
  - **`for...of`** 기존 반복문에 비해 간결하게 사용 가능
    ```js
    function draw() {
      for (let particle of particles) {
        particle.run();
      }
    }
    ```
- 프레임마다 새 입자를 만들어 봅시다.
  ```js
  let particles = [];
  function setup() {
    createCanvas(640, 360);
  }
  function draw() {
    background(255);
    // 매 사이클마다 새 파티클 객체가 배열에 추가됨
    particles.push(new Particle(width / 2, 20));
    for (let i = 0; i < particles.length; i++) {
      particles[i].run;
    }
  }
  ```
- 그러나 위 코드를 실행하면 프레임 속도가 점점 느려지죠. 입자가 제거되지 않고 누적되기 때문입니다.

## splice() 삭제의 문제점

- **`splice()`** 를 이용하면 입자가 소멸될 때 배열에서 입자를 제거할 수 있습니다. 그런데 이 메서드는 파티클의 인덱스 값을 사용하기 때문에 **`for...of`** 문을 사용할 수 없어요.
- 기존 for 문으로 돌아가 구현해보죠.
  ```js
  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];
    particle.run();
    if (particle.isDead()) {
      // 인덱스 i의 파티클을 1개 제거
      particles.splice(i, 1);
    }
  }
  ```
- 그런데 문제가 있습니다. 각 파티클에 대해 반복문이 돌아가는 도중 새 파티클을 또 추가하면, 배열의 **`length`** 가 늘어나지만, 이전 배열의 크기를 늘릴 수는 없기 때문에 무한의 루프로 빠져듭니다.
  ```js
  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];
    particle.run();
    // 반복문 도중에 새 파티클 추가
    particles.push(new Particle(width / 2, 20));
  }
  ```
- 반복문이 도는 중 배열에서 요소를 제거해도 위와 같은 일은 일어나지 않겠지만, 결함이 있다는 말입니다.

  - **`splice()`** 로 배열에서 요소를 제거하면, 그 이후의 요소는 모두 왼쪽으로 이동해 인덱스 값이 바뀝니다.
    <img src="https://natureofcode.com/static/746943801cf905f11d16440d49a0500a/93bc1/04_particles_2.webp" class="img-full" />
    | i | 입자 | 동작 |
    | :-: | :---: | :-------------------------------------------------- |
    | 0 | 입자A | 삭제X |
    | 1 | 입자B | 삭제X |
    | 2 | 입자C | 삭제하고 입자 D와 E를 슬롯 3과 4에서 2와 3으로 이동 |
    | 4 | 입자E | 삭제X |
  - 문제가 보이시나요? 입자D가 확인되지 않았죠!
  - 입자C가 2번 자리에서 삭제될 때 D는 2번으로 이동합니다. 그러나 **`i`** 는 이미 3번으로 증가된 상태지요.
  - 실제로는 **`draw()`** 가 프레임을 반복시키기 때문에 입자D는 다음 라운드에서 확인되겠지만, 요소가 스킵될 수 있다는 점은 우리가 예상한 바가 아니죠.

## 해결법

### 1. 배열을 뒤에서부터 반복시키기

- 요소가 제거될 때 나머지 요소들은 오른쪽에서 왼쪽으로 이동하기 때문에 요소가 스킵되지 않습니다.
  ```js
  for (let i = particles.length - 1; i >= 0; i--) {
    let particle = particles[i];
    particle.run();
    if (particle.isDead()) {
      particles.splice(i, 1);
    }
  }
  ```

### 2. **고차 함수** 이용하기

- 고차 함수란 다른 함수를 인수로 받거나 리턴하는 함수입니다.
- 자바스크립트 배열은 고차 함수를 사용합니다.
  - 예를 들어 **`sort()`** 은 두 요소를 비교하는 방법에 관한 함수를 인수로 받고, 그에 따라 배열을 정렬합니다.
- 파티클 배열에서는 **`filter()`** 를 사용할 수 있습니다.
  - 이 고차 함수 메서드는 어떤 조건을 명시하는 함수를 인수로 받고, 배열의 각 요소에 대해 그 조건을 확인하며 조건이 참인 경우에만 해당 요소를 리턴합니다(false를 리턴하지 않는 한).
  - 자바스크립트에서는 일반적으로 화살표 함수를 사용합니다 ([참고](https://thecodingtrain.com/tracks/topics-in-native-javascript/js/higher-order-functions/)).
  ```js
  particles = particles.filter((particle) => !particle.isDead);
  ```
- 그러나 여기서는 **`splice()`** 를 사용하겠습니다.

## 예제 코드 4.2: 파티클 배열

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/AAVmHeg1r"></iframe>

```js
let particles = [];

function setup() {
  createCanvas(640, 240);
}

function draw() {
  background(255);

  particles.push(new Particle(width / 2, 20));

  // 뒤에서부터 파티클 제거
  for (let i = particles.length - 1; i >= 0; i--) {
    let particle = particles[i];
    particle.run();
    if (particle.isDead()) {
      particles.splice(i, 1);
    }
  }
}
```

- 특정 시간이 지난 후 가장 오래된 입자를 제거하지 않고, **`isDead()`** 를 사용하는 이유는 소멸 조건을 더 유연하게 가져가기 위함입니다.
