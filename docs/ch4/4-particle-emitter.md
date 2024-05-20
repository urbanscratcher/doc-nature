---
sidebar_position: 4
---

# 4. 파티클 방출구

## Emitter 클래스

- 입자 방출을 위해 **`Emitter`** 를 사용해 봅시다.
- 우선 하나의 입자 방출구입니다.
  ```js
  let emitter;
  function setup() {
    createCanvas(640, 360);
    emitter = new Emitter();
  }
  function draw() {
    background(255);
    emitter.run();
  }
  ```

<div style={{display:'flex'}}>
  <div style={{ flex: 1, padding: '10px' }}>
    <h2>**`setup()`** 및 **`draw()`** 에서의 배열</h2>
    <p>
    
    ```js
    
    
    let particles = [];

    function setup(){
      createCanvas(640, 240);
    }

    function draw(){
      particles.push(new Particle());




      let length = particles.length - 1;
      for (let i=length; i>=0; i--){
        let particle = particles[i];
        particle.run();
        if(particle.isDead()){
          particles.splice(i,1);
        }
      }
    }
    ```

    </p>

  </div>
  <div style={{ flex: 1, padding: '10px' }}>
    <h2>**`Emitter`** 클래스에서의 배열</h2>
    <p>
    
    ```js
    class Emitter{
      constructor(){
        this.particles = [];
      }
    }
        
    
    
    
    addParticle(){
      this.particles.push(new Particle());
    }

    run(){
      let length = this.particles.length - 1;
      for (let i=length; i>=0; i--){
        let particle = particles[i];
        particle.run();
        if(particle.isDead()){
          particles.splice(i,1);
        }
      }
    }
    ```

    </p>

  </div>
</div>

## 예제 코드 4.3: 입자 방출구 하나

<iframe src="https://editor.p5js.org/urbanscratcher/full/4FpCqr2Sy" class="editor"></iframe>

```js
class Emitter {
  constructor(x, y) {
    // 이 파티클 시스템은 origin 포인트가 존재
    this.origin = createVector(x, y);
    this.particles = [];
  }

  // 입자가 더해질 때 origin 포인트가 전달됨
  addParticle() {
    this.particles.push(new Particle(this.origin.x, this.origin.y));
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let particle = this.particles[i];
      particle.run();
      if (particle.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
}
```

:::info[연습 문제 4.3]
방출구가 움직이면 어떻게 될까요? 마우스 위치에서 입자를 발사하거나, 속도와 가속도의 개념을 사용해 방출구를 저절로 이동시킬 수 있을까요?
:::

:::info[연습 문제 4.4]
[3장의 Asteroids 예제](../ch3/5-polar-vs-cartesian-coordinates.md#예제-코드-34-극-좌표에서-직교-좌표로의-변환)를 기반으로, 파티클 시스템을 사용해 우주선의 추진력(force)이 적용될 때마다 추진구에서 입자를 발사하도록 해보세요. 파티클의 초기 속도는 우주선의 현재 방향과 관련이 있어야 합니다.
:::
