import { lazy, Suspense, useEffect, useState, type MouseEvent, type ReactNode } from 'react'

// Páginas de case e modais carregam sob demanda (com spinner enquanto o código e os dados chegam)
const CasePage = lazy(() => import('./CasePage'))
const CurtinhoModal = lazy(() => import('./CurtinhoModal'))

const a = `${import.meta.env.BASE_URL}assets`

type Lang = 'PT' | 'EN'

const ui = {
  PT: {
    home: 'Início', about: 'Sobre mim', aboutTitle: 'Sobre mim', expTitle: 'Experiência profissional', eduTitle: 'Formação', back: 'Voltar', prevCase: 'Case anterior', nextCase: 'Próximo case', loading: 'Carregando…', prev: 'Curtinho anterior', next: 'Próximo curtinho', of: 'de', copyEmail: 'Copiar e-mail', copied: 'E-mail copiado!', close: 'Fechar', langsTitle: 'Idiomas', interestsTitle: 'Interesses', cv: 'Baixar currículo', downloading: 'Baixando...',
    heroTitle: 'Olá, eu sou a Nayara e sou product designer',
    heroText: 'Projeto fluxos complexos para produtos digitais, transformando necessidades de usuários e decisões de negócio em soluções simples e viáveis.',
    casesTitle: 'Cases', casesSub: 'Soluções de ponta a ponta desenvolvidas durante a minha trajetória', seeCase: 'Ver case',
    shortsTitle: 'Curtinhos', shortsSub: 'Melhorias rápidas e projetos de estudo', seeMore: 'Ver mais',
    workTitle: 'Como eu trabalho', refsTitle: 'Como é trabalhar comigo',
  },
  EN: {
    home: 'Home', about: 'About me', aboutTitle: 'About me', expTitle: 'Professional experience', eduTitle: 'Education', back: 'Back', prevCase: 'Previous case', nextCase: 'Next case', loading: 'Loading…', prev: 'Previous project', next: 'Next project', of: 'of', copyEmail: 'Copy email', copied: 'Email copied!', close: 'Close', langsTitle: 'Languages', interestsTitle: 'Interests', cv: 'Download résumé', downloading: 'Downloading...',
    heroTitle: "Hi, I'm Nayara and I'm a product designer",
    heroText: 'I design complex flows for digital products, turning user needs and business decisions into simple, viable solutions.',
    casesTitle: 'Cases', casesSub: 'End-to-end solutions developed throughout my career', seeCase: 'View case',
    shortsTitle: 'Quick reads', shortsSub: 'Quick improvements and study projects', seeMore: 'See more',
    workTitle: 'How I work', refsTitle: 'What it is like to work with me',
  },
}

const casesEn = [
  { title: 'Factor hub', text: 'From manual entry to centralized management of multiple emission factor library formats', tag: 'Industry' },
  { title: 'Multiple reporting frameworks', text: 'Setup of all emission sources of an asset hierarchy on a single screen', tag: 'Industry' },
  { title: 'Receivables advance by due date', text: 'From picking installments one by one to selecting them by due date period', tag: 'Fintech' },
]

const shortsEn = [
  { tags: ['REAL CASE'], title: 'I don’t understand the Quick access page, so I don’t use it', text: 'Redesign of the platform home page' },
  { tags: ['REAL CASE'], title: 'Can you show us the consumption?', text: 'Redesign of the detailed values display by carbon emission source' },
  { tags: ['EXERCISE', 'AI'], title: 'Complete a sticker album with what you studied', text: 'Interactive game to practice knowledge about the steel industry' },
  { tags: ['ACADEMIC'], title: 'We use labels to manage medication administration', text: 'App to help nursing professionals manage patient care' },
]

const stepsEn = [
  { title: 'Foundation', text: 'I start from evidence: deep dive into the topic, interviews, customer complaints and competitor analysis, as appropriate.' },
  { title: 'Validation', text: 'I validate designs with stakeholders and developers to ensure a viable solution that meets business goals and user needs.' },
  { title: 'Experimentation', text: 'I consider exploring alternatives essential to test concepts and features, compare ideas and reach the best possible solution.' },
  { title: 'Negotiation', text: 'I negotiate scope with stakeholders and developers, defending my decisions with arguments while also considering new points of view.' },
]

