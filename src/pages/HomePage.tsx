import PageLayout from '@/components/layouts/PageLayout'
import DeliveryListCard from '@/components/sections/DeliveryListCard'
import PackageListCard from '@/components/sections/PackageListCard'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
    const navigate = useNavigate()
    return (
        <PageLayout pageTitle="Web admin" pageSubtitle="Home">
            <div className="container flex flex-col gap-6">
                <Card className="gap-4">
                    <div className="flex items-center justify-start gap-4">
                        <span className="flex-auto font-bold text-2xl capitalize ">
                            Package list
                        </span>
                        <Button onClick={() => navigate('/create-package')}>
                            Create package
                        </Button>
                    </div>
                    <PackageListCard />
                </Card>
                <Card className="gap-4">
                    <div className="flex items-center justify-start gap-4">
                        <span className="flex-auto font-bold text-2xl capitalize ">
                            Delivery list
                        </span>
                        <Button onClick={() => navigate('/create-delivery')}>
                            Create delivery
                        </Button>
                    </div>
                    <DeliveryListCard />
                </Card>
            </div>
        </PageLayout>
    )
}
