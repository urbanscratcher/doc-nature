---
sidebar_position: 10
---

# 10. 진자

<img class="img-half" src="https://natureofcode.com/static/a9a387a5228aafbf53f737dc2edf5d4f/8846e/03_oscillation_15.webp" />

- 진자는 중심점(pivot, anchor)의 암(arm)에 매달려 있는 추입니다.
- 진자가 정지해 있을 때는 수직으로 늘어집니다. 그러나 정지 상태에서 일정한 각도로 들어 올렸다 놓으면 호 모양을 그리며 앞 뒤로 흔들립니다.

## 중력과 장력

<img class="img-half" src="https://natureofcode.com/static/35f3e3c1faca808e3b11192031e7852c/7a61a/03_oscillation_16.webp" />

- 위 그림은 움직이는 진자에 작용하는 중력과 장력을 나타냅니다.
- 진자가 흔들릴 때 진자의 암과 추는 중심점(pivot)을 중심으로 회전합니다.
- 암이 추와 중심점을 연결하지 않으면 추는 중력의 영향을 받아 지면에 떨어지겠지만, 고정된 암은 2번째 힘은 **장력** 을 생성합니다.

## 각속도와 각가속도

### 진자 운동의 알짜 힘

- 진자의 암은 고정된 길이를 갖기 때문에 변하는 것은 각도 뿐입니다.
- 진자의 운동은 암의 각도 변화를 나타내는 각가속도와 각속도로 설명할 수 있습니다.
  - 여기서는 편의상 에너지 보존 법칙, 운동량, 구심력 등 다른 물리적 개념은 무시합니다.
- 진자의 각가속도를 계산하기 위해서는 뉴턴의 제2운동법칙을 사용하면 됩니다.
- 진자의 팔이 수직이 되도록 캔버스를 돌리고, 삼각형을 그려볼까요.
  <img class="img-full" src="https://natureofcode.com/static/6b99c7f2e686f460b4d5a9ebf82db52c/5ea19/03_oscillation_17.webp" />
- 새로운 y축을 기반으로 $F_g$ 벡터를 x와 y 구성요소로 나누어 봅니다. 중력을 빗변으로 하는 직각 삼각형이 보이죠.
  - $F_{gy}$ 는 장력 $T$ 와 반대되는 힘을 나타냅니다.
  - $F_{gx}$ 는 진자의 암에 수직인 힘으로, 추를 회전시키는 힘입니다.
- 진자가 운동하면 y축(암)은 운동 방향에 항상 수직일 것입니다. 그러니 우리는 운동 방향을 결정하기 위해 장력과 $F_{gy}$ 를 무시하고, $F_{gx}$ 라는 **알짜 힘** 에만 집중하면 됩니다.
- 중요한 점은, 그림과 같이 장력과 정지위치 간 각도 $\theta$ 와 우리가 구하려는 직각삼각형의 각도 $\theta$ 각 같다는 것입니다.
- 극 좌표 변환을 사용하면,
  - $\sin(\theta)=\frac{F_{gx}}{F_g}$
  - $F_{gx}=\sin(\theta)\times F_g$
- 이제 $F_{gx}$ 를 진자(pendulum)의 힘 $F_p$ 이라고 명명할게요.

### 진자 운동의 각가속도

- 캔버스를 다시 원래대로 돌려볼까요. 진자의 알짜 힘이 추를 어떻게 움직이는 지 더 명확히 하기 위해 $F_p$ 도 추의 중심으로 옮겨 볼게요.

<img class="img-4to5" src="https://natureofcode.com/static/380ed440474e5aa361dbc9b2e6704bc5/db8dd/03_oscillation_18.webp"/>

- 이제 위 공식에 진자의 각가속도를 적용해 봅시다. 뉴턴 제2법칙 ($F=M\times A$)에 따라,
- $\text{진자의 각가속도} = \sin(\theta) \times \text{중력 가속도}$
  - 여기서 중력 가속도는 $9.8m/s^2$ 이지만, p5에서는 의미가 없죠.
  - 우리는 **`graivty`** 라는 임의의 정수로 가속도의 크기를 조정할 것입니다.
  - 참고로 각가속도는 가속도 $A$ 와 구분하기 위해 $\alpha$ 라고 표기됩니다.