const testimonialsEn: Record<string, { r: string; t: string }> = {
  'Edison Siqueira': { r: 'Head of products', t: 'Nayara is a talented designer who genuinely cares about the impact her solutions have on end users. Besides being friendly, committed, collaborative, creative and competent, she has a real concern for creating value. During the time we worked together, she took the user experience of our products to another level.' },
  'Julliana Guimarães': { r: 'Product owner', t: 'I had the pleasure of working with Nayara for a year on the product team, specifically on Viridis Carbon. Nay proved to be a very competent and committed professional, delivering excellent results throughout the period. She knew the product in depth, was studious and insightful, always proposing very interesting solutions for Carbon. On top of that, she is a kind and great partner. I highly recommend Nay, she will add a lot to any team she joins.' },
  'Taynná Pizarro': { r: 'Design lead', t: `I worked with Nayara for 3 years at Vetta. During that time, I saw her dedication to always delivering the best possible results.

For a long period, she worked without a leader on her product team and, in that interval, became the main reference for business and product knowledge for the team. When a leader arrived, she worked very collaboratively, sharing her knowledge and remaining a reference in product and design.

She is very good at research, which quickly turned into fast learning about the complex context she was in. She used that skill, together with the team, to turn requirements into extremely high-quality deliveries. Always very diligent, she turned the product she worked on into the company's main usability reference.

Nayara is an extremely dedicated professional, and her analytical vision and command of usability had a positive impact on Vetta's design system. Her provocative questions were fundamental to bringing in new components and refreshing the look of our design system, making it more complete and modern.` },
  'Iuri Gama': { r: 'Front-end developer', t: `I could come here and say how smart, hardworking and proactive Nayara is... in short, an excellent professional. But that would be only half the truth.

Working with her means learning from every interaction. It means being at ease knowing that all of her technical decisions were thoroughly weighed and challenged by herself before they ever went public. Sharing the daily routine with Nayara means knowing that, when questioned, she will argue in the most technical and empathetic way possible, never letting anyone leave the table without understanding the concept behind a choice. And there is a rare honesty in all of this: the full certainty that she accepts that, being human, she also makes mistakes, welcoming suggestions that make sense.

I worked by her side for three years and I can assure you that my career as a front-end developer greatly benefited from everything she taught me.

But beyond the unquestionable technical background, there is something about her that has always caught my attention: the team spirit, the real sense of belonging, the delivery and the clarity of someone who sees the whole picture. Nayara takes a stand, commits and is willing to get the locomotive moving. Don’t be fooled by her soft, reserved way of speaking; she becomes a lioness when she needs to represent her team’s ideas and interests. She is never satisfied with little, and a lot only makes sense to her if it is shared.

I wish fate would bring us together again on a project. On an idea that truly has the potential to make a real difference.` },
  'Silvio Góes': { r: 'Back-end developer', t: 'Nayara is one of the most talented professionals I have ever worked with. Her concern with feeling the customer’s pain and delivering something that truly creates value for the product, along with her vision, critical sense and commitment, made her a reference within the team and the company, as well as an extremely approachable, collaborative and sharp person.' },
  'Sofia Aguiar': { r: 'Product designer', t: 'I worked with Nayara for 3 years at Vetta and saw up close how dedicated, careful and rigorous a professional she is. Her deliveries were always impeccable, and she has a very sharp eye for interfaces, componentization and accessibility. On top of that, she is very helpful, and I could always count on her support to think through user flows and different scenarios for the solutions. She is exceptional at what she does and her deliveries reflect that: coherent, consistent screens and well-documented flows. Her ability to connect and talk with the different roles on the team, product owner, developers and QAs, added a lot of value to the product and the team.' },
}
const rolesEn: Record<string, string> = { 'Desenvolvedor front-end': 'Front-end developer', 'Desenvolvedor back-end': 'Back-end developer' }

type Rip = { id: number; x: number; y: number }

function useRipple() {
  const [ripples, setRipples] = useState<Rip[]>([])
  const [popKey, setPopKey] = useState(0)
  const trigger = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const id = Date.now() + Math.random()
    setRipples((p) => [...p, { id, x: e.clientX - r.left, y: e.clientY - r.top }])
    setPopKey((k) => k + 1)
    setTimeout(() => setRipples((p) => p.filter((x) => x.id !== id)), 700)
  }
  const layer = ripples.map((r) => (
    <span key={r.id} className="ripple bg-[#ff87a5]" style={{ left: r.x, top: r.y }} />
  ))
  return { trigger, layer, popKey }
}

function Card({ className = '', children, label, href }: { className?: string; children: ReactNode; label: string; href?: string }) {
  const { trigger, layer, popKey } = useRipple()
  return (
    <article
      tabIndex={0}
      role="link"
      aria-label={label}
      onClick={(e) => {
        trigger(e)
        if (href) window.setTimeout(() => { window.location.hash = href }, 160)
      }}
      onKeyDown={(e) => e.key === 'Enter' && (e.currentTarget as HTMLElement).click()}
      className={`fx-card cursor-pointer select-none bg-white border border-[rgba(0,0,0,0.1)] rounded-[16px] shadow-[0px_6px_12px_0px_#ffe9f5] overflow-hidden relative ${className}`}
    >
      <div key={popKey} className={`contents ${popKey ? 'pop' : ''}`}>{children}</div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px]">{layer}</div>
    </article>
  )
}

const cases = [
  { title: 'Factor hub', text: 'Da digitação manual à gestão centralizada de diversos formatos de bibliotecas de fatores de emissão', tag: 'Indústria', img: `${a}/cover-factor-hub.png`, slug: 'factor-hub' },
  { title: 'Múltiplos frameworks de relatório', text: 'Configuração de todas as fontes de emissão de uma hierarquia de assets em uma única tela', tag: 'Indústria', img: `${a}/cover-frameworks.png`, slug: 'frameworks' },
  { title: 'Antecipação de recebíveis por vencimento', text: 'De selecionar duplicata a duplicata a selecionar de acordo com o período de vencimento', tag: 'Fintech', img: `${a}/cover-antecipacao.png`, slug: 'antecipacao' },
]

const shorts = [
  { tags: ['CASO REAL'], title: 'Não entendo a página Quick access, então nem uso', text: 'Redesign da página inicial da plataforma', img: `${a}/05e67.png`, s: 'w-[max(160.75%,588px)] left-[0.07%] top-0 -translate-y-[10.87%]', slug: 'quick-access' },
  { tags: ['CASO REAL'], title: 'Tem como vocês mostrarem o consumo?', text: 'Redesign da exibição de valores detalhados por fonte de emissão de carbono', img: `${a}/b3fb3.png`, s: 'w-[max(176.77%,647px)] left-[1.76%] top-0 -translate-y-[33.9%]', slug: 'consumo' },
  { tags: ['EXERCÍCIO', 'IA'], title: 'Complete um álbum de figurinhas de acordo com o que você estudou', text: 'Jogo interativo pra exercitar conhecimento sobre a indústria siderúrgica', img: `${a}/53aaf.png`, s: 'w-[max(109.55%,401px)] left-[0.07%] top-0 -translate-y-[14.5%]', slug: 'jogo' },
  { tags: ['ACADÊMICO'], title: 'Usamos etiquetas para gerenciar a aplicação de medicamentos', text: 'Aplicativo para auxiliar profissionais de enfermagem no gerenciamento dos atendimentos', img: `${a}/ab292.png`, s: 'w-[max(100%,366px)] left-0 top-0 -translate-y-[6.7%]', slug: 'prontuapp' },
]

