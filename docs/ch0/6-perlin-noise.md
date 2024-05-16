---
sidebar_position: 6
---

# 6. 펄린 노이즈

- 유기체나 사실적인 행동 양식 등을 프로그래밍할 때 자주 사용되는 펄린 노이즈에 대해 알아봅시다.
- 좋은 난수 생성기는 각 숫자끼리 관계성과 규칙성 없이 숫자를 생성해야 하는데, 정말 순수한 난수가 자연 현상에 존재할까요?
- 켄 펄린이 고안한 **펄린 노이즈** 알고리즘은 자연적인 질서를 가진 일련의 난수를 생성해요.
  - 펄린은 '80년대 초 영화 트론을 제작하면서 노이즈 함수를 개발했답니다.[^1]
  - 이 함수는 절차적[^2] 텍스처를 CG를 구현할 때 사용됐어요.
  - 그 밖에 밸류 노이즈(value noise), 월리 노이즈(Worley noise), 심플렉스 노이즈(simplex noise)[^3] 등 다양한 노이즈가 존재해요.
- 펄린 노이즈를 사용하면 구름, 풍경, 대리석 패턴과 같이 자연의 성질을 가진 다양한 효과를 연출할 수 있어요.
- 그래프를 그려보면, 일반 노이즈는 값이 들쭉날쭉한데 반해 펄린 노이즈은 매끄러운 곡선을 그려준답니다.

