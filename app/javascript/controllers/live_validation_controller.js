import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="live-validation"
export default class extends Controller {
  static targets = ["number", "owner", "size"];

  connect() {}

  number() {
    const field = this.numberTarget.firstElementChild;
    const id = this.numberTarget.dataset.value;
    const numberRgx = /^\d+$/;
    let fieldValue = field.value;
    let fieldClasses = field.classList;
    let invalidFeedback = this.numberTarget.querySelector(".invalid-feedback");
    const submitButton = document.querySelector(".submit-button");
    const validateButton = document.querySelector(".validate-number");

    const remove_class = (name) => fieldClasses.remove(name);
    const add_class = (name) => fieldClasses.add(name);

    const checkUnique = () => {
      clearTimeout(this.checkUnique);
      this.checkUnique = setTimeout(() => {
        validateButton.click();
      }, 500);
    };

    const enableSubmit = () => {
      let ownerFieldValue = this.ownerTarget.firstElementChild.value;
      let sizeFieldValue = this.sizeTarget.firstElementChild.value;
      const accepted_size = ["small", "medium", "large"];
      const ownerRgx = /^[a-z .]+$/i;

      if (
        ownerRgx.test(ownerFieldValue) &&
        ownerFieldValue &&
        accepted_size.includes(sizeFieldValue)
      ) {
        submitButton.classList.remove("disabled");
      }
    };

    checkUnique();

    clearTimeout(this.verifyInput);
    this.verifyInput = setTimeout(() => {
      let numberIsUniqueMessage =
        document.querySelector("#not-unique").textContent;

      if (id) {
        if (numberRgx.test(fieldValue) && !numberIsUniqueMessage) {
          add_class("is-valid");
          remove_class("is-invalid");
          enableSubmit();
        } else {
          remove_class("is-valid");
          add_class("is-invalid");
          invalidFeedback.textContent =
            fieldValue == "" ? "Can't be blank!" : "";
          submitButton.classList.add("disabled");
        }
      } else if (numberRgx.test(fieldValue) && !numberIsUniqueMessage) {
        remove_class("is-invalid");
        add_class("is-valid");
        enableSubmit();
      } else if (numberRgx.test(fieldValue)) {
        remove_class("is-valid");
        add_class("is-invalid");
        submitButton.classList.add("disabled");
      } else {
        remove_class("is-valid");
        remove_class("is-invalid");
        submitButton.classList.add("disabled");
      }
    }, 600);
  }

  owner() {
    const field = this.ownerTarget.firstElementChild;
    const id = this.ownerTarget.dataset.value;
    const ownerRgx = /^[a-z .]+$/i;
    let fieldValue = field.value;
    let fieldClasses = field.classList;
    let invalidFeedback = this.ownerTarget.querySelector(".invalid-feedback");
    const submitButton = document.querySelector(".submit-button");
    const numberIsUniqueMessage =
      document.querySelector("#not-unique").textContent;

    const remove_class = (name) => fieldClasses.remove(name);
    const add_class = (name) => fieldClasses.add(name);

    const enableSubmit = () => {
      let numberFieldValue = this.numberTarget.firstElementChild.value;
      let sizeFieldValue = this.sizeTarget.firstElementChild.value;
      const accepted_size = ["small", "medium", "large"];
      const numberRgx = /^\d+$/;

      if (
        numberRgx.test(numberFieldValue) &&
        numberFieldValue &&
        !numberIsUniqueMessage &&
        accepted_size.includes(sizeFieldValue)
      ) {
        submitButton.classList.remove("disabled");
      }
    };

    const verify_fields = () => {
      if (ownerRgx.test(fieldValue)) {
        remove_class("is-invalid");
        add_class("is-valid");
        enableSubmit();
      } else {
        remove_class("is-valid");
        add_class("is-invalid");
        invalidFeedback.textContent = "Only alphabets allowed!";
        submitButton.classList.add("disabled");
      }
    };

    if (fieldValue && id) {
      verify_fields();
    } else if (id) {
      remove_class("is-valid");
      add_class("is-invalid");
      submitButton.classList.add("disabled");
      invalidFeedback.textContent = "Can't be blank!";
    } else if (fieldValue) {
      verify_fields();
    } else {
      remove_class("is-valid");
      remove_class("is-invalid");
      submitButton.classList.add("disabled");
    }
  }

  size() {
    const field = this.sizeTarget.firstElementChild;
    const id = this.sizeTarget.dataset.value;
    let fieldValue = field.value;
    const accepted_size = ["small", "medium", "large"];
    const numberIsUniqueMessage =
      document.querySelector("#not-unique").textContent;
    let fieldClasses = field.classList;
    let invalidFeedback = this.sizeTarget.querySelector(".invalid-feedback");
    const submitButton = document.querySelector(".submit-button");

    const remove_class = (name) => fieldClasses.remove(name);
    const add_class = (name) => fieldClasses.add(name);

    const enableSubmit = () => {
      let ownerFieldValue = this.ownerTarget.firstElementChild.value;
      let numberFieldValue = this.numberTarget.firstElementChild.value;
      const ownerRgx = /^[a-z .]+$/i;
      const numberRgx = /^\d+$/;

      if (
        ownerRgx.test(ownerFieldValue) &&
        ownerFieldValue &&
        numberRgx.test(numberFieldValue) &&
        numberFieldValue &&
        !numberIsUniqueMessage
      ) {
        submitButton.classList.remove("disabled");
      }
    };

    if (id) {
      if (accepted_size.includes(fieldValue)) {
        add_class("is-valid");
        remove_class("is-invalid");
        enableSubmit();
      } else {
        remove_class("is-valid");
        add_class("is-invalid");
        invalidFeedback.textContent = "Please select a valid state!";
        submitButton.classList.add("disabled");
      }
    } else if (accepted_size.includes(fieldValue)) {
      add_class("is-valid");
      enableSubmit();
    } else {
      remove_class("is-valid");
      remove_class("is-invalid");
      submitButton.classList.add("disabled");
    }
  }
}
