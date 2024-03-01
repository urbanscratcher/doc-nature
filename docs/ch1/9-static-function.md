---
sidebar_position: 9
---

# 9. 정적(static) 함수

## 정적 함수와 비정적 함수의 차이점

- 일반적으로 실수 덧셈이나 벡터 덧셈은 기존 변수 값을 바꾸지만, 새로운 변수에 저장하는 방식도 존재

  ```js
  // 실수 덧셈
  let x = 0;
  let y = 5;
  x = x + y;

  // 벡터 덧셈 (위와 유사)
  let v = createVector(0, 0);
  let u = createVector(4, 5);
  v.add(u);

  // 새 변수에 저장
  let x = 0;
  let y = 5;
  let z = x + y;
  ```

- 벡터 덧셈을 새 변수에 저장하는 방식으로 구현하려면 작동이 안됨
- **`add()`** 구현 방식에 문제가 있기 때문
- **`add()`** 함수는 새 객체를 변환하지 않고, 자기 자신의 벡터 값을 변경함(비정적)

  ```js
  // 벡터 덧셈 (새 변수에 저장하려면?)
  let v = createVector(0, 0);
  let u = createVector(4, 5);

  // 작동하지 않음
  let w = v.add(u);

  add(v){
    this.x = this.x + v.x;
    this.y = this.y + v.y;
  }
  ```

- 따라서 연산 결과로 새로운 객체를 얻고 싶다면 **`add()`** 을 정적 함수로 구현해야 가능함

  ```js
  static add(v1, v2){
    const v3 = createVector(v1.x + v2.x, v1.y + v2.y);
    return v3;
  }
  ```

## 정적 함수 호출

- 개체 인스턴스를 참조하는 대신 클래스 이름을 참조
- p5.Vector의 정적 함수
  - **`add() sub() mult() div()`** 등

```js
let v = createVector(0, 0);
let u = createVector(4, 5);

// 일반 함수: 객체 이름 뒤에 점(.) 연산자를 찍어 사용
let w = v.add(u);

// 정적 함수: 클래스 이름 뒤에 점(.) 연산자를 찍어 사용
let w = p5.Vector.add(v, u);
```

:::info[연습문제 1.7]
정적 함수 혹은 일반 함수를 사용해 다음 문장을 코드로 변환

1. 벡터 v는 (1,5) 값이다
2. 벡터 u는 2를 곱한 값이다
3. 벡터 w는 v와 u를 뺀 값이다
4. 벡터 w를 3으로 나누어라

```js
const v = p5.Vector.createVector(1, 5);
const u = p5.Vector.mult(u, 2);
const w = p5.Vector.sub(v, u);
w.div(3);
```

:::
