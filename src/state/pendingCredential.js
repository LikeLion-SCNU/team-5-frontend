/**
 * 인증 화면으로 넘어가는 동안만 비밀번호를 메모리에 들고 있는다.
 *
 * 라우터 state로 넘기면 window.history.state에 평문으로 남아 페이지의 모든 스크립트가 읽을 수 있고
 * 브라우저 세션 복원 파일에도 기록된다. 여기 담긴 값은 새로고침하면 사라지고, 그때는 로그인 화면으로 안내한다.
 */
let password = null

export function holdPassword(value) {
  password = value
}

export function readPassword() {
  return password
}

export function clearPassword() {
  password = null
}
