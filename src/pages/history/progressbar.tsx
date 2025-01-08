
const Progressbar = () => {
  return (
    <div className="flex items-center justify-center mb-4">
      <svg className="transform -rotate-60 w-72 h-72">
        <circle
          cx="145"
          cy="145"
          stroke="currentColor"
          strokeWidth="30"
          fill="transparent"
          className="text-[#FDFDFB] border"
        />
        <circle
          cx="145"
          cy="145"
          strokeWidth="50"
          fill="transparent"
          className="shadow-2xl"
        />
      </svg>
    </div>
  );
}

export default Progressbar;



