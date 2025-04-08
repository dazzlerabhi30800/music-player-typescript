interface buttonProps {
  onClick: () => void;
  buttonClass: string;
  iconClass: string;
}

const NormalButton = ({ onClick, buttonClass, iconClass }: buttonProps) => {
  return (
    <button onClick={onClick} className={`${buttonClass}`}>
      <i className={iconClass}></i>
    </button>
  );
};

const ButtonComp = ({ onClick, buttonClass, iconClass }: buttonProps) => {
  return (
    <NormalButton
      onClick={onClick}
      buttonClass={buttonClass}
      iconClass={iconClass}
    />
  );
};

export default ButtonComp;
