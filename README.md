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
- [Atualizar o widget Android 0.2.1](https://riquee05.github.io/radar-aero/downloads/radar-aero-widget-0.2.1.apk)

No app já instalado, use Widget na barra inferior. No Android, instale o APK atualizado para obter o botão Adicionar widget à tela inicial.


## Widget 0.2.1 — adição sem coordenadas obrigatórias

Removida a exigência de salvar um ponto antes de solicitar a adição à tela inicial. O botão Adicionar widget aparece antes do formulário. Configuração inicial opcional no Android 12 ou superior; a configuração acionada pelo launcher também permite adicionar agora e configurar depois. A confirmação de adição usa callback do sistema, sem tratar a solicitação aceita como widget já instalado.

Feedback visível e caminho manual para o Galaxy: tela inicial → manter um espaço vazio pressionado → Widgets → Radar Aero Widget → Adicionar. O ponto é configurado depois em Ajustes. Compilação, lint, assinatura de atualização e flags do APK conferidos; ainda é necessário validar a adição no Galaxy A55 do usuário.


### Adicionar no Galaxy A55

Instale a atualização 0.2.1 e abra Radar Aero Widget. Toque em Adicionar widget à tela inicial; as coordenadas podem ser configuradas depois. Se a confirmação não aparecer, mantenha pressionado um espaço vazio da tela inicial → Widgets → Radar Aero Widget → Adicionar.
