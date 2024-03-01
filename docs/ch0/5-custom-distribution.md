---
sidebar_position: 5
---

# 5. 난수의 사용자 정의 분포

## 레비의 비행 (Levy Flight)

- 먹이를 찾아 움직이는 랜덤 워크의 경우, 먹이의 위치를 모르므로 계속 움직여야 함
- 그런데 랜덤 워크는 이미 확인했던 위치를 계속해서 확인하는 **오버샘플링** 문제가 있음
- 오버샘플링 확률을 줄이려면 가끔 아주 멀리 이동하면 됨
- 이러한 랜덤 워크의 변형 형태를 **레비의 비행**이라고 부름
- 레비의 비행을 완벽히 구현하기는 어렵지만, 대신 '확률 분포로 멀리 이동할 확률을 작게 만들고, 가까운 곳으로 이동할 확률을 크게 만든다'에 집중해 구현

```js
let xStep;
let yStep;
const r = random(1);

// 1% 확률로 크게 이동
if (r < 0.01) {
  xStep = random(-100, 100);
  yStep = random(-100, 100);
} else {
  xStep = random(-1, 1);
  yStep = random(-1, 1);
}
```

- 그러나 위 방법은 특정한 값(1 or 100)만을 선택할 수 있음

### 사용자 정의 규칙

- 만약 '큰 숫자는 선택될 확률이 높다'는 규칙으로 숫자를 선택하려면?
  - x가 난수일 때 $y=x$ 함수를 만들어 y를 확률로 사용할 수 있다면?
  - <img src="https://natureofcode.com/static/4c4bb483173672e4ab41bb3f670f259a/20fb6/00_randomness_4.webp" width="200px" />
- 이를 구현하려면 난수를 1개가 아니라 2개를 선택하고 시작
  - 첫 번째 난수는 그냥 난수이지만, 두 번째 난수는 '난수를 판정하는 값'으로, 첫 번째 난수를 사용할지, 다시 새로운 임의의 숫자를 뽑을 지 판정해주는 값임
  - 판정이 쉬운 숫자는 확률적으로 많이 선택될 것이고, 판정이 어려운 숫자는 확률적으로 적게 선택될 것임

### 몬테 카를로 수락-거부 알고리즘

- 이 과정을 몬테 카를로 카지노의 이름을 딴 몬테 카를로 방법 중 **수락-거부 알고리즘(accept-reject algorithm)**이라고 함

#### 구현 단계

1. 난수(**`r1`**) 선택
2. R1을 사용할지 말지 판정하는 확률(**`p`**) 계산
   - **`p = r1`** 사용
   - 예를 들어 r1으로 0.1이 선택되면 이는 10%의 확률로 사용
   - r1으로 0.83이 선택되면 이는 83%의 확률로 사용
   - 즉, 큰 숫자가 나올수록 사용될 확률이 높음
3. 별도로 난수(**`r2`**) 선택
4. **`r2 < p`** 이면 **`r1`** 사용
5. **`r2 >= p`** 이면 1번으로 돌아가 반복

```js
function acceptReject() {
  // 원하는 형태의 숫자가 나올 때까지 반복
  while (true) {
    const r1 = random(1);
    const p = r1;
    const r2 = random(1);
    if (r2 < p) {
      return r1;
    }
  }
}
```

### 예제 코드 0.5: 수락-거절 알고리즘의 확률 분포

<iframe  class="editor"  src="https://editor.p5js.org/urbanscratcher/full/_O6GR9pba"></iframe>

:::info[연습문제 0.6]
직접 만든 확률 분포를 사용해 랜덤 워크의 스텝 크기가 계속 변경되게 만들기
예를 들어, 선택하는 숫자의 범위를 변경해 스텝 크기를 정해보기. 또한 큰 숫자가 선택될 확률을 제곱으로 하는 지수적 확률도 사용해 보기.

```js
let step = 10;
let stepx = random(-step, step);
let stepy = random(-step, step);
// A uniform distribution of random step sizes. Change this!

this.x += stepx;
this.y += stepy;
```

(1장에서는 벡터를 활용한 효율적인 방법에 대해 다시 살펴볼 것)
:::
