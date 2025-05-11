"use client";

import PropTypes from "prop-types";
import Link from "next/link";
import Button from "./Button";

const Banner = ({ title, description, buttons, imageUrl }) => {

    return (
        <section className="relative w-full h-[400px] flex flex-col items-center justify-center text-center p-10">
            {/* Imagen de fondo */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${imageUrl})` }}
            />

            {/* Capa de opacidad azul */}
            <div className="absolute inset-0 bg-blue-900 opacity-50"></div>

            {/* Contenido */}
            <div className="relative z-10 text-white">
                <h2 className="text-4xl font-bold mb-4">{title}</h2>
                <p className="text-lg">{description}</p>

                {/* Botones */}
                {buttons && buttons.length > 0 && (
                    <div className="mt-6 flex justify-center flex-wrap gap-6">
                        {buttons.map((btn) => (
                            <Link key={btn.link} href={btn.link}>
                            <Button
                                text={btn.text}
                                variant={btn.variant || "primary"}
                            />
                        </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

// ✅ Validación de props
Banner.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            variant: PropTypes.string
        })
    ),
    imageUrl: PropTypes.string.isRequired
};

export default Banner;
