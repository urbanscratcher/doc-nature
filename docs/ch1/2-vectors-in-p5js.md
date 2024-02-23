---
sidebar_position: 2
---

# 2. p5js의 벡터

- 벡터는 두 점 간의 차이, 혹은 한 점에서 다른 점으로 이동하는 것을 표현할 때 사용
  <img width="500px" src="https://natureofcode.com/static/4eddba63c1027e834ce3f1111095b00b/7e311/01_vectors_3.webp" />
  |벡터|지침|
  |--|----|
  |(-15,3)|서쪽으로 15걸을 걷고, 돌아서 북쪽으로 3걸음 가기|
  |(3,4)|동쪽으로 3걸음 걷고, 북쪽으로 5걸음 가기|
  |(2,-1)|동쪽으로 2걸음 걷고, 남쪽으로 1걸음 가기|

- **`draw()`** 에서는 매 프레임, 객체 위치에 수평, 수직 픽셀을 더해 움직임을 프로그래밍할 수 있었음
  <img width="500px" src="https://natureofcode.com/static/209ff55506df4a9cff7342e649fe61ec/1f761/01_vectors_4.webp"/>

- 속도 벡터

  - 벡터는 물체의 속도(시간에 따른 물체의 위치 변화율)를 결정할 수 있음
  - 속도는 특정 지점에서 새로운 지점으로 어떻게 이동하는지 알려주는 벡터
  - 속도 벡터는 움직임에 대한 기본 알고리즘에 따라 매 프레임 객체의 새 위치를 결정함
  - 객체의 다음 위치는 현재 위치에 속도를 적용한 결과와 같음
    - 다음 위치 = 현재 위치 + 속도

- 위치 벡터
  - 위치는 공간에 있는 하나의 점일 뿐, 실질적으로 벡터는 아님
  - 그러나 원점(0, 0)에서 시작해 특정 지점으로 나아가는 벡터로 나타낼 수 있음

## 벡터 클래스

```js
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
```

### p5js의 벡터 클래스

- p5js는 **`p5.Vector`** 클래스를 내장하고 있으며 **`createVector()`** 로 생성 가능

  ```js
  let x;
  let y;
  let xSpeed;
  let ySpeed;

  // p5.Vector 생성
  let position = createVector(100, 100);
  let velosity = createVector(1, 3.3);
  ```

- 라이브러리가 먼저 로딩돼야 하므로 **`createVector()`** 는 **`setup()`** , **`draw()`** 외부에서 사용할 수 없음
- 현재 위치에 속도를 적용해 다음 위치 결정
  ```js
  position = position + velocity;
  ```
  - 자바스크립트에서 **`+`** 연산자는 기본 타입에만 적용되므로, 더하기 연산을 하려면 **`p5.Vector`** 가 제공하는 따로 메서드를 사용해야 함
