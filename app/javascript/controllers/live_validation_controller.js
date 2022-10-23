import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="live-validation"
export default class extends Controller {
  static targets = ["number", "owner"];

  connect() {}

  number() {
    const field = this.numberTarget.firstElementChild;
    const id = this.numberTarget.dataset.value;
    const number_rgx = /^\d+$/;
    let field_value = field.value;
    let field_classes = field.classList;
    let invalid_feedback = this.ownerTarget.querySelector(".invalid-feedback");

    const remove_class = (name) => field_classes.remove(name);
    const add_class = (name) => field_classes.add(name);

    if (id) {
      if (number_rgx.test(field_value)) {
        add_class("is-valid");
      } else {
        remove_class("is-valid");
        add_class("is-invalid");
        invalid_feedback.textContent = "Can't be blank!";
      }
    } else if (number_rgx.test(field_value)) {
      add_class("is-valid");
    } else {
      remove_class("is-valid");
      remove_class("is-invalid");
    }
  }

  owner() {
    const field = this.ownerTarget.firstElementChild;
    const id = this.ownerTarget.dataset.value;
    const owner_rgx = /^[a-z .]+$/i;
    let field_value = field.value;
    let field_classes = field.classList;
    let invalid_feedback = this.ownerTarget.querySelector(".invalid-feedback");

    const remove_class = (name) => field_classes.remove(name);
    const add_class = (name) => field_classes.add(name);

    const verify_fields = () => {
      if (owner_rgx.test(field_value)) {
        remove_class("is-invalid");
        add_class("is-valid");
      } else {
        remove_class("is-valid");
        add_class("is-invalid");
        invalid_feedback.textContent = "Only alphabets allowed!";
      }
    };

    if (field_value && id) {
      verify_fields();
    } else if (id) {
      remove_class("is-valid");
      add_class("is-invalid");
      invalid_feedback.textContent = "Can't be blank!";
    } else if (field_value) {
      verify_fields();
    } else {
      remove_class("is-valid");
      remove_class("is-invalid");
    }
  }
}
