/**
 * 와이어프레임의 아이콘 슬롯(2px 선 아이콘)을 그대로 재현한 SVG 아이콘 세트.
 * 색상은 와이어프레임 팔레트 값만 사용한다.
 */
const base = (size, color, strokeWidth = 2) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: color,
  strokeWidth,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  xmlns: 'http://www.w3.org/2000/svg',
})

export const IconChevronLeft = ({ size = 24, color = '#2D241E' }) => (
  <svg {...base(size, color)}><polyline points="15 18 9 12 15 6" /></svg>
)
export const IconChevronRight = ({ size = 24, color = '#8C7A6B' }) => (
  <svg {...base(size, color)}><polyline points="9 18 15 12 9 6" /></svg>
)
export const IconBell = ({ size = 24, color = '#2D241E' }) => (
  <svg {...base(size, color)}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.7 21a2 2 0 0 1-3.4 0" />
  </svg>
)
export const IconMoon = ({ size = 24, color = '#8C7A6B' }) => (
  <svg {...base(size, color)}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
)
export const IconFootsteps = ({ size = 24, color = '#8C7A6B' }) => (
  <svg {...base(size, color)}>
    <path d="M4 16c-1-2-1-5 0-7 .8-1.6 2.6-1.8 3.4-.4.9 1.6.9 4.4 0 6-.7 1.3-2.6 1.5-3.4.4z" />
    <path d="M4.5 17.5c1 .3 2.3.3 3.2 0" />
    <path d="M16.6 20c-1-2-1-5 0-7 .8-1.6 2.6-1.8 3.4-.4.9 1.6.9 4.4 0 6-.7 1.3-2.6 1.5-3.4.4z" />
    <path d="M17.1 21.5c1 .3 2.3.3 3.2 0" />
  </svg>
)
export const IconSmartphone = ({ size = 24, color = '#8C7A6B' }) => (
  <svg {...base(size, color)}>
    <rect x="6" y="2" width="12" height="20" rx="2" />
    <line x1="11" y1="18" x2="13" y2="18" />
  </svg>
)
export const IconCheck = ({ size = 24, color = '#FFFFFF' }) => (
  <svg {...base(size, color, 2.4)}><polyline points="20 6 9 17 4 12" /></svg>
)
export const IconTrendUp = ({ size = 24, color = '#4A7C59' }) => (
  <svg {...base(size, color)}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
)
export const IconTrendDown = ({ size = 24, color = '#C84B31' }) => (
  <svg {...base(size, color)}>
    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
    <polyline points="16 17 22 17 22 11" />
  </svg>
)
export const IconHome = ({ size = 24, color = '#8C7A6B' }) => (
  <svg {...base(size, color)}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.8V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.8" />
  </svg>
)
export const IconMeal = ({ size = 24, color = '#8C7A6B' }) => (
  <svg {...base(size, color)}>
    {/* 포크 */}
    <path d="M6 4v4a2.5 2.5 0 0 0 5 0V4" />
    <path d="M8.5 4v4" />
    <path d="M8.5 10.5V20" />
    {/* 나이프 */}
    <path d="M17 4c-1.6 1.2-2.4 3-2.4 5.2 0 1.8.9 3.2 2.4 3.9V20" />
  </svg>
)
export const IconPlan = ({ size = 24, color = '#8C7A6B' }) => (
  <svg {...base(size, color)}>
    <rect x="5" y="4" width="14" height="17" rx="2" />
    <path d="M9 4h6v2H9z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
)
export const IconFuture = ({ size = 24, color = '#8C7A6B' }) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 10h.01" />
    <path d="M15.5 10h.01" />
    <path d="M8.5 15c1 1 2.2 1.5 3.5 1.5s2.5-.5 3.5-1.5" />
  </svg>
)
export const IconSettings = ({ size = 24, color = '#8C7A6B' }) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 2.5l1.4 2.2 2.6-.5.5 2.6 2.2 1.4-1.3 2.3 1.3 2.3-2.2 1.4-.5 2.6-2.6-.5L12 21.5l-1.4-2.2-2.6.5-.5-2.6-2.2-1.4 1.3-2.3-1.3-2.3 2.2-1.4.5-2.6 2.6.5z" />
  </svg>
)
export const IconCamera = ({ size = 24, color = '#8C7A6B' }) => (
  <svg {...base(size, color)}>
    <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2.2l1.3-2h7.9l1.3 2h2.3A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z" />
    <circle cx="12" cy="13" r="3.5" />
  </svg>
)
export const IconUpload = ({ size = 24, color = '#A67C52' }) => (
  <svg {...base(size, color)}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
)
export const IconCalendar = ({ size = 24, color = '#2D241E' }) => (
  <svg {...base(size, color)}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="8" y1="3" x2="8" y2="7" />
    <line x1="16" y1="3" x2="16" y2="7" />
  </svg>
)
export const IconShield = ({ size = 24, color = '#A67C52' }) => (
  <svg {...base(size, color)}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)
