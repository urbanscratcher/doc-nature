---
sidebar_position: 4
---

# 4. 이동 방향의 목적지

## 속도 벡터의 각도

- 마우스를 향해 움직이는
  [예제 코드 1-10](../ch1/10-acceleration-and-interaction.md#예제-코드-110-마우스를-향해-가속되는-객체)을
  다시 살펴봅시다.
- 지금까지는 원을 회전했기 때문에 이동 방향을 신경 쓰지 않아도 됐지만, 다른 모양
  의 물체는 이동 방향을 고려해야 합니다.
- 이동 방향을 구한다는 것은 **속도 벡터의 방향에 따라서 회전** 하라는 의미입니다
  .
- 하지만 속도는 x, y 요소만을 갖고 있는 벡터인데, 속도 벡터의 각도는 어떻게 알수
  있을까요?

<img width="100%" style={{maxWidth:'640px'}}
src="https://natureofcode.com/static/704e6fd7eedc279cca0b0b5b4fa4eb40/ab120/03_oscillation_7.webp"
/>

- $\tan(angle)$ = $\frac{v_y}{v_x}$
- 여기서 문제는 속도 벡터의 구성 요소는 알고 있지만, 방향의 각도를 모른다는 것입
  니다.

## 탄젠트의 역함수

- 탄젠트의 역함수인 아크탄젠트 **`atan()`** 을 이용하면 됩니다.
  - $\tan(a)=\frac{v_y}{v_x}$
  - $a=\arctan(\frac{v_y}{v_x})$
- **`Mover`** 클래스 메서드에서는 다음과 같이 구현됩니다.

```js
show(){
  let angle = atan(this.velocity.y / this.velocity.x); // 아크탄제트를 이용해 각도 구하기
  stroke(0);
  fill(175);
  push();
  translate(this.position.x, this.position.y);
  rotate(angle); // 회전
  pop();
}
```

- 그리나 $v_x$, $v_y$ 각 구성요소들이 반대 방향을 가리킨다면 역탄젠트의 방향도
  (-)가 됩니다.
- 이를 해결하기 위해 **`atan2()`** 를 사용합니다.

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/OdaN1JHUE"></iframe>

```js
display(){
  let angle = atan2(this.velocity.y, this.velocity.x); // 아크탄젠트2 적용
  push();
  rectMode(CENTER);
  translate(this.position.x, this.position.y);
  rotate(angle); // 회전
  rect(0,0,30,10);
  pop();
}

```

- 이것을 더 단순화하는 코드도 있습니다.
- 내부적으로 **`atan2()`** 를 호출해 라디안 단위의 각도를 구해주는
  **`p5.Vector`** 의 **`heading()`** 를 사용하면 됩니다.
  ```js
  display(){
    let angle = this.velocity.heading();
  }
  ```

:::info[연습문제 3.4]
화살표 키로 운전할 수 있는 자동차 시뮬레이션을 만드세요. 왼쪽 화살표 키를 누르면 차가 왼쪽으로 가속되고, 오른쪽 화살표 키를 누르면 오른쪽으로 가속됩니다. 차는 현재 이동하고 있는 방향을 향해야 합니다.
:::
