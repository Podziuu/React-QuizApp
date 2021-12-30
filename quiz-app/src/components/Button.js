const Button = (props) => {
  const buttonsClasses =
    props.size === "lg"
      ? "py-4 px-6 rounded-3xl border-4 hover:border-[6px]"
      : "py-2 px-4 rounded-3xl border-4 text-xl hover:border-[6x] w-72";

    const disabled = props.isDisable === 'true' ? 'true' : ''

  return (
    <button
      disabled={props.isDisable}
      onClick={props.onClick}
      className={`text-white bg-[#5e60ce] border-[#6930c3] hover:border-[#7400b8] content-border ${buttonsClasses} ${props.classes} ${disabled}`}
      dangerouslySetInnerHTML={{__html: props.text}}
    >
    </button>
  );
};

export default Button;
