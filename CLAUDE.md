# 할일 관리 앱 - 프롬프트 히스토리

## 프로젝트 개요
HTML, CSS, JavaScript로 만든 할일(Todo) 관리 웹 앱.
Firebase Realtime Database 연동 및 Vercel 배포 완료.

---

## 프롬프트 순서

### 1. 할일 앱 생성
```
할일을 추가하고, 수정하고, 삭제 할 수 있는 할일앱을 html css javascript로 만들어 줘
```
**결과:**
- `index.html` - 페이지 구조
- `style.css` - 스타일링 (카드 UI, 애니메이션)
- `app.js` - CRUD 기능 (localStorage 기반)
- 기능: 추가, 수정(인라인 편집), 삭제, 완료 체크박스

---

### 2. Live Server 실행
```
live server로 열어줘
```
**결과:** `npx live-server --port=5500` 으로 로컬 서버 실행

---

### 3. Firebase Realtime Database 연결
```
Firebase real-time database 에 연결해줘
```
**결과:**
- Firebase 프로젝트 생성 안내 (콘솔에서 직접 생성)
- Firebase SDK 추가 (`firebase-app-compat.js`, `firebase-database-compat.js`)
- localStorage → Firebase Realtime Database로 전환
  - `db.push()` - 추가
  - `db.child(key).update()` - 수정/완료 토글
  - `db.child(key).remove()` - 삭제
  - `db.on('value')` - 실시간 동기화

---

### 4. Firebase 권한 오류 해결
```
데이터 추가가 안된는데 확인해줘
```
**원인:** Firebase Realtime Database 보안 규칙이 `PERMISSION_DENIED`

**해결:** Firebase 콘솔 > Realtime Database > 규칙 탭에서 아래로 변경:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

---

### 5. Vercel 배포
```
소스 배포하고, vercel로 라이브 해주세요
```
**결과:**
- `git init` → 커밋
- `vercel --yes` 로 배포
- 라이브 URL: https://unit03.vercel.app

---

### 6. 인증 기반 보안 규칙 안내
```
실서비스에서는 인증 기반 규칙 반영하는 방법도 알려주세요
```
**안내 내용:**
1. Firebase Authentication 활성화 (Google 로그인 등)
2. `firebase-auth-compat.js` SDK 추가
3. `auth.signInWithPopup()` 로그인 로직 구현
4. 유저별 데이터 분리: `todos/{uid}` 경로 사용
5. 보안 규칙 변경:
```json
{
  "rules": {
    "todos": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

---

### 7. 보안 강화 (인증 + 도메인 제한 + App Check)
```
보안 규칙 + 도메인 제한 + App Check하는 방안으로 코드를 수정해주세요
```
**결과:**
- **익명 인증(Anonymous Auth)** 적용
  - `firebase-auth-compat.js` SDK 추가
  - `auth.signInAnonymously()` 로 자동 로그인
  - 유저별 데이터 분리: `todos/{uid}` 경로 사용
- **App Check (reCAPTCHA v3)** 적용
  - `firebase-app-check-compat.js` SDK 추가
  - reCAPTCHA v3 사이트 키로 `appCheck.activate()` 호출
  - 승인된 도메인(`localhost`, `unit03.vercel.app`)에서만 요청 허용
- **Firebase 보안 규칙** 변경 (콘솔에서 설정)
  ```json
  {
    "rules": {
      "todos": {
        "$uid": {
          ".read": "$uid === auth.uid",
          ".write": "$uid === auth.uid"
        }
      }
    }
  }
  ```

**Firebase 콘솔 설정 필요 항목:**
1. Authentication > 로그인 방법 > 익명 사용 설정
2. App Check > 웹 앱 > reCAPTCHA v3 비밀 키 등록
3. Realtime Database > 규칙 탭 > 인증 기반 규칙 적용

---

### 8. GitHub Push 및 Vercel 재배포
```
소스커밋하고 push, 사이트배포, claude.md에 기록 추가 해줘
```
**결과:**
- 보안 강화 코드 커밋 및 GitHub push
- Vercel 재배포

---

## 기술 스택
- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Database:** Firebase Realtime Database
- **Hosting:** Vercel
- **Firebase SDK:** v10.12.0 (compat 모드)

## 파일 구조
```
unit03/
├── index.html    # 메인 페이지
├── style.css     # 스타일시트
├── app.js        # Firebase 연동 로직
└── CLAUDE.md     # 프롬프트 히스토리
```

## 배포 정보
- **Vercel 프로젝트:** sewoongkim1s-projects/unit03
- **라이브 URL:** https://unit03.vercel.app
- **Firebase 프로젝트:** fir-dbconnecting-project
- **Database URL:** https://fir-dbconnecting-project-default-rtdb.asia-southeast1.firebasedatabase.app