[^1]: [켄 펄린의 웹사이트](https://mrl.cs.nyu.edu/~perlin/doc/oscar.html)
[^2]: 아티스트가 수동으로 시각적 요소를 디자인하는 것이 아니라 알고리즘을 통해 시각적 요소를 생성하는 것을 의미
[^3]: [Simplex Noise 설명 영상](https://thecodingtrain.com/tracks/noise/noise/open-simplex-noise)

## p5js에서의 구현

- p5js에서는 기존의 '83년 펄린 노이즈 알고리즘을 **`noise()`** 으로 구현했어요.
- 먼저 임의의 x 위치에 원 그려볼까요?
  ```js
  const x = random(0, width);
  circle(x, 180, 16);
  ```
- 임의의 x 위치 대신 펄린 노이즈로 부드러운 x 위치에 원을 그리려면 어떻게 해야 할까요?
  ```js
  // 작동하지 않음
  const x = noise(0, width);
  circle(x, 180, 16);
  ```
  - **`random()`** 은 매개변수로 범위의 최솟값, 최댓값을 넣지만, **`noise()`** 의 출력 범위는 0과 1사이로 정해져 있기 때문이에요.
    - **`map()`** 으로 이 범위를 확장할 수 있답니다.
- 1차원 **`noise()`** 의 매개변수
  - 시간에 따른 값들의 선형적 결과를 반환해요.
  - 예를 들면 이런 식이에요.
    |시간|노이즈 값|
    |--|--|
    |0|0.365|
    |1|0.363|
    |2|0.363|
    |3|0.364|
    |4|0.366|
  - 특정 노이즈 값에 접근하기 위해 **특정한 시간**을 매개변수로 전달해줘야 해요.
    ```js
    // n = 0.364
    const n = noise(3);
    ```
- 시간을 변수로 만들고, **`noise()`** 의 매개변수로 넣으면, t가 변하지 않으므로 함수가 계속 같은 값을 반환합니다.

  ```js
  let t = 3;
  function draw() {
    const n = noise(t);
    console.log(n);
    // 내부에서 계속 t를 변화한다면 계속 다른 값을 얻을 수 있음
    // t += 0.01;
  }
  ```

- t를 얼마나 빠르게 변화시키는지도 노이즈의 부드러운 형태에 영향을 줘요.
  - t를 빠르게 변화시킨다면 중간 값들을 뛰어넘으므로 부드럽지 않게 움직일 거예요.
    <img width="500px" src="https://natureofcode.com/static/66603c7d2e445a1f379c7d950cbb7daa/55f67/00_randomness_5.webp" />

## 노이즈 범위 확장

- **`map()`** 을 이용하면 범위를 확장할 수 있어요.

  <img width="500px" src="https://natureofcode.com/static/f1eebdb7f954042e7e8d2ec263e3e261/62b8e/00_randomness_6.webp"/>

```js
let t = 0;
function draw() {
  const n = noise(t);

  // map() 함수로 펄린 노이즈의 범위를 설정
  const x = map(n, 0, 1, 0, width);

  ellipse(x, 180, 16, 16);
  t += 0.01;
}
```

### 랜덤 워크에 펄린 노이즈 적용

```js
class Walker {
  x;
  y;

  tx;
  ty;

  Walker() {
    this.tx = 0;
    this.ty = 10000;
  }

  step() {
    x = map(noise(tx), 0, 1, 0, width);
    y = map(noise(ty), 0, 1, 0, height);

    // 시간을 기반으로 계속 이동
    tx += 0.01;
    ty += 0.01;
  }
}
```

### 예제 코드 0.6: 펄린 노이즈 워커

  <iframe  class="editor" src="https://editor.p5js.org/urbanscratcher/full/A1ZaxLM5n"></iframe>

- tx, ty를 각각 0, 10000로 초기화 한 이유

  - 노이즈 함수는 결정적 함수이므로 특정한 시간 t에 대해 항상 같은 결과를 반환해요.
  - tx, ty가 같은 값이면 객체는 대각선으로 움직일 거예요.
  - 그러나 값이 다르면 서로 다른 2개의 노이즈 공간을 사용하게 되므로 x, y는 서로 무관한 다른 값을 가지고 움직이는 것처럼 보이겠죠?

- 사실 여기에서 실제 시간의 개념은 작용하지 않으며, 실제로 관련된 것은 시간이 아니라 **공간** 이에요.
  <img width="500px" src="https://natureofcode.com/static/3f5d8def4c0db5cd32bee4921c53861a/843e7/00_randomness_7.webp"/>
  - 위 그래프는 1차원 공간에 대해 일련의 노이즈 값을 표시한 거예요.
  - 임의의 시점에 따라 특정한 x의 위치를 구할 수 있죠.
  - 다음부터는 **`xoff`** 라는 변수가 등장하는데, 이는 위 그래프에서 시간을 나타내던 t를 대체해 사용하는 거예요. (노이즈 그래프의 x축 오프셋)

:::info[연습문제 0.7]
위 랜덤 워크에서는 노이즈 함수의 결과를 워커 객체의 위치에 바로 넣었어요. **`noise()`** 의 결과를 워커 객체의 스텝 크기에 넣어 랜덤 워크 예제를 다시 만들어 보세요.

```js
step() {
  this.x += map(noise(this.tx),0,1,-1,1);
  this.y += map(noise(this.ty),0,1,-1,1);

  this.tx += 0.01;
  this.ty += 0.01;
}
```

:::

## 2차원 노이즈

<img width="500px" src="https://natureofcode.com/static/86eca0b21a9fd539438e2523f463037b/b937b/00_randomness_8.webp"/>

- 1차원 노이즈
  - 각 값이 이웃한 값과 비슷한 일련의 연속된 값이에요.
  - 값은 1차원에 있으므로 앞의 값(그래프 왼쪽)과 뒤의 값(그래프 오른쪽)만 이웃한 값이죠.
- 2차원 노이즈
  - 선 위의 값이 아니라 격자 위에 있는 값 사용해요.
  - 격자 내부에 있는 각 사각형에 숫자가 있다면, 모든 값은 이웃한 값(위, 아래, 왼쪽, 오른쪽, 대각선의 8방향)과 비슷한 값이 적혀 있겠죠?
  - 이러한 값이 적혀 있는 격자를 적혀 있는 숫자로 밝기를 나타내 시각화하면 구름과 같은 모양이 나온답니다.
    - 흰색 옆에는 회색, 회색 옆에는 밝은 회색, 밝은 회색 옆에는 어두운 회색, 어두운 회색 옆에는 검은색, 검은색 옆에는 어두운 회색...
  - 이는 원래 노이즈가 만들어진 목적으로, 매개변수를 조금만 조정하거나 색을 조금 변경하기만 하면 대리석이나 목재 등 유기적인 텍스처에 가까운 이미지를 생성할 수 있어요.

### p5js에서의 구현

- 펄린 노이즈 이용해 임의의 밝기로 색 넣어볼까요?

  ```js
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const idx = (x + y * width) * 4;
      //임의의 밝기 적용
      // const brightness = random(255);
      const brightness = map(noise(x, y), 0, 1, 0, 255);

      // r, g, b, alpha 값 설정
      pixels[idx] = brightness;
      pixels[idx + 1] = brightness;
      pixels[idx + 2] = brightness;
      pixels[idx + 3] = 255;
    }
  }
  updatePixels();
  ```

- **`random()`** vs. **`noise()`**
  <img src="/img/6-1.png" width="48%" />
  <img src="/img/6-2.png" width="48%" />
- 그러나 구름과 같이 원하는 형태가 되지 않네요.

  - 200px부터 201px로 밝기를 1이라는 밝기로 증가하는 것은 굉장히 큰 변화이기 때문이에요.
  - 2차원 노이즈도 앞서 t를 0.01 증가한 것처럼 추가적인 변수를 만들어 사용하면 돼요.

  ```js
  let xoff = 0.0;

  for (let x = 0; x < width; x++) {
    let yoff = 0.0;

    for (let y = 0; y < height; y++) {
      const idx = (x + y * width) * 4;

      // xoff, yoff로 노이즈 생성
      const brightness = map(noise(xoff, yoff), 0, 1, 0, 255);

      pixels[idx] = brightness;
      pixels[idx + 1] = brightness;
      pixels[idx + 2] = brightness;
      pixels[idx + 3] = 255;

      yoff += 0.01;
    }
    xoff += 0.01;
  }
  ```

### 예제 코드 0.6: 2차원 펄린 노이즈

  <iframe width="400px" height="450px" src="https://editor.p5js.org/urbanscratcher/full/j-z5L9iQ0"></iframe>

## 펄린 노이즈의 다양한 활용

- 펄린 노이즈는 원래 픽셀의 위치나 색상하고만 관련된 것이 아니에요. 다음과 같은 경우에도 활용할 수 있죠.
  - 바람의 힘을 구현할 때
  - 프랙털로 구현한 나뭇가지에서 가지 사이의 각도
  - 흐름을 따라 움직이는 객체의 속도와 방향을 지정할 때
- 그러나 임의성을 과도하게 사용할 수 있는 것처럼 펄린 노이즈를 과도하게 사용하는 함정에 빠질 수 있습니다.
- 어떤 시스템의 규칙을 정하는 것은 우리 자신이죠.
- 또한 더 많은 도구를 알수록 선택의 폭이 넓어질 것입니다.

:::info[연습문제 0.8]
색상, **`noiseDetail()`**, xoff와 tiff의 증가 속도 변경 등의 방법으로 다양한 시각적 효과 만들어 보세요.
:::

:::info[연습문제 0.9]
**`noise()`** 의 3번째 매개변수를 추가하고, 매 순간마다 **`draw()`** 에서 이를 증가시켜 2차원 노이즈 애니메이션 만들어 보세요.
:::

:::info[연습문제 0.10]
노이즈로 땅 지형을 만들어 보세요.
:::
