export type TLink = {
  label: string
  href: string
}

export type TProject = {
  name: string
  description: string
  url: string
  language?: string
  stars?: number
  tags: string[]
}

export type TPackage = {
  name: string
  description: string
  url: string
  meta: string
}

export type THackathon = {
  name: string
  result: string
  description: string
  year: string
  url?: string
}

export type TPortfolio = {
  profile: {
    name: string
    role: string
    bio: string
    location: string
    avatar: string
    social: TLink[]
  }
  nuget: TPackage[]
  pubdev: TPackage[]
  hackathons: THackathon[]
}

export const portfolio: TPortfolio = {
  profile: {
    name: 'Piero Carrion',
    role: 'Software Engineer · Multiplatform Developer',
    bio: 'I build fast, clean and reliable software across .NET, Flutter, web and cloud. Passionate about developer tooling, open source and shipping products end-to-end.',
    location: 'Peru',
    avatar: 'https://avatars.githubusercontent.com/u/45890948',
    social: [
      { label: 'GitHub', href: 'https://github.com/pierocarrion' },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/pierocarrion/',
      },
      { label: 'NuGet', href: 'https://www.nuget.org/profiles/pierocarrion' },
      { label: 'pub.dev', href: 'https://pub.dev/publishers/pierocarrion.dev' },
    ],
  },
  nuget: [
    {
      name: 'FluentCMS',
      description:
        'Lightweight, extensible content management built on .NET for modern web apps.',
      url: 'https://www.nuget.org/packages/FluentCMS',
      meta: '.NET · C#',
    },
    {
      name: 'ReactCMS',
      description:
        'Headless CMS with a React-friendly API surface and built-in auth.',
      url: 'https://www.nuget.org/packages/ReactCMS',
      meta: '.NET · REST',
    },
    {
      name: 'RepoDB.SQLite',
      description:
        'A lightweight ORM data provider for SQLite built on top of RepoDB.',
      url: 'https://www.nuget.org/packages/RepoDB.SQLite',
      meta: '.NET · ORM',
    },
  ],
  pubdev: [
    {
      name: 'clean_logger',
      description:
        'A beautiful, zero-dependency logging utility for Flutter apps with pretty console output.',
      url: 'https://pub.dev/packages/clean_logger',
      meta: 'Flutter · Dart',
    },
    {
      name: 'clean_network',
      description:
        'A declarative HTTP client wrapper around Dio with interceptors, retries and parsing.',
      url: 'https://pub.dev/packages/clean_network',
      meta: 'Flutter · Dio',
    },
    {
      name: 'clean_repo',
      description:
        'A generic repository pattern abstraction for clean architecture Flutter projects.',
      url: 'https://pub.dev/packages/clean_repo',
      meta: 'Flutter · Architecture',
    },
  ],
  hackathons: [
    {
      name: 'NASA Space Apps Challenge',
      result: 'Global Nominee',
      description:
        'Built an open-data visualization platform for satellite imagery analysis.',
      year: '2022',
      url: 'https://www.spaceappschallenge.org/',
    },
    {
      name: 'Hackathon UNI',
      result: '1st Place',
      description:
        'Real-time logistics optimization engine using graph algorithms.',
      year: '2021',
    },
    {
      name: 'Backend Challenge',
      result: 'Top 3',
      description: 'High-throughput distributed API with .NET and Kubernetes.',
      year: '2023',
    },
  ],
}
