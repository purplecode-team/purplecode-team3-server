# purplecode-team3-server
## git commit rule

- `add`: (새로운 파일 추가)
- `feat`: (새로운 기능)
- `fix`: (코드 수정)
- `update`: (문서, 라이브러리 수정)
- `rename`: (이름 변경)
- `docs`: (문서 변경)
- `style`: (서식 수정, 세미콜론 추가, 기타; 코드 변경 없음)
- `refactor`: (코드 리팩토링)
- `test`: (누락된 테스트 추가, 리팩토링 테스트; 프로덕션 코드 변경 없음)
- `chore`: (기타 업데이트, 패키지 설치 등 잡다한 작업; 프로덕션 코드 변경 없음)

예시)

```
[feat] 로그인 기능 추가

[fix] 로그인 기능에서 issue문제 해결
```

## gitignore

**개발하는동안(repository가 비공개일때)**은 `.DS_Store`, `node_modules`외 추가하지 말기

배포할 때는 공개하면 안되는 것들 추가해서 올리기