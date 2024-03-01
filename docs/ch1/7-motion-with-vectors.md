---
sidebar_position: 7
---

# 7. 속도와 벡터를 활용한 이동

## 속도와 벡터의 활용

- 화면을 움직이는 개체를 나타는 무버(Mover) 클래스 구현
  - 무버 클래스의 속성
    - 위치(location)
    - 속도(velocity)
  - 무버 클래스의 기능
    - 움직이기(update)
    - 화면에 출력하기(display)
    - 모서리에 부딪혔을 때 위치 바꿔주기(checkEdges)

```js
class Mover {
  location;
  velocity;

  constructor() {
    this.location = createVector(random(width), random(height));
    this.velocity = createVector(random(-2, 2), random(-2, 2));
  }

  update() {
    this.location.add(this.velocity);
  }

  display() {
    stroke(0);
    strokeWeight(2);
    fill(175);
    circle(this.location.x, this.location.y, 16);
  }

  checkEdges() {
    if (this.location.x > width) {
      this.location.x = 0;
    } else if (this.location.x < 0) {
      this.location.x = width;
    }

    if (this.location.y > height) {
      this.location.y = 0;
    } else if (this.location.y < 0) {
      this.location.y = height;
    }
  }
}
```

```js
let mover;

function setup() {
  createCanvas(640, 240);
  mover = new Mover();
}

function draw() {
  background(255);

  mover.update();
  mover.checkEdges();
  mover.display();
}
```

### 예제 코드 1.7: 속도와 벡터를 활용한 움직임

<iframe width="640px" height="282px" src="https://editor.p5js.org/urbanscratcher/full/58_svZrln"></iframe>
