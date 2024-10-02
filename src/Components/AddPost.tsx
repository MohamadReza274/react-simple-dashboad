import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { baseUrl } from "../App";

const schema = z.object({
  title: z.string().min(3, "Title is required"),
  body: z.string().min(20, "Description must be at least 20 character(s)"),
});

export type FormSchemaType = z.infer<typeof schema>;

const AddPost = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const uid = () => {
    return Math.floor(Math.random() * 1000 + 50);
  };

  const handleSubmitForm = async (values: FieldValues) => {
    const data = { ...values, id: uid() };
    try {
      await fetch(baseUrl + "/posts", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
      toast.success("Post Added");
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  const errorClass =
    "ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6";

  return (
    <form className="max-w-lg w-full" onSubmit={handleSubmit(handleSubmitForm)}>
      <h2 className="text-3xl">Add Post</h2>

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Title
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            {...register("title")}
            type="text"
            id="title"
            className={twMerge(
              "block focus:outline-none px-2 w-full rounded-md border-0 py-1.5 pr-10 ring-1 ring-gray-300 focus:ring-indigo-600 ring-inset  focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6",
              errors.title &&
                " text-red-900 focus:ring-red-500 ring-red-300 placeholder:text-red-300"
            )}
            placeholder="Enter title"
            defaultValue=""
            aria-invalid="true"
            aria-describedby="title-error"
          />
          {errors.title && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ExclamationCircleIcon
                title={"error"}
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {errors.title && (
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Body
        </label>
        <div className="mt-2">
          <textarea
            {...register("body")}
            rows={4}
            placeholder={"Type here..."}
            id={"body"}
            className={twMerge(
              "block px-2 w-full rounded-md border-0 focus:outline-none py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
              errors.body && errorClass
            )}
          />
        </div>
        {errors.body && (
          <p className="text-sm text-red-500">{errors.body.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="my-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Submit
      </button>
    </form>
  );
};

export default AddPost;
