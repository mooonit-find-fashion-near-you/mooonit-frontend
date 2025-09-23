import Image from "next/image"

export default function Footer() {
    return (
        <footer className="bg-[#2c2d3a] text-white py-16 px-8">
            <div className="max-w-7xl mx-auto">
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Navigation Column */}
                    <div>
                        <h1 className="text-[#ffffff] font-semibold text-lg mb-6 tracking-wide">NAVIGATION</h1>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="text-[#a6a6a6] hover:text-white transition-colors">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[#a6a6a6] hover:text-white transition-colors">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[#a6a6a6] hover:text-white transition-colors">
                                    What We Do
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[#a6a6a6] hover:text-white transition-colors">
                                    To The Power of 10
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[#a6a6a6] hover:text-white transition-colors">
                                    Donate
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* What We Do Column */}
                    <div>
                        <h1 className="text-[#ffffff] font-semibold text-lg mb-6 tracking-wide">WHAT WE DO</h1>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="text-[#a6a6a6] hover:text-white transition-colors">
                                    Encouraging Testing
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[#a6a6a6] hover:text-white transition-colors">
                                    Strengthening
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[#a6a6a6] hover:text-white transition-colors">
                                    Advocacy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[#a6a6a6] hover:text-white transition-colors">
                                    Sharing Information
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[#a6a6a6] hover:text-white transition-colors">
                                    Building Leadership
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[#a6a6a6] hover:text-white transition-colors">
                                    Engaging With Global
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div>
                        <h1 className="text-[#ffffff] font-semibold text-lg mb-6 tracking-wide">LEGAL</h1>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="text-[#a6a6a6] hover:text-white transition-colors">
                                    General Info
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[#a6a6a6] hover:text-white transition-colors">
                                    Privacy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[#a6a6a6] hover:text-white transition-colors">
                                    Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Download Column */}
                    <div>
                        <h1 className="text-[#ffffff] font-semibold text-lg mb-6 tracking-wide">DOWNLOAD NOW</h1>
                        <div className="space-y-4">
                            {/* Google Play Button */}
                            <a href="#" className="block">
                                <div className="bg-transparent max-w-3xs border border-[#979797] rounded-lg px-4 py-3 flex items-center space-x-2.5 hover:bg-[#979797]/10 transition-colors">
                                    <div className="w-8 h-8 flex items-center justify-center">
                                        <svg aria-hidden="true" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0,0h40v40H0V0z"></path><g><path d="M19.7,19.2L4.3,35.3c0,0,0,0,0,0c0.5,1.7,2.1,3,4,3c0.8,0,1.5-0.2,2.1-0.6l0,0l17.4-9.9L19.7,19.2z" fill="#EA4335"></path><path d="M35.3,16.4L35.3,16.4l-7.5-4.3l-8.4,7.4l8.5,8.3l7.5-4.2c1.3-0.7,2.2-2.1,2.2-3.6C37.5,18.5,36.6,17.1,35.3,16.4z" fill="#FBBC04"></path><path d="M4.3,4.7C4.2,5,4.2,5.4,4.2,5.8v28.5c0,0.4,0,0.7,0.1,1.1l16-15.7L4.3,4.7z" fill="#4285F4"></path><path d="M19.8,20l8-7.9L10.5,2.3C9.9,1.9,9.1,1.7,8.3,1.7c-1.9,0-3.6,1.3-4,3c0,0,0,0,0,0L19.8,20z" fill="#34A853"></path></g></svg>
                                    </div>
                                    <div>
                                        <div className="text-sm tracking-wider text-[#a6a6a6]">Get it on</div>
                                        <div className="text-2xl text-white">Google Play</div>
                                    </div>
                                </div>
                            </a>

                            {/* App Store Button */}
                            <a href="#" className="block">
                                <div className="bg-transparent max-w-3xs border border-[#979797] rounded-lg px-4 py-3 flex items-center space-x-2.5 hover:bg-[#979797]/10 transition-colors">
                                    <svg viewBox="0 0 24 24" className="w-9 h-9 text-white" fill="currentColor">
                                        <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                                    </svg>
                                    <div>
                                        <div className="text-sm tracking-wider text-[#a6a6a6]">Download on the</div>
                                        <div className="text-2xl text-white">App Store</div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="border-white/20" />

                {/* Bottom section with logo, copyright, and social icons */}
                <div className="border-t border-[#2C2D3A]/20 pt-8">
                    <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
                        <figure>
                            <Image src="/images/logo-white.svg" alt="Mooonit Logo" width={120} height={40} />
                        </figure>

                        {/* Copyright */}
                        <div className="text-white text-base text-center">© 2025-26 Mooonit. All Rights Reserved.</div>

                        {/* Social Icons */}
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="w-12 h-12 rounded-full border border-[#979797] flex items-center justify-center hover:bg-[#979797]/10 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47062 14 5.5 16 5.5H17.5V2.1401C17.1743 2.09685 15.943 2 14.6429 2C11.9284 2 10 3.65686 10 6.69971V9.5H7V13.5H10V22H14V13.5Z"></path></svg>
                            </a>
                            <a
                                href="#"
                                className="w-12 h-12 rounded-full border border-[#979797] flex items-center justify-center hover:bg-[#979797]/10 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M6.94048 4.99993C6.94011 5.81424 6.44608 6.54702 5.69134 6.85273C4.9366 7.15845 4.07187 6.97605 3.5049 6.39155C2.93793 5.80704 2.78195 4.93715 3.1105 4.19207C3.43906 3.44699 4.18654 2.9755 5.00048 2.99993C6.08155 3.03238 6.94097 3.91837 6.94048 4.99993ZM7.00048 8.47993H3.00048V20.9999H7.00048V8.47993ZM13.3205 8.47993H9.34048V20.9999H13.2805V14.4299C13.2805 10.7699 18.0505 10.4299 18.0505 14.4299V20.9999H22.0005V13.0699C22.0005 6.89993 14.9405 7.12993 13.2805 10.1599L13.3205 8.47993Z"></path></svg>
                            </a>
                            <a
                                href="#"
                                className="w-12 h-12 rounded-full border border-[#979797] flex items-center justify-center hover:bg-[#979797]/10 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.6874 3.0625L12.6907 8.77425L8.37045 3.0625H2.11328L9.58961 12.8387L2.50378 20.9375H5.53795L11.0068 14.6886L15.7863 20.9375H21.8885L14.095 10.6342L20.7198 3.0625H17.6874ZM16.6232 19.1225L5.65436 4.78217H7.45745L18.3034 19.1225H16.6232Z"></path></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
