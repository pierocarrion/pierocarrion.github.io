import { FC } from 'react'
import { THackathon } from './portfolio'
import styles from './Profile.module.scss'

type THackathonsProps = {
  hackathons: THackathon[]
}

export const Hackathons: FC<THackathonsProps> = ({ hackathons }) => {
  return (
    <section className={styles.section} id="hackathons">
      <header className={styles.sectionHeader}>
        <span className={styles.eyebrow}>05</span>
        <h2 className={styles.sectionTitle}>Hackathons</h2>
        <p className={styles.sectionSubtitle}>
          Competitions where I shipped under pressure.
        </p>
      </header>

      <ol className={styles.timeline}>
        {hackathons.map((hack) => {
          const inner = (
            <>
              <div className={styles.timelineDot} />
              <div className={styles.timelineContent}>
                <div className={styles.timelineTop}>
                  <h3 className={styles.timelineTitle}>{hack.name}</h3>
                  <span className={styles.timelineYear}>{hack.year}</span>
                </div>
                <span className={styles.badge}>{hack.result}</span>
                <p className={styles.timelineText}>{hack.description}</p>
              </div>
            </>
          )
          return (
            <li key={hack.name} className={styles.timelineItem}>
              {hack.url ? (
                <a
                  className={styles.timelineLink}
                  href={hack.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {inner}
                </a>
              ) : (
                inner
              )}
            </li>
          )
        })}
      </ol>
    </section>
  )
}
