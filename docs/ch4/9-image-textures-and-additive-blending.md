---
sidebar_position: 9
---

# 9. 이미지 텍스처와 가산 합성

## 이미지 텍스처

- 입자에 텍스처를 입히는 방법을 알아봅시다. 다양한 영상 효과를 만들 수 있습니다.
- 아래와 같이 다른 이미지 텍스처를 입히면, 왼쪽은 평범한 원 모양의 연기를, 오른쪽은 흐릿한 모양의 연기를 만들 수 있습니다.

<img src="https://natureofcode.com/static/73997710f1444f7f9c9e6113f082abe2/89f69/04_particles_5.webp" class="img-full" />

- 이미지를 이용하면 아주 적은 비용으로 많은 효과를 얻을 수 있습니다.
- 그러나 코드를 작성하기 전에 이미지 텍스처를 만들어야 합니다.
- p5에서는 투명도 때문에 png 형식을 사용하는 것이 좋습니다.

### 예제 코드 4.8: 이미지 텍스처를 사용한 파티클 시스템

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/Q33PRVu9L"></iframe>

```js
let emitter;
let img; // 텍스처 이미지

// 이미지 프리로드
function preload() {
  img = loadImage("data/texture.png");
}

function setup() {
  createCanvas(640, 240);
  emitter = new Emitter(width / 2, height - 75);
}

function draw() {
  background(0);

  // 바람의 힘 적용
  let dx = map(mouseX, 0, width, -0.2, 0.2);
  let wind = createVector(dx, 0);
  emitter.applyForce(wind);

  emitter.run();
  emitter.addParticle();
}


class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);

    // 가우시안 적용
    let vx = randomGaussian(0, 0.3);
    let vy = randomGaussian(-1, 0.3);

    this.velocity = createVector(vx, vy);
    this.acceleration = createVector(0, 0);
    this.lifespan = 100.0;
  }

   // 이미지 그리기
   display() {
    // tint()는 fill()과 문법이 같음
    tint(255, this.lifespan);
    imageMode(CENTER);
    image(img, this.position.x, this.position.y);
  }

  run()
  isDead()
  applyForce(force)
  update()
}

class Emitter {...}
```

### 가우시안 분포

- 이 예제와 함께 [0장 난수의 정규 분포](../ch0/4-regular-distribution.md)를 복습하면 좋습니다.
- 연기를 임의의 방향으로 방출하는 대신, 초기 속도 벡터를 대부분 평균값 주위로 몰려 있도록 가우시안 분포를 활용하면, 결과가 분수, 연기, 불처럼 나타납니다.
- **`randomGaussian()`** 을 이용해 속도 벡터를 초기화 해보세요.
  ```js
  let vx = randomGaussian(0, 0.3);
  let vy = randomGaussian(-1, 0.3);
  this.velocity = createVector(vx, vy);
  ```

### 바람의 힘 적용

- 마지막으로 이 예제에서는 마우스가 수평으로 움직임에 따라 바람의 힘을 적용했습니다.

  ```js
  function draw() {
    background(0);

    // 바람의 힘의 방향은 mouseX를 기준으로 함
    let dx = map(mouseX, 0, width, -0.2, 0.2);
    let wind = createVector(dx, 0);

    emitter.applyForce(wind);
    emitter.run();
    emitter.addParticle();
  }
  ```

## 해상도

- 텍스처를 디자인 하는 것 외에도 해상도도 고려해야 합니다.
- 고해상도 텍스처를 많이 렌더링 하면 성능이 매우 저하될 수 있으며 특히 코드에서 동적으로 크기를 생성하는 경우 더욱 그렇습니다.
- 최적의 속도를 위해 그리려는 해상도에 맞게 텍스처의 크기를 정확히 조정해야 합니다.
- 다양한 크기의 입자를 그리려면 이론적으로는 입자의 최대 크기로 텍스처를 생성해야 합니다.

:::info[연습 문제 4.11]
다른 효과를 내는 텍스처를 만들어 보세요. 파티클 시스템을 불꽃처럼 보이게 할 수 있나요?
:::

:::info[연습 문제 4.11]
이미지 배열을 사용해 **`Particle`** 개체에 각기 다른 이미지를 할당해 보세요. 여러 입자가 동일한 이미지를 그리기 때문에 필요 이상으로 **`loadImage()`** 를 호출하지 마세요. (각 이미지 파일에 대해 1번만 호출하면 됩니다!)
:::

## 합성 모드

