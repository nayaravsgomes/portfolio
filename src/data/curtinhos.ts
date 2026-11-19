// Conteúdo dos modais de Curtinhos, extraído dos PDFs do Figma. **negrito** é renderizado em <strong>.
export type ModalImg = { src: string; w: number; h: number; dw: number; caption?: string | null; bare?: boolean }
export type CurtinhoData = {
  title: string
  subtitle?: string
  layout: 'stack' | 'side'
  sections?: { title: string; paras: string[]; imgs: ModalImg[]; wide: boolean }[]
  img?: ModalImg
  paras?: string[]
  button?: string
  linkKey?: 'jogo' | 'behance'
}
export const curtinhos: Record<string, CurtinhoData> = {
 "consumo": {
  "title": "Tem como vocês mostrarem o consumo?",
  "layout": "stack",
  "sections": [
   {
    "title": "Como era",
    "paras": [
     "A plataforma conta com a aba Overview, que mostra um dashboard com diversas representações de dados de emissão da planta. Entre as exibições estava o breakdown de emissões por fonte, com o valor de consumo do recurso energético no início e o de emissão no fim de uma barra colorida. No entanto, os clientes não entendiam que o valor do início, com menos de destaque, era relativo ao consumo, e pediam com frequência que fosse incluído na tela mesmo após receberem a explicação de que o valor já estava lá."
    ],
    "imgs": [
     {
      "src": "consumo-1.jpg",
      "w": 2732,
      "h": 1572,
      "dw": 903,
      "caption": "Versão anterior da seção de emissões por fonte da página Overview. Dados ilustrativos."
     }
    ],
    "wide": false
   },
   {
    "title": "Como ficou",
    "paras": [
     "Refiz essa parte da tela em formato tabular, com cada valor claramente identificado. Também aproveitei para deixar as colunas redimensionáveis, ajustar a forma de representar os agrupamentos para deixar visualmente mais leve e para aplicar botões de expandir/colapsar todos os grupos, pois alguns agrupamentos podem ter mais de 50 itens.",
     "Desde a mudança, não recebemos mais pedidos para trazer o valor na tela."
    ],
    "imgs": [
     {
      "src": "consumo-2.jpg",
      "w": 2730,
      "h": 1572,
      "dw": 903,
      "caption": "Nova versão da seção de emissões por fonte da página Overview. Dados ilustrativos."
     }
    ],
    "wide": false
   }
  ]
 },
 "quick-access": {
  "title": "Não entendo a página de Quick access, então nem uso",
  "layout": "stack",
  "sections": [
   {
    "title": "Como era",
    "paras": [
     "A página inicial tinha duas abas. A primeira, Quick access, reunia na mesma seção os sistemas favoritos e os mais acessados, com os recentes logo abaixo. A segunda, System tree, mostrava a hierarquia de sistemas em uma tabela. De acordo com o time de projeto e com o Head de produtos, que tinham contato direto com os usuários finais, os clientes achavam o Quick access confuso: não entendiam a diferença entre recentes e favoritos, nem por que os frequentes apareciam junto dos favoritos. Além disso, os favoritos mudavam de lugar conforme o acesso mais recente."
    ],
    "imgs": [
     {
      "src": "quick-access-1.jpg",
      "w": 2892,
      "h": 1572,
      "dw": 665,
      "caption": "Versão anterior da aba Quick access da página inicial"
     },
     {
      "src": "quick-access-2.jpg",
      "w": 2732,
      "h": 1572,
      "dw": 665,
      "caption": "Versão anterior da aba System tree da página inicial"
     }
    ],
    "wide": true
   },
   {
    "title": "Como ficou",
    "paras": [
     "Uni as duas abas, eliminei o conceito de acessos frequentes e mantive apenas favoritos e recentes em um carrossel para atender os dois perfis de uso: quem favorita os sistemas mais usados e quem acessa pelos últimos acessados. Os favoritos agora aparecem em ordem alfabética para que não fiquem mudando de lugar e sejam facilmente localizados.",
     "Coloquei a System tree logo abaixo do carrossel para que a hierarquia completa já apareça na primeira página, pois também havia usuários que sempre iam direto para a árvore."
    ],
    "imgs": [
     {
      "src": "quick-access-3.jpg",
      "w": 2892,
      "h": 1572,
      "dw": 903,
      "caption": "Nova versão da página inicial, com o carrossel de favoritos e recentes e a System tree."
     }
    ],
    "wide": false
   }
  ]
 },
 "jogo": {
  "title": "Que tal um álbum de figurinhas sobre processo siderúrgico?",
  "layout": "side",
  "img": {
   "src": "jogo-1.jpg",
   "w": 1541,
   "h": 943,
   "dw": 1541
  },
  "paras": [
   "Fruto dos estudos sobre siderurgia presentes no meu PDI (Plano de desenvolvimento individual), o **jogo sobre processos siderúrgicos** foi a forma que eu encontrei, como designer, de compartilhar o conhecimento adquirido com o time.",
   "O jogo traz espaços vazios, como os de álbuns de figurinhas, que formam os diferentes processos que podem existir em uma planta siderúrgica. O jogador deve pegar as “figurinhas” de produtos e equipamentos/áreas e “colar” nos espaços que julgar corretos. As “figurinhas” trazem ilustrações e descrições para ajudar o jogador a preencher o jogo. Ao posicionar todas as peças, o jogador valida suas respostas e se houver “figurinhas” em espaços incorretos, elas serão devolvidas para a área para que novas tentativas sejam realizadas até que todas estejam corretas.",
   "Para construir a interatividade do jogo, utilizei o modelo Claude Opus 5.5 no Figma Make."
  ],
  "button": "Ver jogo",
  "linkKey": "jogo"
 },
 "prontuapp": {
  "title": "Usamos etiquetas para gerenciar a aplicação de medicamentos",
  "subtitle": "Projeto desenvolvido em dupla com Joanna Mayr",
  "layout": "side",
  "img": {
   "src": "prontuapp-1.jpg",
   "bare": true,
   "w": 2511,
   "h": 1536,
   "dw": 837
  },
  "paras": [
   "Durante pesquisas para desenvolver um projeto na graduação constatamos que diversos hospitais no país não dispõem de ferramentas que permitam que enfermeiros e técnicos em enfermagem realizem o acompanhamento de seus atendimentos. Para cumprir esse papel, os profissionais recorrem a etiquetas adesivas com nomes dos pacientes e de medicamentos que vão sendo descartadas no decorrer do plantão. Isso resulta em erros de medicação que podem ter graves consequências para os pacientes, além da falta de registro de ações para eventual consulta.",
   "Realizamos entrevistas, criamos personas, identificamos requisitos, desenhamos o fluxo da solução, elaboramos wireframes, construímos um protótipo e realizamos testes de usabilidade com profissionais da área. O resultado foi o **Prontuapp,** um aplicativo projetado para auxiliar profissionais de enfermagem a gerenciar seus atendimentos.",
   "Com ele, o profissional poderia cadastrar informações sobre as medicações e procedimentos a serem aplicados e criar alarmes para que os horários de cada um não sejam perdidos. Além disso, o aplicativo também traria um dicionário de termos para consulta e com a possibilidade de compartilhar informações com colegas."
  ],
  "button": "Ver no Behance",
  "linkKey": "behance"
 }
}

