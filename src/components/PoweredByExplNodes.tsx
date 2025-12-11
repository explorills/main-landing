/**
 * PoweredByExplNodes - Universal tagline component for ONE ecosystem
 * 
 * A self-contained, reusable component that displays the "// Powered by EXPL Nodes"
 * badge with consistent styling, 3D effects, and animations across all ONE projects.
 * 
 * USAGE:
 * 1. Copy this file into your project's components folder
 * 2. Import and use: <PoweredByExplNodes />
 * 
 * CUSTOMIZATION:
 * - size: 'sm' | 'md' | 'lg' (default: 'md')
 * - className: Additional CSS classes to apply
 * - href: Link URL (default: https://mint.explorills.com)
 * 
 * EXAMPLES:
 * <PoweredByExplNodes />
 * <PoweredByExplNodes size="sm" />
 * <PoweredByExplNodes size="lg" className="mt-4" />
 * 
 * REQUIREMENTS:
 * - React 18+
 * - No external dependencies (all styles are inline)
 * 
 * @version 1.0.0
 * @author EXPL / ONE Ecosystem
 */

import React from 'react'

interface PoweredByExplNodesProps {
  /** Size variant: 'sm' (10px), 'md' (12px), 'lg' (14px) */
  size?: 'sm' | 'md' | 'lg'
  /** Additional CSS classes */
  className?: string
  /** Link URL (default: https://mint.explorills.com) */
  href?: string
  /** Open in new tab (default: true) */
  newTab?: boolean
}

// All colors, fonts, and effects are embedded for portability
// These values are EXACT copies from the original Header.tsx badge
const STYLES = {
  // Font family - Roboto Mono for that code/terminal aesthetic
  fontFamily: "'Roboto Mono', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
  
  // Colors (EXACT from CSS variables)
  textColor: '#ffffff', // text-white
  backgroundColor: 'oklch(0.18 0.04 252)', // bg-card
  backgroundColorHover: 'oklch(0.18 0.04 252 / 0.8)', // bg-card/80
  borderColor: '#a147e1', // theme primary color
  
  // Size variants - EXACT from Tailwind classes
  sizes: {
    sm: {
      fontSize: '10px',
      paddingX: '8px',   // px-2
      paddingY: '4px',   // py-1
      borderRadius: '4px', // rounded-sm
    },
    md: {
      fontSize: '12px',  // text-[12px] - EXACT original size
      paddingX: '12px',  // px-3 - EXACT original padding
      paddingY: '6px',   // py-1.5 - EXACT original padding
      borderRadius: '6px', // rounded-md - EXACT original radius
    },
    lg: {
      fontSize: '14px',
      paddingX: '16px',  // px-4
      paddingY: '8px',   // py-2
      borderRadius: '8px', // rounded-lg
    },
  },
  
  // 3D Shadow effects - EXACT from original
  shadow: {
    // shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]
    default: '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
    // hover:shadow-[0_4px_8px_rgba(0,0,0,0.4),0_0_12px_hsl(var(--primary)/0.6),inset_0_1px_0_rgba(255,255,255,0.15)]
    hover: '0 4px 8px rgba(0,0,0,0.4), 0 0 12px oklch(0.6271 0.1699 149.21 / 0.6), inset 0 1px 0 rgba(255,255,255,0.15)',
  },
} as const

export function PoweredByExplNodes({
  size = 'md',
  className = '',
  href = 'https://mint.explorills.com',
  newTab = true,
}: PoweredByExplNodesProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  
  const sizeStyles = STYLES.sizes[size]
  
  const baseStyles: React.CSSProperties = {
    // Display
    display: 'inline-flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    
    // Typography
    fontFamily: STYLES.fontFamily,
    fontSize: sizeStyles.fontSize,
    fontWeight: 400,
    color: STYLES.textColor,
    textDecoration: 'none',
    
    // Spacing
    padding: `${sizeStyles.paddingY} ${sizeStyles.paddingX}`,
    
    // Background & Border
    backgroundColor: STYLES.backgroundColor,
    border: `1px solid ${STYLES.borderColor}`,
    borderRadius: sizeStyles.borderRadius,
    
    // 3D Effect & Shadow
    boxShadow: isHovered ? STYLES.shadow.hover : STYLES.shadow.default,
    
    // Transform for 3D lift effect
    transform: isHovered ? 'translateY(-1px) scale(1.1)' : 'translateY(0) scale(1)',
    
    // Transitions
    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    
    // Interaction
    cursor: 'pointer',
  }
  
  // Hover background color
  if (isHovered) {
    baseStyles.backgroundColor = STYLES.backgroundColorHover
  }

  return (
    <a
      href={href}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
      style={baseStyles}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      // Powered by EXPL Nodes
    </a>
  )
}

/**
 * Alternative: CSS-only version using CSS custom properties
 * 
 * If you prefer using CSS classes, add this to your global CSS:
 * 
 * ```css
 * .powered-by-expl-nodes {
 *   display: inline-flex;
 *   align-items: center;
 *   white-space: nowrap;
 *   font-family: 'Roboto Mono', ui-monospace, monospace;
 *   font-size: 12px;
 *   font-weight: 400;
 *   color: #ffffff;
 *   text-decoration: none;
 *   padding: 6px 12px;
 *   background-color: rgba(24, 24, 27, 0.95);
 *   border: 1px solid oklch(0.6271 0.1699 149.21);
 *   border-radius: 6px;
 *   box-shadow: 0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1);
 *   transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
 *   cursor: pointer;
 * }
 * 
 * .powered-by-expl-nodes:hover {
 *   box-shadow: 0 4px 8px rgba(0,0,0,0.4), 0 0 12px oklch(0.6271 0.1699 149.21 / 0.6), inset 0 1px 0 rgba(255,255,255,0.15);
 *   transform: translateY(-1px) scale(1.1);
 *   background-color: rgba(24, 24, 27, 0.8);
 * }
 * ```
 */

export default PoweredByExplNodes
