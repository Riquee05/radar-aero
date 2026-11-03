# Radar Aero

Radar de aviação para explorar posições recebidas pela rede comunitária adsb.lol. Projeto separado de Família a Bordo.

## Executar
Node.js 22.13 ou superior. Instale com `npm ci` e inicie com `npm run dev`. Endereço local: http://127.0.0.1:5173/.

## Primeira versão
- São Paulo, Rio de Janeiro, Brasília e Salvador: consultas regionais de 100 milhas náuticas.
- Busca por identificação, matrícula, modelo e aeroportos cadastrados; altitude, modelo e somente em voo.
- Detalhes de aeronave, favoritos no navegador, trajetória observada nesta sessão (máximo 120 pontos por aeronave; interrompida quando há lacunas de mais de 60 segundos).
- Consulta a cada 15 segundos, cache de servidor por região, pausa da consulta em aba oculta, recuo progressivo em falhas. Atualizações não são garantidas.
- Posições com mais de 60 segundos são identificadas como antigas; mais de 120 segundos não aparecem no mapa. Falta de posição recente não equivale a aeroporto sem tráfego.
- Sem dados simulados, origem/destino inventados, previsão de trajetória, horários comerciais ou uso de dados do Flightradar24.

## Fontes e licenças
- Dados de aeronaves: https://www.adsb.lol/docs/open-data/api — ODbL 1.0. Endereço fixo e regiões permitidas no servidor, sem proxy aberto. Dados não são persistidos no servidor além do cache temporário.
- Mapa: OpenFreeMap, OpenMapTiles e colaboradores OpenStreetMap, com atribuição visível. Estilo escuro disponibilizado por OpenFreeMap.
- MapLibre GL JS 5.6.1: biblioteca incluída localmente; licença em public/vendor/MAPLIBRE-LICENSE.txt.
- Aeroportos: OurAirports, dados em domínio público, recorte de seis aeroportos: https://ourairports.com/data/.
- Fontes tipográficas: Google Fonts, com alternativas locais do sistema.

## Limites
Dados comunitários sem garantia de cobertura, completude ou disponibilidade. Apenas exploração, sem uso para navegação ou decisões operacionais. Identificação de voo não confirma voo comercial ou aeroporto de origem/destino. Hospedagem de servidor é necessária; GitHub Pages sozinho não executa a API intermediária. A publicação inicial via Sites é privada.

## Logos das companhias
LATAM Brasil (TAM), Azul (AZU) e GOL (GLO), reconhecidas pelo indicativo ICAO recebido. Logos locais na lista e nos detalhes; ícone neutro para códigos desconhecidos. Fontes e atribuições em public/airlines/README.md.
Logos também aparecem ao lado das aeronaves no mapa. Em áreas densas, etiquetas sobrepostas são ocultadas; o logo da aeronave selecionada tem prioridade. O avião gira conforme a direção recebida e o logo permanece legível.

## App e widget Android

A raiz abre o radar fora de iframe. Manifest, ícones e service worker preparam instalação no Android e abertura básica offline. Posições de aeronaves não são armazenadas no cache offline; mapa e consultas exigem internet. Instalação real depende de HTTPS e dos critérios do navegador.

Perto de mim: ponto manual ou localização solicitada ao tocar no botão, raios 5/10/25/50 km, posições até 120 segundos, somente em voo, ordenadas por distância horizontal. Ponto e raio são salvos somente neste navegador. A API consulta o ponto arredondado a duas casas, com margem no raio, cache limitado a 128 entradas e até 32 consultas simultâneas. A localização é enviada à fonte adsb.lol para buscar tráfego; não há histórico de deslocamentos.

Projeto nativo em android-widget/. APK de desenvolvimento: public/downloads/radar-aero-widget.apk. O widget usa ponto fixo importável, consulta adsb.lol diretamente e funciona sem sessão privada do Sites. Atualização manual e periódica solicitada em 30 minutos, com atraso possível pelo Android. Todos os widgets compartilham o mesmo ponto. A PWA e o APK têm armazenamento independente. Não há serviço de localização em segundo plano.

