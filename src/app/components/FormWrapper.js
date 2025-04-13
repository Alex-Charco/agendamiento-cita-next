export default function FormWrapper({ children, mensaje }) {
    return (
        <div className="min-h-screen p-6 flex flex-col items-center">
            <div className="lg:w-1/2">
                {children}
                {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
            </div>
        </div>
    );
}
