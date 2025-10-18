// src/app/account/page.tsx
import ProfileForm from "@/components/Profile/ProfileForm";
import ProfileSidebar from "@/components/Profile/ProfileSidebar";

export default function Page() {
    return (
        <main className="min-h-screen bg-[#ffffff]">
            <section className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
                <h1 className="text-2xl md:text-3xl font-semibold text-[#1d1d1d] mb-6 md:mb-8 tracking-tight">
                    {"My Checkout"}
                </h1>
                <div className="flex gap-6 md:gap-8">
                    <ProfileSidebar />
                    <ProfileForm />
                </div>
            </section>
        </main>
    )
}
