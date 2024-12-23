interface FormContainerProps {
    children: React.ReactNode;
}

export function FormContainer({ children }: FormContainerProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            {children}
        </div>
    );
}
