---
sidebar_position: 6
---

# 6. 진동의 진폭과 주기

- 다음 그림은 사인 함수 그래프입니다.
- $y=\sin(x)$

<img class="img-full" src = "https://natureofcode.com/static/ec857c5575284c3ac355550c0e90fc46/b6aef/03_oscillation_10.webp" />

- 사인 함수 그래프는 -1과 1을 왔다갔다 **진동(Oscellation)** 하는 곡선입니다.
- 기타 줄을 튕겼을 때 현의 움직임, 추의 움직임, 물결치는 수면 모두 진동입니다.

## 단순 조화 운동

- 원이 왼쪽과 오른쪽 끝을 왔다갔다 진동하는 **단순 조화 운동(simple harmonic motion)** 을 그려보죠.

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/wmCTjJWPF"></iframe>

- 위 그림은 x축을 기반으로 움직이고 있습니다.

## 진폭과 주기

- 단순 조화 운동은 2가지 요소로 표현할 수 있습니다.
  - 진폭(amplitude): 움직임의 중심과 가장 멀리 이동했을 때의 거리
  - 주기(period): 1번 완전히 진동하는 데 걸리는 시간
- 사인 함수 그래프를 보면, 진폭은 1이고, 주기는 $2\pi$ 라디안 입니다.
- p5에서 진폭은 픽셀로 나타낼 수 있습니다. 아래 코드에 따르면, 화면 너비가 200px이라면 중앙에서부터 양쪽으로 100px씩 움직입니다.
  ```js
  let amplitude = 100;
  ```
- p5에서 시간 단위는 애니메이션의 시간 단위인 프레임 수(**`frameCount`**)입니다. 따라서 주기는 프레임으로 나타낼 수 있습니다.
  ```js
  let period = 120;
  ```
- 진폭과 주기를 정했다면 공식을 이용해 x의 위치를 구할 수 있습니다.
  ```js
  let x = amplitude * sin(TWO_PI * (frameCount / period));
  ```
  | frameCount | frameCount / period | TWO_PI \* frameCount / period |
  | :--------: | :-----------------: | :---------------------------: |
  |     0      |          0          |               0               |
  |     60     |         0.5         |             $\pi$             |
  |    120     |          1          |            $2\pi$             |
  |    240     |          2          |            $4\pi$             |
  |    ...     |         ...         |              ...              |
- frameCount / period는 몇 번 진동했는지를 나타냅니다. 0.5라면 0.5번, 1이라면 1번 진동한 상태입니다.
- TWO_PI는 삼각함수가 1번 진동하는 데 필요한 라디안 값입니다.
- 따라서 몇 번 진동했는지와 TWO_PI를 곱하면 x를 구할 수 있습니다.

### 예제 코드 3.5 단순 조화 운동 1

- 아래 코드는 원이 x 방향으로 100px의 진폭, 120프레임의 주기로 진동합니다.

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/wmCTjJWPF"></iframe>

```js
function setup() {
  createCanvas(640, 240);
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

  // 진폭과 주기
  let amplitude = 200;
  let period = 120;

  // 수평 위치 계산
  let x = amplitude * sin((TWO_PI * frameCount) / period);

  strokeWeight(2);
  fill(127);
  line(0, 0, x, 0);
  circle(x, 0, 40);
}
```

## 진동수

- **진동수(frequency)** 는 단위 시간마다 진동한 횟수입니다.
- 공식으로는 1 / period 로 위 예제의 진동수는 1/120입니다.
- 즉, 1프레임에 1/120만큼 진동한다는 뜻입니다.

:::info[연습 문제 3.7]
사인 함수를 사용해 상단에서 스프링으로 매달린 추(*bob*이라고도 함)의 시뮬레이션을 만들어 봅시다. **`map()`** 을 사용하여 추의 수직 위치를 계산합니다.

추후 [Spring Forces]에서는 후크 법칙에 따라 스프링의 힘을 모델링해 동일한 시뮬레이션을 만드는 방법을 보여주겠습니다.
:::
