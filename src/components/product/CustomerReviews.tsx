// components/reviews/CustomerReviews.tsx
import { Star } from "lucide-react";

export default function CustomerReviews() {
    const ratingDistribution = [
        { stars: 5, width: "80%" },
        { stars: 4, width: "60%" },
        { stars: 3, width: "40%" },
        { stars: 2, width: "20%" },
        { stars: 1, width: "10%" },
    ];

    return (
        <section className="mb-12 font-[outfit]">
            <h2 className="text-3xl font-normal font-[TOPLUXURY] mb-8">Customer Rating & Reviews</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <div className="flex items-end space-x-4 mb-6">
                        <span className="text-6xl font-bold text-[#2c2d3a]">4.5</span>
                        <div>
                            <div className="flex space-x-1 mb-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="w-5 h-5 fill-[#FBBC04] text-[#FBBC04]" />
                                ))}
                            </div>
                            <p className="text-[#757575]">(832 reviews)</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {ratingDistribution.map((rating) => (
                            <div key={rating.stars} className="flex items-center space-x-3">
                                <Star className="w-4 h-4 fill-[#FBBC04] text-[#FBBC04]" />
                                <span className="text-sm text-[#757575] w-2">{rating.stars}</span>
                                <div className="flex-1 bg-[#E8E8E8] rounded-full h-2">
                                    <div className="bg-[#808080] h-2 rounded-full" style={{ width: rating.width }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <ReviewCard />
            </div>
        </section>
    );
}

function ReviewCard() {
    return (
        <div className="bg-white relative p-6 rounded-xl shadow-lg">
            <p className="text-[#757575] mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam.
            </p>
            <div className="flex items-center justify-between">
                <span className="font-semibold text-[#2c2d3a]">Loyal Customers</span>
            </div>
            <div className="flex space-x-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-6.5 h-6.5 fill-[#FBBC04] text-[#FBBC04]" />
                ))}
            </div>
            <QuoteIcon />
            <PaginationDots />
        </div>
    );
}

function QuoteIcon() {
    return (
        <svg width="28" className="left-1/2 transform -translate-x-1/2 absolute" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.5611 13.2483C21.8678 13.2483 22.162 13.2015 22.4549 13.1589C22.36 13.4779 22.2624 13.8024 22.1056 14.0939C21.9489 14.5174 21.7041 14.8845 21.4608 15.2544C21.2573 15.6545 20.8984 15.9254 20.6344 16.2678C20.358 16.6005 19.9813 16.8219 19.6829 17.0983C19.39 17.387 19.0064 17.5314 18.7011 17.7349C18.3821 17.9178 18.1044 18.1199 17.8074 18.2162L17.0663 18.5214L16.4145 18.7923L17.0814 21.457L17.9023 21.259C18.1649 21.193 18.4853 21.116 18.8496 21.0239C19.2223 20.9552 19.6196 20.7668 20.0624 20.5949C20.4996 20.3997 21.0056 20.2677 21.4759 19.9542C21.9489 19.6544 22.4948 19.4042 22.976 19.0027C23.4421 18.5888 24.0045 18.2299 24.4198 17.7033C24.8735 17.211 25.3218 16.694 25.6696 16.1055C26.0725 15.5445 26.3461 14.9285 26.6349 14.3194C26.8961 13.7103 27.1065 13.0874 27.2784 12.4824C27.6043 11.2697 27.75 10.1174 27.8064 9.13153C27.8531 8.14428 27.8256 7.32341 27.7679 6.72941C27.7473 6.44891 27.7088 6.17666 27.6813 5.98828L27.6469 5.75728L27.6111 5.76553C27.3666 4.62314 26.8036 3.57333 25.9873 2.73753C25.171 1.90174 24.1348 1.31412 22.9985 1.04265C21.8622 0.771177 20.6723 0.826948 19.5664 1.20351C18.4604 1.58007 17.4837 2.26204 16.7492 3.17052C16.0147 4.079 15.5523 5.17687 15.4157 6.33712C15.2791 7.49738 15.4737 8.67262 15.9771 9.72688C16.4805 10.7811 17.2721 11.6713 18.2602 12.2945C19.2484 12.9177 20.3929 13.2484 21.5611 13.2483ZM6.43614 13.2483C6.74277 13.2483 7.03702 13.2015 7.32989 13.1589C7.23502 13.4779 7.13739 13.8024 6.98064 14.0939C6.82389 14.5174 6.57914 14.8845 6.33577 15.2544C6.13227 15.6545 5.77339 15.9254 5.50939 16.2678C5.23302 16.6005 4.85627 16.8219 4.55789 17.0983C4.26502 17.387 3.88139 17.5314 3.57614 17.7349C3.25714 17.9178 2.97939 18.1199 2.68239 18.2162L1.94127 18.5214L1.28952 18.7923L1.95639 21.457L2.77727 21.259C3.03989 21.193 3.36027 21.116 3.72464 21.0239C4.09727 20.9552 4.49464 20.7668 4.93739 20.5949C5.37327 20.3983 5.88064 20.2677 6.35089 19.9528C6.82389 19.653 7.36976 19.4028 7.85102 19.0013C8.31714 18.5874 8.87952 18.2285 9.29477 17.7033C9.74852 17.211 10.1968 16.694 10.5446 16.1055C10.9475 15.5445 11.2211 14.9285 11.5099 14.3194C11.7711 13.7103 11.9815 13.0874 12.1534 12.4824C12.4793 11.2697 12.625 10.1174 12.6814 9.13153C12.7281 8.14428 12.7006 7.32341 12.6429 6.72941C12.6223 6.44891 12.5838 6.17666 12.5563 5.98828L12.5219 5.75728L12.4861 5.76553C12.2416 4.62314 11.6786 3.57333 10.8623 2.73753C10.046 1.90174 9.00981 1.31412 7.87351 1.04265C6.73722 0.771177 5.54728 0.826948 4.44135 1.20351C3.33543 1.58007 2.35871 2.26204 1.62418 3.17052C0.889652 4.079 0.427328 5.17687 0.290691 6.33712C0.154057 7.49738 0.348692 8.67262 0.852083 9.72688C1.35547 10.7811 2.14705 11.6713 3.13524 12.2945C4.12344 12.9177 5.26787 13.2484 6.43614 13.2483Z" fill="#FFBEB9" />
        </svg>
    );
}

function PaginationDots() {
    return (
        <div className="flex space-x-2 absolute -bottom-7 left-1/2 transform -translate-x-1/2">
            <div className="w-2 h-2 bg-[#e54b4b] rounded-full"></div>
            <div className="w-2 h-2 bg-[#D9D9D9] rounded-full"></div>
            <div className="w-2 h-2 bg-[#D9D9D9] rounded-full"></div>
            <div className="w-2 h-2 bg-[#D9D9D9] rounded-full"></div>
        </div>
    );
}