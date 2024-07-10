import { cn } from "@/lib/utils";
import { Fragment, HTMLAttributes, ReactNode } from "react";

export type PageLayoutProps = HTMLAttributes<HTMLDivElement> & {
  pageTitle: ReactNode;
  pageSubtitle?: ReactNode;
};

export default function PageLayout({
  className,
  children,
  pageTitle,
  pageSubtitle,
  ...restProps
}: PageLayoutProps) {
  return (
    <div
      className={cn("container flex flex-col gap-6 py-10", className)}
      {...restProps}
    >
      <h1 className="font-bold text-center text-3xl inline-flex items-center justify-center gap-3">
        <span className="capitalize">{pageTitle}</span>
        {pageSubtitle ? (
          <Fragment>
            <span className="min-h-9 h-9 border-l-2 border-gray-200"></span>
            <span className="text-green-500 font-light capitalize">
              {pageSubtitle}
            </span>
          </Fragment>
        ) : (
          <></>
        )}
      </h1>
      {children}
    </div>
  );
}
