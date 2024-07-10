import { cn } from '@/lib/utils'
import { forwardRef, SelectHTMLAttributes } from 'react'

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, children, ...restProps }, ref) => {
        return (
            <select
                ref={ref}
                className={cn(
                    'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-8',
                    className
                )}
                {...restProps}
            >
                {children}
            </select>
        )
    }
)

Select.displayName = 'Select'

export default Select