- $\alpha = \sin(\theta) \times 중력$
- 잠깐 암에 대한 가정을 다시 생각해 보면, 진자의 암은 금속봉이거나 고무줄일 수 있고요, 길이, 질량 등 다른 변수가 작용할 수 있습니다.
  - 여기서는 진자의 암은 단단한 봉으로 절대 휘지 않으며 질량은 무시할 정도로 작다고 가정합니다.
  - 길이도 $1$로 가정합니다. 실제로는 토크와 관성 모멘트 때문에 암의 길이는 가속도에 영향을 미치지만요.
- 토크($\tau$): 물체에 작용하는 회전력을 측정한 것이며 추의 질량과 팔의 길이에 비례합니다($Mr$).
- 관성 모멘트($I$): 진자의 중심점을 중심으로 진자 회전이 어려운 정도를 나타내며 추의 무게, 암 길이의 제곱에 비례합니다 ($Mr^2$).
- 뉴턴 제2법칙 ($F=M\times A$)에 따르면, 회전 반발력 $\tau = I \times \alpha$ 이 존재합니다.
  - 각가속도 $\alpha$ 를 얻기 위해 $\alpha = \frac{\tau}{I}$ 라는 식을 얻을 수 있죠.
  - 토크와 관성 모멘트 식을 대입하면, $\alpha=\frac{Mr}{Mr^2}$ 혹은 ${\frac{1}{r}}$ 이 됩니다.
  - 이에 따르면, 각가속도는 추의 질량과는 무관합니다!
  - 이것은 갈릴레오의 가속도에 관한 피사의 사탑 실험과 동일한 결과입니다.
    - 실험에서 다른 물체는 질량과 관계없이 동일한 속도로 떨어졌습니다.
  - 추의 질량은 각가속도에 영향을 주지 않고, 암의 길이만이 영향을 미칩니다.
- 최종 공식은,
  $\alpha = \frac{중력 \times \sin(\theta)}{r}$

## Pendulum 클래스 캡슐화

- 이제 다음 진자의 속성을 **`Pendulum`** 클래스에 적용해 보겠습니다.
  - 암의 길이
  - 각도
  - 각속도
  - 각가속도

```js
  constructor(){
    this.r;
    this.angle;
    this.angleVelocity;
    this.angleAcceleration;
  }
```

- **`update()`** 에서는 진자의 각도를 업데이트 하는 메서드를 작성해야 합니다.
- 각가속도의 계산에는 $-1$ 을 곱해야 합니다.
  - 진자가 정지 위치의 오른쪽에 있을 때 각도는 양수이므로 각도의 sin 값도 양수인데, 중력은 반대 방향인 정지 위치로 끌어당겨야 하죠.
  - 진자가 정지 위치의 왼쪽에 있을 때 각도는 음수이므로 각도의 sin 값도 음수인데, 이 경우 당기는 힘은 양수여야 합니다.
  - 따라서 어떤 겨우든 $-1$을 곱해야 합니다.

```js
update(){
  let gravity = 0.4;
  this.angleAcceleration = (-1 * gravity * sin(this.angle)) / this.r;
  this.angleVelocity += this.angleAcceleration;
  this.angle += this.angleVelocity;
}
```

- 이제 **`display()`** 로 진자를 그려 봅시다.
  <img class="img-full" src="https://natureofcode.com/static/6c681c07b3f7792f62f2f8d9946c6ff4/85c1c/03_oscillation_19.webp" />
- 생성자에서 중심점(pivot), 암의 길이(r), 추(bob) 변수를 설정합니다.
  - $\theta$ 가 일반 직각삼각형과 반대로 윗각에 있으므로 x, y를 바꿔주면 됩니다.
  ```js
  this.pivot = createVector(100, 10);
  this.r = 125;
  this.bob = createVector(r * sin(this.angle), r * cos(this.angle));
  this.bob.add(this.pivot); // 중심점으로부터 추를 위치시킴
  ```
- 실제 진자는 중심점에서 일정한 마찰력과 공기 저항을 경험합니다. 현재 상태로는 진자가 영원히 흔들리게 돼요.
  - 좀 더 현실적인 진자 운동을 위해 각속도를 약간 줄여봅시다.
  - 애니메이션의 각 프레임에 대해 속도를 1% 만큼 줄입시다.
  ```js
  this.angleVelocity *= 0.99;
  ```

### 예제 코드 3.11: 흔들리는 추

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/zw5-C76Ja"></iframe>

