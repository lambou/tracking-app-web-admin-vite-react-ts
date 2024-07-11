import useMount from '@/hooks/useMount'
import IPackage from '@/interfaces/IPackage'
import IPaginateResponse from '@/interfaces/IPaginateResponse'
import { fetchJson } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import ItemId from '../ItemId'
import Button from '../ui/Button'

export default function PackageListCard() {
    const { mounted } = useMount()
    const [pagination, setPagination] = useState<{
        limit: number
        page: number
    }>({ page: 1, limit: 4 })

    const { isLoading, isFetching, data, refetch } = useQuery<
        IPaginateResponse<IPackage>
    >({
        queryKey: ['package-list'],
        queryFn: async () => {
            return await fetchJson(
                `${import.meta.env.VITE_APP_API_URL}/api/package?paginate=true&page=${pagination.page}&limit=${pagination.limit}`
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
                            <th className="text-left">Description</th>
                            <th className="text-left">From</th>
                            <th className="text-left">To</th>
                            <th className="text-right">Active delivery</th>
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
                                    <td>{item.description}</td>
                                    <td>
                                        <span className="flex flex-col gap-1">
                                            <span className="font-semibold">
                                                {item.from_name}
                                            </span>
                                            <span className="text-gray-400 text-sm">
                                                {item.from_address}
                                            </span>
                                        </span>
                                    </td>
                                    <td>
                                        <span className="flex flex-col gap-1">
                                            <span className="font-semibold">
                                                {item.to_name}
                                            </span>
                                            <span className="text-gray-400 text-sm">
                                                {item.to_address}
                                            </span>
                                        </span>
                                    </td>
                                    <td>
                                        <span className="w-full inline-flex items-center justify-end">
                                            {item.active_delivery ? (
                                                <span className="px-4 py-1 rounded-full bg-green-50 text-green-500 font-semibold inline-flex items-center gap-2">
                                                    Yes{' '}
                                                    <span className="min-h-4 border-l-2 border-l-green-500 shrink-0"></span>{' '}
                                                    <span className="text-xs uppercase">
                                                        {
                                                            item.active_delivery
                                                                .status
                                                        }
                                                    </span>{' '}
                                                </span>
                                            ) : (
                                                <span className="px-4 py-1 rounded-full bg-gray-100 text-gray-500 font-semibold">
                                                    No
                                                </span>
                                            )}
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
                <div className="flex items-center justify-end gap-6 px-4 py-4">
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
