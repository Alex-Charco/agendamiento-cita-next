import Link from "next/link";
import CardFeature from "@/components/CardFeature";

const CardGrid = ({ cards }) => {
    return (
        <section className="p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card, index) =>
                card.href ? (
                    <Link href={card.href} key={index}>
                        <CardFeature
                            icon={card.icon}
                            title={card.title}
                            description={card.description}
                        />
                    </Link>
                ) : (
                    <CardFeature
                        key={index}
                        icon={card.icon}
                        title={card.title}
                        description={card.description}
                    />
                )
            )}
        </section>
    );
};

export default CardGrid;
