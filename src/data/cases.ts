// Conteúdo dos cases, extraído dos PDFs do Figma (Factor_Hub, Múltiplos_frameworks, Antecipação_de_recebíveis).
// Subscritos aparecem como ₂ e são renderizados como <sub>2</sub>.
export type CaseImg = { src: string; w: number; h: number; dw: number; caption?: string | null; bare?: boolean; gif?: string }
export type CaseBlock =
  | { t: 'p'; text: string }
  | { t: 'h3'; text: string }
  | { t: 'split'; paras: string[]; img: CaseImg | null; caption: string | null }
  | { t: 'cards'; items: { title: string; text: string }[] }
  | { t: 'checks'; items: string[] }
  | { t: 'table'; head: string[]; rows: string[][] }
  | { t: 'figs'; items: CaseImg[]; caption?: string | null }
  | { t: 'solution'; items: { title: string; paras: string[]; imgs: CaseImg[] }[] }
  | { t: 'results'; items: { title: string; text: string }[] }
export type CaseData = {
  key: string
  eyebrow: [string, string]
  title: string
  intro: string
  cover: string
  sections: { title: string; blocks: CaseBlock[] }[]
}

export const caseData: Record<string, CaseData> = {
 "factor-hub": {
  "key": "factor-hub",
  "eyebrow": [
   "VETTA",
   "VIRIDIS CARBON: GERENCIAMENTO DE EMISSÕES DE CARBONO"
  ],
  "title": "Factor hub",
  "intro": "Para implementar um projeto em um novo cliente, os engenheiros cadastravam cada fator de emissão à mão, digitando valores com muitos algarismos, em um processo lento e sujeito a erros. Projetei com o Head de produtos o Factor Hub, uma biblioteca centralizada de fatores em que o usuário seleciona em vez de digitar. Ao longo do projeto, resolvi o desafio de acomodar bibliotecas em formatos diferentes e propus o Usage map, funcionalidade que mostra onde cada fator está sendo usado.",
  "cover": "factor-hub-cover.png",
  "sections": [
   {
    "title": "Contexto",
    "blocks": [
     {
      "t": "p",
      "text": "O Viridis Carbon é um produto que auxilia plantas siderúrgicas no gerenciamento de suas emissões. Os fatores de emissão são os valores usados para calcular as emissões de cada fonte com base no consumo de recursos energéticos."
     },
     {
      "t": "p",
      "text": "O valor de emissão de uma fonte é a soma, para cada gás de efeito estufa (GEE, ou GHG em inglês), do consumo multiplicado pelo fator de emissão desse gás e pelo seu GWP (Global Warming Potential, o potencial de aquecimento global). O resultado é expresso em CO₂ equivalente (CO₂e)."
     }
    ]
   },
   {
    "title": "Problema",
    "blocks": [
     {
      "t": "split",
      "paras": [
       "Cada parcela (o valor de cada GHG dentro do fator) precisava ser cadastrada manualmente nas fontes de emissão. Além de demorado, exigia atenção constante a valores com muitos algarismos, e qualquer erro afetava o cálculo. Isso alongava a implementação do produto nos clientes e dificultava a atualização anual dos fatores.",
       "Outra questão era quanto ao formato de valores aceitos. Nosso fluxo só aceitava valores de GHGs individuais e não-convertidos, pois o sistema obrigatoriamente multiplicava o valor inserido por GWP, porém há bibliotecas que fornecem o valor já convertido. Nesses casos, os engenheiros precisavam desconverter o valor para poder utilizá-lo no sistema."
      ],
      "img": {
       "src": "factor-hub-01.jpg",
       "w": 2732,
       "h": 1572,
       "dw": 902
      },
      "caption": "Antes: cada fator era digitado manualmente em cada fonte de emissão, para cada GHG."
     }
    ]
   },
   {
    "title": "Pesquisa e preparação",
    "blocks": [
     {
      "t": "cards",
      "items": [
       {
        "title": "Análise de similares",
        "text": "Grande parte dos concorrentes como Microsoft Sustainability Manager e NetZero já utilizavam bibliotecas para gerir os fatores de emissão aplicados e para facilitar o acesso a valores de fontes oficiais."
       },
       {
        "title": "Pesquisa sobre formatos de bibliotecas",
        "text": "Fiz uma varredura sobre os formatos de biblioteca disponíveis atualmente e constatei que existem três formas em que os dados são disponibilizados: Somados e convertidos em CO₂e, separados e convertidos em CO₂e e separados e não-convertidos."
       },
       {
        "title": "Entrevista com especialista",
        "text": "Foi feita uma entrevista com a engenheira responsável pela implementação do sistema em que identifiquei que o cadastro de fatores de emissão era uma de suas principais dificuldades durante a configuração das fontes de emissão."
       },
       {
        "title": "Alinhamento com o Head de produtos",
        "text": "Conversamos sobre a possibilidade de priorizar a reestruturação do gerenciamento de fatores de emissão no roadmap em detrimento de outras entregas para ter maior velocidade de configuração e segurança no uso dos valores."
       }
      ]
     }
    ]
   },
   {
    "title": "Requisitos",
    "blocks": [
     {
      "t": "p",
      "text": "Após a etapa de preparação, foram levantados os seguintes requisitos:"
     },
     {
      "t": "checks",
      "items": [
       "Centralizar gestão de fatores em um só local",
       "Incluir bibliotecas de diferentes tipos (bases públicas, privadas, dados mensurados)",
       "Incluir dados completos sobre bibliotecas e seus fatores (não apenas valor e origem do dado)",
       "Aceitar diversos formatos de bases de dados para ter flexibilidade",
       "Manter padrão do design system já existente"
      ]
     }
    ]
   },
   {
    "title": "Decisões",
    "blocks": [
     {
      "t": "h3",
      "text": "1. A arquitetura de informação"
     },
     {
      "t": "p",
      "text": "Eu e o Head de produtos propusemos uma hierarquia: o Factor Hub reúne várias bibliotecas (bases de dados de fatores, como a DEFRA), cada biblioteca tem coleções (divisões internas, como Fuels dentro da DEFRA), e as coleções contêm os fatores. Na primeira versão, o hub já viria com bibliotecas públicas cadastradas e permitiria importar planilhas ou cadastrar manualmente, de modo que o usuário também pudesse criar as suas próprias bibliotecas."
     },
     {
      "t": "figs",
      "items": [
       {
        "src": "factor-hub-02.png",
        "w": 4480,
        "h": 2272,
        "dw": 792,
        "caption": "Estrutura do factor hub"
       },
       {
        "src": "factor-hub-03.png",
        "w": 1316,
        "h": 960,
        "dw": 525,
        "caption": "Rascunho inicial do Factor Hub"
       }
      ],
      "caption": null
     },
     {
      "t": "h3",
      "text": "2. Normalizar bibliotecas de formatos diferentes"
     },
     {
      "t": "p",
      "text": "As bibliotecas chegam em formatos distintos, mas, ao configurar uma fonte de emissão, o usuário precisa ver sempre um único valor para selecionar. Fui responsável por definir uma regra: a seleção mostra sempre o valor já convertido e agregado de todos os GHGs (gases do efeito estufa). O sistema faz a conta conforme o formato da biblioteca. O GWP, o potencial de aquecimento global, é o fator que converte cada gás em CO₂ equivalente. A adequação também foi implementada no banco de dados do sistema."
     },
     {
      "t": "table",
      "head": [
       "Formato da biblioteca",
       "O que o sistema faz",
       "Seleção parcial de GHGs"
      ],
      "rows": [
       [
        "GHGs separados, não convertidos",
        "Multiplica cada GHG pelo GWP e soma",
        "Sim"
       ],
       [
        "GHGs separados, já convertidos",
        "Soma",
        "Sim"
       ],
       [
        "Valor já convertido e agregado, sem detalhe por GHG",
        "Exibe o valor cheio",
        "Não, pois a biblioteca não fornece esse dado"
       ]
      ]
     },
     {
      "t": "h3",
      "text": "3. Usage map"
     },
     {
      "t": "p",
      "text": "Na entrevista, percebi que um grande problema era não ter uma visão global de como os fatores estavam sendo aplicados. Propus o Usage map: a tabela de fatores ganhou uma coluna com o número de usos e um botão para abrir o mapa. Ele é exibido em árvore, com cada sistema de carbono e as suas fontes de emissão seguindo a hierarquia, de modo que o usuário vê exatamente onde cada fator está aplicado."
     },
     {
      "t": "h3",
      "text": "4. Melhoria do componente de tabela"
     },
     {
      "t": "p",
      "text": "O formato estático da tabela anterior precisava ser adaptado para comportar a grande quantidade de informações relativas a cada fator de emissão. Consultei o desenvolvedor sênior da equipe quanto à possibilidade de ajustar o componente de tabela para inserir rolagem horizontal, fixando a última coluna. Essa medida seria fundamental para preparar o componente para utilização em outras etapas do fluxo, como a seleção dos fatores nas fontes de emissão."
     }
    ]
   },
   {
    "title": "Validação e adaptação",
    "blocks": [
     {
      "t": "p",
      "text": "Antes de seguir para o desenvolvimento, validei o formato com a engenheira do time de projeto. Na versão inicial, o usuário só podia selecionar o valor agregado de todos os GHGs. Ela apontou que, dependendo da metodologia do cliente, usar apenas o CO₂ é válido, como era o caso do cliente atual. Partindo desse ponto e com o aval do Head de produtos, adaptei a solução: o fator é cadastrado completo e, ao selecioná-lo em uma fonte de emissão, o usuário escolhe apenas os GHGs de interesse."
     }
    ]
   },
   {
    "title": "Solução",
    "blocks": [
     {
      "t": "solution",
      "items": [
       {
        "title": "1. Factor hub",
        "paras": [
         "A página “Factor hub” reúne todas as bibliotecas de fatores utilizadas para os cálculos de emissão. Todas as configurações relativas aos fatores e suas origens são feitas aqui.",
         "Durante o cadastro de uma biblioteca, o usuário pode definir o formato dos valores contidos nela para que o sistema possa aplicar o método adequado e gerar o valor normalizado para seleção em fontes de emissão. Dessa forma, qualquer formato de biblioteca existente atualmente pode ser importado para o sistema.",
         "O sistema já vem alimentado com bibliotecas públicas, mas o usuário poderia importar bibliotecas com outros tipos de licença."
        ],
        "imgs": [
         {
          "src": "factor-hub-04.jpg",
          "w": 2732,
          "h": 1572,
          "dw": 941
         }
        ]
       },
       {
        "title": "2. Coleções",
        "paras": [
         "As coleções replicam a organização presente nas bibliotecas, que frequentemente dividem seus fatores de acordo com o tipo de recurso energético.",
         "É por meio dessa página que o usuário pode importar coleções e fatores utilizando planilhas. O modelo de planilha necessário para importação varia de acordo com o formato da biblioteca."
        ],
        "imgs": [
         {
          "src": "factor-hub-05.jpg",
          "w": 2732,
          "h": 1572,
          "dw": 940
         }
        ]
       },
       {
        "title": "3. Tabela de fatores de emissão",
        "paras": [
         "Entrando em uma coleção, podemos ver os fatores de emissão organizados em uma tabela com suas informações disponíveis de forma detalhada. Essas informações são importantes na hora de selecionar qual fator é mais apropriado para aplicar a uma fonte de emissão. Em uma versão futura, planeja-se utilizar essas informações para seleção automática."
        ],
        "imgs": [
         {
          "src": "factor-hub-06.jpg",
          "w": 2732,
          "h": 1572,
          "dw": 941
         }
        ]
       },
       {
        "title": "4. Diferentes formatos de valores",
        "paras": [
         "Ao inserir dados de fatores manualmente, o usuário tem acesso às três formas de valores encontradas no mercado atualmente.",
         "O formulário varia de acordo com o formato de base de dados selecionado no cadastro da biblioteca, podendo ser agregado e convertido, separados por GHG e convertidos e separados por GHG e não-convertidos.",
         "No fim, o valor selecionável é sempre um valor agregado e convertido."
        ],
        "imgs": [
         {
          "src": "factor-hub-07.png",
          "w": 1784,
          "h": 835,
          "dw": 1038,
          "bare": true
         }
        ]
       },
       {
        "title": "5. Usage map",
        "paras": [
         "Com o Usage map, o usuário pode visualizar exatamente como um fator é aplicado na árvore de sistemas (áreas e equipamentos de uma planta industrial). O mapa mostra em qual sistema e framework um fator está sendo utilizado, além de mostrar quais GHGs estão selecionados (no caso de bibliotecas com valores não agregados).",
         "Também foi incluído um botão para que o usuário possa ir diretamente para a página de configuração da fonte de emissão caso seja necessário algum ajuste."
        ],
        "imgs": [
         {
          "src": "factor-hub-08.jpg",
          "w": 2732,
          "h": 1564,
          "dw": 943
         }
        ]
       },
       {
        "title": "6. Seleção dos fatores",
        "paras": [
         "Com a inserção de fatores centralizada no Factor Hub, cabe ao usuário apenas selecionar o fator mais adequado para o cálculo de emissão em cada fonte.",
         "Para manter a flexibilidade já presente no fluxo anterior, adaptei a solução para permitir que o usuário selecione quais parcelas de um fator (não-agregado) ele deseja utilizar."
        ],
        "imgs": [
         {
          "src": "factor-hub-09.jpg",
          "w": 2732,
          "h": 1564,
          "dw": 937
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "title": "Resultado",
    "blocks": [
     {
      "t": "results",
      "items": [
       {
        "title": "O que mudou",
        "text": "O cadastro manual, fator a fator, foi substituído por seleção em uma biblioteca centralizada, adaptável a vários formatos e com visão global de uso."
       },
       {
        "title": "Impacto esperado",
        "text": "Redução no tempo de implementação devido ao rápido acesso a fatores confiáveis e menos erros de configuração com o Usage map permitindo visualizar facilmente quais e como os fatores estão sendo utilizados nas fontes de emissão."
       }
      ]
     }
    ]
   }
  ]
 },
 "frameworks": {
  "key": "frameworks",
  "eyebrow": [
   "VETTA",
   "VIRIDIS CARBON: GERENCIAMENTO DE EMISSÕES DE CARBONO"
  ],
  "title": "Múltiplos frameworks de relatório",
  "intro": "A cada novo framework de relatório, o time de projeto duplicava toda a árvore de sistemas de carbono e recadastrava centenas de fontes de emissão. Projetei com o Head de produtos uma nova estrutura em que a árvore é criada uma única vez e cada framework é ativado sobre ela, com todas as fontes configuradas em uma única tela. A solução exigiu mudar o componente de tabela, e defendi essa mudança diante do prazo e esforço de desenvolvimento.",
  "cover": "frameworks-cover.png",
  "sections": [
   {
    "title": "Contexto",
    "blocks": [
     {
      "t": "p",
      "text": "O Viridis Carbon é um produto que auxilia plantas siderúrgicas a gerenciarem e a reportarem suas emissões. Os valores de emissão incluídos nos gráficos e nos relatórios são calculados de acordo com os parâmetros de cada framework de relatório, que determinam quais sistemas (áreas e os equipamentos de uma planta industrial, organizados em uma árvore), categorias de fontes de emissão e fatores devem ser utilizados para gerar os dados."
     },
     {
      "t": "p",
      "text": "Inicialmente, o Viridis Carbon comportava apenas o GHG protocol - o framework mais completo - que abrange as emissões diretas de fontes próprias ou controladas pela empresa, as emissões indiretas da energia que ela compra e todas as demais emissões indiretas ao longo da cadeia de valor de um produto. No entanto, clientes tiveram a necessidade de gerar valores seguindo novos frameworks de relatório, como LESS e CBAM, que consideram apenas parte dos sistemas de carbono e categorias de fontes de emissão incluídos no GHG protocol, e que utilizam diferentes fatores nos cálculos de seus dados de emissão."
     }
    ]
   },
   {
    "title": "Problema",
    "blocks": [
     {
      "t": "split",
      "paras": [
       "Com a estrutura anterior da plataforma, a saída que o time de projeto encontrou para implementar novos frameworks nos clientes foi duplicar a árvore de sistemas de carbono e cadastrar as fontes de emissão de cada sistema, o que resultava em centenas de novos cadastros. Era um trabalho repetitivo, demorado e sujeito a erros, que crescia a cada framework adicionado."
      ],
      "img": {
       "src": "frameworks-01.jpg",
       "w": 2732,
       "h": 1424,
       "dw": 902
      },
      "caption": "Árvore de sistemas duplicada com “LESS” adicionado ao nome para diferenciar dos sistemas configurados para GHG protocol. Dados ilustrativos."
     }
    ]
   },
   {
    "title": "Pesquisa e preparação",
    "blocks": [
     {
      "t": "cards",
      "items": [
       {
        "title": "Requisito do Head de produtos",
        "text": "O ideal seria configurar todas as fontes de emissão de todos os sistemas, em todos os frameworks, em uma mesma tela. Além disso, a ativação de frameworks deveria ser feita apenas no nível do sistema pai para evitar possíveis erros de configuração em sistemas filhos que seriam difíceis de localizar."
       },
       {
        "title": "Análise de similares",
        "text": "Foi realizado um estudo sobre o cadastro de fontes de emissão em plataformas como Microsoft Sustainability Manager, NetZero e Carbon Alt Delete. Em todos, o cadastro de cada fonte ocorre em páginas separadas, mas no caso da Microsoft já havia o conceito de cadastrar fatores para diferentes frameworks de relatório em uma só fonte."
       },
       {
        "title": "Entrevista com especialista",
        "text": "Foi realizada uma entrevista com a engenheira responsável pela implementação do sistema nas plantas para entender como a jornada antiga funcionava e assim identificar possíveis pontos de melhoria. A principal dor era ter uma forma de verificar se havia fontes sem fatores configurados."
       }
      ]
     }
    ]
   },
   {
    "title": "Requisitos",
    "blocks": [
     {
      "t": "p",
      "text": "Após a etapa de preparação, foram levantados os seguintes requisitos:"
     },
     {
      "t": "checks",
      "items": [
       "Configurar todas as fontes de emissão de todos frameworks de relatórios e de toda a árvore de sistemas a partir de uma mesma página",
       "Limitar a configuração do framework de relatório apenas aos sistemas pais para garantir consistência na configuração",
       "Exibir uma indicação sobre quais fontes de emissão estão sem fatores",
       "Seguir padrão do design system no caso de haver novos componentes"
      ]
     }
    ]
   },
   {
    "title": "Decisões",
    "blocks": [
     {
      "t": "h3",
      "text": "1. Nova tela de fontes de emissão usando hierarquia da informação"
     },
     {
      "t": "p",
      "text": "Para conseguir fazer a configuração para todos os frameworks e sistemas, primeiramente considerei utilizar campos de select para selecionar cada framework e sistema pois aproveitaria um padrão já bastante utilizado na plataforma, o que traria familiaridade ao usuário. No entanto, descartei por dificultar a alternância entre frameworks durante a configuração e por ocultar a estrutura da árvore de sistemas, que ficaria visível apenas enquanto o dropdown do campo estivesse ativo. A minha segunda alternativa foi utilizar da hierarquia do espaço, posicionando tabs e elementos de tree para que um influencie o outro na ordem correta (Frameworks > Sistemas > Fontes/Fatores) e possibilitando a visualização de qual framework e sistema está sendo configurado de forma simultânea e com bom aproveitamento de espaço. Optei por seguir com a segunda alternativa, cuja versão final pode ser vista na seção Solução."
     },
     {
      "t": "figs",
      "items": [
       {
        "src": "frameworks-02.jpg",
        "w": 2732,
        "h": 1572,
        "dw": 638
       },
       {
        "src": "frameworks-03.jpg",
        "w": 2728,
        "h": 1572,
        "dw": 637
       }
      ],
      "caption": "Alternativas de layout para a nova página de sources."
     },
     {
      "t": "h3",
      "text": "2. Separação entre consumo e fatores de emissão"
     },
     {
      "t": "p",
      "text": "Durante a análise de similares, achei interessante como o produto da Microsoft utilizava um editor de fluxos para o cadastro de dados da fonte de emissão. O que chamou mais atenção foi que a parte de dados de consumo era separada das configurações de relatório, o que incluía os fatores. Esse formato permitia que, a partir de uma mesma entrada de dados de consumo, fosse possível ter várias saídas de dados de emissão. Seguindo esse conceito, trouxe para a minha solução a separação entre as duas seções, cadastrando a métrica de consumo em um formulário e os fatores em outro momento. Assim, quando um novo framework fosse criado, o time de projeto teria que apenas adicionar o fator relativo ao novo framework."
     },
     {
      "t": "figs",
      "items": [
       {
        "src": "frameworks-04.png",
        "w": 3892,
        "h": 2034,
        "dw": 844,
        "caption": "Tela de configuração de fonte de emissão do Microsoft Sustainability Manager com editor de fluxos."
       }
      ],
      "caption": null
     },
     {
      "t": "h3",
      "text": "3. Tabela com subtabela para os fatores"
     },
     {
      "t": "p",
      "text": "Para conseguir implementar a separação entre consumo e fatores de emissão de modo que os fatores pudessem ser configurados e visualizados na mesma tela, propus que cada linha da tabela pudesse abrir para revelar uma subtabela, com suas próprias colunas e ações, além de linhas editáveis. As subtabelas trariam os dados dos fatores cadastrados, que variam de acordo com o framework selecionado, enquanto os dados da fonte (consumo) se mantém."
     },
     {
      "t": "p",
      "text": "Esta proposta precisou ser defendida diante do esforço para ajustar o componente de tabela, cuja complexidade poderia ameaçar o prazo de entrega caso precisasse de refatoração. Argumentei com o desenvolvedor sênior da equipe que a mudança seria necessária para atender ao requisito estabelecido pelo Head de produtos e que o ajuste poderia ser reaproveitado em outras funcionalidades do sistema, já que abria diversas possibilidades de aplicação. Ele concordou e buscou uma maneira mais eficiente de implementar as subtabelas sem precisar refazer o componente inteiro, o que levou a uma flexibilização apenas nas linhas para que pudesse renderizar qualquer item dentro delas, inclusive outra tabela."
     },
     {
      "t": "p",
      "text": "Sendo um novo padrão para o componente de tabela, precisei fazer alternativas para determinar a versão com melhor usabilidade e assim decidir entre dois modelos: um mais limpo, com menos linhas e marcadores na cor principal, e outro similar à tabela já existente."
     },
     {
      "t": "figs",
      "items": [
       {
        "src": "frameworks-05.png",
        "w": 2732,
        "h": 1400,
        "dw": 634
       },
       {
        "src": "frameworks-06.png",
        "w": 2732,
        "h": 1400,
        "dw": 634
       }
      ],
      "caption": "Alternativas para subtabelas de fatores de emissão."
     }
    ]
   },
   {
    "title": "Validação e adaptação",
    "blocks": [
     {
      "t": "p",
      "text": "Para embasar a decisão da seleção da subtabela, fiz um teste no Lyssna com 10 pessoas da equipe interna, comparando os dois modelos visuais. Eu queria saber se as pessoas entenderiam que a tarefa seria feita dentro da subtabela e qual modelo preferiam. Para isso, criei um teste com tarefas a cumprir nos protótipos dos dois modelos e um teste de preferência para que pudessem comparar os dois lado a lado após cumprir as tarefas."
     },
     {
      "t": "figs",
      "items": [
       {
        "src": "frameworks-07.jpg",
        "w": 1910,
        "h": 916,
        "dw": 934,
        "caption": "Teste para cumprir uma tarefa genérica nos dois modelos de subtabela.",
        "gif": "frameworks-lyssna.gif"
       }
      ],
      "caption": null
     },
     {
      "t": "p",
      "text": "Todos os 10 concluíram a tarefa. Minha hipótese era que o modelo limpo ganharia, mas a equipe preferiu o modelo igual à tabela existente, e alguns comentaram que era mais fácil de entender. Segui com o modelo 2, mais próximo do padrão já conhecido. O teste interno foi proposto como um formato de validação assíncrona que poderia ser expandida para outros projetos e feita com pessoas internas e clientes finais. Após a seleção da tabela, a proposta foi finalizada e validada com a engenheira responsável pela implementação, que compreendeu e aprovou o novo fluxo."
     },
     {
      "t": "figs",
      "items": [
       {
        "src": "frameworks-08.jpg",
        "w": 2178,
        "h": 1792,
        "dw": 734,
        "caption": "Respostas dos usuários sobre os dois modelos no teste de preferência"
       }
      ],
      "caption": null
     }
    ]
   },
   {
    "title": "Solução",
    "blocks": [
     {
      "t": "solution",
      "items": [
       {
        "title": "1. Criação do framework",
        "paras": [
         "Ao criar um framework, o usuário escolhe as categorias de GHG que ele inclui, e todas as fontes dessas categorias passam a valer para ele automaticamente."
        ],
        "imgs": [
         {
          "src": "frameworks-09.jpg",
          "w": 2732,
          "h": 1572,
          "dw": 941
         }
        ]
       },
       {
        "title": "2. Configuração do framework no sistema pai",
        "paras": [
         "O usuário ativa um novo framework através do sistema pai da hierarquia, permitindo uma visão centralizada e prática da configuração, incluindo ou excluindo sistemas filhos conforme definido por cada framework. O LESS, por exemplo, não inclui equipamentos auxiliares."
        ],
        "imgs": [
         {
          "src": "frameworks-10.jpg",
          "w": 2732,
          "h": 1572,
          "dw": 941
         }
        ]
       },
       {
        "title": "3. Novo layout do cadastro de fontes",
        "paras": [
         "As fontes exibidas na tabela variam de acordo com o sistema selecionado na árvore, que pode variar de acordo com o framework escolhido. A hierarquia dos elementos permite uma rápida navegação entre os parâmetros ao mesmo tempo que localiza o usuário dentro da configuração.",
         "Os fatores de emissão estão presentes na subtabela e variam de acordo com o framework selecionado. As badges nas abas e nos elementos da árvore sinalizam quantas fontes em cada nível estão sem fatores configurados, permitindo uma rápida verificação de pendências."
        ],
        "imgs": [
         {
          "src": "frameworks-11.jpg",
          "w": 2732,
          "h": 1572,
          "dw": 940
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "title": "Resultado",
    "blocks": [
     {
      "t": "results",
      "items": [
       {
        "title": "O que mudou",
        "text": "O cadastro de fontes de emissão de toda uma árvore de sistemas pode ser feita a partir de uma mesma página, facilitando o gerenciamento da configuração durante a implementação e a manutenção."
       },
       {
        "title": "Impacto esperado",
        "text": "Redução no tempo de implementação em clientes que precisam de múltiplos frameworks de relatório pois agora é necessário criar a árvore de sistemas e suas fontes apenas uma vez."
       }
      ]
     }
    ]
   }
  ]
 },
 "antecipacao": {
  "key": "antecipacao",
  "eyebrow": [
   "CASHFORCE",
   "SERVIÇOS FINANCEIROS: GESTÃO DE NOTAS FISCAIS E MARKETPLACE DE CRÉDITO"
  ],
  "title": "Antecipação de recebíveis por vencimento",
  "intro": "Fornecedores reclamaram que selecionar duplicata por duplicata para pedir uma antecipação era cansativo. Redesenhei com o PM o fluxo: o fornecedor escolhe o comprador, define um intervalo de vencimento e o sistema seleciona todas as duplicatas do período, mostrando uma simulação do valor a receber.",
  "cover": "antecipacao-cover.png",
  "sections": [
   {
    "title": "Contexto",
    "blocks": [
     {
      "t": "p",
      "text": "A Cashforce é uma plataforma que oferece serviços financeiros como gestão de notas fiscais e marketplace de crédito, incluindo antecipação de recebíveis. Uma nota fiscal pode ser paga em várias parcelas, as duplicatas, cada uma com seu vencimento. Por isso, a antecipação é feita por duplicata, e não por nota, já que algumas parcelas podem já estar pagas ou vencidas. Para antecipar, o fornecedor seleciona as duplicatas que quer enviar ao marketplace de crédito e recebe propostas de financiadores, que antecipam o valor a uma taxa definida conforme o histórico financeiro de cada comprador."
     }
    ]
   },
   {
    "title": "Problema",
    "blocks": [
     {
      "t": "split",
      "paras": [
       "De acordo com o time de Customer Success, fornecedores com muitas duplicatas para antecipar precisavam selecioná-las uma a uma em uma tabela paginada. Com dezenas de duplicatas para antecipar, os usuários acabavam entrando em contato com o time de Customer Success para realizar essa ação, o que acabava sobrecarregando os atendentes e causando demora no atendimento.",
       "Os fornecedores comunicaram que gostariam de uma forma mais prática de enviar grandes volumes de duplicatas para antecipação no marketplace."
      ],
      "img": {
       "src": "antecipacao-01.png",
       "w": 1560,
       "h": 900,
       "dw": 902
      },
      "caption": "Tela que mostra como a tarefa de selecionar recebíveis para antecipação era cumprida anteriormente."
     }
    ]
   },
   {
    "title": "Pesquisa e preparação",
    "blocks": [
     {
      "t": "cards",
      "items": [
       {
        "title": "Reclamação dos fornecedores",
        "text": "A reclamação chegou ao time pelo atendimento: selecionar duplicata por duplicata era cansativo."
       },
       {
        "title": "Análise de concorrentes",
        "text": "Analisei plataformas concorrentes e concluí que a melhor forma de reduzir o número de ações era atrelar a seleção ao saldo disponível e ao vencimento."
       },
       {
        "title": "Conversa com desenvolvedores",
        "text": "Estender o “selecionar todos” da tabela a todas as páginas não era viável a curto prazo, pela forma como a plataforma foi construída."
       }
      ]
     }
    ]
   },
   {
    "title": "Requisitos",
    "blocks": [
     {
      "t": "p",
      "text": "Após a etapa de preparação, foram levantados os seguintes requisitos:"
     },
     {
      "t": "checks",
      "items": [
       "Reduzir o número de ações necessárias para selecionar e enviar as duplicatas",
       "Dar controle sobre quais duplicatas o fornecedor envia",
       "Funcionar para todos os tipos de integração da plataforma, inclusive os que exigem envio de documentos adicionais",
       "Caber no prazo de desenvolvimento, sem refazer o componente de tabela"
      ]
     }
    ]
   },
   {
    "title": "Decisões",
    "blocks": [
     {
      "t": "h3",
      "text": "1. Selecionar por período de vencimento"
     },
     {
      "t": "p",
      "text": "Em vez de escolher duplicatas individualmente, o fornecedor define um período e o sistema seleciona todas as duplicatas que vencem nele. Dessa forma, o usuário pode ter uma visão prévia do saldo a ser antecipado e ter controle sobre as condições de juros que variam de acordo com os vencimentos. A alternativa mais simples, estender o “selecionar todos” a todas as páginas, foi descartada: não dava controle sobre quais duplicatas enviar e não era viável tecnicamente a curto prazo."
     },
     {
      "t": "h3",
      "text": "2. Um fluxo em passos, com progresso visível"
     },
     {
      "t": "p",
      "text": "Dividi a tarefa em etapas, com barra de progresso. No Passo 01, o fornecedor escolhe o comprador cujo saldo quer antecipar (um fornecedor atende vários compradores); no Passo 02, define o período e vê a simulação."
     },
     {
      "t": "h3",
      "text": "3. Aproveitar o redesenho para introduzir a simulação"
     },
     {
      "t": "p",
      "text": "A ideia de incluir a simulação foi do PM, para aproveitar a mudança de fluxo. Desenhei a simulação para mostrar o total disponível, o número de duplicatas, a taxa e o valor a receber, calculado com a menor taxa praticada na plataforma naquele momento. Como o valor real depende das propostas de cada financiador, a tela avisa que é uma estimativa."
     },
     {
      "t": "figs",
      "items": [
       {
        "src": "antecipacao-02.jpg",
        "w": 2048,
        "h": 1509,
        "dw": 767,
        "caption": "Wireframe com a ideia inicial da seleção de vencimento, a simulação de vencimento e um indicador de progresso em barra."
       }
      ],
      "caption": null
     },
     {
      "t": "h3",
      "text": "4. Reaproveitar o fluxo existente"
     },
     {
      "t": "p",
      "text": "O envio de documentos adicionais varia conforme o tipo de integração de cada empresa com a plataforma. Para encurtar o desenvolvimento, adaptei as etapas complementares do fluxo já existente em vez de criar novas."
     },
     {
      "t": "figs",
      "items": [
       {
        "src": "antecipacao-03.jpg",
        "w": 2048,
        "h": 543,
        "dw": 767,
        "caption": "Fluxo completo da nova funcionalidade mantendo as etapas posteriores à seleção para reduzir esforço."
       }
      ],
      "caption": null
     }
    ]
   },
   {
    "title": "Aprovação e entrega",
    "blocks": [
     {
      "t": "p",
      "text": "A solução foi discutida com o time de desenvolvimento para avaliar a viabilidade de construção dentro do prazo estabelecido, sendo aprovada após a conversa. A nova funcionalidade então foi apresentada ao CEO, que também aprovou a proposta, seguindo assim para desenvolvimento. Após a construção do fluxo no ambiente de testes, fui responsável pela verificação de qualidade, apontando os ajustes necessários antes que fosse liberado para os clientes."
     }
    ]
   },
   {
    "title": "Solução",
    "blocks": [
     {
      "t": "solution",
      "items": [
       {
        "title": "1. Tela inicial",
        "paras": [
         "Os cartões da tela inicial foram reformulados para descrever melhor as ações. O usuário acessa a funcionalidade pelo cartão ou pela aba “Antecipação”."
        ],
        "imgs": [
         {
          "src": "antecipacao-04.png",
          "w": 3120,
          "h": 1800,
          "dw": 941
         }
        ]
       },
       {
        "title": "2. Passo 01: escolher o comprador",
        "paras": [
         "O fornecedor seleciona o saldo de um ou mais compradores para simular a antecipação."
        ],
        "imgs": [
         {
          "src": "antecipacao-05.jpg",
          "w": 3120,
          "h": 1800,
          "dw": 940
         }
        ]
       },
       {
        "title": "3. Passo 02: definir o período",
        "paras": [
         "O fornecedor escolhe um intervalo de vencimento, pré-definido ou personalizado, para selecionar todas as duplicatas que vencem nele."
        ],
        "imgs": [
         {
          "src": "antecipacao-06.jpg",
          "w": 3120,
          "h": 1800,
          "dw": 940
         }
        ]
       },
       {
        "title": "4. Simulação",
        "paras": [
         "O fornecedor confere o total disponível, o número de duplicatas, a taxa e o valor a receber, e pode clicar em “visualizar” para ver e editar a seleção. Dados ilustrativos."
        ],
        "imgs": [
         {
          "src": "antecipacao-07.jpg",
          "w": 3120,
          "h": 1800,
          "dw": 940
         }
        ]
       },
       {
        "title": "5. Clareza sobre próximas etapas",
        "paras": [
         "Com a documentação em ordem, o fornecedor recebe uma mensagem de sucesso com a descrição dos próximos passos para receber o valor e é encaminhado para a página de propostas."
        ],
        "imgs": [
         {
          "src": "antecipacao-08.jpg",
          "w": 3120,
          "h": 1800,
          "dw": 940
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "title": "Resultado",
    "blocks": [
     {
      "t": "results",
      "items": [
       {
        "title": "O que mudou",
        "text": "Em vez de selecionar duplicatas uma a uma, fornecedor agora pode definir um período de vencimento e enviar duplicatas, com maior controle de seleção e simulação do valor a receber."
       },
       {
        "title": "Impacto esperado",
        "text": "Redução nas solicitações de atendimento do time de Customer Success para essa tarefa devido ao menor esforço para que fornecedores consigam enviar muitas duplicatas para o marketplace."
       }
      ]
     }
    ]
   }
  ]
 }
}

export const caseDataEn: Record<string, CaseData> = {
 "factor-hub": {
  "key": "factor-hub",
  "eyebrow": [
   "VETTA",
   "VIRIDIS CARBON: CARBON EMISSIONS MANAGEMENT"
  ],
  "title": "Factor hub",
  "intro": "To implement a project at a new client, engineers registered each emission factor by hand, typing values with many digits, in a slow and error-prone process. Together with the Head of Product, I designed the Factor Hub, a centralized library of factors where users select instead of typing. Throughout the project, I solved the challenge of accommodating libraries in different formats and proposed the Usage map, a feature that shows where each factor is being used.",
  "cover": "factor-hub-cover.png",
  "sections": [
   {
    "title": "Context",
    "blocks": [
     {
      "t": "p",
      "text": "Viridis Carbon is a product that helps steel plants manage their emissions. Emission factors are the values used to calculate the emissions of each source based on its consumption of energy resources."
     },
     {
      "t": "p",
      "text": "The emission value of a source is the sum, for each greenhouse gas (GHG), of the consumption multiplied by that gas's emission factor and by its GWP (Global Warming Potential). The result is expressed in CO₂ equivalent (CO₂e)."
     }
    ]
   },
   {
    "title": "Problem",
    "blocks": [
     {
      "t": "split",
      "paras": [
       "Each portion (the value of each GHG within the factor) had to be registered manually in the emission sources. Besides being time-consuming, it required constant attention to values with many digits, and any mistake affected the calculation. This lengthened the product's implementation at clients and made the annual update of factors harder.",
       "Another issue was the accepted value format. Our flow only accepted individual, non-converted GHG values, because the system always multiplied the entered value by the GWP, but some libraries provide the value already converted. In those cases, engineers had to unconvert the value before they could use it in the system."
      ],
      "img": {
       "src": "factor-hub-01.jpg",
       "w": 2732,
       "h": 1572,
       "dw": 902
      },
      "caption": "Before: each factor was typed manually into each emission source, for each GHG."
     }
    ]
   },
   {
    "title": "Research and preparation",
    "blocks": [
     {
      "t": "cards",
      "items": [
       {
        "title": "Similar products analysis",
        "text": "Most competitors, such as Microsoft Sustainability Manager and NetZero, already used libraries to manage the emission factors applied and to make it easier to access values from official sources."
       },
       {
        "title": "Research on library formats",
        "text": "I surveyed the library formats currently available and found that data is provided in three ways: summed and converted to CO₂e, separated and converted to CO₂e, and separated and non-converted."
       },
       {
        "title": "Interview with a specialist",
        "text": "I interviewed the engineer responsible for implementing the system, and found that registering emission factors was one of her main difficulties when configuring emission sources."
       },
       {
        "title": "Alignment with the Head of Product",
        "text": "We discussed the possibility of prioritizing the restructuring of emission factor management on the roadmap over other deliveries, in order to gain configuration speed and confidence in the values used."
       }
      ]
     }
    ]
   },
   {
    "title": "Requirements",
    "blocks": [
     {
      "t": "p",
      "text": "After the preparation stage, the following requirements were defined:"
     },
     {
      "t": "checks",
      "items": [
       "Centralize factor management in a single place",
       "Include libraries of different types (public and private databases, measured data)",
       "Include complete data about libraries and their factors (not just the value and the source of the data)",
       "Accept several database formats for flexibility",
       "Keep to the existing design system standard"
      ]
     }
    ]
   },
   {
    "title": "Decisions",
    "blocks": [
     {
      "t": "h3",
      "text": "1. The information architecture"
     },
     {
      "t": "p",
      "text": "The Head of Product and I proposed a hierarchy: the Factor Hub gathers several libraries (factor databases, such as DEFRA), each library has collections (internal divisions, such as Fuels within DEFRA), and collections contain the factors. In the first version, the hub would already come with public libraries registered and would allow importing spreadsheets or registering manually, so that users could also create their own libraries."
     },
     {
      "t": "figs",
      "items": [
       {
        "src": "factor-hub-02.png",
        "w": 4480,
        "h": 2272,
        "dw": 792,
        "caption": "Factor hub structure"
       },
       {
        "src": "factor-hub-03.png",
        "w": 1316,
        "h": 960,
        "dw": 525,
        "caption": "Initial sketch of the Factor Hub"
       }
      ],
      "caption": null
     },
     {
      "t": "h3",
      "text": "2. Normalizing libraries in different formats"
     },
     {
      "t": "p",
      "text": "Libraries come in different formats, but when configuring an emission source, the user always needs to see a single value to select. I was responsible for defining a rule: the selection always shows the already converted and aggregated value of all GHGs (greenhouse gases). The system does the math according to the library's format. The GWP, or global warming potential, is the factor that converts each gas into CO₂ equivalent. This adaptation was also implemented in the system's database."
     },
     {
      "t": "table",
      "head": [
       "Library format",
       "What the system does",
       "Partial GHG selection"
      ],
      "rows": [
       [
        "Separated GHGs, not converted",
        "Multiplies each GHG by its GWP and sums",
        "Yes"
       ],
       [
        "Separated GHGs, already converted",
        "Sums",
        "Yes"
       ],
       [
        "Already converted and aggregated value, no detail by GHG",
        "Shows the full value",
        "No, because the library does not provide this data"
       ]
      ]
     },
     {
      "t": "h3",
      "text": "3. Usage map"
     },
     {
      "t": "p",
      "text": "In the interview, I realized that a big problem was not having an overall view of how the factors were being applied. I proposed the Usage map: the factors table gained a column with the number of uses and a button to open the map. It is displayed as a tree, with each carbon system and its emission sources following the hierarchy, so that users see exactly where each factor is applied."
     },
     {
      "t": "h3",
      "text": "4. Improving the table component"
     },
     {
      "t": "p",
      "text": "The static format of the previous table needed to be adapted to hold the large amount of information about each emission factor. I consulted the team's senior developer about the possibility of adjusting the table component to add horizontal scrolling, pinning the last column. This change would be essential to prepare the component for use in other steps of the flow, such as selecting factors in emission sources."
     }
    ]
   },
   {
    "title": "Validation and adaptation",
    "blocks": [
     {
      "t": "p",
      "text": "Before moving to development, I validated the format with the engineer on the project team. In the initial version, users could only select the aggregated value of all GHGs. She pointed out that, depending on the client's methodology, using only CO₂ is valid, as was the case for the current client. Starting from that point and with the Head of Product's approval, I adapted the solution: the factor is registered in full and, when selecting it in an emission source, the user chooses only the GHGs of interest."
     }
    ]
   },
   {
    "title": "Solution",
    "blocks": [
     {
      "t": "solution",
      "items": [
       {
        "title": "1. Factor hub",
        "paras": [
         "The “Factor hub” page gathers all the factor libraries used in emission calculations. All settings related to factors and their sources are made here.",
         "When registering a library, users can define the format of the values it contains so that the system can apply the appropriate method and generate the normalized value for selection in emission sources. This way, any library format that exists today can be imported into the system.",
         "The system already comes loaded with public libraries, but users can import libraries with other license types."
        ],
        "imgs": [
         {
          "src": "factor-hub-04.jpg",
          "w": 2732,
          "h": 1572,
          "dw": 941
         }
        ]
       },
       {
        "title": "2. Collections",
        "paras": [
         "Collections replicate the organization found in the libraries, which often divide their factors according to the type of energy resource.",
         "This page is where users can import collections and factors using spreadsheets. The spreadsheet template required for import varies according to the library format."
        ],
        "imgs": [
         {
          "src": "factor-hub-05.jpg",
          "w": 2732,
          "h": 1572,
          "dw": 940
         }
        ]
       },
       {
        "title": "3. Emission factors table",
        "paras": [
         "Entering a collection, we can see the emission factors organized in a table with their information available in detail. This information is important when selecting which factor is most appropriate for an emission source. In a future version, we plan to use this information for automatic selection."
        ],
        "imgs": [
         {
          "src": "factor-hub-06.jpg",
          "w": 2732,
          "h": 1572,
          "dw": 941
         }
        ]
       },
       {
        "title": "4. Different value formats",
        "paras": [
         "When entering factor data manually, users have access to the three value formats found in the market today.",
         "The form varies according to the database format selected when registering the library, which can be aggregated and converted, separated by GHG and converted, or separated by GHG and non-converted.",
         "In the end, the selectable value is always an aggregated and converted value."
        ],
        "imgs": [
         {
          "src": "factor-hub-07.png",
          "w": 1784,
          "h": 835,
          "dw": 1038,
          "bare": true
         }
        ]
       },
       {
        "title": "5. Usage map",
        "paras": [
         "With the Usage map, users can see exactly how a factor is applied in the systems tree (areas and equipment of an industrial plant). The map shows in which system and framework a factor is being used, as well as which GHGs are selected (in the case of libraries with non-aggregated values).",
         "A button was also included so that users can go directly to the emission source configuration page if any adjustment is needed."
        ],
        "imgs": [
         {
          "src": "factor-hub-08.jpg",
          "w": 2732,
          "h": 1564,
          "dw": 943
         }
        ]
       },
       {
        "title": "6. Factor selection",
        "paras": [
         "With factor entry centralized in the Factor Hub, users only need to select the most suitable factor for the emission calculation in each source.",
         "To keep the flexibility already present in the previous flow, I adapted the solution to let users select which portions of a (non-aggregated) factor they want to use."
        ],
        "imgs": [
         {
          "src": "factor-hub-09.jpg",
          "w": 2732,
          "h": 1564,
          "dw": 937
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "title": "Result",
    "blocks": [
     {
      "t": "results",
      "items": [
       {
        "title": "What changed",
        "text": "Manual, factor-by-factor registration was replaced by selection from a centralized library, adaptable to several formats and with an overall view of usage."
       },
       {
        "title": "Expected impact",
        "text": "Shorter implementation time thanks to quick access to reliable factors, and fewer configuration errors, with the Usage map making it easy to see which factors are being used in emission sources and how."
       }
      ]
     }
    ]
   }
  ]
 },
 "frameworks": {
  "key": "frameworks",
  "eyebrow": [
   "VETTA",
   "VIRIDIS CARBON: CARBON EMISSIONS MANAGEMENT"
  ],
  "title": "Multiple reporting frameworks",
  "intro": "With every new reporting framework, the project team duplicated the entire carbon systems tree and re-registered hundreds of emission sources. Together with the Head of Product, I designed a new structure in which the tree is created only once and each framework is activated on top of it, with all sources configured on a single screen. The solution required changing the table component, and I defended that change against the development deadline and effort.",
  "cover": "frameworks-cover.png",
  "sections": [
   {
    "title": "Context",
    "blocks": [
     {
      "t": "p",
      "text": "Viridis Carbon is a product that helps steel plants manage and report their emissions. The emission values shown in charts and reports are calculated according to the parameters of each reporting framework, which determine which systems (areas and equipment of an industrial plant, organized in a tree), emission source categories and factors must be used to generate the data."
     },
     {
      "t": "p",
      "text": "Initially, Viridis Carbon supported only the GHG Protocol, the most comprehensive framework, which covers direct emissions from sources owned or controlled by the company, indirect emissions from the energy it purchases, and all other indirect emissions across a product's value chain. However, clients needed to generate values following new reporting frameworks, such as LESS and CBAM, which consider only part of the carbon systems and emission source categories included in the GHG Protocol, and which use different factors in their emission calculations."
     }
    ]
   },
   {
    "title": "Problem",
    "blocks": [
     {
      "t": "split",
      "paras": [
       "With the platform's previous structure, the way the project team found to implement new frameworks at clients was to duplicate the carbon systems tree and register the emission sources of each system, which resulted in hundreds of new registrations. It was repetitive, time-consuming and error-prone work that grew with every framework added."
      ],
      "img": {
       "src": "frameworks-01.jpg",
       "w": 2732,
       "h": 1424,
       "dw": 902
      },
      "caption": "Duplicated systems tree with “LESS” added to the name to tell it apart from the systems configured for the GHG Protocol. Illustrative data."
     }
    ]
   },
   {
    "title": "Research and preparation",
    "blocks": [
     {
      "t": "cards",
      "items": [
       {
        "title": "Head of Product's requirement",
        "text": "The ideal would be to configure all emission sources of all systems, across all frameworks, on the same screen. In addition, framework activation should be done only at the parent system level, to avoid configuration errors in child systems that would be hard to locate."
       },
       {
        "title": "Similar products analysis",
        "text": "I studied how emission sources are registered on platforms such as Microsoft Sustainability Manager, NetZero and Carbon Alt Delete. In all of them, each source is registered on a separate page, but Microsoft already had the concept of registering factors for different reporting frameworks in a single source."
       },
       {
        "title": "Interview with a specialist",
        "text": "I interviewed the engineer responsible for implementing the system at the plants to understand how the previous journey worked and thus identify possible areas for improvement. Her main pain was having a way to check whether there were sources without configured factors."
       }
      ]
     }
    ]
   },
   {
    "title": "Requirements",
    "blocks": [
     {
      "t": "p",
      "text": "After the preparation stage, the following requirements were defined:"
     },
     {
      "t": "checks",
      "items": [
       "Configure all emission sources of all reporting frameworks and of the entire systems tree from a single page",
       "Limit the reporting framework configuration to parent systems only, to ensure consistent configuration",
       "Show an indication of which emission sources have no factors",
       "Follow the design system standard if there are new components"
      ]
     }
    ]
   },
   {
    "title": "Decisions",
    "blocks": [
     {
      "t": "h3",
      "text": "1. New emission sources screen using information hierarchy"
     },
     {
      "t": "p",
      "text": "To configure all frameworks and systems, I first considered using select fields to choose each framework and system, since it would reuse a pattern already widely used on the platform, bringing familiarity to users. However, I discarded it because it made switching between frameworks during configuration harder and hid the systems tree structure, which would only be visible while the field's dropdown was open. My second alternative was to use spatial hierarchy, positioning tabs and tree elements so that one influences the other in the right order (Frameworks > Systems > Sources/Factors), making it possible to see which framework and system is being configured at the same time, with good use of space. I chose to go with the second alternative, whose final version can be seen in the Solution section."
     },
     {
      "t": "figs",
      "items": [
       {
        "src": "frameworks-02.jpg",
        "w": 2732,
        "h": 1572,
        "dw": 638
       },
       {
        "src": "frameworks-03.jpg",
        "w": 2728,
        "h": 1572,
        "dw": 637
       }
      ],
      "caption": "Layout alternatives for the new sources page."
     },
     {
      "t": "h3",
      "text": "2. Separating consumption from emission factors"
     },
     {
      "t": "p",
      "text": "During the similar products analysis, I found it interesting how Microsoft's product used a flow editor to register emission source data. What caught my attention most was that the consumption data was separated from the reporting settings, which included the factors. This format made it possible to have several emission data outputs from the same consumption data input. Following that concept, I brought to my solution the separation between the two sections, registering the consumption metric in one form and the factors at another moment. That way, when a new framework was created, the project team would only need to add the factor related to the new framework."
     },
     {
      "t": "figs",
      "items": [
       {
        "src": "frameworks-04.png",
        "w": 3892,
        "h": 2034,
        "dw": 844,
        "caption": "Emission source configuration screen in Microsoft Sustainability Manager with a flow editor."
       }
      ],
      "caption": null
     },
     {
      "t": "h3",
      "text": "3. Table with a subtable for the factors"
     },
     {
      "t": "p",
      "text": "To implement the separation between consumption and emission factors so that factors could be configured and viewed on the same screen, I proposed that each table row could expand to reveal a subtable, with its own columns and actions, as well as editable rows. The subtables would show the data of the registered factors, which vary according to the selected framework, while the source data (consumption) stays the same."
     },
     {
      "t": "p",
      "text": "This proposal had to be defended given the effort to adjust the table component, whose complexity could threaten the delivery deadline if it needed refactoring. I argued with the team's senior developer that the change would be necessary to meet the requirement set by the Head of Product and that the adjustment could be reused in other features of the system, since it opens up many application possibilities. He agreed and looked for a more efficient way to implement the subtables without redoing the entire component, which led to making only the rows flexible so that they could render any item inside them, including another table."
     },
     {
      "t": "p",
      "text": "Since this was a new pattern for the table component, I had to create alternatives to determine the version with the best usability and so decide between two models: a cleaner one, with fewer lines and markers in the main color, and another similar to the existing table."
     },
     {
      "t": "figs",
      "items": [
       {
        "src": "frameworks-05.png",
        "w": 2732,
        "h": 1400,
        "dw": 634
       },
       {
        "src": "frameworks-06.png",
        "w": 2732,
        "h": 1400,
        "dw": 634
       }
      ],
      "caption": "Alternatives for emission factor subtables."
     }
    ]
   },
   {
    "title": "Validation and adaptation",
    "blocks": [
     {
      "t": "p",
      "text": "To support the choice of subtable, I ran a Lyssna test with 10 people from the internal team, comparing the two visual models. I wanted to know whether people would understand that the task would be done inside the subtable and which model they preferred. For that, I created a test with tasks to complete on the prototypes of both models and a preference test so they could compare the two side by side after completing the tasks."
     },
     {
      "t": "figs",
      "items": [
       {
        "src": "frameworks-07.jpg",
        "w": 1910,
        "h": 916,
        "dw": 934,
        "caption": "Test to complete a generic task in both subtable models.",
        "gif": "frameworks-lyssna.gif"
       }
      ],
      "caption": null
     },
     {
      "t": "p",
      "text": "All 10 completed the task. My hypothesis was that the clean model would win, but the team preferred the model equal to the existing table, and some commented that it was easier to understand. I went with model 2, closer to the already familiar pattern. The internal test was proposed as an asynchronous validation format that could be expanded to other projects and run with internal people and end clients. After the table was chosen, the proposal was finalized and validated with the engineer responsible for implementation, who understood and approved the new flow."
     },
     {
      "t": "figs",
      "items": [
       {
        "src": "frameworks-08.jpg",
        "w": 2178,
        "h": 1792,
        "dw": 734,
        "caption": "Users' answers about the two models in the preference test"
       }
      ],
      "caption": null
     }
    ]
   },
   {
    "title": "Solution",
    "blocks": [
     {
      "t": "solution",
      "items": [
       {
        "title": "1. Creating the framework",
        "paras": [
         "When creating a framework, the user chooses the GHG categories it includes, and all the sources in those categories automatically start to apply to it."
        ],
        "imgs": [
         {
          "src": "frameworks-09.jpg",
          "w": 2732,
          "h": 1572,
          "dw": 941
         }
        ]
       },
       {
        "title": "2. Configuring the framework on the parent system",
        "paras": [
         "The user activates a new framework through the parent system of the hierarchy, allowing a centralized and practical view of the configuration, including or excluding child systems as defined by each framework. LESS, for example, does not include auxiliary equipment."
        ],
        "imgs": [
         {
          "src": "frameworks-10.jpg",
          "w": 2732,
          "h": 1572,
          "dw": 941
         }
        ]
       },
       {
        "title": "3. New source registration layout",
        "paras": [
         "The sources shown in the table vary according to the system selected in the tree, which can vary according to the chosen framework. The hierarchy of the elements allows quick navigation between parameters while locating the user within the configuration.",
         "Emission factors are in the subtable and vary according to the selected framework. The badges on the tabs and on the tree elements show how many sources at each level have no factors configured, allowing a quick check of pending items."
        ],
        "imgs": [
         {
          "src": "frameworks-11.jpg",
          "w": 2732,
          "h": 1572,
          "dw": 940
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "title": "Result",
    "blocks": [
     {
      "t": "results",
      "items": [
       {
        "title": "What changed",
        "text": "Registering the emission sources of an entire systems tree can now be done from a single page, making configuration easier to manage during implementation and maintenance."
       },
       {
        "title": "Expected impact",
        "text": "Shorter implementation time at clients who need multiple reporting frameworks, since the systems tree and its sources now only need to be created once."
       }
      ]
     }
    ]
   }
  ]
 },
 "antecipacao": {
  "key": "antecipacao",
  "eyebrow": [
   "CASHFORCE",
   "FINANCIAL SERVICES: INVOICE MANAGEMENT AND CREDIT MARKETPLACE"
  ],
  "title": "Receivables advance by due date",
  "intro": "Suppliers complained that selecting installment after installment to request an advance was tiring. Together with the PM, I redesigned the flow: the supplier chooses the buyer, defines a due date range, and the system selects all the installments in that period, showing a simulation of the amount to be received.",
  "cover": "antecipacao-cover.png",
  "sections": [
   {
    "title": "Context",
    "blocks": [
     {
      "t": "p",
      "text": "Cashforce is a platform that offers financial services such as invoice management and a credit marketplace, including receivables advances. A tax invoice can be paid in several installments, the duplicatas, each with its own due date. That is why the advance is made per installment rather than per invoice, since some installments may already be paid or overdue. To request an advance, the supplier selects the installments they want to send to the credit marketplace and receives proposals from lenders, who advance the amount at a rate defined according to each buyer's financial history."
     }
    ]
   },
   {
    "title": "Problem",
    "blocks": [
     {
      "t": "split",
      "paras": [
       "According to the Customer Success team, suppliers with many installments to advance had to select them one by one in a paginated table. With dozens of installments to advance, users ended up contacting the Customer Success team to do this task, which overloaded the agents and delayed support.",
       "Suppliers said they would like a more practical way to send large volumes of installments for advance on the marketplace."
      ],
      "img": {
       "src": "antecipacao-01.png",
       "w": 1560,
       "h": 900,
       "dw": 902
      },
      "caption": "Screen showing how the task of selecting receivables for advance was previously done."
     }
    ]
   },
   {
    "title": "Research and preparation",
    "blocks": [
     {
      "t": "cards",
      "items": [
       {
        "title": "Supplier complaints",
        "text": "The complaint reached the team through customer support: selecting installment after installment was tiring."
       },
       {
        "title": "Competitor analysis",
        "text": "I analyzed competing platforms and concluded that the best way to reduce the number of actions was to tie the selection to the available balance and to the due date."
       },
       {
        "title": "Conversation with developers",
        "text": "Extending the “select all” of the table to all pages was not feasible in the short term, because of the way the platform was built."
       }
      ]
     }
    ]
   },
   {
    "title": "Requirements",
    "blocks": [
     {
      "t": "p",
      "text": "After the preparation stage, the following requirements were defined:"
     },
     {
      "t": "checks",
      "items": [
       "Reduce the number of actions needed to select and send the installments",
       "Give control over which installments the supplier sends",
       "Work for all integration types on the platform, including those that require sending additional documents",
       "Fit within the development timeline, without redoing the table component"
      ]
     }
    ]
   },
   {
    "title": "Decisions",
    "blocks": [
     {
      "t": "h3",
      "text": "1. Selecting by due date period"
     },
     {
      "t": "p",
      "text": "Instead of choosing installments individually, the supplier defines a period and the system selects all the installments that fall due within it. This way, users get a preview of the balance to be advanced and control over the interest conditions, which vary according to due dates. The simpler alternative, extending “select all” to all pages, was discarded: it did not give control over which installments to send and was not technically feasible in the short term."
     },
     {
      "t": "h3",
      "text": "2. A step-by-step flow with visible progress"
     },
     {
      "t": "p",
      "text": "I divided the task into steps, with a progress bar. In Step 01, the supplier chooses the buyer whose balance they want to advance (a supplier serves several buyers); in Step 02, they define the period and see the simulation."
     },
     {
      "t": "h3",
      "text": "3. Using the redesign to introduce the simulation"
     },
     {
      "t": "p",
      "text": "The idea of including the simulation came from the PM, to take advantage of the flow change. I designed the simulation to show the total available, the number of installments, the rate and the amount to be received, calculated with the lowest rate offered on the platform at that moment. Since the real amount depends on each lender's proposals, the screen warns that it is an estimate."
     },
     {
      "t": "figs",
      "items": [
       {
        "src": "antecipacao-02.jpg",
        "w": 2048,
        "h": 1509,
        "dw": 767,
        "caption": "Wireframe with the initial idea of due date selection, the due date simulation and a progress bar indicator."
       }
      ],
      "caption": null
     },
     {
      "t": "h3",
      "text": "4. Reusing the existing flow"
     },
     {
      "t": "p",
      "text": "Sending additional documents varies according to the type of integration each company has with the platform. To shorten development, I adapted the complementary steps of the existing flow instead of creating new ones."
     },
     {
      "t": "figs",
      "items": [
       {
        "src": "antecipacao-03.jpg",
        "w": 2048,
        "h": 543,
        "dw": 767,
        "caption": "Full flow of the new feature, keeping the steps that come after the selection to reduce effort."
       }
      ],
      "caption": null
     }
    ]
   },
   {
    "title": "Approval and delivery",
    "blocks": [
     {
      "t": "p",
      "text": "The solution was discussed with the development team to assess the feasibility of building it within the established deadline, and was approved after the conversation. The new feature was then presented to the CEO, who also approved the proposal, moving on to development. After the flow was built in the test environment, I was responsible for quality verification, pointing out the adjustments needed before it was released to clients."
     }
    ]
   },
   {
    "title": "Solution",
    "blocks": [
     {
      "t": "solution",
      "items": [
       {
        "title": "1. Home screen",
        "paras": [
         "The cards on the home screen were reworked to describe the actions better. Users access the feature through the card or through the “Advance” tab."
        ],
        "imgs": [
         {
          "src": "antecipacao-04.png",
          "w": 3120,
          "h": 1800,
          "dw": 941
         }
        ]
       },
       {
        "title": "2. Step 01: choose the buyer",
        "paras": [
         "The supplier selects the balance of one or more buyers to simulate the advance."
        ],
        "imgs": [
         {
          "src": "antecipacao-05.jpg",
          "w": 3120,
          "h": 1800,
          "dw": 940
         }
        ]
       },
       {
        "title": "3. Step 02: define the period",
        "paras": [
         "The supplier chooses a due date range, preset or custom, to select all the installments that fall due within it."
        ],
        "imgs": [
         {
          "src": "antecipacao-06.jpg",
          "w": 3120,
          "h": 1800,
          "dw": 940
         }
        ]
       },
       {
        "title": "4. Simulation",
        "paras": [
         "The supplier checks the total available, the number of installments, the rate and the amount to be received, and can click “view” to see and edit the selection. Illustrative data."
        ],
        "imgs": [
         {
          "src": "antecipacao-07.jpg",
          "w": 3120,
          "h": 1800,
          "dw": 940
         }
        ]
       },
       {
        "title": "5. Clarity about next steps",
        "paras": [
         "With the documentation in order, the supplier receives a success message describing the next steps to receive the amount and is taken to the proposals page."
        ],
        "imgs": [
         {
          "src": "antecipacao-08.jpg",
          "w": 3120,
          "h": 1800,
          "dw": 940
         }
        ]
       }
      ]
     }
    ]
   },
   {
    "title": "Result",
    "blocks": [
     {
      "t": "results",
      "items": [
       {
        "title": "What changed",
        "text": "Instead of selecting installments one by one, suppliers can now define a due date period and send installments, with more control over the selection and a simulation of the amount to be received."
       },
       {
        "title": "Expected impact",
        "text": "Fewer support requests to the Customer Success team for this task, thanks to the lower effort for suppliers to send many installments to the marketplace."
       }
      ]
     }
    ]
   }
  ]
 }
}
