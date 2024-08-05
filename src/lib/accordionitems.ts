export const accordionItems = [
	{
		title: 'E-Commerce',
		children: [
			{ title: 'Products', link: '/products' },
			{ title: 'Billing', link: '/billing' },
			{
				link: '/invoice',
				children: [
					{
						title: 'Invoice ',
						children: [
							{
								children: [
									{
										title: 'Calculator',
										children: [
											{ title: 'Product ID', link: '/products_id' },
											{ title: 'Product Info', link: '/product_info' },
											{ title: 'Invoice', link: '/invoice' }
										]
									}
								],
								link: '/products'
							}
						]
					}
				]
			}
		]
	},
	{
		title: 'Inspection',
		children: [
			{ title: 'Product ID', link: '/products_id' },
			{ title: 'Product Info', link: '/product_info' },
			{ title: 'Invoice', link: '/invoice' }
		]
	}
];
