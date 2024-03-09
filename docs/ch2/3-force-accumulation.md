---
sidebar_position: 3
---

# 3. 힘 축적

- net $\vec F = m \times \vec A$
  - 뉴턴의 운동 1법칙에 따라 어떤 물체에 적용하는 모든 힘의 합이 0이라면 물체는 가속도가 없는 평형 상태를 이룸
- 힘을 축적하려면 힘을 모두 더하면 됨

```js
applyForce(force){
  this.acceleration.add(force);
}
```

- 모든 힘을 다 합쳐서 가속도에 더해주므로 update() 함수가 호출되기 전에 가속도를 0으로 초기화해야 함

## 예: 바람의 힘 적용

- 바람이 강할 때, 약할 때, 불지 않을 때가 있음
- 사용자가 마우스 버튼을 누를 때 바람이 불고, 떼면 멈추도록 하기

```js
if (mouseIsPressed) {
  const wind = createVector(0.5, 0);
  mover.applyForce(wind);
}
```

- 마우스 버튼을 떼면 물체에 작용하는 힘은 0이 되고, 뉴턴의 운동 1법칙에 따라 물체는 속도를 유지하게 됨
- 그러나 위 코드만 적용할 시 마우스 버튼을 떼도 바람의 영향은 계속됨
- 또한 가속도가 0으로 초기화 되지 않으므로 매 프레임마다 힘이 계속 추가돼 가속도도 계속 증가함
- 따라서 각 프레임에서 가속도가 없는 상태를 만들어줘야 함

```js
update(){
  this.velocity.add(this.acceleration);
  this.location.add(this.velocity);

  // 가속도 지우기
  this.acceleration.mult(0);
}
```

:::info[연습문제 2.1]
방금 배운 힘으로 떠다니는 헬륨 풍선을 구현하기. 헬륨 풍선은 위로 날아가고, 화면의 상단에 부딪힐 것임. 펄린 노이즈 등으로 시간에 따라 바람의 힘도 변경시켜 보기

<iframe width="300" height="342" src="https://editor.p5js.org/urbanscratcher/full/DLXE0pI38"></iframe>
:::