Validação desta etapa: build web, TypeScript, testes de API/proximidade/cache offline/logos, layout móvel no navegador, assembleDebug e lintDebug Android. O APK ainda requer teste em aparelho.

## GitHub Pages

Repositório: https://github.com/Riquee05/radar-aero
Site: https://riquee05.github.io/radar-aero/

Gere a versão estática com node scripts/build-pages.mjs. Publique a branch main, pasta /docs nas configurações Pages. O navegador consulta a API pública do Radar Aero em https://radar-aero.e8zxc1.chatgpt.site/api/aircraft; GitHub Pages não executa o servidor. A API aceita leitura pelo navegador apenas da origem https://riquee05.github.io, sem cookies ou chave no código. As consultas continuam limitadas às regiões e raios permitidos. Não use proxies abertos. Ícones, manifesto e cache offline usam caminhos relativos ao projeto /radar-aero/.

## Atualização 0.2.0 — navegação e identidade visual

Mapa, Tráfego e Widget permanecem acessíveis na barra fixa em celular e PC. Voltar ao mapa fecha os detalhes e restaura o enquadramento anterior; o botão Voltar do navegador também retorna dos detalhes ao mapa. O painel App & Widget permanece disponível depois de instalar a PWA.

Nova identidade em verde radar e ciano, mapa em tons verdes, ícone vetorial próprio e ícones PNG atualizados. O APK 0.2.0 inclui o botão Adicionar widget à tela inicial, quando suportado pelo launcher Android, e acesso direto ao mapa. Atualize o APK anterior para obter esses controles. A assinatura de atualização foi preservada.

Validação: navegação em PC e viewport 390 × 844, retorno pelo histórico do navegador, painel de instalação, testes de cache e instalação, compilação e lint Android sem erros. A inclusão do widget ainda requer conferência em aparelho Android real.

### Acesso direto

