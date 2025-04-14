interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = ({ label, ...props }: CheckboxProps) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" className="w-4 h-4 accent-orange-500" {...props} />
      {label && <span className="text-sm text-gray-800">{label}</span>}
    </label>
  );
};
