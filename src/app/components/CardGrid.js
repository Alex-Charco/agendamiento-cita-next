import PropTypes from 'prop-types';
import Link from 'next/link';
import CardFeature from '@/components/CardFeature';

const CardGrid = ({ cards }) => {
	return (
		<section className="p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
			{cards.map((card) => (
				<div key={card.id}>
					{card.href ? (
						<Link href={card.href}>
							<CardFeature
								icon={card.icon}
								title={card.title}
								description={card.description}
							/>
						</Link>
					) : (
						<CardFeature
							icon={card.icon}
							title={card.title}
							description={card.description}
						/>
					)}
				</div>
			))}
		</section>
	);
};


// ✅ Validación con PropTypes
CardGrid.propTypes = {
	cards: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
			href: PropTypes.string,
			icon: PropTypes.node.isRequired,
			title: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired
		})
	).isRequired
};

export default CardGrid;
