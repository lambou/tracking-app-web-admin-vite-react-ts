import { cn } from "@/lib/utils";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

export type LinkProps = RouterLinkProps;

export default function Link({
  className,
  children,
  ...restProps
}: RouterLinkProps) {
  return (
    <RouterLink
      className={cn(
        "text-green-500 hover:underline underline-offset-2 capitalize cursor-pointer",
        className,
      )}
      {...restProps}
    >
      {children}
    </RouterLink>
  );
}
