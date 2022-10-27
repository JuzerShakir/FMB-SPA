import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="debounce"
export default class extends Controller {
  connect() {}

  static targets = ["query"];

  search() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.queryTarget.requestSubmit();
    }, 500);
  }
}
