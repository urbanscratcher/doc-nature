---
sidebar_position: 3
---

# 3. 확률과 비균등 분포

- 자연을 모방하기 위해서는 임의성에 모든 것을 맡겨서는 안 돼요.
- **`random()`** 를 이용해 비균등하게 숫자를 생성하는 것이 중요합니다.
- 예) 유전 알고리즘의 구현
  - 적자생존에 따르면, 현재 집단에서 다음 세대로 DNA를 전달할 대상들을 고르는 선택을 하게 되죠.
  - 다윈의 진화론을 모방할 때는 '임의로 원숭이 2마리를 선택해 번식'시키기 보다 '생존에 적합한 원숭이들을 선택해 번식'시키는 것이 더 적합해요.
  - 가령 적당한 속도와 힘을 가진 원숭이는 90% 확률로, 그렇지 못한 원숭이는 10% 확률로 번식하게 만들 수 있죠.

## 확률의 기본 원리

### 단일 사건이 일어날 확률

- $\frac{해당 사건이 발생할 경우의 수}{모든 경우의 수}$
  - 예) 에이스 카드를 뽑을 확률: $\frac{4}{52} = 0.077$ (약 8%)
  - 예) 다이아몬드 카드를 뽑을 확률: $\frac{13}{52}  = 0.25$ (약 25%)

### 어떤 사건이 함께 일어날 수 있는 확률

- 독립 사건의 확률들을 곱해주준 됩니다.
  - 예) 동전 3번 던져서 모두 앞면이 나올 확률: $\frac{1}{2}\times\frac{1}{2}\times\frac{1}{2}$=$\frac{1}{8}$ (약 12.5%)

:::info[연습문제 0.2]
52개의 트럼프 카드에서 에이스 카드를 2번 연속해서 뽑을 확률은?

1. 첫 뽑기 후 다시 섞는 경우

- $\frac{4}{52} \times \frac{4}{52} = \frac{1}{169}$ (약 0.59%)

2. 첫 뽑기 후 다시 섞지 않는 경우

- $\frac{4}{52} \times \frac{3}{51} = \frac{1}{221}$ (약 0.45%)
  :::

## random()으로 사건 발생 확률 조절

### 배열 이용

- 특정 숫자를 배열에 넣고, 확률적으로 높게 선택하고 싶은 요소는 여러 개를 배열에 넣은 후 해당 배열에서 임의의 요소를 선택하는 방법이 있어요.

  - 아래 코드는 40%의 확률로 1, 3을 뽑고, 20% 확률로 2를 뽑습니다.

  ```js
  // 배열에 1과 3을 더 많이 넣어 확률 조절
  const stuff = [1, 1, 2, 3, 3];
  const value = random(stuff);
  text(value, width / 2, height / 2);
  ```

### 범위 이용

- **`random()`**으로 생성된 숫자(0~1 부동소수점 값)가 특정 범위에 있을 때 사건이 발생하게 만들 수도 있어요.

  ```js
  // 10%의 확률
  const probability = 0.1;
  const r = random(1);
  if (r < probability) {
    console.log("Sing!");
  }
  ```

- 여러 개의 사건에 확률을 다르게 적용할 수도 있죠.

  - 0.0 ~ 0.6 (60%) &rarr; 사건A
  - 0.6 ~ 0.7 (10%) &rarr; 사건B
  - 0.7 ~ 1.0 (30%) &rarr; 사건C

  ```js
  const num = random(1);
  if (num < 0.6) {
    console.log("Sing!");
  } else if (num < 0.7) {
    console.log("Dance!");
  } else {
    console.log("Sleep!");
  }
  ```

## 워커 객체에 적용하기

- 워커 객체가 오른쪽 방향으로 움직이는 경향을 갖도록 만들어 볼게요.
  - 오른쪽으로 움직일 확률: 40%
  - 왼쪽으로 움직일 확률: 20%
  - 위로 움직일 확률: 20%
  - 아래로 움직일 확률: 20%

```js
step() {
  const r = random(1);
  if (r < 0.4) {
    this.x++;
  } else if (r < 0.6) {
    this.x--;
  } else if (r < 0.8) {
    this.y++;
  } else {
    this.y--;
  }
  this.x = constrain(this.x, 0, width - 1);
  this.y = constrain(this.y, 0, height - 1);
}
```

### 예제 코드 0.3: 오른쪽으로 갈 확률이 높은 랜덤 워크

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/VabnV4D_Z"></iframe>

:::info[연습문제 0.3]
실시간으로 워커 클래스가 움직이는 방향을 변경해 보세요. 예를 들어 마우스 커서가 있는 방향으로 움직일 확률을 50%로 만들어 보죠.

```js
  step() {
    const r = random(1);

    if(r < 0.5) {
      if (this.x > mouseX && this.y > mouseY){
        this.x--;
        this.y--;
      } else if(this.x > mouseX && this.y < mouseY){
        this.x--;
        this.y++;
      } else if(this.x < mouseX && this.y > mouseY){
        this.x++;
        this.y--;
      } else {
        this.x++;
        this.y++;
      }
    } else {
      const rx = random(-1, 1);
      const ry = random(-1, 1);
      this.x += rx;
      this.y += ry;
    }

    this.x = constrain(this.x, 0, width - 1);
    this.y = constrain(this.y, 0, height - 1);
  }
```

  <iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/y8ZWn3VUH"></iframe>
:::
