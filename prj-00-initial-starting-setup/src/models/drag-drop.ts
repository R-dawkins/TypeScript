// typescript의 namespace 기능 (javascript에 컴파일 되지 않음)
// 다른 파일에 reference된 같은 이름의 namespace안에서 export한 interface 등을 사용하게 하는 것이 namespace 기능이다.
// export한 interface등을 사용하려면 Import한 다른 파일에 같은 이름의 namespace를 만든 뒤
// 그 안에 import한 Interface를 사용하는 모든 코드(Class등)을 넣어야 사용 가능하다.
// /// 슬래시 3개로 시작하는 특수 구문과 <reference path="경로">를 작성하여 namespace를 import할 수 있다.
// Drag & Drop interface
  export interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
  }

  export interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
  }