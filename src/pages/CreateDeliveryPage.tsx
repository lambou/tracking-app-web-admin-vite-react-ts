import PageLayout from '@/components/layouts/PageLayout'
import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import FormItem from '@/components/ui/forms/FormItem'
import Link from '@/components/ui/Link'
import Select from '@/components/ui/select'
import IPackage from '@/interfaces/IPackage'
import { fetchJson } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

export default function CreateDeliveryPage() {
    const navigate = useNavigate()

    const schema = useMemo(
        () =>
            z.object({
                package_id: z.string().min(1, 'The package is required.'),
            }),
        []
    )

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {},
    })

    const { isPending, error, mutateAsync } = useMutation({
        mutationKey: ['create-delivery'],
        mutationFn: async (data: z.infer<typeof schema>) => {
            return await fetch(
                `${import.meta.env.VITE_APP_API_URL}/api/delivery`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            ).then(async (response) => {
                if (response.ok) {
                    try {
                        return await response.json()
                    } catch (error) {
                        return null
                    }
                } else {
                    let error = await response.text()
                    try {
                        error = JSON.parse(error)
                    } catch (error) {}
                    throw error
                }
            })
        },
        onSuccess: () => {
            toast.success('The delivery has been successfully created.', {
                duration: 5_000,
            })
            reset()

            // go back to the home page
            navigate('/')
        },
    })

    const onSubmit = async (data: z.infer<typeof schema>) =>
        await mutateAsync(data)

    const { isLoading: loadingPackages, data: packages } = useQuery<IPackage[]>(
        {
            queryKey: ['delivery-package-list'],
            queryFn: async () => {
                return await fetchJson(
                    `${import.meta.env.VITE_APP_API_URL}/api/package`
                )
            },
        }
    )

    return (
        <PageLayout pageTitle="Web admin" pageSubtitle="Create Delivery">
            <h2 className="text-2xl font-bold capitalize">Delivery form</h2>
            {error && (
                <Alert variant="danger">
                    {error.message ?? 'Something wrong has happened.'}
                </Alert>
            )}
            <form
                className="max-w-2xl w-full flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormItem
                    label="Package"
                    render={(props) => (
                        <Select
                            autoFocus
                            {...props}
                            {...register('package_id')}
                        >
                            <option value="">
                                {loadingPackages
                                    ? 'loading...'
                                    : '-- Select a package --'}
                            </option>
                            {packages &&
                                packages.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.description}
                                    </option>
                                ))}
                        </Select>
                    )}
                    error={errors.package_id?.message}
                    required
                />

                <div className="flex items-center justify-end gap-4">
                    <Link to="/">Back to home page</Link>
                    <Button
                        disabled={isPending}
                        loading={isPending}
                        type="submit"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </PageLayout>
    )
}
