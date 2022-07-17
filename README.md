# 2022 MUSINSA Frontend 사전과제

#### 👨 개발자 : 류성현 (Hoi)

### 구동 방법

- build해서 실행하기

1. 의존성 설치 : npm ci
2. 빌드 : npm run build
3. ./build 폴더에 생성된 index.html 실행

- dev-server을 이용해 build 없이 실행하기 :

1. 의존성 설치 : npm ci
2. 개발자 모드로 테스트 : npm start
3. 프로덕션 모드로 테스트 : npm test

```javascript
// 빌드해서 보고싶다면

npm ci
npm run build

// 개발 모드를 보고싶다면

npm ci
npm start

```

### 바닐라 typescript로 프로젝트를 선택한 이유

- 바닐라 Typescript

바닐라 JS의 성능이 리액트보다 우수하기 때문입니다. 리액트는 UI 라이브러리로써 매우 가볍지만 분명 바닐라보다는 무겁습니다. useMemo와 같은 메모이제이션으로 최적화를 진행하더라도 바닐라에 미치지는 못합니다. 이번 과제에서는 상태 관리가 필요한 부분이 많지 않다고 판단했습니다. 그렇다면 바닐라로 구현하는게 더 목적적합하다고 판단했습니다.

- 함수형 프로그래밍

함수형은 선언적 프로그래밍이 가능합니다. 바닐라 JS의 치명적인 단점은 코드의 일관성이 부족하다는 것입니다. 그래서 라이브러리처럼 특정한 패턴을 만들어 보고 싶었습니다. 함수를 고차원으로 추상화 해두면 선언적으로 사용할 수 있습니다. go함수나 pipe함수, curry를 활용한 함수의 조합을 많이 시도했습니다. 컴포넌트를 렌더링하는 render 함수 태그와 속성, 값, 이벤트, 이벤트핸들러, 등을 선택하여 전달받아 렌더링 할 수 있도록 추상화 했습니다.

- 컴포넌트 단위 개발

컴포넌트 단위 개발은 렌더링에 필요한 동작 코드를 한 곳에 응집할 수 있습니다. 문제는 상태관리입니다. 리액트의 경우 상태 변화에 따라 해당 상태를 사용하는 하위 컴포넌트를 리렌더링 하는 방식으로 동작합니다. 하지만 바닐라에서 마찬가지 로직을 구현하려면 매우 비효율적입니다. 가상DOM을 만들어서 최적화를 진행하더라도 리액트 사용에 비해 메리트가 없습니다. 그래서 선택한 방법은 커스텀 이벤트와 옵저버 패턴입니다.

- 옵저버 패턴을 활용한 useReducer 방식의 상태관리

옵저버 패턴을 활용해 리액트의 ContextAPI 방식을 구현했습니다. ContextAPI와 달리 Props Drilling은 피할 수 없어서 전역으로 사용했습니다. 전역에 생성하더라도 모듈 스코프로 전역 변수는 방어가 되기 때문입니다. useReducer 함수를 구현해 적용했습니다. 생성한 Provider을 import해서 사용합니다. setObserver 메소드로 미리 상태를 구독해 둔 뒤, dispatch가 이루어질때 notify 키워드를 함께 전달하게 했습니다. notify 값을 구독하고 있는 모든 콜백이 동작하여 상태 관리를 구성했습니다.

- webpack을 통한 최적화

webpack으로 ts, scss 파일을 번들링 했습니다. 프로덕션에서는 hidden-source-map 옵션을, 개발 모드에서는 source-map 옵션을 적용해 프로덕션에 map 파일이 노출되는 것을 막았습니다. 나 홀로 개발이기 때문에 개발 단계에서만 타입 체크를 진행하고 프로덕션은 빠른 빌드를 위해 transpileOnly 옵션을 적용했습니다. 만약 둘 이상의 협업이 된다면 프로덕션 파일의 빠른 빌드보다는 프로덕션에 대한 타입 체크가 더 합리적이기 때문에 해당 옵션을 제거했을 것입니다.

### 위키

- 요구사항 분석 : [https://github.com/youryu0212/musinsa/wiki/[FE]-요구사항-분석](https://github.com/youryu0212/musinsa/wiki/%5BFE%5D-%EC%9A%94%EA%B5%AC%EC%82%AC%ED%95%AD-%EB%B6%84%EC%84%9D)
- 유틸 함수 : [https://github.com/youryu0212/musinsa/wiki/[FE]-유틸-함수-상세설명](https://github.com/youryu0212/musinsa/wiki/%5BFE%5D-%EC%9C%A0%ED%8B%B8-%ED%95%A8%EC%88%98-%EC%83%81%EC%84%B8%EC%84%A4%EB%AA%85)
- DOM 조작 함수 : [https://github.com/youryu0212/musinsa/wiki/[FE]-DOM-유틸-함수-상세-스펙](https://github.com/youryu0212/musinsa/wiki/%5BFE%5D-DOM-%EC%9C%A0%ED%8B%B8-%ED%95%A8%EC%88%98-%EC%83%81%EC%84%B8-%EC%8A%A4%ED%8E%99)
- 상태관리 구조 : [https://github.com/youryu0212/musinsa/wiki/[FE]-상태관리-구조](https://github.com/youryu0212/musinsa/wiki/%5BFE%5D-%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC-%EA%B5%AC%EC%A1%B0)

### 📌 Branch

dev ISSUE 별 feature 브랜치 생성하여 작업

```
main
    |
    |--> dev
    |      |
    |      |--> feature...
    |      |
    |      |
    |--> deploy
```

### 이슈 전략

```
제목: [FEAT] (FE) 기능제목
---

## 💡 issue
이슈 작성

## 📝 todo
- [ ] 작업1
- [ ] 작업2
```

### 커밋 메시지 전략

```
[키워드]: 커밋 메시지 작성

contents
- someting
- someting2

예) [feat]: 기능 추가
```

### 커밋 타입

| 타입     | 설명                                                             |
| -------- | ---------------------------------------------------------------- |
| Feat     | 새 기능 추가                                                     |
| Fix      | 버그 수정                                                        |
| Design   | CSS 등 디자인 변경                                               |
| Style    | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우            |
| Refactor | 리팩토링                                                         |
| Comment  | 주석 추가 및 변경                                                |
| Docs     | 문서 수정                                                        |
| Test     | 테스트 추가, 테스트 리팩토링                                     |
| Chore    | 빌드 테스트 업데이트, 패키지 매니저를 설정(프로덕션 코드 변경 X) |
| Rename   | 파일 수정하거나 옮기는 작업                                      |
| Remove   | 파일 삭제                                                        |
