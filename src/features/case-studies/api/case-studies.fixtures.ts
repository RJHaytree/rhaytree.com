import type { z } from 'zod'

import type { caseStudySchema } from '../types/case-study'

/**
 * Dev-only fixture data. Fictional examples for local development and
 * design work; never shipped to production (see case-studies.ts).
 */
export const caseStudyFixtures: Array<z.input<typeof caseStudySchema>> = [
  {
    slug: 'self-service-provisioning',
    title: 'Self-service cloud provisioning platform',
    summary:
      '[Fixture] An internal tool that let product teams provision AWS environments and deploy services without waiting on an ops ticket.',
    featured: true,
    context: '[Fixture] A UK software company with around 40 engineers.',
    problem:
      'Each new client environment took several days of manual AWS setup, and every team deployed in a slightly different way.',
    role: 'Lead engineer and architect, working with two developers and the operations lead.',
    approach: [
      'Mapped the existing manual steps into a single provisioning flow covering Lightsail for small workloads and EC2 for larger ones.',
      'Built reusable Terraform modules so every environment started from the same hardened baseline.',
      'Defined a standard deployment flow that teams could adopt one service at a time.',
    ],
    outcome:
      'Environment setup went from days to under an hour, and deployments became consistent across teams.',
    stack: [
      'AWS EC2',
      'AWS Lightsail',
      'Terraform',
      'TypeScript',
      'GitHub Actions',
    ],
  },
  {
    slug: 'multi-system-cloud-migration',
    title: 'Planning a multi-system cloud migration',
    summary:
      '[Fixture] Architecture and delivery plan for moving several interdependent systems to the cloud without a big-bang cutover.',
    featured: true,
    context:
      '[Fixture] A logistics business running five interconnected services.',
    problem:
      'The systems shared a database and deployment schedule, so no single service could move without risking the others.',
    role: 'Architect responsible for the target design and the migration plan.',
    approach: [
      'Documented the real dependencies between services and drew the target architecture.',
      'Split the migration into stages, each with a rollback point.',
      'Introduced integration contracts so services could move independently.',
    ],
    outcome:
      'The migration ran in stages with no unplanned downtime, and the services can now be deployed independently.',
    stack: ['AWS', 'Terraform', 'Docker', 'PostgreSQL'],
  },
  {
    slug: 'infrastructure-security-audit',
    title: 'Infrastructure security audit',
    summary:
      '[Fixture] A review of an existing cloud estate for vulnerabilities, with a prioritised plan to fix them.',
    featured: false,
    context: '[Fixture] A SaaS product with a long-lived AWS account.',
    problem:
      'The account had grown over several years with no consistent security baseline, and nobody had a full picture of its exposure.',
    role: 'Sole auditor, presenting findings to the engineering lead.',
    approach: [
      'Inventoried resources and compared them against a security baseline.',
      'Ranked findings by exposure and effort to fix.',
      'Turned the highest-priority fixes into Terraform changes so they stay fixed.',
    ],
    outcome:
      'The most serious issues were fixed within a fortnight, and the baseline now runs as part of every infrastructure change.',
    stack: ['AWS IAM', 'Terraform', 'AWS Security Hub'],
  },
]
