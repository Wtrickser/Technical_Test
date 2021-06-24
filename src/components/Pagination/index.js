import React from 'react';

const Pagination = ({ paymentsPerPage, totalPayments, paginate }) => {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalPayments / paymentsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav className='d-flex align-items-center'>
			<ul className='pagination' style={{ margin: 'auto' }}>
				{pageNumbers.map(pageNumber => (
					<li key={pageNumber} className='page-item'>
						<a
							onClick={_ => {
								paginate(pageNumber);
							}}
							href='###'
							className='page-link'
							style={{
								color: '#702082'
							}}
						>
							{pageNumber}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;