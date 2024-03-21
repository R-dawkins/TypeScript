import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";
// tsconfig의 outFile 옵션을 주석 해제하면 여러개의 namespace 파일을 하나의 자바스크립트 파일로 컴파일 하게 만들어준다.
new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
