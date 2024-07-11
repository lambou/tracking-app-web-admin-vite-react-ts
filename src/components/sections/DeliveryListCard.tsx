import useMount from '@/hooks/useMount'
import IDelivery from '@/interfaces/IDelivery'
import IPaginateResponse from '@/interfaces/IPaginateResponse'
import { cn, fetchJson } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import ItemId from '../ItemId'
import Button from '../ui/Button'

export default function DeliveryListCard() {
    const { mounted } = useMount()
    const [pagination, setPagination] = useState<{
        limit: number
        page: number
    }>({ page: 1, limit: 4 })

    const { isLoading, isFetching, data, refetch } = useQuery<
        IPaginateResponse<IDelivery>
    >({
        queryKey: ['delivery-list'],
        queryFn: async () => {
            return await fetchJson(
                `${import.meta.env.VITE_APP_API_URL}/api/delivery?paginate=true&page=${pagination.page}&limit=${pagination.limit}`
            )
        },
    })

    const hasPrevious = !!data && data.page <= data.pages && data.page > 1
    const hasNext = !!data && data.page < data.pages && data.page >= 1

    useEffect(() => {
        if (mounted) {
            refetch()
        }
    }, [pagination])

    return (
        <div className="flex flex-col gap-4 border rounded-md">
            {isLoading ? (
                <div className="p-8 w-full flex items-center justify-center">
                    <Loader2 size={32} className="animate-spin" />
                </div>
            ) : (
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="text-left w-32">ID</th>
                            <th className="text-left">Package</th>
                            <th className="text-left">From</th>
                            <th className="text-left">To</th>
                            <th className="text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.docs.map((item) => (
                                <tr key={item._id}>
                                    <td>
                                        <ItemId
                                            value={item._id}
                                            className="max-w-32"
                                        />
                                    </td>
                                    <td>{item.package.description}</td>
                                    <td>
                                        <span className="flex flex-col gap-1">
                                            <span className="font-semibold">
                                                {item.package.from_name}
                                            </span>
                                            <span className="text-gray-400 text-sm">
                                                {item.package.from_address}
                                            </span>
                                        </span>
                                    </td>
                                    <td>
                                        <span className="flex flex-col gap-1">
                                            <span className="font-semibold">
                                                {item.package.to_name}
                                            </span>
                                            <span className="text-gray-400 text-sm">
                                                {item.package.to_address}
                                            </span>
                                        </span>
                                    </td>
                                    <td>
                                        <span className="w-full inline-flex items-center justify-end">
                                            <span
                                                className={cn(
                                                    'px-4 py-1 rounded-full text-sm uppercase font-semibold inline-flex items-center gap-2',
                                                    {
                                                        'bg-gray-100 text-gray-500':
                                                            item.status ===
                                                            'open',
                                                        'bg-blue-100 text-blue-500':
                                                            item.status ===
                                                            'picked-up',
                                                        'bg-orange-100 text-orange-500':
                                                            item.status ===
                                                            'in-transit',
                                                        'bg-green-100 text-green-500':
                                                            item.status ===
                                                            'delivered',
                                                        'bg-red-100 text-red-500':
                                                            item.status ===
                                                            'failed',
                                                    }
                                                )}
                                            >
                                                {item.status}
                                            </span>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            )}
            {data && data.docs.length === 0 && (
                <span className="text-gray-500 text-base px-4 text-center">
                    No entry found.
                </span>
            )}
            {data && (
                <div className="flex items-center justify-between gap-6 px-4 py-4">
                    {hasPrevious && (
                        <Button
                            loading={isFetching}
                            className="self-start"
                            variant="dark"
                            outline
                            icon={<ChevronLeft size={16} />}
                            onClick={() =>
                                setPagination((curr) => {
                                    return {
                                        limit: curr.limit,
                                        page: data.page - 1,
                                    }
                                })
                            }
                        >
                            Previous
                        </Button>
                    )}
                    <div className="inline-flex items-center justify-center gap-2 text-base">
                        <span>Page:</span>{' '}
                        <span className="font-bold">{data.page}</span>
                        <span>/</span>
                        <span>{data.pages}</span>
                    </div>
                    {hasNext && (
                        <Button
                            loading={isFetching}
                            className="self-end"
                            variant="dark"
                            outline
                            iconRight={<ChevronRight size={16} />}
                            onClick={() =>
                                setPagination((curr) => {
                                    return {
                                        limit: curr.limit,
                                        page: data.page + 1,
                                    }
                                })
                            }
                        >
                            Next
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}
