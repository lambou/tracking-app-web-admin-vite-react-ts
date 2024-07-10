import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode, useId } from "react";

export type FormItemProps = HTMLAttributes<HTMLDivElement> & {
  label: ReactNode;
  helpText?: ReactNode;
  error?: string;
  required?: boolean;
  render: (props: { id: string }) => ReactNode;
};

export default function FormItem({
  className,
  label,
  helpText,
  required,
  error,
  render,
  ...restProps
}: FormItemProps) {
  const id = useId();
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        {
          "text-red-500": typeof error === "string",
        },
        className,
      )}
      {...restProps}
    >
      <label
        htmlFor={id}
        className={cn("font-medium capitalize", {
          "after:content-['_*'] after:text-red-500 after:text-lg": required,
        })}
      >
        {label}
      </label>
      {render({ id })}
      {helpText && <span className="text-gray-400 text-sm">{helpText}</span>}
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}
