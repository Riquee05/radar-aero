# Radar Aero Widget — Android

Projeto nativo Java, sem bibliotecas pagas e sem permissão de localização. Todos os widgets compartilham um ponto fixo salvo localmente.

## Compilar
Abra esta pasta no Android Studio. Use JDK 17, Gradle 8.11.1, Android SDK 35 / Build Tools 35.0.0 e sincronize o projeto (AGP 8.9.2). APK de desenvolvimento gerado e lint Android aprovado sem erros. Ainda não foi executado em um celular ou emulador. Ferramentas portáteis disponíveis em ../.sites-runtime/android-tools (não versionadas). Foi usado Temurin JDK 21, compatível com a exigência mínima JDK 17 do AGP. Depois use Build > Build APK(s). Com Gradle 8.11.1 instalado: gradle assembleDebug. Não há Gradle Wrapper binário incluído.

## Usar
Instale o APK de desenvolvimento no Android, abra Radar Aero Widget e informe latitude, longitude e raio; ou importe radar-aero-widget.json exportado pelo botão Configuração do widget na PWA. O endereço do radar é opcional e exige HTTPS publicado, acessível pelo celular. O endereço local 127.0.0.1 do computador não funciona no telefone. Depois pressione a tela inicial e adicione o widget Radar Aero. A altura compacta mostra o avião mais próximo; ao expandir mostra até três.

Atualização manual e solicitação automática a cada 30 minutos, sujeita a bateria, conexão e regras do Android. Cada resultado mostra horário da consulta; não representa acompanhamento contínuo. Posições com mais de 120 segundos são ignoradas no momento da consulta. Sem recepção não significa céu vazio. Altitudes são barométricas; distâncias horizontais.

O widget consulta diretamente a API pública adsb.lol por HTTPS, evitando depender de sessão de acesso privada da PWA. Dados ODbL: https://www.adsb.lol/docs/open-data/api . Companhia inferida apenas por indicativo. Esta primeira versão nativa mostra nomes das companhias; os logos permanecem no mapa/PWA. Toque no widget para abrir o radar no ponto configurado, ou em Configurar para alterar o ponto. Sem publicidade, histórico de localização ou uso para navegação aérea.

## Versão 0.2.1
Você pode adicionar o widget antes de preencher coordenadas. Abra o aplicativo, toque em Adicionar widget à tela inicial e confirme no Android. No Galaxy, se a janela não aparecer, use Não abriu? Adicionar pelo menu Widgets. Depois escolha seu ponto em Ajustes. A versão instalada aparece no cabeçalho do aplicativo.
