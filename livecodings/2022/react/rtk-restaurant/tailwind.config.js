module.exports = {
	content: [ './src/**/*.{js,jsx,ts,tsx}', './public/index.html' ],
	theme: {
		extend: {
			width: {
				'1/3+': '30%'
			},
			keyframes: {
				'fade-in-down': {
					'0%': {
						opacity: '0',
						transform: 'translateY(-10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-out-down': {
					from: {
						opacity: '1',
						transform: 'translateY(0px)'
					},
					to: {
						opacity: '0',
						transform: 'translateY(10px)'
					}
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-out-up': {
					from: {
						opacity: '1',
						transform: 'translateY(0px)'
					},
					to: {
						opacity: '0',
						transform: 'translateY(10px)'
					}
				},
				'fade-in-left': {
					from: {
						opacity: '0',
						transform: 'translateX(-10px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0px)'
					}
				},
				'fade-in-right': {
					from: {
						opacity: '0',
						transform: 'translateX(10px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0px)'
					}
				}
			},
			animation: {
				'fade-in-down': 'fade-in-down 0.5s ease-out',
				'fade-out-down': 'fade-out-down 0.5s ease-out',
				'fade-in-up': 'fade-in-up 0.5s ease-out',
				'fade-out-up': 'fade-out-up 0.5s ease-out',
				'fade-in-left': 'fade-in-left 0.5s ease-out',
				'fade-in-right': 'fade-in-right 0.5s ease-out'
			}
		}
	}
};
