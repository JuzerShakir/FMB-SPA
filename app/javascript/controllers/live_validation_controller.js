import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="live-validation"
export default class extends Controller {
  static targets = ["number", "owner"];

  connect() {}

  number() {
    const field = this.numberTarget.firstElementChild;
    const id = this.numberTarget.dataset.value;
    const numberRgx = /^\d+$/;
    let fieldValue = field.value;
    let fieldClasses = field.classList;
    let invalidFeedback = this.numberTarget.querySelector(".invalid-feedback");
    const submitButton = document.querySelector(".submit-button");

    const remove_class = (name) => fieldClasses.remove(name);
    const add_class = (name) => fieldClasses.add(name);

    const enableDisableSubmit = () => {
      let ownerFieldValue = this.ownerTarget.firstElementChild.value;
      const ownerRgx = /^[a-z .]+$/i;

      if (ownerRgx.test(ownerFieldValue) && ownerFieldValue) {
        submitButton.classList.remove("disabled");
      }
    };

    if (id) {
      if (numberRgx.test(fieldValue)) {
        add_class("is-valid");
        remove_class("is-invalid");
        enableDisableSubmit();
      } else {
        remove_class("is-valid");
        add_class("is-invalid");
        invalidFeedback.textContent = "Can't be blank!";
        submitButton.classList.add("disabled");
      }
    } else if (numberRgx.test(fieldValue)) {
      add_class("is-valid");
      enableDisableSubmit();
    } else {
      remove_class("is-valid");
      remove_class("is-invalid");
      submitButton.classList.add("disabled");
    }
  }

  owner() {
    const field = this.ownerTarget.firstElementChild;
    const id = this.ownerTarget.dataset.value;
    const ownerRgx = /^[a-z .]+$/i;
    let fieldValue = field.value;
    let fieldClasses = field.classList;
    let invalidFeedback = this.ownerTarget.querySelector(".invalid-feedback");
    const submitButton = document.querySelector(".submit-button");

    const remove_class = (name) => fieldClasses.remove(name);
    const add_class = (name) => fieldClasses.add(name);

    const enableDisableSubmit = () => {
      let numberFieldValue = this.numberTarget.firstElementChild.value;
      const numberRgx = /^\d+$/;

      if (numberRgx.test(numberFieldValue) && numberFieldValue) {
        submitButton.classList.remove("disabled");
      }
    };

    const verify_fields = () => {
      if (ownerRgx.test(fieldValue)) {
        remove_class("is-invalid");
        add_class("is-valid");
        enableDisableSubmit();
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
}
