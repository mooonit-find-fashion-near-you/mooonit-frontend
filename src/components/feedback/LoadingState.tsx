// components/LoadingState.tsx
interface LoadingStateProps {
    message: string;
}

export default function LoadingState({ message }: LoadingStateProps) {
    return (
        <div className="min-h-screen bg-[#f9fbff] flex items-center justify-center">
            <div className="text-lg">{message}</div>
        </div>
    );
}