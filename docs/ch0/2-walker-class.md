---
sidebar_position: 2
---

# 2. 워커 클래스

## 객체 지향 프로그래밍(Object Oriented Programming, OOP)

### 객체(object)

- 속성(변수)와 행동 양식(함수)을 갖는 대상
- 객체는 데이터를 소유하며 초기화시 [생성자](#생성자)를 가짐
- 여기서는 워커 객체를 만들어 속성으로는 화면에서의 위치를 나타내는 변수를 만들고, 행동 양식으로는 1) 자기 자신을 화면에 표시하고 2) 이동하는 함수를 구현

### 클래스(class)

- 객체를 만드는 데 사용되는 템플릿
- 클래스가 쿠키 틀이라면, 객체는 쿠키 틀에서 나오는 것

#### 생성자

- 객체가 생성될 떄 자동으로 호출되는 함수
- 모든 클래스는 생성자를 가져야 함
- 생성자에서는 객체의 기본적인 변수에 값을 설정할 수 있음
- 생성자에서 사용된 **`this`** 키워드는 새로 생성된 객체 자체를 가리킴

#### 메서드

- 본질적으로 함수이지만, 차이점은 메서드는 클래스 내부에 정의되어 객체나 클래스와 연관되는 반면, 함수는 그렇지 않음
  - 단적인 예로 **`function`** 키워드는 독립적인 함수를 정의할 때 사용되지만, 클래스 내부에서는 잘 사용되지 않음

## 워커(Walker) 클래스 정의

- 워커 클래스는 x, y 위치를 나타내는 2개의 속성으로 정의
- 생성자에서 시작 위치를 정할 수 있음

```js
class Walker {
  // 기본 변수 - x, y 좌표
  x;
  y;

  // 객체 초기화 - 시작 위치를 화면 중앙으로 지정
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }

  // 메서드1 - 검은 점을 화면에 출력
  show() {
    stroke(0);
    point(this.x, this.y);
  }
}
```

### 이동 메서드 추가

- 랜덤하게 위, 아래, 오른쪽, 왼쪽으로 이동
- **`random()`**:
  [0, 1)의 임의의 부동소수점(실수) 선택
- **`random(n)`**:
  [0, n) 의 임의의 부동소수점(실수) 선택
- **`floor()`**:
  내림 함수
- **`floor(random(4))`**:
  0, 1, 2, 3 중 하나를 랜덤하게 선택

```js
  //메서드2 - 4방향 이동
  step() {
    const choice = floor(random(4));

    // 난수에 따라 이동 방향 결정
    switch(choice){
      case(0):
        this.x++;
        break;
      case(1):
        this.x--;
        break;
      case(2):
        this.y++;
        break;
      case(3):
        this.y--;
        break;
      default:
        return;
    }
  }
```

## 객체 생성 및 함수 호출

### 워커 객체 생성

```js
let walker;

function setup() {
  createCanvas(640, 240);
  walker = new Walker();
  background(255);
}
```

### 워커 객체의 함수 호출

```js
function draw() {
  walker.step();
  walker.show();
}
```

### 예제 코드 0.1: 전통적인 랜덤 워크

<iframe width="650px" height="300px" src="https://editor.p5js.org/urbanscratcher/full/4RHUMOtPR"></iframe>

## 8방향 이동

- 4방향이 아닌 8방향 이동 구현 & 멈춰 있는 경우도 포함
- 0~8 난수를 생성해도 되지만, x축 방향으로 -1, 0, 1 중 하나를 고르고, y축 방향으로 -1, 0, 1 중 하나를 고르면 더 효율적임

```js
  //메서드2 - 8방향 이동
  step() {
    let xStep = floor(random(3)) - 1;
    let yStep = floor(random(3)) - 1;

    this.x += xStep;
    this.y += yStep;
  }
```

### 소수점만큼 이동

- floor 함수를 제거하고, [-1, 1)의 난수를 생성

```js
  //메서드2 - 소수점만큼 8방향 이동
  step() {
    let xStep = random(-1, 1);
    let yStep = random(-1, 1);

    this.x += xStep;
    this.y += yStep;
  }
```

## 워커 객체가 이동할 확률

- 4방향이든, 8방향이든 특정한 방향으로 워커 객체가 이동할 확률은 모두 동일함
- 즉, 4방향으로 이동할 경우 각 확률은 모두 25%(1/4)이고, 9방향으로 이동할 경우 각 확률은 모두 11.1%(1/9)
- **`random()`** 를 이용하면 같은 확률로 숫자를 생성할 수 있음
- 이 함수로 생성되는 숫자의 분포를 그래프로 그리면, 시간이 지날수록 높이 차이가 없어질 것임

### 예제 코드 0.2: 랜덤 분포

<iframe width="650px" height="300px" src="https://editor.p5js.org/urbanscratcher/full/HLYvO4p83"></iframe>

:::note[유사 임의 값(pseudo-random number)]

- 실제로 random()은 오랜 시간 생성시 어떤 패턴이 나오기 때문에 수학적으로 완벽하게 임의의 값을 뽑지 못함
- 수학에서는 이를 **유사 임의 값**이라고 부름
- 하지만 그런 패턴이 발견될 때까지는 매우 오랜 시간이 걸리므로 실질적으로는 임의의 숫자를 생성한다고 가정
  :::

:::info[연습문제 0.1]
Walker 객체가 오른족 혹은 아래로 움직일 확률을 조금 더 높게 만들어 보기
:::
