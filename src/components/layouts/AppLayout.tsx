import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export type AppLayoutProps = HTMLAttributes<HTMLDivElement> & {
};

export default function AppLayout({className, children,...restProps}: AppLayoutProps){
    return <div className={cn('flex-auto flex flex-col', className)} {...restProps}>
        {children}
    </div>
}