const steps = [
  { icon: `${a}/4d4a8.svg`, title: 'Embasamento', text: 'Parto de evidências: aprofundamento no tema, entrevistas, reclamações de clientes e análise de concorrentes, conforme o caso.' },
  { icon: `${a}/eb0f1.svg`, title: 'Validação', text: 'Valido os desenhos com stakeholders e desenvolvedores para garantir uma solução viável, que atenda aos objetivos do negócio e às necessidades do usuário.' },
  { icon: `${a}/f2e1d.svg`, title: 'Experimentação', text: 'Considero fundamental a exploração de alternativas para testar conceitos e funcionalidades, comparar ideias e chegar à melhor solução possível.' },
  { icon: `${a}/53445.svg`, title: 'Negociação', text: 'Negocio escopo com stakeholders e desenvolvedores, defendo minhas decisões com argumentos assim como também considero novos pontos de vista.', rotate: true },
]

const T3 = `Trabalhei com a Nayara por 3 anos na Vetta. Durante esse tempo, pude observar sua dedicação em sempre realizar as melhores entregas possíveis.

Por um longo período, ela atuou sem uma liderança em seu time de produto e, nesse intervalo, tornou-se a grande referência de conhecimento de negócio e produto para a equipe. Quando uma liderança chegou, trabalhou de maneira muito colaborativa, compartilhando seu conhecimento e continuando como uma referência de produto e design.

Ela tem muita facilidade com pesquisas, o que se converteu em um rápido aprendizado sobre o contexto complexo no qual estava alocada. Utilizou essa habilidade para, junto ao time, transformar requisitos em entregas de altíssima qualidade. Sempre muito aplicada, conseguiu transformar o produto em que trabalhava na principal referência de usabilidade da empresa.

A Nayara é uma profissional extremamente dedicada, e sua visão analítica e domínio de usabilidade impactaram positivamente o design system da Vetta. Seus questionamentos provocativos foram fundamentais para trazer novos componentes e atualizar a cara do nosso design system, deixando-o mais completo e moderno.`

const testimonials = [
  [
    { n: 'Edison Siqueira', li: 'https://www.linkedin.com/in/edisonsiqueira', r: 'Head of products', t: 'A Nayara é uma designer talentosa, com preocupação real quanto ao impacto que a solução gera para os usuários finais. Além de amigável, comprometida, colaborativa, criativa e competente, ela tem uma preocupação genuína em gerar valor. No período que trabalhos juntos, ela elevou a experiência de usuário dos nossos produtos a outro nível.' },
    { n: 'Taynná Pizarro', li: 'https://www.linkedin.com/in/taynnaxavierpizarro', r: 'Design lead', t: T3 },
  ],
  [
    { n: 'Julliana Guimarães', li: 'https://www.linkedin.com/in/jullianaguimaraes', r: 'Product owner', t: 'Tive o prazer de trabalhar com a Nayara durante um ano no time de produtos, especificamente com o Viridis Carbon. A Nay se mostrou uma profissional muito competente, comprometida, tendo realizado excelentes entregas durante o período. Ela conhecia com profundidade o produto, estudiosa e perspicaz sempre propondo soluções bem interessantes para o Carbon. Além disso, é uma pessoa meiga e muito parceira. Recomendo muito a Nay, pois ela vai agregar bastante nas equipes em que atuar.' },
    { n: 'Silvio Góes', li: 'https://www.linkedin.com/in/sgoesmf', r: 'Desenvolvedor back-end', t: 'A Nayara é uma das profissionais mais talentosas que já trabalhei. A sua preocupação em sentir a dor do cliente e entregar algo que de fato gere valor ao produto, sua visão, senso crítico e comprometimento a tornaram uma referência no time e dentro da empresa, além de ser uma pessoa extremamente acessível, colaborativa e sagaz.' },
    { n: 'Sofia Aguiar', li: 'https://www.linkedin.com/in/sofiasousaguiar/', r: 'Product designer', t: 'Trabalhei com a Nayara durante 3 anos na Vetta e vi de perto o quanto ela é uma profissional dedicada, cuidadosa e criteriosa. Suas entregas eram sempre impecáveis e ela tem um olhar muito aguçado para interfaces, componentização e acessibilidade. Além disso, é uma pessoa muito prestativa, e sempre podia contar com seu auxílio para pensar em fluxos de usuário e diferentes cenários para as soluções. Ela é excepcional no que faz e suas entregas refletem isso: telas coerentes, consistentes e fluxos bem documentados. Sua habilidade para conectar e conversar com os diferentes papéis do time, product owner, desenvolvedores e QAs, agregava muito valor para o produto e para a equipe.' },
  ],
  [
    { n: 'Iuri Gama', li: 'https://www.linkedin.com/in/iurigama', r: 'Desenvolvedor front-end', t: `Eu poderia chegar aqui e falar como a Nayara é inteligente, esforçada, proativa... enfim, uma excelente profissional. Mas isso seria apenas meia verdade.

Trabalhar com ela é aprender a cada interação. É estar tranquilo sabendo que todas as suas decisões técnicas foram minuciosamente calculadas e confrontadas por ela mesma antes de virem a público. Compartilhar a rotina com a Nayara é saber que, quando questionada, ela vai argumentar da forma mais técnica e empática possível, sem deixar que ninguém saia da mesa sem compreender o conceito por trás de uma escolha. E há uma honestidade rara nisso tudo: a plena certeza de que ela aceita que, como humana, também comete enganos, acolhendo sugestões que façam sentido.

Trabalhei ao seu lado durante três anos e posso assegurar que minha carreira como desenvolvedor frontend foi profundamente beneficiada por tudo o que ela me ensinou.

Mas, para além da bagagem técnica inquestionável, existe algo nela que sempre me chamou a atenção: o espírito de equipe, o pertencimento real, a entrega e a clareza de quem enxerga o todo. A Nayara se posiciona, se compromete e se dispõe a fazer a locomotiva andar. Não se deixe levar pela fala mansa e contida; ela se torna uma leoa quando precisa representar as ideias e os interesses do seu time. Ela não se contenta com o pouco, e o muito, para ela, só faz sentido se for compartilhado.

Quem dera o destino nos unisse novamente em um projeto. Em alguma ideia que tenha, de fato, o potencial de fazer real diferença.` },
  ],
]

