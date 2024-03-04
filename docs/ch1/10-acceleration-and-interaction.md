---
sidebar_position: 10
---

# 10. 가속도와 상호작용

- 벡터와 관련된 계산을 할 때는 항상 벡터의 **방향**과 **길이**부터 생각해야 함

## 벡터의 방향

- 객체의 위치에서 마우스를 향하는 방향 구하기 **`(dx, dy)`**
- 객체 위치를 **`(x, y)`** , 마우스 위치를 **`(mouseX, mouseY)`**
- **`(dx, dy)`** 벡터는 두 벡터의 차로 구할 수 있음
  - dx = mouseX - x
  - dy = mouseY - y
- 특정한 위치에서 다른 위치를 향하는 벡터를 구하기 위해 sub() 정적 함수 사용

```js
let mouse = createVector(mouseX, mouseY);
let direction = p5.Vector.sub(mouse, this.location);
```

## 벡터의 길이

- 그러나 이를 바로 가속도에 적용한다면 속도가 너무 빨라질 것임
- 원하는 크기로 변경하기 위해서는 벡터 정규화 후 스케일링해야 함

```js
direction.normalize();
direction.mult(number);
```

## 마우스를 향해 가속되는 객체

### 구현 순서

1. 객체의 현재 위치에서 마우스를 향하는 벡터 계산
2. 벡터 정규화
3. 적당한 길이의 벡터로 변경 (벡터 곱셈을 이용해 스케일링)
4. 만들어진 벡터를 가속도로 사용

### 예제 코드 1.10: 마우스를 향해 가속되는 객체

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/rKzNmexFk"></iframe>

```js
update() {
  // 1. 방향 구하기
  let mouse = new createVector(mouseX, mouseY);
  let direction = p5.Vector.sub(mouse, this.location);

  // 2. 벡터 정규화
  direction.normalize();

  // 3. 크기 조절
  direction.mult(0.5);

  // 4. 가속도 설정
  this.acceleration = direction;

  this.velocity.add(this.acceleration);
  this.velocity.limit(this.topSpeed);
  this.location.add(this.velocity);
}
```

### 객체가 정지하지 않는 이유

- 현재 코드에 물체를 정지하는 코드가 없기 때문
- 객체는 마우스라는 목표 방향으로 날아갈 뿐
- 현재 위치에서 마우스를 향해 움직이고, 마우스를 넘어가면 다시 반대 방향으로 움직이므로 계속해서 움직이게 됨
- 이러한 움직임은 객체가 마우스 위치로 끌려들어간다는 점에서 이는 **중력 끌림(gravitational attraction)** 과 유사
  - 차이점은, 중력 끌림은 중력에 가까울수록 강하게 작용해야 함
  - 즉, 객체가 마우스에 가까워지면 가속도가 더 커져야 함

:::info[연습문제 1.8]
예제 코드 1.10을 변경해 객체가 마우스에 가까워지면 더 크게 만들기

```js
update(){
// 방향 벡터 값의 역수를 곱해 물체와 마우스간 거리와 물체 크기를 반비례하도록 만듦
// 방향 벡터 값에는 제곱근을 적용해 서서히 반비례 되도록 연산
this.ballSize = 150 / sqrt(direction.mag()) + 16;
}
```

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/eohawz0rm"></iframe>
:::

## 마우스를 향해 가속되는 객체들

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/NqsNM-EKg"></iframe>
