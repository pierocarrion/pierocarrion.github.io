import Link from 'next/link'
import { FC } from 'react'
import { ThemeSwitcher } from '../Theme'
import styles from './Nav.module.scss'

type TItem = {
  title: string
  href: string
}

const items: TItem[] = [
  { title: 'Projects', href: '#projects' },
  { title: 'NuGet', href: '#nuget' },
  { title: 'pub.dev', href: '#pubdev' },
  { title: 'Hackathons', href: '#hackathons' },
]

export const Nav: FC = () => {
  return (
    <nav className={styles.nav}>
      <a className={styles.brand} href="#hero">
        PC.
      </a>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.title} className={styles.item}>
            <Link href={item.href} className={styles.link}>
              {item.title}
            </Link>
          </li>
        ))}
        <li className={styles.item}>
          <ThemeSwitcher className={styles.linkTokens} />
        </li>
      </ul>
    </nav>
  )
}
