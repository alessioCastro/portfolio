import { Application } from "https://unpkg.com/@splinetool/runtime@latest/build/runtime.js";

const introCanvas = document.getElementById("spline-welcome");
const appIntro = new Application(introCanvas);

appIntro
  .load("https://prod.spline.design/DnzAB-6z7jxJE8Nz/scene.splinecode")
  .then(async () => {
    // The scene is loaded and ready to go!

    introCanvas.style.animation = "fadeIn 3s ease forwards 1s";
    const jaDeuBoasVindas = sessionStorage.getItem("jaDeuBoasVindas");

    const intro = document.getElementById("intro-screen");

    const conteudo = document.getElementById("conteudo");

    if (jaDeuBoasVindas) {
      intro.remove();
      conteudo.style.opacity = "1";
      return;
    }

    // Espera a câmera girar completamente
    await waitForCameraRotation(0.47853123486335825);

    finalizarIntro();
  });

const canvas = document.getElementById("sp");
const appSp = new Application(canvas);

appSp
  .load("https://prod.spline.design/jRgCwa1zLIxSMrBC/scene.splinecode")
  .then(() => {
    /*appSp.addEventListener('mouseHover', (e) => {
        console.log('Evento mouseDown capturado:', e);
        // e.target contém o objeto clicado
        if (e.target && e.target.name === 'Button') {
            console.log('Objeto clicado:', e.target.name);
            // Execute ações específicas aqui
        }
    });

    canvas.addEventListener('wheel', (e) => {
        console.log(e)
        e.preventDefault();
    }, { passive: false })*/
  });

function waitForCameraRotation(targetY, tolerance = 0.01) {
  return new Promise((resolve) => {
    function checkRotation() {
      const camera = appIntro._camera;
      const currentY = camera.rotation.y;

      if (Math.abs(currentY - targetY) < tolerance) {
        resolve();
      } else {
        requestAnimationFrame(checkRotation)
      }
    }
    
    checkRotation();
  });
}
