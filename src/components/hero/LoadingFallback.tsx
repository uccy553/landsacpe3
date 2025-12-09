export default function LoadingFallback() {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1a3d2e] z-50">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4" />
                <p className="text-white text-lg font-medium">Loading Experience...</p>
            </div>
        </div>
    );
}
