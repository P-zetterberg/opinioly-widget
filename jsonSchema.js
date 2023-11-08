let json = {
  data: [
    {
      msg: "Vi på x AB värnar om våra kunder. feedback hjälper oss göra det ännu bättre!",
      type: "description",
    },
    {
      type: "dropdown",
      label: "Feedback category12",
      options: ["Design", "Experience", "Products", "Other"],
      required: true,
    },
    {
      type: "textinput",
      label: "Name",
      required: false,
      placeholder: "Enter your name",
    },
    {
      type: "textarea",
      label: "Feedback",
      required: false,
    },
  ],
  buttonText: "Submit",
}
export default json