export const curtinhosEn: Record<string, CurtinhoData> = {
 "consumo": {
  "title": "Can you show us the consumption?",
  "layout": "stack",
  "sections": [
   {
    "title": "How it was",
    "paras": [
     "The platform has the Overview tab, which shows a dashboard with several representations of the plant's emission data. Among the displays was the breakdown of emissions by source, with the consumption value of the energy resource at the start and the emission value at the end of a colored bar. However, customers did not understand that the value at the start, with less emphasis, was the consumption, and frequently asked for it to be included on the screen even after being told the value was already there."
    ],
    "imgs": [
     {
      "src": "consumo-1.jpg",
      "w": 2732,
      "h": 1572,
      "dw": 903,
      "caption": "Previous version of the emissions-by-source section of the Overview page. Illustrative data."
     }
    ],
    "wide": false
   },
   {
    "title": "How it turned out",
    "paras": [
     "I redid this part of the screen in a tabular format, with each value clearly identified. I also took the opportunity to make the columns resizable, adjust how groupings are represented to make them visually lighter, and add buttons to expand/collapse all groups, since some groupings can have more than 50 items.",
     "Since the change, we have not received any more requests to show the value on the screen."
    ],
    "imgs": [
     {
      "src": "consumo-2.jpg",
      "w": 2730,
      "h": 1572,
      "dw": 903,
      "caption": "New version of the emissions-by-source section of the Overview page. Illustrative data."
     }
    ],
    "wide": false
   }
  ]
 },
 "quick-access": {
  "title": "I don’t understand the Quick access page, so I don’t use it",
  "layout": "stack",
  "sections": [
   {
    "title": "How it was",
    "paras": [
     "The screen was divided into two tabs: Quick access, with favorites and frequents mixed together and recents below, and the System tree, a table with the systems hierarchy. According to the project team and the Head of Product, who had direct contact with end users, customers found Quick access confusing: they didn’t understand the difference between recents and favorites, nor why frequents appeared together with favorites. In addition, favorites changed position according to the most recent access."
    ],
    "imgs": [
     {
      "src": "quick-access-1.jpg",
      "w": 2892,
      "h": 1572,
      "dw": 665,
      "caption": "Previous version of the Quick access tab of the home page"
     },
     {
      "src": "quick-access-2.jpg",
      "w": 2732,
      "h": 1572,
      "dw": 665,
      "caption": "Previous version of the System tree tab of the home page"
     }
    ],
    "wide": true
   },
   {
    "title": "How it turned out",
    "paras": [
     "I merged the two tabs, eliminated the concept of frequent accesses and kept only favorites and recents in a carousel to serve both usage profiles: those who favorite the most-used systems and those who access through the latest ones. Favorites now appear in alphabetical order so they don’t keep changing position and are easy to find.",
     "I placed the System tree right below the carousel so that the full hierarchy already appears on the first page, since there were also users who always went straight to the tree."
    ],
    "imgs": [
     {
      "src": "quick-access-3.jpg",
      "w": 2892,
      "h": 1572,
      "dw": 903,
      "caption": "New version of the home page, with the favorites and recents carousel and the System tree."
     }
    ],
    "wide": false
   }
  ]
 },
 "jogo": {
  "title": "How about a sticker album about the steelmaking process?",
  "layout": "side",
  "img": {
   "src": "jogo-1.jpg",
   "w": 1541,
   "h": 943,
   "dw": 1541
  },
  "paras": [
   "A result of my steelmaking studies in my IDP (Individual Development Plan), the **game about steelmaking processes** was the way I found, as a designer, to share the knowledge acquired with the team.",
   "The game has empty spaces, like those in sticker albums, which form the different processes that can exist in a steel plant. Players must take the “stickers” of products and equipment/areas and “paste” them into the spaces they think are correct. The “stickers” bring illustrations and descriptions to help players fill in the game. After placing all the pieces, players validate their answers, and if there are “stickers” in wrong spaces, they are returned to the area so that new attempts can be made until all are correct.",
   "To build the game’s interactivity, I used the Claude Opus 5.5 model in Figma Make."
  ],
  "button": "Play the game",
  "linkKey": "jogo"
 },
 "prontuapp": {
  "title": "We use labels to manage medication administration",
  "subtitle": "Project developed as a pair with Joanna Mayr",
  "layout": "side",
  "img": {
   "src": "prontuapp-1.jpg",
   "bare": true,
   "w": 2511,
   "h": 1536,
   "dw": 837
  },
  "paras": [
   "During research to develop an undergraduate project, we found that many hospitals in the country do not have tools that allow nurses and nursing technicians to keep track of their care. To fill that role, professionals resort to adhesive labels with patients’ and medications’ names that get discarded over the course of the shift. This results in medication errors that can have serious consequences for patients, besides the lack of a record of actions for later consultation.",
   "We conducted interviews, created personas, identified requirements, designed the solution flow, created wireframes, built a prototype and ran usability tests with professionals in the field. The result was **Prontuapp,** an app designed to help nursing professionals manage their care.",
   "With it, professionals could register information about the medications and procedures to be administered and set alarms so that the times for each one are not missed. In addition, the app would also bring a dictionary of terms for consultation and the possibility of sharing information with colleagues."
  ],
  "button": "View the full project on Behance",
  "linkKey": "behance"
 }
}
