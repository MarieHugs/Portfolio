/** Componsante Video de TimTools */
export default class Video {
    /**
     * Méthode constructeur
     * @param {HTMLElement} element - Élément HTML sur lequel la composante est instanciée
     */
    constructor(element) {
      this.element = element;
  
      this.videoContainer = this.element.querySelector('.js-video');
      this.poster = this.element.querySelector('.js-poster');
      this.videoId = this.element.dataset.videoId;
      this.autoplay = this.poster ? 1 : 0;
      this.playerReady = false;
  
      this.controls = this.element.dataset.controls;
  
      Video.instances.push(this);
      if (this.videoId) {
        Video.loadScript();
      } else {
        console.error('Vous devez soécifier un id');
      }
    }
    /**
     * Méthode qui charge la librairie de youtube pour que les vidéos apparaissent
     */
    static loadScript() {
      if (!Video.scriptIsLoading) {
        Video.scriptIsLoading = true;
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(script);
      } else {
      }
    }
  
    /**
     * Méthode d'initialisation
     */
    init() {
      this.initPlayer = this.initPlayer.bind(this);
      console.log('le js est prêt');
      if (this.poster) {
        this.element.addEventListener('click', this.initPlayer);
      } else {
        this.initPlayer();
      }
    }
  
    /**
     * Méthode d'initialisation de la vidéo
     */
    initPlayer(event) {
      if (event) {
        this.element.removeEventListener('click', this.initPlayer);
      }
  
      this.player = new YT.Player(this.videoContainer, {
        height: '100%',
        width: '100%',
        videoId: this.videoId,
        playerVars: { rel: 0, controls: this.controls, autoplay: this.autoplay },
        events: {
          onReady: () => {
            this.playerReady = true;
            const observer = new IntersectionObserver(this.watch.bind(this), {
              rootMargin: '0px 0px 0px 0px',
            });
            observer.observe(this.element);
          },
          onStateChange: (event) => {
            if (event.data == YT.PlayerState.PLAYING) {
              //PAUSE TOUS LES VIDÉO SAUF CELUI QUI JOUR
              Video.pauseAll(this);
            } else if (event.data == YT.PlayerState.ENDED) {
              this.player.seekTo(0);
              this.player.pauseVideo();
            }
          },
        },
      });
    }
  
    /**
     * Méthode watch
     * @param {HTMLElement} entries - Élément HTML sur lequel la composante est instanciée
     */
    watch(entries) {
      if (this.playerReady && !entries[0].isIntersecting) {
        this.player.pauseVideo();
      }
    }
  
    /** Méthode pour initialiser les instances vidéos */
    static initAll() {
      document.documentElement.classList.add('is-video-ready');
  
      for (let i = 0; i < Video.instances.length; i++) {
        const instance = Video.instances[i];
        instance.init();
      }
    }
  
    /**
     * Méthode pour arrêter les vidéos en cours
     * @param {HTMLElement} currentInstance - Élément HTML sur lequel la composante est instanciée
     */
    static pauseAll(currentInstance) {
      for (let i = 0; i < Video.instances.length; i++) {
        const instance = Video.instances[i];
        if (instance.playerReady && instance !== currentInstance) {
          instance.player.pauseVideo();
        }
      }
    }
  }
  
  Video.instances = [];
  window.onYouTubeIframeAPIReady = Video.initAll;