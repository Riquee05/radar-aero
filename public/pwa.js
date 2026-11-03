let promptEvent;const button=document.querySelector('#install-app'),help=document.querySelector('#install-help'),status=document.querySelector('#install-status');
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();promptEvent=e;button.textContent='Instalar app';});
button.onclick=async()=>{if(promptEvent){await promptEvent.prompt();await promptEvent.userChoice;promptEvent=null;}else help.showModal();};
document.querySelector('#close-install').onclick=()=>help.close();
if(matchMedia('(display-mode: standalone)').matches){button.textContent='App instalado';button.hidden=true;}
window.addEventListener('appinstalled',()=>{button.hidden=true;});
if('serviceWorker' in navigator)window.addEventListener('load',()=>{navigator.serviceWorker.register('./sw.js').then(()=>{status.textContent+=' A abertura básica fica disponível offline; posições e mapa precisam de internet.';}).catch(()=>{status.textContent+=' A preparação offline não foi concluída. Tente recarregar com internet.';});});
