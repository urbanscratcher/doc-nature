---
sidebar_position: 1
---

# 1. 각도

- 이번 장부터는 파티클 시스템, 조향력, 군집 활동 등에 대해 알아봅니다.
- 먼저 삼각법(Trigonometry)라는 중요한 수학 개념을 이해해야 합니다.
- 삼각법을 통해 각도의 크기(각도), 속도(각속도), 가속도(각가속도)를 구할 수 있습니다.
- 이번 장에서는 ease-in, ease-out 진동 패턴을 만들 때 사용하는 사인 함수와 코사인 함수를 살펴봅니다.
- 이를 통해 추의 흔들림이나 경사진 곳에서 움직이는 상자도 구현할 수 있습니다.

:::note[진동 패턴]
다음은 모든 물체의 움직임을 나타낼 때 사용하는 진동 패턴들입니다.
<img src="/img/3-1.jpeg" style={{
        width: '100%',
        height: '130px',
        objectFit: 'cover',
        objectPosition: 'center -80px',
      }} />

- linear: 등속
- ease: 천천-빠름-천천
- ease-in: 천천-보통
- ease-out: 보통-천천
- ease-in-out: 천천-보통-천천
  :::

## 라디안(radian)과 디그리(degree)

### 라디안이란?

- p5.js는 디그리(degree)가 아닌 라디안(radian) 단위를 사용합니다.
- 라디안은 '호의 길이'와 '반지름'의 비율로 각도를 나타내는 단위 입니다.
- 1라디안은 호의 길이와 반지름이 같아지는 시점의 각도입니다.

<img width="300px" src="https://natureofcode.com/static/5f7d8c5419a0e1ec08cb3c3696afcc77/29717/03_oscillation_4.webp" />

### 라디안과 디그리 변환

- 호의 길이가 원의 둘레인 $2\pi r$일 때 각도는 $360\degree$입니다.
  - 이는 반지름 $r$을 $2\pi$배 할 때 각도가 $360\degree$라는 말입니다.
  - $r=1$라디안이므로 $360\degree$ = $2\pi$라디안 입니다.
- $360\degree$는 $2\pi$라디안, $180\degree$는 $\pi$라디안, $90\degree$는 $\frac{\pi}{2}$라디안입니다.
- 따라서 디그리와 라디안 간 변환 공식은 다음과 같습니다.
  - $\theta^\circ = \frac{180}{\pi}\theta_r$ (각도 $\rightarrow$ 라디안)
  - $\theta_r = \frac{\pi}{180}\theta^\circ$ (라디안 $\rightarrow$ 각도)

### p5에서의 라디안과 디그리 변환

- p5.js에서는 이러한 공식을 입력하지 않아도 **`angleMode(DEGREES)`** 를 호출하거나 **`radians()`** 를 통해 디그리를 라디안으로 변환할 수 있습니다.
- $\pi$의 경우 상수 **`PI`** ($180\degree$), **`TWO_PI`** ($360\degree$), **`HALF_PI`** ($90\degree$)를 사용할 수도 있습니다.
- 예를 들어 $60\degree$ 회전하려면,
  ```js
  let angle = 60;
  rotate(radians(angle));
  // 혹은
  angleMode(DEGREES);
  rotate(angle);
  ```
- 자세한 회전의 구현은 [이 영상](https://thecodingtrain.com/tracks/transformations-in-p5)을 참고하세요.

:::note[연습문제 3.1]
**`translate()`** 와 **`rotate()`** 를 사용해 회전하는 지휘봉 모양의 물체를 만들어 보세요.

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/oOJ0kTVaD"></iframe>
:::
