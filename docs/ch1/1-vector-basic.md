---
sidebar_position: 1
---

# 1. 벡터 기본

## 벡터란

- 이 책에서 벡터는 **유클리드 벡터**, **기하 벡터**라는 개념으로 사용
- 유클리드 벡터란 **크기**와 **방향**을 가지는 객체
- 벡터는 일반적으로 화살표로 나타내는데, 이 때 화살표가 가리키는 곳이 벡터의 방향이고, 화살표의 길이가 벡터의 크기

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

  <iframe width="640px" height="282px" src="https://editor.p5js.org/urbanscratcher/full/A8UlWzjXO"></iframe>

- 속도, 위치 외에도 물리 법칙을 추가하면 다양한 요소들이 추가될 수 있음
  | 속성 | 변수명 |
  | -------- | ---------------------------- |
  | 가속도 | xAcceleration, yAcceleration |
  | 목표위치 | xTarget, yTarget |
  | 바람 | xWind, yWind |
  | 마찰 | xFriction, yFriction |

- 이때 2차원 세계를 구현하려면 모든 속성은 각각 x, y 2개의 변수를 가져야 하고, 3차원 세계의 경우 3개가 필요함

- 변수를 조금만 사용해 코드를 간단히 만들려면 **벡터**를 활용

  ```
  let x;
  let y;
  let xSpeed;
  let ySpeed;

  // 벡터 활용
  Vector location;
  Vector speed;
  ```
