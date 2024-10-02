import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { FormSchemaType } from "./AddPost";

interface Props {
  name: keyof FormSchemaType; // Dynamically typed based on FormSchemaType
  id: string;
  rows?: number;
  className?: string;
  placeholder?: string;
  label?: string;
  control: Control<FieldValues, any>;
  error: FieldErrors<FormSchemaType>; // Ensure errors are strongly typed
}

const TextArea = (props: Props) => {
  const { name, placeholder, control, id, rows, label, className, error } =
    props;
  const errorClass =
    "ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6";

  // Helper to check for the existence of an error for the given field name
  const hasError = error[name] !== undefined;
  const errorMessage = hasError ? (error[name]?.message as string) : undefined;

  return (
    <Controller
      name={name} // Name dynamically typed from FormSchemaType
      control={control}
      render={({ field }) => (
        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {label}
          </label>
          <div className="mt-2">
            <textarea
              {...field}
              rows={rows || 5}
              placeholder={placeholder}
              id={id}
              className={twMerge(
                "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                className,
                hasError && errorClass
              )}
            />
          </div>
          {hasError && <p className="text-sm text-red-500">{errorMessage}</p>}
        </div>
      )}
    />
  );
};

export default TextArea;
