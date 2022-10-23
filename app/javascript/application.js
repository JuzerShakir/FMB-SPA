// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";
import "controllers";
import "bootstrap";

// create_thaali_button.addEventListener("click", () => {
//   const error = document.getElementsByClassName("error");
//   //   console.log(error.previousElementSibling);
//   console.log(error.item(0));
// });

// const edit_button = document.getElementById("edit-button");
// const destroy_button = document.getElementById("destroy-button");
// const cancel_button = document.getElementById("cancel-button");

// console.log(edit_button);

// ? Validate form field

// * Mark Valid for number input in Number field
const number_field = document.getElementById("number_field");
const number_rgx = /^\d+$/;

number_field.addEventListener("keyup", () => {
  let number_field_value = number_field.value;
  let number_field_classes = number_field.classList;

  // console.log(number_rgx.test(number_field_value));

  if (number_rgx.test(number_field_value)) {
    number_field_classes.add("is-valid");
  } else {
    number_field_classes.remove("is-valid");
  }
  // console.log(number_field_value);
});

// * Mark Valid or Invalid for string input in Owner field

const owner_field = document.getElementById("owner_field");
const owner_rgx = /^[a-z .]+$/i;

owner_field.addEventListener("keyup", () => {
  let owner_field_value = owner_field.value;
  let owner_field_classes = owner_field.classList;

  //   console.log(owner_rgx.test(owner_field_value));

  if (owner_field_value) {
    if (owner_rgx.test(owner_field_value)) {
      owner_field_classes.remove("is-invalid");
      owner_field_classes.add("is-valid");
    } else {
      owner_field_classes.remove("is-valid");
      owner_field_classes.add("is-invalid");
    }
  } else {
    owner_field_classes.remove("is-valid", "is-invalid");
  }

  // console.log(owner_field_value);
});
