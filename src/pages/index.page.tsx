import { FC } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Nav } from 'src/components/layouts'
import { Profile, TProject } from 'src/components/features'

const Scene = dynamic(
  () => import('src/components/features/Scene/Scene').then((m) => m.Scene),
  { ssr: false },
)

type THomeProps = {
  projects: TProject[]
}

export const HomePage: FC<THomeProps> = ({ projects }) => {
  return (
    <>
      <Head>
        <title>Piero Carrion — Software Engineer</title>
        <meta
          name="description"
          content="Piero Carrion — Software Engineer building .NET, Flutter and web products. NuGet & pub.dev packages, hackathons and open source projects."
        />
        <meta
          name="keywords"
          content="Piero Carrion, Software Engineer, .NET, Flutter, Dart, NuGet, pub.dev, Hackathons, Open Source"
        />
        <meta property="og:title" content="Piero Carrion — Software Engineer" />
        <meta
          property="og:description"
          content=".NET, Flutter & web developer. NuGet and pub.dev packages, hackathons and open source."
        />
        <meta property="og:image" content="/og.png" />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#0a0a0f" />
      </Head>

      <Scene />
      <Nav />
      <Profile projects={projects} />
    </>
  )
}

export default HomePage

type TGitHubRepo = {
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  fork: boolean
  topics?: string[]
}

export const getStaticProps: GetStaticProps = async () => {
  const empty: TProject[] = []

  try {
    const res = await fetch(
      'https://api.github.com/users/pierocarrion/repos?per_page=100&sort=updated',
    )

    if (!res.ok) throw new Error('GitHub API error')

    const repos = (await res.json()) as TGitHubRepo[]

    const projects: TProject[] = repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .map((repo) => ({
        name: repo.name,
        description: repo.description ?? 'No description provided.',
        url: repo.html_url,
        language: repo.language ?? 'Code',
        stars: repo.stargazers_count,
        tags: repo.topics ?? [],
      }))

    return {
      props: { projects: projects.length ? projects : empty },
      revalidate: 10080,
    }
  } catch {
    return { props: { projects: empty }, revalidate: 10080 }
  }
}
