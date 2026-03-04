const SkeletonLoader = () => {
    return (
        <div className="w-full p-4 space-y-6 animate-pulse mt-4">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center mb-8">
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                <div className="h-8 bg-gray-200 rounded w-32"></div>
            </div>

            {/* KPI Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[...Array(4)].map((_, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-32 flex flex-col justify-center">
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    </div>
                ))}
            </div>

            {/* Main Content Area Skeleton */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-[400px]"></div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-[400px]"></div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