function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img alt="Nayara Gomes" src={`${a}/logo.svg`} className="h-8 w-auto max-w-none object-contain" />
    </div>
  )
}

function DownloadButton({ u, lang }: { u: typeof ui.PT; lang: Lang }) {
  const { trigger, layer, popKey } = useRipple()
  const [done, setDone] = useState(false)
  const file = lang === 'EN' ? 'Nayara_Gomes_Resume.pdf' : 'Curriculo_Nayara_Gomes.pdf'
  return (
    <a
      href={`${import.meta.env.BASE_URL}${file}`}
      download={file}
      onClick={(e) => {
        trigger(e)
        setDone(true)
        setTimeout(() => setDone(false), 1800)
      }}
      className="group relative inline-flex h-[44px] items-center justify-center overflow-hidden cursor-pointer rounded-[24px] bg-black/80 px-4 font-ps tracking-[-0.08px] text-white whitespace-nowrap text-[14px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff87a5]"
    >
      <span key={popKey} className={`relative z-10 inline-flex items-center gap-2 leading-[1.45] ${popKey ? 'pop' : ''}`}>
        {done ? (
          <>
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" /><path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            {u.downloading}
          </>
        ) : (
          <>
            {u.cv}
            <svg className="w-0 -ml-2 opacity-0 transition-all duration-300 group-hover:w-4 group-hover:ml-0 group-hover:opacity-100" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M8 2v9m0 0L4.5 7.5M8 11l3.5-3.5M3 14h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </>
        )}
      </span>
      {layer}
    </a>
  )
}

function LangToggle({ l, setL }: { l: Lang; setL: (l: Lang) => void }) {
  return (
    <div className="flex overflow-clip rounded-[4px] border border-black/80">
      {(['PT', 'EN'] as const).map((x) => (
        <button key={x} onClick={() => setL(x)} className={`w-9 cursor-pointer rounded-[4px] p-2 font-ps text-[14px] transition-colors ${l === x ? 'bg-black/80 text-white' : 'text-black/80 hover:bg-[#ffe9f5]'}`}>{x}</button>
      ))}
    </div>
  )
}

const aboutData = {
  PT: {
    p1: 'Sou uma Product Designer com quase 5 anos de experiência. Natural de Belém, vim para Florianópolis estudar Design na UFSC onde moro até hoje. Após passar por experiências como designer gráfico, comecei minha jornada em product design como estagiária na Cashforce, uma plataforma de antecipação de recebíveis, onde cresci até seguir como Product Designer Júnior. Depois passei três anos na Vetta, desenhando um produto de gestão de emissões para a indústria siderúrgica, como Product Designer pleno.',
    p2: 'Tenho experiência em pegar produtos complexos, cheios de regras e de domínio técnico, e transformá-los em fluxos que as pessoas entendem. Atuo perto de PO, PM, desenvolvimento e QAs, apoiada em pesquisa e testes de usabilidade, e procuro entender o negócio a fundo para defender minhas decisões com argumentos.',
    jobs: [
      { date: 'Set/2023 - Out/2026', name: 'Vetta', role: 'Product designer pleno' },
      { date: 'Mar/2022 - Mai/2023', name: 'Cashforce', role: 'Product designer júnior' },
      { date: 'Set/2021 - Fev/2022', name: 'Cashforce', role: 'Estagiária em product design' },
    ],
    edu: [
      { date: '2018 - 2022', name: 'Universidade Federal de Santa Catarina', role: 'Bacharelado em Design' },
      { date: '2012 - 2017', name: 'Universidade Federal do Pará', role: 'Bacharelado em Biotecnologia' },
      { date: '2014 - 2015', name: 'York University', role: 'Graduação sanduíche' },
    ],
    languages: [{ name: 'Inglês', level: 'Fluente' }],
    interests: [
      { name: 'Chá', text: 'Adoro tomar um blend de chá especial logo de manhã.' },
      { name: 'Gatos', text: 'Me representam e me entendem. Tenho duas gatinhas que são mãe e filha, a Loren e a Donatela.' },
      { name: 'Muay thai', text: 'Apesar de não praticar de maneira consistente, é minha atividade física favorita.' },
      { name: 'Animações', text: 'Sou muito fã de Adventure Time, Avatar e The Amazing World of Gumball.' },
    ],
  },
  EN: {
    p1: "I'm a Product Designer with almost 5 years of experience. Originally from Belém, I moved to Florianópolis to study Design at UFSC, where I still live. After working as a graphic designer, I started my product design journey as an intern at Cashforce, a receivables advance platform, where I grew to Junior Product Designer. I then spent three years at Vetta, designing an emissions management product for the steel industry as a mid-level Product Designer.",
    p2: 'I have experience taking complex products, full of rules and technical domain knowledge, and turning them into flows that people understand. I work closely with POs, PMs, developers and QAs, supported by research and usability testing, and I strive to understand the business in depth so I can defend my decisions with arguments.',
    jobs: [
      { date: 'Sep/2023 - Oct/2026', name: 'Vetta', role: 'Mid-level product designer' },
      { date: 'Mar/2022 - May/2023', name: 'Cashforce', role: 'Junior product designer' },
      { date: 'Sep/2021 - Feb/2022', name: 'Cashforce', role: 'Product design intern' },
    ],
    edu: [
      { date: '2018 - 2022', name: 'Federal University of Santa Catarina', role: "Bachelor's degree in Design" },
      { date: '2012 - 2017', name: 'Federal University of Pará', role: "Bachelor's degree in Biotechnology" },
      { date: '2014 - 2015', name: 'York University', role: 'Exchange program' },
    ],
    languages: [{ name: 'English', level: 'Fluent' }, { name: 'Portuguese', level: 'Native' }],
    interests: [
      { name: 'Tea', text: 'I love having a special tea blend first thing in the morning.' },
      { name: 'Cats', text: 'They represent me and understand me. I have two cats, mother and daughter: Loren and Donatela.' },
      { name: 'Muay thai', text: 'Although I don’t practice consistently, it’s my favorite physical activity.' },
      { name: 'Animation', text: 'I’m a big fan of Adventure Time, Avatar and The Amazing World of Gumball.' },
    ],
  },
}

