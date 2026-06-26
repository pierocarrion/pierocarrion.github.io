import { FC } from 'react'
import { TPackage } from './portfolio'
import styles from './Profile.module.scss'

type TPackagesProps = {
  id: string
  eyebrow: string
  title: string
  subtitle: string
  packages: TPackage[]
  icon: 'nuget' | 'pubdev'
}

const PubDevIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
    <path
      fill="currentColor"
      d="M4 4h4.5a5.5 5.5 0 0 1 0 11H6.5v5H4V4zm2.5 2v7h2a3.5 3.5 0 0 0 0-7h-2zM14 4h3l2.5 9L22 4h3v16h-2V8l-2.5 9h-1.5L16 8v12h-2V4z"
    />
  </svg>
)

const NugetIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
    <path
      fill="currentColor"
      d="M15.2 0c-2.4 0-4.3 1.9-4.3 4.3s1.9 4.3 4.3 4.3 4.3-1.9 4.3-4.3S17.6 0 15.2 0zm-9.5 8.6c-2.9 0-5.2 2.3-5.2 5.2v5.1C.5 21.8 2.8 24 5.7 24h5.1c2.9 0 5.2-2.3 5.2-5.1v-5.1c0-2.9-2.3-5.2-5.2-5.2H5.7zm1.1 2.4a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2zm5.4 5a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4z"
    />
  </svg>
)

export const Packages: FC<TPackagesProps> = ({
  id,
  eyebrow,
  title,
  subtitle,
  packages,
  icon,
}) => {
  return (
    <section className={styles.section} id={id}>
      <header className={styles.sectionHeader}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <p className={styles.sectionSubtitle}>{subtitle}</p>
      </header>

      <div className={styles.list}>
        {packages.map((pkg) => (
          <a
            key={pkg.name}
            className={styles.row}
            href={pkg.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.rowIcon}>
              {icon === 'nuget' ? <NugetIcon /> : <PubDevIcon />}
            </span>
            <div className={styles.rowBody}>
              <h3 className={styles.rowTitle}>{pkg.name}</h3>
              <p className={styles.rowText}>{pkg.description}</p>
            </div>
            <span className={styles.rowMeta}>{pkg.meta}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
