interface TextInputProps {
  label?: string; 
  id: string;
  name: string;
  value: string | number | readonly string[] | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type: string;
  className?: string;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  type,
  className,
  required,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-bold mb-2" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-md ${className || ''}`}
        required={required}
      />
    </div>
  );
};

export default TextInput;
