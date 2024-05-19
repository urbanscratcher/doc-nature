---
sidebar_position: 8
---

# 8. 파동

- 이전에는 사인 함수를 통해 하나의 원이 x축으로 진동하게 만들었는데요, 반복문으로 여러 개의 원을 나열하고 진동시키면 파동이 됩니다.
- 이러한 파동 패턴은 물과 같이 부드러운 표면은 물론이고, 인체나 생명체의 기관을 시뮬레이션 할 때 사용할 수 있습니다.

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/epSUZShuj"></iframe>

## 예제 코드 3.8: 정적 파동

- 여기서도 진폭과 주기 개념을 적용합니다.
- 하지만 이번에는 여러 개의 진동을 사용해 완전한 파동을 만들어야 하므로 시간을 기반으로 주기를 만들지 않고, 너비(px)를 기반으로 만듭니다.
- 각속도를 이용해 보겠습니다.

```js
let angle = 0;
let deltaAngle = 0.2;
let amplitude = 100;
```

- 다음 순서에 따라 파동의 x 좌표를 기반으로 반복문을 돌립니다. 좌표는 24px씩 추가해줍니다.

  1. 진폭과 각도로 y 위치 계산
  2. (x, y) 위치에 원 그리기
  3. 각도에 각속도를 더해 각도 증가시키기

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/oKfjYTe4G"></iframe>

```js
let angle = 0;
let deltaAngle = 0.2;
let amplitude = 100;

function setup() {
  createCanvas(640, 240);
  background(255);
  stroke(0);
  fill(127, 127);
  for (let x = 0; x <= width; x += 24) {
    // 1. 진폭과 각도로 y 위치 계산
    let y = amplitude * sin(angle);
    // 2. (x, y) 위치에 원 그리기
    circle(x, y + height / 2, 48);
    // 델타속도를 더해 각도 증가시키기
    angle += deltaAngle;
  }
}
```

- **`deltaAngle`** 이 달라지면 결과가 달라지는 모습을 확인할 수 있습니다.
- 각도의 변화가 클수록 파장은 짧아집니다.

## 예제 코드 3.9: 파동

- 파동을 움직이게 하려면 어떻게 할까요?
- 대부분 theta(각도)를 전역 변수로 선언하고 **`draw()`** 에서 증가시키면 될 것이라고 생각하겠죠.
- 하지만 그렇게하면 제대로 작동하지 않습니다. 왼쪽 끝의 파동과 오른쪽 끝의 파동이 연결되지 않죠.
- 따라서 별도로 각도를 나타내는 변수 **`startAngle`** 을 만들어서 시작하는 부분의 각도를 정해줘야 합니다.
- 그리고 이 변수를 각속도로 증가시키면 파동이 움직입니다.

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/Ed5MGJTG-"></iframe>

```js
let startAngle = 0;
let deltaAngle = 0.2;

function setup() {
  createCanvas(640, 240);
}

function draw() {
  background(255);

  // 매 프레임 angle은 startAngle로 설정
  let angle = startAngle;

  for (let x = 0; x <= width; x += 24) {
    let y = map(sin(angle), -1, 1, 0, height);
    stroke(0);
    fill(127, 127);
    circle(x, y, 48);

    // 한 파동의 angle 증가
    angle += deltaAngle;
  }

  // startAngle 증가
  startAngle += 0.02;
}
```

- 예제에서 **`startAngle`** 의 증가분은 **`0.02`** 로 하드코딩되어 있지만, **`deltaAngle`** 을 재사용하거나 별도의 변수를 사용하는 것이 권장됩니다.
- **`deltaAngle`** 을 재사용하면 파동의 공간적 진행이 시간적 진행과 연결되어 더 동기화된 움직임을 만들어 낼 수 있습니다.
- 별도의 변수, 예를 들어 **`startAngleVelocity`** 라는 변수를 도입하면 파동의 속도를 독립적으로 제어할 수 있습니다.
  - 여기서 **`velocity`** 이라는 단어를 사용하는 것이 적절한데, 시간이 지남에 따라 **`startAngle`** 이 변화하기 때문입니다.

:::info[연습 문제 3.10]
예제 3.9에서 y 값을 설정할 때 사인 함수나 코사인 함수 대신 펄린 노이즈 함수를 사용해 보세요.
:::

:::info[연습 문제 3.11]
파동 생성 코드를 **`Wave`** 클래스로 캡슐화하고, 다른 진폭과 주기를 가진 2개의 파동으로 표시해 보세요.

또, 단순한 원이나 선 말고 더 창의적인 방식으로 시각화해 보는 것은 어떨까요? **`beginShape()`** , **`endShape()`** , **`vertex()`** 를 사용해 점들을 연결하는 것은 어떨까요?
:::

:::info[연습 문제 3.12]
더 복잡한 파동을 만들기 위해서는 여러 개의 파동을 합칠 수 있습니다. 몇 몇 파동에 대한 높이 혹은 y값을 계산하고, 그 값들을 더한 y값을 얻으세요. 각 파동의 특성을 통합한 새로운 파동을 볼 수 있을 것입니다.
:::
