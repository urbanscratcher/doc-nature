---
sidebar_position: 1
---

# 1. 벡터 기본

## 벡터란

- 이 책에서 벡터는 **유클리드 벡터**, **기하 벡터**라는 개념으로 사용합니다.
- 유클리드 벡터란 **크기**와 **방향**을 가지는 객체를 말합니다.
- 벡터를 시각적으로 표현할 때는 주로 화살표를 사용하는데요, 이때 화살표의 방향이 벡터가 향하는 방향을 나타내고, 화살표의 길이는 벡터의 크기를 나타냅니다.

## 벡터의 이점

- 벡터를 사용하지 않고 공이 튀는 코드를 짠다면,

  ```js
  // 위치
  let x = 100;
  let y = 100;

  // 속도
  let xSpeed = 1;
  let ySpeed = 3.3;

  function setup() {
    createCanvas(640, 240);
    background(255);
  }

  function draw() {
    background(255);

    x += xSpeed;
    y += ySpeed;

    if (x > width || x < 0) {
      xSpeed = -1 * xSpeed;
    }

    if (y > height || y < 0) {
      ySpeed = -1 * ySpeed;
    }

    stroke(0);
    fill(200);
    circle(x, y, 48);
  }
  ```

### 예제 코드 1.1: 벡터를 사용하지 않은 탱탱볼

  <iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/A8UlWzjXO"></iframe>

- 속도, 위치 외에도 물리 법칙을 추가하면 다양한 요소들이 추가될 수 있습니다.
  | 속성 | 변수명 |
  | -------- | ---------------------------- |
  | 가속도 | xAcceleration, yAcceleration |
  | 목표위치 | xTarget, yTarget |
  | 바람 | xWind, yWind |
  | 마찰 | xFriction, yFriction |

- 이때 2차원 세계를 구현하려면 모든 속성은 각각 x, y 2개의 변수를 가져야 하고, 3차원 세계의 경우 3개가 필요해요.

- 변수를 조금만 사용해 코드를 간단히 만들려면 **벡터**를 활용하면 됩니다.

  ```
  let x;
  let y;
  let xSpeed;
  let ySpeed;

  // 벡터 활용
  Vector location;
  Vector speed;
  ```
