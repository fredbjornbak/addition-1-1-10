
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			// GradeAid Brand Colors
			colors: {
				// Brand Color Palette
				'grade-purple': '#6F00FF',
				'grade-orange': '#FF6F00',
				'grade-blue': '#0026FF',
				'grade-black': '#2F2E41',
				'grade-white': '#FAFAFA',
				'grade-gray': '#F0F0F0',
				'grade-border': '#E5E7EB',
				
				// Keep existing shadcn colors
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			
			// GradeAid Typography
			fontFamily: {
				'space-grotesk': ['Space Grotesk', 'sans-serif'],
				'dm-sans': ['DM Sans', 'sans-serif'],
			},
			
			fontSize: {
				'grade-body': ['18px', { lineHeight: '1.5' }],
				'grade-body-lg': ['20px', { lineHeight: '1.5' }],
				'grade-button': ['20px', { lineHeight: '1.2', fontWeight: '700' }],
				'grade-button-lg': ['24px', { lineHeight: '1.2', fontWeight: '700' }],
				'grade-heading': ['48px', { lineHeight: '1.1', fontWeight: '700' }],
				'grade-heading-lg': ['64px', { lineHeight: '1.1', fontWeight: '700' }],
			},
			
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'grade-pill': '100px',
				'grade-card': '50px',
			},
			
			boxShadow: {
				'grade-button': '-10px 10px 40px rgba(0, 0, 0, 0.25)',
				'grade-card': '0 10px 30px rgba(0, 0, 0, 0.1)',
			},
			
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'bounce-gentle': {
					'0%, 100%': {
						transform: 'translateY(0)',
						animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
					},
					'50%': {
						transform: 'translateY(-10px)',
						animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
					}
				},
				'pulse-glow': {
					'0%, 100%': {
						boxShadow: '0 0 0 0 rgba(111, 0, 255, 0.4)'
					},
					'50%': {
						boxShadow: '0 0 0 10px rgba(111, 0, 255, 0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'vibrate': {
					'0%, 100%': { transform: 'translateX(0)' },
					'10%': { transform: 'translateX(-2px) rotate(-1deg)' },
					'20%': { transform: 'translateX(2px) rotate(1deg)' },
					'30%': { transform: 'translateX(-2px) rotate(-1deg)' },
					'40%': { transform: 'translateX(2px) rotate(1deg)' },
					'50%': { transform: 'translateX(-1px) rotate(-0.5deg)' },
					'60%': { transform: 'translateX(1px) rotate(0.5deg)' },
					'70%': { transform: 'translateX(-1px) rotate(-0.5deg)' },
					'80%': { transform: 'translateX(1px) rotate(0.5deg)' },
					'90%': { transform: 'translateX(0) rotate(0deg)' }
				},
				'group-flash': {
					'0%': { 
						background: 'rgba(255, 215, 0, 0.8)',
						transform: 'scale(1)',
						boxShadow: '0 0 0 0 rgba(255, 215, 0, 0.7)'
					},
					'50%': { 
						background: 'rgba(255, 215, 0, 1)',
						transform: 'scale(1.1)',
						boxShadow: '0 0 0 10px rgba(255, 215, 0, 0)'
					},
					'100%': { 
						background: 'rgba(255, 215, 0, 0.8)',
						transform: 'scale(1)',
						boxShadow: '0 0 0 0 rgba(255, 215, 0, 0)'
					}
				},
				'sparkle': {
					'0%': { opacity: '0', transform: 'scale(0) rotate(0deg)' },
					'50%': { opacity: '1', transform: 'scale(1) rotate(180deg)' },
					'100%': { opacity: '0', transform: 'scale(0) rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'bounce-gentle': 'bounce-gentle 1s infinite',
				'pulse-glow': 'pulse-glow 2s infinite',
				'scale-in': 'scale-in 0.2s ease-out',
				'vibrate': 'vibrate 0.5s ease-in-out infinite',
				'group-flash': 'group-flash 0.6s ease-out',
				'sparkle': 'sparkle 1s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
