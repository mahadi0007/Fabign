import Link from 'next/link'
import Image from 'next/image'
import { Text } from '../components/text'
import { PrimaryButton } from '../components/button'
import FourOFourImg from '../public/assets/404.png'

export default function Custom404() {
    return (
        <div className="flex-center flex-column text-center p-5">
            <div className="py-5">
                <Image
                    src={FourOFourImg}
                    alt="Page not found"
                    width={250}
                    height={250}
                />
                <Text className="fw-bold text-dark fs-14 my-4">What are you looking for ? Page not found !!!</Text>
                <Link
                    passHref
                    href="/"
                >
                    <PrimaryButton
                        type="button"
                        className="btn px-30 rounded"
                    ><Text className="mb-0 fs-14">Back to Home</Text>
                    </PrimaryButton>
                </Link>
            </div>
        </div>

    )
}