export const IconHeart = ({ size = 24, color = '#A67C52' }) => (
  <svg {...base(size, color)}>
    <path d="M20.8 6.6a5 5 0 0 0-7.1 0L12 8.3l-1.7-1.7a5 5 0 1 0-7.1 7.1l1.7 1.7L12 22.4l7.1-7.1 1.7-1.7a5 5 0 0 0 0-7z" />
  </svg>
)
export const IconDatabase = ({ size = 24, color = '#A67C52' }) => (
  <svg {...base(size, color)}>
    <ellipse cx="12" cy="5.5" rx="8" ry="3" />
    <path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13" />
    <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
  </svg>
)
export const IconFileText = ({ size = 24, color = '#A67C52' }) => (
  <svg {...base(size, color)}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <polyline points="14 3 14 8 19 8" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="13" y2="17" />
  </svg>
)
export const IconLock = ({ size = 24, color = '#A67C52' }) => (
  <svg {...base(size, color)}>
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
)
export const IconInfo = ({ size = 24, color = '#A67C52' }) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="11" x2="12" y2="16" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
)
export const IconAlertCircle = ({ size = 24, color = '#C84B31' }) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="8" x2="12" y2="13" />
    <line x1="12" y1="16.5" x2="12.01" y2="16.5" />
  </svg>
)
export const IconAlertTriangle = ({ size = 24, color = '#C84B31' }) => (
  <svg {...base(size, color)}>
    <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)
export const IconTrash = ({ size = 24, color = '#C84B31' }) => (
  <svg {...base(size, color)}>
    <polyline points="3 6 21 6" />
    <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
    <path d="M6 6l1 14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-14" />
  </svg>
)
export const IconEdit = ({ size = 24, color = '#8C7A6B' }) => (
  <svg {...base(size, color)}>
    <path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3z" />
    <path d="M14.5 6.5l3 3" />
  </svg>
)
export const IconX = ({ size = 24, color = '#2D241E' }) => (
  <svg {...base(size, color)}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
)
export const IconPlus = ({ size = 24, color = '#A67C52' }) => (
  <svg {...base(size, color)}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
)
export const IconRun = ({ size = 24, color = '#A67C52' }) => (
  <svg {...base(size, color)}>
    <circle cx="15" cy="4.5" r="2" />
    <path d="M12.5 21 14 15l-3-2.5 1-5.5 3.5 3 3 1" />
    <path d="M11 12.5 7.5 14 6 19" />
  </svg>
)
export const IconCoffee = ({ size = 24, color = '#A67C52' }) => (
  <svg {...base(size, color)}>
    <path d="M4 9h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
    <path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17" />
    <line x1="6" y1="3" x2="6" y2="6" />
    <line x1="10" y1="3" x2="10" y2="6" />
    <line x1="14" y1="3" x2="14" y2="6" />
  </svg>
)
export const IconSun = ({ size = 24, color = '#A67C52' }) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)
export const IconAward = ({ size = 24, color = '#4A7C59' }) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="9" r="6" />
    <polyline points="8.2 14.3 7 22 12 19.5 17 22 15.8 14.3" />
  </svg>
)
export const IconLink = ({ size = 24, color = '#A67C52' }) => (
  <svg {...base(size, color)}>
    <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
    <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
  </svg>
)
export const IconRefresh = ({ size = 24, color = '#A67C52' }) => (
  <svg {...base(size, color)}>
    <polyline points="20 5 20 10 15 10" />
    <path d="M20 10a8 8 0 1 0-1.6 6.6" />
  </svg>
)
export const IconTarget = ({ size = 24, color = '#A67C52' }) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.4" />
  </svg>
)
export const IconImage = ({ size = 24, color = '#8C7A6B' }) => (
  <svg {...base(size, color)}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="8.5" cy="9.5" r="1.6" />
    <polyline points="4 17 9.5 12 13 15 16.5 12 20 15.2" />
  </svg>
)
export const IconApple = ({ size = 24, color = '#A67C52' }) => (
  <svg {...base(size, color)}>
    <path d="M12 8c-1.2-1.6-3-2.2-4.5-1.4C5.6 7.6 5 10.3 5.7 13c.8 3 2.7 6 4.4 6 .8 0 1.2-.4 1.9-.4s1.1.4 1.9.4c1.7 0 3.6-3 4.4-6 .5-2 .3-4-.9-5.2" />
    <path d="M12 6.5c.2-1.6 1.4-3 3-3.2" />
  </svg>
)
export const IconActivity = ({ size = 24, color = '#A67C52' }) => (
  <svg {...base(size, color)}><polyline points="22 12 17.5 12 14.5 20 9.5 4 6.5 12 2 12" /></svg>
)
export const IconHourglass = ({ size = 24, color = '#A67C52' }) => (
  <svg {...base(size, color)}>
    <path d="M6 2h12" />
    <path d="M6 22h12" />
    <path d="M8 2v4c0 3 4 5 4 6s-4 3-4 6v4" />
    <path d="M16 2v4c0 3-4 5-4 6s4 3 4 6v4" />
  </svg>
)
export const IconWallet = ({ size = 24, color = '#8C7A6B' }) => (
  <svg {...base(size, color)}>
    <path d="M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2" />
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M16 13h2" />
  </svg>
)
export const IconGoogleFit = ({ size = 24, color = '#A67C52' }) => (
  <svg {...base(size, color)}>
    <path d="M12 20.5 4.8 13.6a4.6 4.6 0 0 1 6.4-6.6l.8.8.8-.8a4.6 4.6 0 0 1 6.4 6.6z" />
  </svg>
)
