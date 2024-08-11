// Defining the icon types
export const iconTypes = {
  COMMON: 'COMMON',
  HOME: 'HOME',
} as const;

export type IconTypes = (typeof iconTypes)[keyof typeof iconTypes];

// Defining the common icons
export const commonIcons = {
  USER: 'user',
  ARROW: 'arrow',
  CANCELLED: 'cancelled',
  EMAIL: 'email',
  PHONE: 'phone',
  PENDING: 'pending',
  UPLOAD: 'upload',
  SCHEDULE: 'schedule',
  HOME: 'home',
  JOB: 'job',
  INSURANCE_POLICY: 'policy',
} as const;

export type CommonIcons = (typeof commonIcons)[keyof typeof commonIcons];

// Defining the home icons
export const homeIcons = {
  USER: 'user',
  OPTIONS: 'options',
  CHECK: 'check',
  CLOSE: 'close',
  USER_OUTLINE: 'user-outline',
  REVIEWS: 'reviews',
  STAR: 'star',
  SEARCH: 'search',
  DOCTORS: 'doctors',
  LIKE: 'like',
  BELL: 'bell',
  SETTINGS: 'settings',
} as const;

export type HomeIcons = (typeof homeIcons)[keyof typeof homeIcons];

// Defining icon sizes
export const iconSizes = {
  SMALL: 16,
  MEDIUM: 24,
  LARGE: 32,
  CUSTOM: '1em', // Custom size can be set via CSS
} as const;

export type IconSizes = (typeof iconSizes)[keyof typeof iconSizes];

// Mapping icon types to their respective icon sets
export interface SpritesMap {
  [iconTypes.COMMON]: CommonIcons;
  [iconTypes.HOME]: HomeIcons;
}

// Defining the icon source type
export type IconSource = {
  name: CommonIcons | HomeIcons;
  type: keyof typeof iconTypes;
};

// Defining props for the Icon component
export interface IconProps<Group extends keyof SpritesMap> {
  name: SpritesMap[Group];
  type: Group;
  size?: IconSizes;
  className?: string;
}

// Icon component definition
export const Icon = <Group extends keyof SpritesMap>({
  type,
  name,
  size = iconSizes.CUSTOM,
  className,
}: IconProps<Group>) => (
  <svg className={className} width={size} height={size}>
    <use href={`/assets/icons/sprites/${type.toLowerCase()}.svg#${name}`} />
  </svg>
);

export default Icon;
