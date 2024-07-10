import PageLayout from '@/components/layouts/PageLayout'
import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import FormItem from '@/components/ui/forms/FormItem'
import Input from '@/components/ui/Input'
import Link from '@/components/ui/Link'
import LocationInput from '@/components/ui/LocationInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

export default function CreatePackagePage() {
    const navigate = useNavigate()

    const schema = useMemo(
        () =>
            z.object({
                description: z.string().min(1, 'The description is required.'),
                weight: z.number().positive(),
                width: z.number().positive(),
                height: z.number().positive(),
                depth: z.number().positive(),
                from_name: z.string().min(1, 'The from name is required.'),
                from_address: z
                    .string()
                    .min(1, 'The from address is required.'),
                from_location: z.object({
                    lat: z.number(),
                    lng: z.number(),
                }),
                to_name: z.string().min(1, 'The recipient name is required.'),
                to_address: z
                    .string()
                    .min(1, 'The recipient address is required.'),
                to_location: z.object({
                    lat: z.number(),
                    lng: z.number(),
                }),
            }),
        []
    )

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            depth: 0,
            weight: 0,
            height: 0,
            width: 0,
        },
    })

    const { isPending, error, mutateAsync } = useMutation({
        mutationKey: ['create-package'],
        mutationFn: async (data: z.infer<typeof schema>) => {
            return await fetch(
                `${import.meta.env.VITE_APP_API_URL}/api/package`,
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
                    const text = await response.text()
                    try {
                        throw JSON.parse(text)
                    } catch (error) {
                        throw text
                    }
                }
            })
        },
        onSuccess: () => {
            toast.success('The package has been success fully created.', {
                duration: 5_000,
            })
            reset()

            // go back to the home page
            navigate('/')
        },
    })

    const onSubmit = async (data: z.infer<typeof schema>) =>
        await mutateAsync(data)

    return (
        <PageLayout pageTitle="Web admin" pageSubtitle="Create Package">
            <h2 className="text-2xl font-bold capitalize">Package form</h2>
            {error && (
                <Alert variant="danger">
                    {error.message ?? 'Something wrong has happened.'}
                </Alert>
            )}
            <div className="flex items-stretch gap-6">
                <form
                    className="max-w-2xl w-full flex flex-col gap-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FormItem
                        label="Description"
                        render={(props) => (
                            <Input
                                autoFocus
                                {...props}
                                type="text"
                                placeholder="Package description"
                                {...register('description')}
                            />
                        )}
                        error={errors.description?.message}
                        required
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormItem
                            label="Weight"
                            helpText="In grams"
                            render={(props) => (
                                <Input
                                    {...props}
                                    type="number"
                                    placeholder="Package weight"
                                    {...register('weight', {
                                        valueAsNumber: true,
                                    })}
                                />
                            )}
                            error={errors.weight?.message}
                            required
                        />
                        <FormItem
                            label="Width"
                            helpText="In cm"
                            render={(props) => (
                                <Input
                                    {...props}
                                    type="number"
                                    placeholder="Package width"
                                    {...register('width', {
                                        valueAsNumber: true,
                                    })}
                                />
                            )}
                            error={errors.width?.message}
                            required
                        />
                        <FormItem
                            label="Height"
                            helpText="In cm"
                            render={(props) => (
                                <Input
                                    {...props}
                                    type="number"
                                    placeholder="Package height"
                                    {...register('height', {
                                        valueAsNumber: true,
                                    })}
                                />
                            )}
                            error={errors.height?.message}
                            required
                        />
                        <FormItem
                            label="Depth"
                            helpText="In cm"
                            render={(props) => (
                                <Input
                                    {...props}
                                    type="number"
                                    placeholder="Package depth"
                                    {...register('depth', {
                                        valueAsNumber: true,
                                    })}
                                />
                            )}
                            error={errors.depth?.message}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-4 p-3 border rounded-lg bg-gray-100">
                            <span className="inline-flex items-center gap-2 font-bold text-green-500">
                                From
                            </span>
                            <FormItem
                                label="From name"
                                render={(props) => (
                                    <Input
                                        {...props}
                                        type="text"
                                        placeholder="Enter a name"
                                        {...register('from_name')}
                                    />
                                )}
                                error={errors.from_name?.message}
                                required
                            />
                            <FormItem
                                label="From Address"
                                render={(props) => (
                                    <Input
                                        {...props}
                                        type="text"
                                        placeholder="Enter an address"
                                        {...register('from_address')}
                                    />
                                )}
                                error={errors.from_address?.message}
                                required
                            />
                            <FormItem
                                label="From location"
                                render={(props) => (
                                    <LocationInput
                                        {...props}
                                        onChange={(data) => {
                                            if (data)
                                                setValue('from_location', data)
                                        }}
                                    />
                                )}
                                error={errors.from_location?.message}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-4 p-3 border rounded-lg bg-gray-100">
                            <span className="inline-flex items-center gap-2 font-bold text-green-500">
                                To
                            </span>
                            <FormItem
                                label="To name"
                                render={(props) => (
                                    <Input
                                        {...props}
                                        type="text"
                                        placeholder="Enter a name"
                                        {...register('to_name')}
                                    />
                                )}
                                error={errors.to_name?.message}
                                required
                            />
                            <FormItem
                                label="To Address"
                                render={(props) => (
                                    <Input
                                        {...props}
                                        type="text"
                                        placeholder="Enter an address"
                                        {...register('to_address')}
                                    />
                                )}
                                error={errors.to_address?.message}
                                required
                            />
                            <FormItem
                                label="To location"
                                render={(props) => (
                                    <LocationInput
                                        {...props}
                                        onChange={(data) => {
                                            if (data)
                                                setValue('to_location', data)
                                        }}
                                    />
                                )}
                                error={errors.to_location?.message}
                                required
                            />
                        </div>
                    </div>
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
            </div>
        </PageLayout>
    )
}
