interface LoginInBtnProps {
  buttonText: string;
}

const LoginInBtn: React.FC<LoginInBtnProps> = ({ buttonText }) => {
  return (
      <button
        className="hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        id="signin-btn"
      >
        {buttonText}
      </button>
  );
};

export default LoginInBtn;