function About({ lang, u }: { lang: Lang; u: typeof ui.PT }) {
  const d = aboutData[lang]
  const lines = [`${a}/d26a6.svg`, `${a}/d26a6.svg`, `${a}/521da.svg`]
  return (
    <main className="flex w-full flex-col">
      <section className="flex w-full items-center justify-center bg-[linear-gradient(to_bottom,#ffe9f5_88px,#fff_calc(88px_+_(100%_-_88px)_*_0.673))] px-6 pb-16 pt-[calc(88px+4rem)] md:px-16 xl:px-[260px]">
        <div className="flex w-full max-w-[1792px] flex-col-reverse items-center gap-10 lg:flex-row lg:items-start lg:gap-[113px]">
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-8 text-black/80 lg:min-h-[356px]">
            <h2 className="font-ps text-[36px] leading-[1.1] tracking-[-0.72px]">{u.aboutTitle}</h2>
            <div className="flex flex-col gap-4 font-pr text-[14px] leading-[22px] tracking-[-0.07px]">
              <p>{d.p1}</p>
              <p>{d.p2}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center justify-center lg:h-[356px] lg:w-[365px]">
            <img alt="Nayara Gomes" src={`${a}/bc73b.png`} className="h-[302px] w-[299px] rounded-full object-cover" />
          </div>
        </div>
      </section>

      <div className="flex w-full items-start justify-center px-6 pt-16 md:px-16 xl:px-[260px]">
        <div className="flex w-full max-w-[1792px] flex-col">
        <div className="grid w-full grid-cols-1 gap-x-10 gap-y-16 pb-24 lg:grid-cols-2">
          <section className="flex min-w-0 flex-col gap-10">
            <h2 className="font-ps text-[24px] leading-[1.4] tracking-[-0.48px] text-black/80">{u.expTitle}</h2>
            <div className="flex flex-col">
              {d.jobs.map((j, i) => (
                <div key={i} className="flex items-start gap-x-4 gap-y-8">
                  <p className="w-[149px] shrink-0 pt-[2px] text-right font-pr text-[14px] leading-[1.45] tracking-[-0.07px] text-black/55">{j.date}</p>
                  <img alt="" src={lines[i]} className="h-[100px] w-[18px] shrink-0" />
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <p className="font-ps text-[16px] leading-[1.45] tracking-[-0.08px] text-black/80">{j.name}</p>
                    <p className="font-pr text-[14px] leading-[1.45] tracking-[-0.07px] text-black/55">{j.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="flex min-w-0 flex-col gap-10">
            <h2 className="font-ps text-[24px] leading-[1.4] tracking-[-0.48px] text-black/80">{u.eduTitle}</h2>
            <div className="flex flex-col">
              {d.edu.map((j, i) => (
                <div key={i} className="flex h-[100px] items-start gap-4">
                  <p className="w-[89px] shrink-0 font-pr text-[14px] leading-[1.45] tracking-[-0.07px] text-black/55">{j.date}</p>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <p className="font-ps text-[16px] leading-[1.45] tracking-[-0.08px] text-black/80">{j.name}</p>
                    <p className="font-pr text-[14px] leading-[1.45] tracking-[-0.07px] text-black/55">{j.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="grid w-full grid-cols-1 gap-x-10 gap-y-16 pb-24 lg:grid-cols-[1fr_4fr]">
          <section className="flex min-w-0 flex-col gap-10">
            <h2 className="font-ps text-[24px] leading-[1.4] tracking-[-0.48px] text-black/80">{u.langsTitle}</h2>
            <div className="flex flex-col gap-4">
              {d.languages.map((l) => (
                <div key={l.name} className="flex flex-col gap-1">
                  <p className="font-ps text-[16px] leading-[1.45] tracking-[-0.08px] text-black/80">{l.name}</p>
                  <p className="font-pr text-[14px] leading-[1.45] tracking-[-0.07px] text-black/55">{l.level}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="flex min-w-0 flex-col gap-10">
            <h2 className="font-ps text-[24px] leading-[1.4] tracking-[-0.48px] text-black/80">{u.interestsTitle}</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {d.interests.map((it) => (
                <div key={it.name} className="flex flex-col gap-1">
                  <p className="font-ps text-[16px] leading-[1.45] tracking-[-0.08px] text-black/80">{it.name}</p>
                  <p className="font-pr text-[14px] leading-[1.45] tracking-[-0.07px] text-black/55">{it.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        </div>
      </div>
    </main>
  )
}

const caseSlugs: Record<string, true> = { 'factor-hub': true, frameworks: true, antecipacao: true }
const modalSlugs: Record<string, true> = { 'quick-access': true, consumo: true, jogo: true, prontuapp: true }

function Spinner({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <div role="status" aria-live="polite" className="grid min-h-[60vh] place-items-center">
      <svg className={`size-9 animate-spin ${light ? 'text-white' : 'text-[#ff87a5]'}`} viewBox="0 0 36 36" fill="none" aria-hidden>
        <circle cx="18" cy="18" r="14" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
        <path d="M32 18A14 14 0 0 0 18 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  )
}

function CopyEmail({ email, u }: { email: string; u: typeof ui.PT }) {
  const { trigger, layer, popKey } = useRipple()
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) return
    const t = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(t)
  }, [copied])
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = email
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      try { document.execCommand('copy') } finally { document.body.removeChild(ta) }
    }
    setCopied(true)
  }
  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        onClick={(e) => {
          trigger(e)
          copy()
        }}
        title={u.copyEmail}
        aria-label={`${u.copyEmail}: ${email}`}
        className="group relative inline-flex cursor-pointer items-center overflow-hidden rounded-[10px] px-2 py-1 font-pr text-[16px] leading-[1.45] tracking-[-0.09px] text-black/80 transition-colors duration-300 ease-out hover:bg-black/[0.05] focus-visible:bg-black/[0.05] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff87a5]"
      >
        <span className="relative">{email}</span>
        <span
          className={`relative grid h-4 w-0 shrink-0 place-items-center overflow-hidden text-black/55 opacity-0 transition-all duration-300 ease-out group-hover:ml-2 group-hover:w-4 group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:w-4 group-focus-visible:opacity-100 [@media(hover:none)]:ml-2 [@media(hover:none)]:w-4 [@media(hover:none)]:opacity-100 ${copied ? 'ml-2 w-4 text-[#ff87a5] opacity-100' : ''}`}
        >
          {copied ? (
            <svg key={popKey} className="pop" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M3 8.5l3.2 3.2L13 4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><path d="M10.5 3.5v-.5A1.5 1.5 0 009 1.5H3A1.5 1.5 0 001.5 3v6A1.5 1.5 0 003 10.5h.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
          )}
        </span>
        {layer}
      </button>
      <span role="status" aria-live="polite" className={`pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[8px] bg-black/80 px-2.5 py-1 font-pm text-[12px] text-white transition-opacity duration-200 ${copied ? 'opacity-100' : 'opacity-0'}`}>
        {copied ? u.copied : ''}
      </span>
    </span>
  )
}

function Header({ page, slug, u, lang, setLang }: { page: 'home' | 'about' | 'case'; slug: string; u: typeof ui.PT; lang: Lang; setLang: (l: Lang) => void }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => setOpen(false), [page])
  useEffect(() => {
    const el = document.getElementById('app-scroll')
    if (!el) return
    const on = () => setScrolled(el.scrollTop > 2)
    on()
    el.addEventListener('scroll', on, { passive: true })
    return () => el.removeEventListener('scroll', on)
  }, [page])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 840 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])
  const order = ['factor-hub', 'frameworks', 'antecipacao']
  const ci = page === 'case' ? order.indexOf(slug) : -1
  const titles = (lang === 'EN' ? casesEn : cases).map((c) => c.title)
  const prevI = ci > 0 ? ci - 1 : -1
  const nextI = ci >= 0 && ci < order.length - 1 ? ci + 1 : -1
  const caseBtn = 'grid size-9 place-items-center rounded-full text-black/80 transition-colors'
  const caseNav =
    ci >= 0 ? (
      <div role="group" aria-label="Cases" className="flex items-center gap-1">
        {prevI >= 0 ? (
          <a href={`#${order[prevI]}`} title={titles[prevI]} aria-label={`${u.prevCase}: ${titles[prevI]}`} className={`${caseBtn} hover:bg-[#ffe9f5]`}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden><path d="M11 3.5L5.5 9l5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        ) : (
          <span aria-hidden className={`${caseBtn} opacity-30`}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 3.5L5.5 9l5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        )}
        <span className="min-w-[48px] text-center font-pr text-[13px] tracking-[-0.06px] text-black/60">{ci + 1} {u.of} {order.length}</span>
        {nextI >= 0 ? (
          <a href={`#${order[nextI]}`} title={titles[nextI]} aria-label={`${u.nextCase}: ${titles[nextI]}`} className={`${caseBtn} hover:bg-[#ffe9f5]`}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden><path d="M7 3.5L12.5 9 7 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        ) : (
          <span aria-hidden className={`${caseBtn} opacity-30`}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 3.5L12.5 9 7 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        )}
      </div>
    ) : null
  const link = (active: boolean) =>
    `px-1 py-0.5 transition-colors ${active ? 'border-b border-black/80 text-black/80' : 'text-black/60 hover:text-black/90'}`
  const nav = (
    <>
      <a href="#inicio" className={link(page === 'home')}>{u.home}</a>
      <a href="#sobre-mim" className={link(page === 'about')}>{u.about}</a>
    </>
  )
  return (
    <header className={`fixed inset-x-0 top-0 z-40 ${open ? 'bg-[#ffe9f5] min-[840px]:bg-transparent' : ''}`}>
      <div aria-hidden className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(100%+32px)] backdrop-blur-md transition-opacity duration-200 [mask-image:linear-gradient(to_bottom,#000_40%,transparent_85%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_40%,transparent_85%)] ${scrolled ? 'opacity-100' : 'opacity-0'} ${open ? 'max-[839px]:hidden' : ''}`} />
      <div aria-hidden className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(100%+32px)] bg-[linear-gradient(to_bottom,#fff_25%,rgba(255,255,255,0))] transition-opacity duration-200 ${scrolled ? 'opacity-100' : 'opacity-0'} ${open ? 'max-[839px]:hidden' : ''}`} />
      <div className="mx-auto flex h-[88px] w-full max-w-[1792px] items-center justify-between gap-4 px-6 lg:px-16">
        {page === 'case' ? (
          <div className="flex items-center gap-4">
            <a href="#cases" className="inline-flex items-center gap-2 rounded-[24px] border border-black/80 px-4 py-3 font-ps text-[14px] tracking-[-0.08px] text-black/80 transition-colors hover:bg-[#ffe9f5]">
            <span aria-hidden>←</span> {u.back}
          </a>
            <div className="hidden min-[840px]:block">{caseNav}</div>
          </div>
        ) : (
          <a
            href="#inicio"
            aria-label="Nayara Gomes"
            onClick={(e) => {
              if (window.location.hash === '#inicio' || window.location.hash === '') {
                e.preventDefault()
                document.getElementById('app-scroll')?.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
          >
            <Logo />
          </a>
        )}
        <div className="hidden items-center gap-10 min-[840px]:flex">
          {page !== 'case' ? <nav className="flex items-start gap-10 font-pm text-[16px] tracking-[-0.08px]">{nav}</nav> : null}
          <div className="flex items-center gap-8">
            <DownloadButton u={u} lang={lang} />
            <LangToggle l={lang} setL={setLang} />
          </div>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? u.close : 'Menu'}
          aria-expanded={open}
          className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full text-black/80 transition-colors hover:bg-[#ffe9f5] min-[840px]:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
            {open ? (
              <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>
      {open ? (
        <div className="flex max-h-[calc(100vh-88px)] flex-col gap-8 overflow-y-auto border-t border-[#ffd3e8] px-6 pb-8 pt-8 min-[840px]:hidden">
          {ci >= 0 ? (
            <nav aria-label="Cases" onClick={() => setOpen(false)} className="flex flex-col items-start gap-5 font-pm text-[16px] tracking-[-0.08px] text-black/80">
              {prevI >= 0 ? <a href={`#${order[prevI]}`}>← {titles[prevI]}</a> : null}
              {nextI >= 0 ? <a href={`#${order[nextI]}`}>{titles[nextI]} →</a> : null}
            </nav>
          ) : null}
          {page !== 'case' ? (
            <nav onClick={() => setOpen(false)} className="flex flex-col items-start gap-6 font-pm text-[18px] tracking-[-0.09px]">{nav}</nav>
          ) : null}
          <div className="flex items-center gap-4">
            <DownloadButton u={u} lang={lang} />
            <LangToggle l={lang} setL={setLang} />
          </div>
        </div>
      ) : null}
    </header>
  )
}

export default function App() {
  const [lang, setLang] = useState<Lang>('PT')
  const u = ui[lang]
  const en = lang === 'EN'
  const route = () => {
    const h = window.location.hash.replace('#', '')
    if (h === 'sobre-mim') return { page: 'about' as const, slug: '', modal: '' }
    if (h in caseSlugs) return { page: 'case' as const, slug: h, modal: '' }
    if (h in modalSlugs) return { page: 'home' as const, slug: '', modal: h }
    return { page: 'home' as const, slug: '', modal: '' }
  }
  const [{ page, slug, modal }, setRoute] = useState(route)
  useEffect(() => {
    const onHash = () => {
      const r = route()
      setRoute(r)
      const hh = window.location.hash
      if (hh === '#cases' || hh === '#curtinhos') {
        window.setTimeout(() => document.getElementById(hh.slice(1))?.scrollIntoView(), 0)
      } else if (!(hh.slice(1) in modalSlugs)) {
        document.getElementById('app-scroll')?.scrollTo({ top: 0 })
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  useEffect(() => {
    document.documentElement.lang = en ? 'en' : 'pt-BR'
  }, [en])
  return (
    <>
      <Header page={page} slug={slug} u={u} lang={lang} setLang={setLang} />
      <div id="app-scroll" className="fixed inset-0 flex flex-col overflow-y-auto bg-white [&>*]:shrink-0">
      {page === 'case' ? (
        <Suspense fallback={<Spinner label={u.loading} />}>
          <CasePage slug={slug} en={en} />
        </Suspense>
      ) : page === 'about' ? (
        <About lang={lang} u={u} />
      ) : (
      <>
      <section id="inicio" className="flex w-full items-center justify-center bg-[linear-gradient(to_bottom,#ffe9f5_88px,#fff_calc(88px_+_(100%_-_88px)_*_0.673))] px-6 pt-[88px] lg:px-16 lg:h-[556px]">
        <div className="flex w-full max-w-[1792px] flex-col items-center py-16 text-center">
          <div className="flex w-full flex-col items-center gap-6">
            <h2 className="font-ps font-semibold text-[40px] leading-[1.1] tracking-[-0.96px] text-black/80">{u.heroTitle}</h2>
            <p className="max-w-[952px] font-pr text-[16px] leading-[1.45] tracking-[-0.12px] text-black/55">{u.heroText}</p>
          </div>
        </div>
      </section>

      <section id="cases" className="scroll-mt-[88px] flex w-full flex-col items-center gap-x-10 gap-y-6 px-6 py-10 lg:px-16">
        <div className="flex w-full max-w-[1792px] flex-col gap-x-2 gap-y-1">
          <h3 className="font-ps text-[24px] leading-[1.2] tracking-[-0.64px] text-black/80">{u.casesTitle}</h3>
          <p className="font-pr text-[14px] leading-[1.45] tracking-[-0.08px] text-[#737373]">{u.casesSub}</p>
        </div>
        <div className="grid w-full max-w-[1792px] grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cases.map((c0, ci) => {
            const c = en ? { ...c0, ...casesEn[ci] } : c0
            return (
            <Card key={c.title} label={c.title} href={`#${c0.slug}`} className="flex min-h-[526px] flex-col">
              <div className="relative h-[326px] shrink-0 overflow-hidden border-b border-black/10 bg-white">
                <img alt="" src={c.img} className="fx-zoom absolute inset-0 size-full object-contain object-center" />
              </div>
              <div className="relative flex-1 p-6 pb-[68px]">
                <div className="flex flex-col gap-2">
                  <h5 className="font-ps text-[20px] leading-[1.45] tracking-[-0.48px] text-black/80">{c.title}</h5>
                  <p className="font-pr text-[14px] leading-[22px] tracking-[-0.08px] text-black/55">{c.text}</p>
                </div>
                <p className="fx-link absolute bottom-7 left-6 font-inter-medium text-[14px] leading-[1.45] tracking-[-0.09px] text-black/80">{u.seeCase} <span className="fx-arrow">→</span></p>
              </div>
              <div className="fx-tag absolute right-[15px] top-[15px] rounded-[96px] border border-[#ff87a5] bg-[#fff9fc] px-3 py-1 font-pr text-[14px] leading-[1.45] tracking-[-0.09px] text-black/80">{c.tag}</div>
            </Card>
            )
          })}
        </div>
      </section>

      <section id="curtinhos" className="scroll-mt-[88px] flex w-full flex-col items-center gap-x-10 gap-y-6 px-6 py-10 lg:px-16">
        <div className="flex w-full max-w-[1792px] flex-col gap-x-2 gap-y-1">
          <h3 className="font-ps text-[24px] leading-[1.2] tracking-[-0.64px] text-black/80">{u.shortsTitle}</h3>
          <p className="font-pr text-[14px] leading-[1.45] tracking-[-0.08px] text-[#737373]">{u.shortsSub}</p>
        </div>
        <div className="grid w-full max-w-[1792px] grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {shorts.map((s0, si) => {
            const s = en ? { ...s0, ...shortsEn[si] } : s0
            return (
            <Card key={s.title} label={s.title} href={`#${s0.slug}`} className="flex flex-col">
              <div className="flex flex-1 flex-col justify-between gap-4 px-8 pb-6 pt-8">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 font-ps text-[14px] leading-[1.45] tracking-[-0.07px] text-[#ff87a5]">
                    {s.tags.map((t, i) => (
                      <span key={t} className="flex items-center gap-2 text-[12px]">
                        {i > 0 && <img alt="" src={`${a}/ae4bc.svg`} className="size-1" />}
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col gap-3">
                    <h5 className="font-pm text-[18px] leading-[1.2] tracking-[-0.4px] text-black/80">{s.title}</h5>
                    <p className="font-pr text-[14px] leading-[1.45] tracking-[-0.08px] text-black/55">{s.text}</p>
                  </div>
                </div>
                <p className="fx-link font-inter-medium text-[14px] leading-[1.45] tracking-[-0.09px] text-black/80">{u.seeMore} <span className="fx-arrow">→</span></p>
              </div>
              <div className="pointer-events-none relative mx-8 h-[136px] shrink-0 overflow-hidden rounded-t-[28px] border border-b-0 border-black/10 bg-white">
                <img alt="" src={s.img} className={`absolute h-auto max-w-none ${s.s}`} />
              </div>
            </Card>
            )
          })}
        </div>
      </section>

      <section id="sobre" className="flex w-full justify-center px-6 py-20 lg:px-16 lg:py-[120px]">
        <div className="flex w-full max-w-[1792px] flex-col gap-12">
          <h3 className="font-ps text-[24px] leading-[1.2] tracking-[-0.64px] text-black/80">{u.workTitle}</h3>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {steps.map((s0, si) => {
              const s = en ? { ...s0, ...stepsEn[si] } : s0
              return (
              <li key={s.title} className="flex flex-col items-center gap-4 rounded-[16px] bg-[#ffe9f5]/30 p-8">
                <img alt="" src={s.icon} className={`size-8 ${s.rotate ? 'rotate-90' : ''}`} />
                <h5 className="font-ps text-[18px] leading-none tracking-[-0.36px] text-black/80">{s.title}</h5>
                <p className="text-center font-pr text-[14px] leading-[1.5] tracking-[-0.09px] text-black/80">{s.text}</p>
              </li>
            )
            })}
          </ul>
        </div>
      </section>

      <section className="flex w-full flex-col items-center gap-12 px-6 py-12 lg:px-16">
        <h3 className="w-full max-w-[1792px] font-ps text-[24px] leading-[1.2] tracking-[-0.64px] text-black/80">{u.refsTitle}</h3>
        <div className="grid w-full max-w-[1792px] grid-cols-1 items-start gap-6 lg:grid-cols-3">
          {testimonials.map((col, i) => (
            <div key={i} className="flex flex-col gap-6">
              {col.map((t0) => {
                const t = en ? { ...t0, ...(testimonialsEn[t0.n] ?? {}), r: testimonialsEn[t0.n]?.r ?? rolesEn[t0.r] ?? t0.r } : t0
                return (
                <div key={t.n} className="flex flex-col gap-8 overflow-clip rounded-[16px] bg-[#ffe9f5]/30 p-8">
                  <div className="flex items-center gap-4">
                    <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
                      <div className="flex items-center gap-[2px]">
                        <p className={`font-ps leading-[1.5] tracking-[-0.08px] text-black/80 text-[14px]`}>{t.n}</p>
                        {t.li ? (
                          <a href={t.li} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn — ${t.n}`} className="shrink-0 transition-transform hover:scale-110">
                            <img alt="" src={`${a}/bef58.svg`} className="size-6" />
                          </a>
                        ) : (
                          <img alt="" src={`${a}/bef58.svg`} className="size-6" />
                        )}
                      </div>
                      <p className={`font-pm leading-[1.4] tracking-[-0.08px] text-black/55 text-[14px]`}>{t.r}</p>
                    </div>
                    <img alt="" src={`${a}/b9a1f.svg`} className="h-8 w-12" />
                  </div>
                  <p className="whitespace-pre-line font-pr text-[14px] leading-[1.45] tracking-[-0.09px] text-black/80">{t.t}</p>
                </div>
              )
              })}
            </div>
          ))}
        </div>
      </section>

      </>
      )}

      <footer className="mt-24 flex w-full items-center justify-center bg-[linear-gradient(to_bottom,#fff_10.8%,#ffe9f5)] px-6 py-10 lg:px-16">
        <div className="flex w-full max-w-[1792px] flex-wrap items-center justify-center gap-y-3">
          <CopyEmail email="nayaravsgomes@gmail.com" u={u} />
          <img alt="" src={`${a}/12cfd.svg`} className="mx-2 size-1" />
          <a href="https://www.linkedin.com/in/nayara-gomes-design" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="ml-2 size-5 transition-transform hover:scale-110">
            <img alt="" src={`${a}/f28c0.svg`} className="size-5" />
          </a>
        </div>
      </footer>
      </div>
      {modal ? (
        <Suspense fallback={<div className="fixed inset-0 z-50 grid place-items-center bg-black/40"><Spinner label={u.loading} light /></div>}>
          <CurtinhoModal slug={modal} onClose={() => { window.location.hash = '#curtinhos' }} onNavigate={(sl) => { window.location.hash = `#${sl}` }} en={en} labels={{ close: u.close, prev: u.prev, next: u.next, of: u.of }} />
        </Suspense>
      ) : null}
    </>
  )
}