- [Abrir o Radar Aero](https://riquee05.github.io/radar-aero/)
- [Atualizar o widget Android 0.5.0](https://riquee05.github.io/radar-aero/downloads/radar-aero-widget-0.5.0.apk)

No app já instalado, use Widget na barra inferior. No Android, instale o APK atualizado para obter o botão Adicionar widget à tela inicial.


## Widget 0.2.1 — adição sem coordenadas obrigatórias

Removida a exigência de salvar um ponto antes de solicitar a adição à tela inicial. O botão Adicionar widget aparece antes do formulário. Configuração inicial opcional no Android 12 ou superior; a configuração acionada pelo launcher também permite adicionar agora e configurar depois. A confirmação de adição usa callback do sistema, sem tratar a solicitação aceita como widget já instalado.

Feedback visível e caminho manual para o Galaxy: tela inicial → manter um espaço vazio pressionado → Widgets → Radar Aero Widget → Adicionar. O ponto é configurado depois em Ajustes. Compilação, lint, assinatura de atualização e flags do APK conferidos; ainda é necessário validar a adição no Galaxy A55 do usuário.

### Adicionar no Galaxy A55

Instale a atualização 0.2.1 e abra Radar Aero Widget. Toque em Adicionar widget à tela inicial; as coordenadas podem ser configuradas depois. Se a confirmação não aparecer, mantenha pressionado um espaço vazio da tela inicial → Widgets → Radar Aero Widget → Adicionar.

## Rotas e detalhes compactos — widget 0.3.0

Ao selecionar um avião, os detalhes aparecem em um cartão inferior compacto no celular, com o avião enquadrado no mapa acima. No PC, o cartão flutua à direita. Voltar ao mapa fecha os detalhes.

Origem e destino são consultados sob demanda por indicativo na API pública [adsbdb](https://www.adsbdb.com), com cache temporário em memória e atribuição visível. As rotas cadastradas podem variar e não confirmam a operação do dia. Não há banco de rotas empacotado ou exportável. Créditos e condições da fonte: [adsbdb](https://github.com/mrjackwills/adsbdb).

O widget 0.3.0 consulta os aeroportos dos até três aviões mais próximos. O tamanho do widget determina quantas aeronaves aparecem. Falhas na consulta de rotas não removem as posições recebidas. O usuário confirmou a adição do widget anterior no Galaxy A55; esta atualização requer conferência no aparelho.

Validação: testes de rotas, cache e instalação web; compilação e lint Android; assinatura de atualização preservada; mapa e cartão conferidos em viewport 390 × 844.

### Atualizar o widget com aeroportos

[Baixar widget Android 0.3.0](https://riquee05.github.io/radar-aero/downloads/radar-aero-widget-0.3.0.apk). Instale por cima da versão anterior, sem desinstalar. No widget, toque em Atualizar para consultar saída e destino quando houver rota cadastrada.

## Seguir avião e leitura do widget — 0.4.0

O botão Seguir avião acompanha somente novas posições recebidas. Arrastar o mapa, escolher outra aeronave, voltar ao mapa ou trocar a região encerra o acompanhamento. Se a posição exceder 60 segundos, a aeronave sair da consulta ou a fonte falhar, o acompanhamento para sem extrapolar a trajetória.

O widget separa identificação em destaque, rota e distância/modelo/altitude. Um contador mostra o tempo decorrido desde a consulta, inclusive entre atualizações; dados antigos recebem aviso ao redesenhar. Os botões permanecem fora da área reservada às aeronaves. As informações descrevem a última consulta, não rastreamento contínuo no widget.

Validação: testes de acompanhamento (posição nova, antiga, ausente, inválida e falha da fonte); navegação e acompanhamento em viewport 390 × 844, incluindo parada ao arrastar; compilação e lint Android. A aparência nativa precisa ser conferida no Galaxy A55, pois não há aparelho conectado neste PC.

### Usar as novidades

Selecione uma aeronave e toque em Seguir avião. Para explorar livremente, arraste o mapa ou toque em Parar. [Atualize o widget para 0.4.0](https://riquee05.github.io/radar-aero/downloads/radar-aero-widget-0.4.0.apk), sem desinstalar. O contador mostra o tempo desde a consulta; toque em Atualizar para consultar novamente.

## Modo Spotter — web 0.5.0

Filtros combinados de companhia (TAM/AZU/GLO), velocidade em nós e variação observada, junto aos filtros de altitude, modelo e somente em voo. Até cinco combinações podem ser nomeadas, salvas, aplicadas e excluídas no navegador. O botão Spotter no mapa abre os controles. A troca de região limpa os filtros ativos, preservando as combinações salvas.

A indicação de subida/descida é uma estimativa entre duas altitudes barométricas recebidas nesta sessão, separadas por 10 a 60 segundos, com tolerância de 300 pés/min para estável. Não é a velocidade vertical transmitida pela aeronave. Sem amostras suficientes, no solo ou com posição antiga, a indicação fica indisponível.

A trajetória usa verde abaixo de 10 mil pés, ciano entre 10 e 25 mil, violeta a partir de 25 mil e cinza quando a altitude não está disponível. Nos detalhes, Gráficos da sessão mostra altitude e velocidade ao longo do tempo: até 120 amostras por aeronave; lacunas acima de 60 segundos e valores ausentes interrompem as linhas. Sem dados simulados ou histórico anterior à sessão. Ao recarregar ou mudar a região, as amostras são descartadas.

Validação: testes de filtros, normalização das combinações, estimativa e lacunas de trajetória/gráficos; testes de acompanhamento, instalação e cache. Interface conferida em celular 390 × 844 com posições reais, aplicação do filtro LATAM, salvamento/recarregamento/exclusão e gráficos com amostras recebidas. APK permanece 0.4.0, pois esta etapa atualiza apenas o site/PWA.

### Abrir o Modo Spotter

[Acessar versão web 0.5.0](https://riquee05.github.io/radar-aero/?release=0.5.0). Toque em Spotter no mapa para combinar e salvar filtros. Selecione um avião e abra Gráficos da sessão para acompanhar altitude e velocidade recebidas. Não é necessário atualizar o APK 0.4.0 nesta etapa.

## Aeroportos, painéis oficiais e clima — web 0.6.0

Clicar em um aeroporto no mapa ou em Ver voos e clima na lista abre um cartão compacto. Os botões Voos e Clima no topo levam às respectivas seções. O cartão identifica aeroporto/cidade/códigos e permite favoritar, abrir o painel oficial em outra aba e voltar ao mapa. Trocar o aeroporto não permite que uma resposta meteorológica atrasada substitua o cartão atual.

Por escolha do usuário, chegadas, partidas, horários e status são consultados nos canais oficiais externos, sem importar tabelas, inferir horários ou exigir API paga: GRU Airport, RIOgaleão, Viracopos, Aena/Congonhas e Salvador Bahia Airport. Brasília abre o site oficial bsb.aero com orientação para escolher Voos; a leitura automatizada desse site recebeu HTTP 403, por isso não foi inventado um endereço de painel interno.

Clima direto no cartão via Open-Meteo: temperatura, vento, direção, umidade e precipitação do intervalo atual, com horário de referência em America/Sao_Paulo, atribuição e licença CC BY 4.0. São estimativas meteorológicas da região do aeroporto, não METAR nem observações da estação aeroportuária. Consultas limitadas aos seis aeroportos cadastrados, com cache em memória de 10 minutos, deduplicação e atualização manual. Falhas são explicitadas e valores ausentes não viram zero.

Fontes: https://open-meteo.com/en/docs ; https://www.gru.com.br/pt/passageiro/voos ; https://www.riogaleao.com/passageiros/voos/painel-de-voos/ ; https://www.viracopos.com/pt_br/passageiro/painel-de-voos.htm ; https://www.aenabrasil.com.br/pt/aeroportos/aeroporto-de-congonhas/informacoes-de-voos.html ; https://www.salvador-airport.com.br/index.php/pt-br/partidas-e-chegadas ; https://www.bsb.aero/

Validação: testes de clima, cache/atualização, restrição de aeroportos e falhas; regressões de Spotter, acompanhamento, instalação e cache offline. Consulta real com CORS permitida; cartões de GRU e SSA, mudança de região, retorno ao mapa e atalhos Voos/Clima conferidos em viewport 390 × 844. O APK continua na versão 0.4.0.

### Consultar aeroporto

[Abrir versão web 0.6.0](https://riquee05.github.io/radar-aero/?release=0.6.0). Toque no ícone de um aeroporto no mapa, ou use Aeroportos → Ver voos e clima. No cartão, Voos abre a seção com o painel oficial externo; Clima mostra a estimativa meteorológica. O botão Voltar ao mapa permanece disponível.

## Retorno ao mapa de aviões — web 0.6.1

Corrigido o desencontro entre câmera e consulta após abrir um aeroporto de outra região. Ao voltar de um aeroporto, o app restaura a região/ponto e o enquadramento anteriores, retoma a aba Tráfego, limpa os filtros transitórios e consulta novamente se necessário. Favoritos e filtros salvos são preservados. O botão Tráfego agora abre a lista de aeronaves mesmo que a aba anterior fosse Aeroportos.

Os controles passam a dizer Aviões e Mapa de aviões. Um mapa vazio informa se a causa é filtro, câmera fora da área das aeronaves, ausência de posições recentes ou falha da consulta, oferecendo uma ação de recuperação. Nenhuma posição é inventada quando há lacunas de cobertura.

Validação: regressões de retorno de aeroporto entre regiões, restauração da consulta e câmera e atualização de dados antigos; testes existentes de aeroportos, Spotter, acompanhamento, instalação e cache. Teste real São Paulo → Salvador → mapa original com 53 aeronaves, busca sem resultados e recuperação, em PC e viewport móvel 390 × 844.

### Voltar aos aviões

[Abrir versão corrigida 0.6.1](https://riquee05.github.io/radar-aero/?release=0.6.1). Use Aviões na barra inferior ou Mapa de aviões no cartão do aeroporto. Ao abrir um aeroporto de outra região, o retorno restaura a consulta e a câmera anteriores. Se o mapa estiver vazio, use a ação de recuperação exibida no centro.

## Aeroportos na barra principal — web 0.6.2

Adicionado Aeroportos entre Tráfego e Widget na navegação principal. O botão abre diretamente a lista dos seis aeroportos, com busca e acesso a voos/clima, sem exibir os controles de ponto salvo. O estado ativo distingue aeroportos de tráfego, inclusive ao abrir o cartão de um aeroporto pelo mapa. No celular, ícones e textos em duas linhas mantêm os quatro botões dentro da tela sem abrir o teclado automaticamente.

Os marcadores de aeroportos usam ícone de terminal, código em destaque, contraste e prioridade sobre os ícones de aeronaves. O mapa possui contexto de empilhamento próprio: aviões e logos não podem cobrir título, controles ou legenda. O retorno ao mapa de aviões da versão 0.6.1 foi preservado.

Validação: lista direta, estado ativo, abertura de GRU e retorno aos aviões em viewport 390 × 844; quatro botões sem transbordamento; terminais GRU/CGH/VCP visíveis e título da região desobstruído. Testes existentes de navegação, clima, instalação e cache passaram. APK permanece 0.4.0.

### Acesso direto aos aeroportos

[Abrir versão 0.6.2](https://riquee05.github.io/radar-aero/?release=0.6.2). Use Aeroportos na barra inferior para abrir a lista, escolha o aeroporto e consulte Voos ou Clima. Use Aviões para retornar ao mapa de aeronaves.

## Voos clicáveis e quantidade no widget — Android 0.5.0 / web 0.7.0

Cada linha do widget abre o mapa com o identificador hexadecimal da aeronave, o ponto salvo e o raio. O site seleciona automaticamente apenas a aeronave correspondente com posição recente da consulta. Se ela não estiver disponível, mostra um aviso dispensável, sem selecionar outro voo e sem inventar posições. A seleção é consumida uma vez para não reabrir os detalhes a cada atualização.

Em Ajustes, escolha 1 avião (o mais próximo) ou até 3 e toque em Aplicar quantidade de aviões. Essa escolha é salva separadamente do ponto, vale para todos os widgets e não exige coordenadas nem nova consulta. Para três linhas, aumente a altura do widget: a exibição continua respeitando o espaço disponível. O fluxo de adição já validado no Galaxy A55 foi preservado. Snapshots de versões antigas sem identificador abrem o mapa; Atualizar passa a receber os identificadores.

Validação: testes de seleção por link (identificador válido/inválido, aeronave ausente/antiga e seleção única), regressões de navegação, acompanhamento, instalação e cache; compilação assembleDebug e lintDebug Android sem erros; versão 0.5.0 e assinatura de atualização preservada. Link com ponto/raio abriu a aeronave real PS-LPD no navegador em viewport 390 × 844; aviso de aeronave ausente também conferido. Não há aparelho Android conectado; é necessário conferir os toques e a quantidade no Galaxy A55 após instalar a atualização.

### Atualizar e escolher a quantidade

[Baixar widget 0.5.0](https://riquee05.github.io/radar-aero/downloads/radar-aero-widget-0.5.0.apk). Instale por cima, sem desinstalar. Em Ajustes, escolha 1 ou até 3 aviões e toque em Aplicar quantidade de aviões. Amplie o widget verticalmente para ver os três. Toque em Atualizar para renovar os dados; depois toque em uma linha para abrir o voo no mapa. Site atualizado: https://riquee05.github.io/radar-aero/?release=0.7.0
