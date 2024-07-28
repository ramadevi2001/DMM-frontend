import { forwardRef, useRef } from "react";
const Form = forwardRef(function Form(
  { onSubmit, children, ...otherProps }
) {
  const formRef = useRef(null);
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    onSubmit(data);
    formRef.current?.reset();
  }
  return (
    <from  ref={formRef} onSubmit={handleSubmit} {...otherProps}>
      {children}
    </from>
  );
});

export default Form;
