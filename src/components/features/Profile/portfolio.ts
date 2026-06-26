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
      {
        label: 'NuGet',
        href: 'https://www.nuget.org/packages/SurrealDb.Net.Linq/',
      },
      { label: 'pub.dev', href: 'https://pub.dev/packages/build_slim' },
    ],
  },
  nuget: [
    {
      name: 'SurrealDb.Net.Linq',
      description:
        'LINQ provider for SurrealDB on .NET — query SurrealDB with strongly-typed, composable LINQ expressions.',
      url: 'https://www.nuget.org/packages/SurrealDb.Net.Linq/',
      meta: '.NET · C# · v1.0.0',
    },
  ],
  pubdev: [
    {
      name: 'build_slim',
      description:
        'CLI tool and library to analyze and reduce the size of Flutter APK, AAB, and IPA build artifacts using best-practice optimizations.',
      url: 'https://pub.dev/packages/build_slim',
      meta: 'Flutter · Dart · v0.4.0',
    },
  ],
  hackathons: [
    {
      name: 'VisualSprint Agent',
      result: 'Project',
      description:
        'Multimodal AI meeting agent that understands audio and screen context to generate evidence-backed decisions, commitments, blockers, and cross-meeting memory.',
      year: '2024',
      url: 'https://github.com/VisualSprint-Labs/visualsprint-agent',
    },
    {
      name: 'AlphaLead AI',
      result: 'Project',
      description:
        'AI-driven lead intelligence platform built with TypeScript.',
      year: '2024',
      url: 'https://github.com/pierocarrion/alphalead-ai',
    },
    {
      name: 'ZeroQ',
      result: 'Project',
      description: 'Zero friction. Zero hardware. Zero quantum risk.',
      year: '2024',
      url: 'https://github.com/pierocarrion/ZeroQ',
    },
    {
      name: 'ProbT',
      result: 'Project',
      description: 'Probabilistic computing experiments and tooling.',
      year: '2023',
      url: 'https://github.com/pierocarrion/ProbT',
    },
  ],
}
