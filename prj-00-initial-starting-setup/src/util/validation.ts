// Validate function
namespace App {
  export interface Validatable {
    value: string | number;
    require?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }
  export function validate(validatableInput: Validatable) {
    let isValid = true;
    if (validatableInput.require) {
      isValid =
        isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (
      validatableInput.minLength !=
        null /* != 비교연산자는 null과 undefind만 체크한다. 0과 같은 falsy한 값은 통과됨 */ &&
      typeof validatableInput.value === "string"
    ) {
      isValid =
        isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (
      validatableInput.maxLength != null &&
      typeof validatableInput.value === "string"
    ) {
      isValid =
        isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (
      validatableInput.min != null &&
      typeof validatableInput.value === "number"
    ) {
      isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (
      validatableInput.max != null &&
      typeof validatableInput.value === "number"
    ) {
      isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
  }
}