```js
let pendulum;
function setup() {
  createCanvas(640, 240);
  pendulum = new Pendulum(width / 2, 0, 175); // 진자 객체 생성, 시작 위치와 팔 길이를 인자로 전달
}
function draw() {
  background(255);
  pendulum.update(); // 진자 객체의 상태를 업데이트
  pendulum.show(); // 진자 객체를 화면에 출력
}
class Pendulum {
  constructor(x, y, r) {
    this.pivot = createVector(x, y); // 진자의 회전축 위치
    this.bob = createVector(); // 진자 추의 위치
    this.r = r; // 진자의 팔 길이
    this.angle = PI / 4; // 진자의 팔 각도
    this.angleVelocity = 0; // 각도 변화율
    this.angleAcceleration = 0; // 각가속도
    this.damping = 0.99; // 감쇠 계수
    this.ballr = 24; // 추의 반지름
  }
  update() {
    let gravity = 0.4; // 중력 가속도
    this.angleAcceleration = ((-1 * gravity) / this.r) * sin(this.angle); // 각가속도 공식
    this.angleVelocity += this.angleAcceleration; // 각속도 업데이트
    this.angle += this.angleVelocity; // 각도 업데이트
    this.angleVelocity *= this.damping; // 각속도에 감쇠 적용
  }
  show() {
    this.bob.set(this.r * sin(this.angle), this.r * cos(this.angle)); // 극좌표에서 직교좌표로 변환하여 추의 위치 계산
    this.bob.add(this.pivot); // 회전축 위치에 추의 위치 더하기
    stroke(0); // 팔 색상 설정
    line(this.pivot.x, this.pivot.y, this.bob.x, this.bob.y); // 회전축에서 추까지 선 그리기
    fill(127); // 추 색상 설정
    circle(this.bob.x, this.bob.y, this.ballr * 2); // 추 그리기
  }
}
```

:::info[연습 문제 3.15]
여러 개의 진자를 연결해, 한 진자의 추가 다음 진자의 회전축 역할을 하도록 만들어 보세요. 그런데 이렇게 하면 흥미로운 결과를 얻을 수 있겠지만, 실제 물리학적으로는 전혀 정확하지 않을 것입니다. 실제 이중 진자를 시뮬레이션하려면 정교한 방정식이 필요합니다. 이중 진자에 대한 자세한 내용은 [Wolfram Research의 이중 진자](https://scienceworld.wolfram.com/physics/DoublePendulum.html)나 [이중 진자 코딩 영상](https://thecodingtrain.com/challenges/93-double-pendulum)을 참고하시기 바랍니다.

:::
:::info[연습 문제 3.16]
<img class="img-full" src="https://natureofcode.com/static/d9c9422697287160b1c02041c55e7923/30d33/03_oscillation_20.webp" />

삼각함수를 사용해 위 그림에 묘사된 **수직 반발력(normal force)** (썰매가 놓인 경사면에 수직인 힘)의 크기를 계산하는 방법은 뭘까요? 중력($F_{gravity}$)의 크기는 알려진 상수라고 가정할 수 있습니다. 먼저 직각 삼각형을 찾아보세요. 수직 반발력은 결국 중력의 한 성분과 같고 반대 방향입니다.
:::

:::info[연습 문제 3.17]
마찰력이 있는 경사면을 따라 미끄러지는 상자의 시뮬레이션을 만들어 보세요. 앞서 언급했듯 마찰력의 크기는 수직 반발력에 비례합니다.
:::

## 생태계 프로젝트

생물체 중 하나를 선택해 그 움직임에 진동을 포함시켜 보세요. [예제 3.7](../ch3/7-oscellation-with-angular-velocity.md#예제-코드-37-oscillator-객체들)의 Oscillator 클래스를 모델로 사용할 수 있습니다. 그러나 Oscillator 객체는 단일 지점(캔버스 중앙)을 중심으로 진동합니다. 이동하는 지점을 중심으로 진동하도록 해보세요.

다시 말해, 위치, 속도, 가속도에 따라 움직이는 생물체를 설계해 보세요. 그러나 그 생물체는 정적인 모양이 아니라 진동하는 물체입니다.

움직임의 속도와 진동 속도를 연결해 보는 것은 어떨까요? 나비의 날갯짓이나 곤충의 다리를 생각해 보세요. 생물체의 내부 메커니즘(진동)이 그 운동성을 구동하는 것처럼 보이게 할 수 있을까요?

[2장](../ch2/10-nbody-problem.md)의 attraction과 진동을 결합한 예제는 책 웹사이트를 참고하세요.

<img src="https://natureofcode.com/static/d9c9a19d326ef654a1fb5d3cbc87dc75/2e9c6/03_oscillation_21.webp" class="img-full" />
