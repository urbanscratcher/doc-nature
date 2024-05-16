---
sidebar_position: 8
---

# 8. 가속도와 벡터를 사용한 이동

## 가속도

- 가속도(acceleration): 속도가 변화하는 비율입니다.
- 속도(veolocity): 위치가 변하는 비율입니다.
- 가속도는 속도에 영향을 주고 속도는 위치에 영향을 줍니다. (연쇄반응)
  ```js
  velocity.add(acceleration);
  position.add(volocity);
  ```

## 가속도 활용 예제

- 다음은 가속도를 계산하는 알고리즘 예시입니다.
  1. 변하지 않는 값을 가속도로 사용
  2. 랜덤한 값을 가속도로 사용
  3. 마우스를 향하는 가속도를 사용

### 알고리즘1: 일정한 가속도

- 이전에 작성한 코드에 가속도 벡터 추가해 보아요.

  ```js
  class Mover {
    constructor() {
      this.location = createVector(width / 2, height / 2);
      this.velocity = createVector(0, 0);

      // 가속도 벡터 추가
      this.acceleration = createVector(0, 0);
    }

    update() {
      // 가속도를 활용한 움직임을 코드로 작성
      this.velocity.add(this.acceleration);

      this.location.add(this.velocity);
    }
  }
  ```

  - 일정한 크기의 가속도를 설정해 속도를 변화시키고, 속도로 위치를 변화시켜 봅시다.

    - 예제에서는 매 프레임마다 개체 속도가 x방향으로 -0.001픽셀, y방향으로 0.01픽셀씩 증가해요.
    - 이 값들은 실제로 너무 작아보여도, 프레임 속도에 따라 초당 약 30번 **`draw()`** 함수를 실행하므로 시간이 흐르면 누적됩니다.
    - 속도 벡터의 크기가 너무 빨리 커지거나 제어할 수 없을 정도로 커지는 것을 방지하려면 가속도 값을 매우 작게 유지해야 해요.

    ```js
    // update()
    this.acceleration = createVector(-0.001, 0.01);
    ```

  - 너무 빨라지지 않게 **`limit()`** 로 속도 제한해 봅시다.
    - 이 함수를 이용하면 속도 벡터의 크기가 10보다 커질 경우 10으로 고정시킬 수 있습니다.
    ```js
    // update()
    this.velocity.limit(10);
    ```

  :::info[연습문제 1.4]
  p5.Vector 클래스의 limit() 직접 구현해 보아요.

  ```js
    limit(max){
      if(this.mag()>max){
        this.normalize();
        this.mult(max);
      }
    }
  ```

  :::

- 일정한 값을 가속도로 사용한 움직임 구현

  ```js
  class Mover {
    constructor() {
      this.location = new createVector(width / 2, height / 2);
      this.velocity = new createVector(0, 0);

      // 가속도
      this.acceleration = new createVector(-0.001, 0.01);

      // 속도의 최댓값
      this.topSpeed = 10;
    }

    update() {
      // 가속도 추가
      this.velocity.add(this.acceleration);

      // 속도 제한
      this.velocity.limit(this.topSpeed);
      this.location.add(this.velocity);
    }

    display() {...}
    checkEdges() {...}
  }
  ```

### 예제 코드 1.8: 일정한 가속도에 따른 움직임

  <iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/laC1llS2Q"></iframe>

:::info[연습문제 1.5]
오른쪽 화살표 키를 누르면 속도가 빨라지고, 왼쪽 화살표 키를 누르면 속도가 느려지는 물체 구현하기

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/sSJrZJATf"></iframe>
:::

### 알고리즘2: 랜덤한 가속도

- 생성자에서 가속도를 한번 초기화하고 사용하는 것이 아니라 **`update()`** 함수에서 매 순간마다 가속도를 변경
- **`random2D()`** 를 이용해 방향은 임의지만, 크기는 항상 1인 정규화 벡터를 얻을 수 있음
- **`mult()`** 를 이용해 정규화 벡터를 스케일링 할 수 있음

  ```js
    update(){
      // random2d()로 임의의 방향을 가진, 길이가 1인 벡터를 얻을 수 있음
      this.acceleration = p5.Vector.random2D();

      this.velocity.add(this.acceleration);
      this.velocity.limit(this.topSpeed);
      this.position.add(this.velocity);

      // 정해진 값으로 스케일링
      this.acceleration.mult(0.5);

      // 0~2 랜덤한 값으로 스케일링
      this.acceleration.mult(random(2));
    }
  ```

### 예제 코드 1.9: 랜덤한 가속도

- 랜덤한 방향과 0과 2사이의 랜덤한 가속도를 갖는 벡터로 움직임을 표현
- 가속도(속도 변화율)를 랜덤한 값으로 사용함으로써 속도를 점진적으로 변경할 수 있음
- 이는 연쇄적인 반응이기 때문에 물체의 움직임은 지나치게 랜덤하지 않음
- 즉, 기존 랜덤 워커에서는 부족했던 연속성과 유동성을 줄 수 있음
<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/GIcejwmmV"></iframe>

:::info[연습문제 1.6]
펄린 노이즈를 이용해 가속도 주기

```js
constructor() {
  this.position = createVector(width / 2, height / 2);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.topSpeed = 80;

  // 노이즈 함수에 넣을 t값 정의
  this.tx = 0;
  this.ty = 10000;
}

update() {
// 펄린 노이즈 속도 조절
const w = map(noise(this.tx), 0, 1, 0, 0.5);
const h = map(noise(this.ty), 0, 1, 0, 0.3);

// 가속/감속 랜덤 값 적용
this.acceleration.x = w * random(-1,1);
this.acceleration.y = h * random(-1,1);

// ...
}
```

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/Wo-OO0yMB"></iframe>
:::
