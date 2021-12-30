const Card = (props) => {
  return (
    <div className={`flex justify-center items-center flex-col bg-[#5390d9] p-4 rounded-3xl border-2 border-black mx-2 box-border ${props.classes}`}>
      {props.children}
    </div>
  );
};

export default Card;