- 컴퓨터 그래픽에서는 색을 합성하는 알고리즘이 있는데요, 이를 **합성 모드(Blend mode)** 라고 합니다.
- 일반적으로 p5는 다른 것 위에 무언가를 그리면 최상위 레이어만 표시됩니다 (기본 합성 모드).
  - 투명도가 있는 이미지를 사용한다면 알파 합성 알고리즘이 사용되는데, 이는 투명도 값을 기반으로 뒤에 있는 이미지와 앞에 있는 이미지의 픽셀을 합성하는 것입니다.
- 다른 합성 모드로 **가산 합성** 이 있습니다.
  - 로버트 호긴(Robert Hogin)이 [Magnetosphere](https://roberthodgin.com/project/magnetosphere)[^1]라는 파티클 시스템과 힘을 사용한 작품을 만들면서 유명해졌어요.
  - 가산 합성은 한 이미지의 픽셀 값을 다른 이미지의 픽셀 값과 더하는 간단한 알고리즘 입니다.
  - 합성될 수록 색상이 점점 더 밝아지기 때문에 초현실적인 광채(glow) 효과가 만들어집니다. (참고로 최대 픽셀값은 255)

[^1]: 아이튠즈에서 음악 시각화 효과로 사용되고 있습니다.

### 예제 코드 4.9: 가산 합성

<iframe class="editor" src="https://editor.p5js.org/urbanscratcher/full/iyo81gaFFH"></iframe>

```js
function setup() {
  // WebGL 렌더러 옵션 활성화
  createCanvas(640, 240, WEBGL);
}

function draw() {
  // 가산 모드 사용
  blendMode(ADD);
  // 전경이 합성되기 때문에 이전에 그려진 것을 덮지 않으려면 clear() 해줘야 함
  clear();
  // 가산 합성의 광채 효과는 흰 배경에서 보이지 않음
  background(0);

  let dx = map(mouseX, 0, width, -0.2, 0.2);
  let wind = createVector(dx, 0);
  emitter.applyForce(wind);
  emitter.run();

  // 사이클 당 3개의 파티클 생성해 더 많은 효과를 가산
  for (let i = 0; i < 3; i++) {
    emitter.addParticle();
  }
}
```

### WebGL 렌더러 옵션

- p5 라이브러리의 기본 렌더러는 최신 웹 브라우저에 포함된 표준 2D 드로잉 및 애니메이션 렌더러 상에서 구축됐습니다.
- 그러나 추가 렌더링 옵션인 **`WEBGL(Web Graphics Library)`** 도 사용할 수 있습니다.
- WebGL은 2D 및 3D 그래픽 모두를 위한 브라우저 기반 고성능 렌더러입니다.
- 이는 컴퓨터의 그래픽 카드에서 사용할 수 있는 기능들을 사용할 수 있습니다.
- 일반적으로 WebGL 렌더러는 3D 개체를 그릴 때만 필요하지만, 2D의 경우에도 그리기 성능을 높일 수 있습니다. 파티클 시스템이 좋은 예지요.
- WebGL 모드는 원점을 (0, 0)에서 캔버스 중심으로 이동시킨다는 점을 명심하세요.
- 또, 몇 몇 함수의 동작 방식과 렌더링의 퀄리티를 변경시킵니다.
- 그리고 드물지만 오래된 기기나 브라우저는 WebGL을 지원하지 않을 수 있습니다.
- 자세한 사항은 이곳을 [참고](https://thecodingtrain.com/tracks/webgl)하세요.

:::info[연습 문제 4.13]
예시 4.9에서 **`draw()`** 가 사이클을 돌 때마다 for 루프로 3개의 입자가 추가되어 더 레이어드된 효과를 만듭니다. 더 나은 방법은 **`addParticle()`** 메서드를 수정하여 인수를 받도록 하는 것입니다. 예를 들어 **`addParticle(3)`** 은 추가할 입자 수를 결정합니다. 여기에 새로운 메서드를 작성하세요. 값이 없을 때는 하나의 입자를 기본값으로 설정하도록 하려면 어떻게 할까요?

:::

:::info[연습 문제 4.14]
**`tint()`** 를 가산 합성과 함께 사용하여 무지개 효과를 만듭니다. **`SUBTRACT`**, **`LIGHTEST`**, **`DARKEST`**, **`DIFFERENCE`**, **`EXCLUSION`**, **`MULTIPLY`** 와 같이 다른 모드로 합성하려고 하면 어떤 일이 발생할까요?
:::
