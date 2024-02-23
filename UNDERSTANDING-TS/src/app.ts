let appId = "abc";
console.log("app.ts");
const button = document.querySelector("button")!;

function add(n1: number, n2: number) {
  if (n1 + n2 > 0) {
    return n1 + n2;
  }
  return;
}

function clickHandler(message: string) {
  // let userName = "Max";
  console.log("Clicked!" + message);
}

if (button) {
  button.addEventListener(
    "click",
    clickHandler.bind(null, "your are welcome!")
  );
}

//vscode를 사용하여 디버깅 할때, 워크스페이스 폴더를 기준으로 하기 때문에
// 디버깅 할 파일의 직접적인 부모 폴더가 작업폴더로 열려있어야 작동한다
// launch.json의 ${workspace}를 어떻게 하면 바꿀 수 있을 것 같긴 함 그런데 아직 모름