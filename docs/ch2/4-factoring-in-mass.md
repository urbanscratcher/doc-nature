---
sidebar_position: 4
---

# 4. 질량

## 질량 추가

- Mover 클래스 내부에 속성을 하나 더 만들어줘야 합니다.
- 질량은 물질의 양을 나타내므로 벡터가 아닌 스칼라 값이에요.

```js
class Mover {
  constructor() {
    this.position = createVector();
    this.velocity = createVector();
    this.acceleration = createVector();

    // 질량 추가
    this.mass = 10;
  }
}
```

:::info[측정 단위]

- 길이: 픽셀
- 시간: 각 프레임 단위 (draw()함수가 호출되는 주기)
- 질량
  - 질량은 확인할 수 있는 단위가 없으므로, 픽셀과 연관시킬 수 있습니다.
  - 예를 들어, 질량이 10이면 원의 반지름이 10 입니다.
  - 현실에서는 질량과 반지름은 상관관계가 없습니다.
    (밀도가 높은 금속 공은 축구공 보다 무거울 수 있습니다.)

:::

## 질량 적용

- $\vec A = \frac {\vec F}{m} $
- 힘을 질량으로 나눈 값을 가속도에 적용합니다.

```js
applyForce(force){
  // 뉴턴의 운동 2법칙 적용
  force.div(this.mass);
  this.acceleration.add(force);
}
```

### 문제점 - 객체의 가변성

- wind가 일률적으로 (0.1, 0)로 변경됨

```js
let moverA = new Mover();
let moverB = new Mover();

let wind = createVector(1, 0);

moverA.applyForce(wind);
moverB.applyForce(wind);
```

- applyForce()에서 객체를 함수의 매개변수로 전달하면 참조값이 전달돼요.
- 따라서 위 코드는 객체를 직접 변경해버립니다.
- 객체의 불변성을 보장하기 위해서는 다음과 같이 매개변수 값을 복사한 후 변형시켜야 합니다.

```js
let f = force.copy(); // 벡터 복사
f.div(this.mass);
this.aceleration.add(f);
```

:::note[참조(reference)]

- 대부분의 프로그래밍 언어에서 기본 자료형은 값 자체가 복사되고, 객체는 참조(reference) 값이 복사돼요.
- 객체는 다양한 속성을 가지고 있기 때문에 복잡성을 피해야 합니다.

```js
let a = 4222; // 변수 a에 메모리 주소 할당
let b = a; // 새로운 메모리 주소에 a에 할당된 값을 복사, 새 메모리 주소 할당

let c = new Mover(); // 변수 c에 메모리 주소 할당
let d = c; // c 메모리 주소 할당
```

- c, d는 같은 객체를 가리키게 됩니다. (참조 값이 같기 때문이죠)

:::
:::info[연습문제 2.2]
p5.Vector.div() 정적 함수를 이용한 객체의 불변성 보장해 보아요.

```js
applyForce(force){
  let f = p5.Vector.div(force, this.mass);
  this.acceleration.add(F)
}
```

:::
