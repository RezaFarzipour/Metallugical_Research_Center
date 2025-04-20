import { TbArrowBarToDown } from "react-icons/tb";

function FileInput({
  label,
  name,
  value,
  dir = "rtl",
  onChange,
  isRequired,
  className,
  validationSchema = {},
  errors,
  ...rest
}) {
  const errorMessages = errors?.[name];
  const hasError = !!(errors && errorMessages);

  return (
    <>
      <label
        htmlFor="file-upload"
        className={` cursor-pointer border-2 border-primary-500
        rounded-lg px-3 py-2 text-primary-500 flex items-center justify-center gap-x-2 ${className}`}
      >
        {label}
        <TbArrowBarToDown className="w-5 h-5" />
        <input
          id="file-upload"
          type="file"
          className="sr-only hidden"
          name={name}
          dir={dir}
          value={value}
          onChange={onChange}
          {...rest}
        />
      </label>

      {errors && errors[name] && (
        <span className="text-red-600 block text-xs mt-2">
          {errors[name]?.message}
        </span>
      )}
    </>
  );
}
export default FileInput;
