import Image from "next/image"

export function LeftImageSection() {
    return (
        <figure className="w-md h-[31rem] hidden lg:block">
            <Image
                src="/images/women-with-bag.jpg"
                alt="Login Illustration"
                width={800}
                height={600}
                className="w-full h-full object-cover object-[60%] rounded-2xl"
                priority
            />
        </figure>
    )
}