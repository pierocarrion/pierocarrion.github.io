import { FC, useEffect, useState } from 'react'
import { portfolio, TProject } from './portfolio'
import { Projects } from './Projects'
import { Packages } from './Packages'
import { Hackathons } from './Hackathons'
import styles from './Profile.module.scss'

type TProfileProps = {
  projects: TProject[]
}

export const Profile: FC<TProfileProps> = ({ projects }) => {
  const { profile } = portfolio
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  return (
    <main className={`${styles.wrapper} ${mounted ? styles.mounted : ''}`}>
      <section className={styles.hero} id="hero">
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>● Available for new projects</span>
          <h1 className={styles.heroName}>
            {profile.name.split(' ').map((word, i) => (
              <span
                key={word}
                className={styles.heroWord}
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                {word}
              </span>
            ))}
          </h1>
          <p className={styles.heroRole}>{profile.role}</p>
          <p className={styles.heroBio}>{profile.bio}</p>

          <div className={styles.heroSocial}>
            {profile.social.map((link) => (
              <a
                key={link.label}
                className={styles.socialLink}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
                <span className={styles.arrow}>↗</span>
              </a>
            ))}
          </div>

          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{projects.length}+</span>
              <span className={styles.statLabel}>Projects</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{portfolio.nuget.length}</span>
              <span className={styles.statLabel}>NuGet packages</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>
                {portfolio.pubdev.length}
              </span>
              <span className={styles.statLabel}>pub.dev packages</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>
                {portfolio.hackathons.length}
              </span>
              <span className={styles.statLabel}>Hackathons</span>
            </div>
          </div>

          <div className={styles.scrollHint}>
            <span>Scroll</span>
            <span className={styles.scrollLine} />
          </div>
        </div>
      </section>

      <Projects projects={projects} />

      <Packages
        id="nuget"
        eyebrow="03"
        title="NuGet packages"
        subtitle=".NET libraries published to nuget.org."
        packages={portfolio.nuget}
        icon="nuget"
      />

      <Packages
        id="pubdev"
        eyebrow="04"
        title="pub.dev packages"
        subtitle="Flutter & Dart packages for the community."
        packages={portfolio.pubdev}
        icon="pubdev"
      />

      <Hackathons hackathons={portfolio.hackathons} />

      <footer className={styles.footer}>
        <p>
          © {new Date().getFullYear()} {profile.name} — Built with Next.js &
          Three.js
        </p>
      </footer>
    </main>
  )
}
