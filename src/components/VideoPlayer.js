import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from 'react-player/lazy';
import { ImYoutube2 } from "react-icons/im";
import { FaTwitch, FaFacebookSquare } from "react-icons/fa";
import useSiteMetadata from "../hooks/SiteMetadata";
import PageMenu from "../components/PageMenu";

const VideoPlayer = ({ location }) => {
  const queryParams = new URLSearchParams(location.search);
  const videoUrlParam = queryParams.get('video');
  const startTimeParam = queryParams.get('start');
  const stopTimeParam = queryParams.get('stop');
  const loopParam = queryParams.get('loop') === 'true';
  const muteParam = queryParams.get('mute') === 'true';
  const controlsParam = queryParams.get('controls') === 'true';

  const { featureOptions, proOptions } = useSiteMetadata();
  const { showBranding } = proOptions;
  const { showNav } = featureOptions;
  const inputElement = useRef(null);
  const playerRef = useRef(null);
  const [youtubelink, setYoutubelink] = useState(videoUrlParam || "");
  const [startInputValue, setStartInputValue] = useState(startTimeParam || "");
  const [stopInputValue, setStopInputValue] = useState(stopTimeParam || "");
  const [loop, setLoop] = useState(loopParam);
  const [mute, setMute] = useState(muteParam);
  const [controls, setControls] = useState(controlsParam === 'false' ? false : true);
  const [copied, setCopied] = useState(false);
  const [scrubbing, setScrubbing] = useState(false);
  const [endFocused, setEndFocused] = useState(false);

  useEffect(() => {
    const fillFormFromClipboard = async () => {
      try {
        const clipboardText = await navigator.clipboard.readText();
        if (isValidURL(clipboardText)) {
          setYoutubelink(clipboardText);
          updateQueryString({ video: clipboardText });
        }
      } catch (error) {
        console.error("Error reading clipboard:", error.message);
      }
    };
    fillFormFromClipboard();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateQueryString({ video: youtubelink, start: startInputValue, stop: stopInputValue, loop, mute, controls });
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      if (name === 'mute') {
        setMute(checked);
      } else if (name === 'controls') {
        setControls(checked);
      } else {
        setLoop(checked);
      }
    } else {
      if (name === 'video') {
        setYoutubelink(value);
      } else if (name === 'start') {
        setStartInputValue(value);
      } else if (name === 'stop') {
        setStopInputValue(value);
      }
      updateQueryString({ video: youtubelink, start: startInputValue, stop: stopInputValue, loop, mute, controls });
    }
  };

  const handleReset = () => {
    setYoutubelink("");
    setStartInputValue("");
    setStopInputValue("");
    setLoop(false);
    setMute(false);
    setControls(false);
    updateQueryString({ video: "", start: "", stop: "", loop: false, mute: false, controls: false });
  };

  const updateQueryString = (values) => {
    const { video, start, stop, loop, mute, controls } = values;
    const newUrl = `${window.location.pathname}?video=${encodeURIComponent(video)}&start=${encodeURIComponent(start)}&stop=${encodeURIComponent(stop)}&loop=${loop}&mute=${mute}&controls=${controls}`;
    window.history.pushState({}, '', newUrl);
  };

  const copyToClipboard = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((error) => console.error("Error copying to clipboard:", error));
    }
  };

  const handleShareButtonClick = () => {
    if (typeof window !== 'undefined') {
      if (navigator.share) { 
        navigator.share({
          title: 'PIRATE',
          url: window.location.href
        }).then(() => {
          console.log('Thanks for being a Pirate!');
        })
        .catch(console.error);
      }
    }
  };

  const handleCopyAndShareButtonClick = () => {
    copyToClipboard();
    handleShareButtonClick();
  };

  function isRunningStandalone() {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(display-mode: standalone)').matches;
    }
    return false;
  }

  const isVideoActive = youtubelink !== "";

  const handleProgress = ({ playedSeconds }) => {
    if (!scrubbing) {
      if (document.activeElement.id === 'start-input') {
        setStartInputValue(parseFloat(playedSeconds).toFixed(2));
      } else if (document.activeElement.id === 'stop-input') {
        setStopInputValue(parseFloat(playedSeconds).toFixed(2));
      }
    }
  };
  
  const handleSeek = ({ playedSeconds }) => {
    if (scrubbing || (!playerRef.current.getInternalPlayer().getPlayerState() && (document.activeElement.id === 'start-input' || document.activeElement.id === 'stop-input'))) {
      if (endFocused && document.activeElement.id === 'stop-input') {
        setStopInputValue(parseFloat(playedSeconds).toFixed(2));
      } else if (!endFocused && document.activeElement.id === 'start-input') {
        setStartInputValue(parseFloat(playedSeconds).toFixed(2));
      }
    }
  };
  
  


  return (
    <>
      <div id="piratevideo" className='player-wrapper' style={{ display: 'grid', placeContent: '', width: '100vw', transition: 'all 1s ease-in-out' }}>

      <div className="form-container controller font" style={{ position: 'relative', zIndex: '3', top: '0', height: 'auto', width: '100vw', maxWidth:'', margin: '0 auto', marginTop: showNav ? '0' : '0', transition: 'all 1s ease-in-out', background: 'var(--theme-ui-colors-headerColor)' }}>

          <div style={{  maxWidth:'90vw', margin: '0 auto', padding:'2vh 1vw 0 1vw', }}>
            
            <form className="youtubeform frontdrop" onSubmit={handleSubmit} id="youtubeform" name="youtubeform" style={{maxWidth:'', minWidth:''}}>

            {isRunningStandalone() && (
                <>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  aria-label="Start Time"
                  id="start-input"
                  className="youtubelinker"
                  type="text"
                  name="start"
                  value={startInputValue}
                  onChange={handleInputChange}
                  onFocus={() => {
                    setScrubbing(false);
                    setEndFocused(false); // Set endFocused to false when start input is focused
                  }}
                  placeholder="Start"
                  style={{ maxWidth: '60px', fontSize: 'clamp(1rem,.8vw,1.3rem)', textAlign: 'center' }}
                />
                <input
                  aria-label="Stop Time"
                  id="stop-input"
                  className="youtubelinker"
                  type="text"
                  name="stop"
                  value={stopInputValue}
                  onChange={handleInputChange}
                  onFocus={() => {
                    setScrubbing(false);
                    setEndFocused(true); // Set endFocused to true when end input is focused
                  }}
                  onBlur={() => setEndFocused(false)} // Reset endFocused when end input is blurred
                  placeholder="Stop"
                  style={{ maxWidth: '60px', fontSize: 'clamp(1rem,.8vw,1.4rem)', textAlign: 'center' }}
                />
              </div>


              
              <div style={{ display: 'flex', gap: '1vw', alignItems: 'center' }}>
              <label htmlFor="loop-checkbox" style={{textAlign:'center', fontSize:'60%'}}>Loop:
                  <input
                    aria-label="Set to loop"
                    id="loop-checkbox"
                    className="youtubelinker"
                    type="checkbox"
                    name="loop"
                    checked={loop}
                    onChange={handleInputChange}
                    style={{maxWidth:'50px'}}
                  />
                </label>
                <label htmlFor="mute-checkbox" style={{textAlign:'center', fontSize:'60%'}}>Mute:
                  <input
                    aria-label="Set to mute"
                    id="mute-checkbox"
                    className="youtubelinker"
                    type="checkbox"
                    name="mute"
                    checked={mute}
                    onChange={handleInputChange}
                    style={{maxWidth:'50px'}}
                  />
                </label>
              
    
                <label htmlFor="controls-checkbox" style={{textAlign:'center', fontSize:'60%'}}>Controls:
                  <input
                    aria-label="Set to show controls"
                    id="controls-checkbox"
                    className="youtubelinker"
                    type="checkbox"
                    name="controls"
                    checked={controls}
                    onChange={handleInputChange}
                    style={{maxWidth:'50px'}}
                  />
                </label>


              </div>
              </>
              )}




              <input
                ref={inputElement}
                id="youtubelink-input"
                type="text"
                name="video"
                value={youtubelink}
                onChange={handleInputChange}
                style={{ padding: '.5vh 1vw', minWidth:'100px', width: '', maxWidth: '800px', fontSize: 'clamp(.8rem,1.5vw,2rem)', transition: 'all 1s ease-in-out' }}
                placeholder="Paste Link To Video"
                className="youtubelinker"
                aria-label="Paste Link To Video"
              />

              <button aria-label="Reset" type="reset" onClick={handleReset} style={{ color: '', fontSize: 'clamp(.8rem,1,2vw,1rem)', fontWeight: 'bold', textAlign: 'left', width: '30px', margin: '', opacity: isVideoActive ? 1 : 0.5 }}>
                Reset
              </button>

              <button aria-label="Copy Link" onClick={handleCopyAndShareButtonClick} style={{ display: "flex", gap: '.5vw', justifyContent: "center", padding: ".5vh .8vw", width:'80px', maxHeight: "", margin: "0 auto", textAlign: 'center', fontSize: '14px', fontWeight: 'light', textShadow: '0 1px 0 #000', marginLeft:'15px', opacity: isVideoActive ? 1 : 0.5 }} className="button font print">
                <svg style={{ maxWidth: '30px', maxHeight: '30px' }}>
                  <use href="#share-icon"></use>
                </svg>   {copied ? 'Copied Link' : 'Copy Link'}
              </button>



              {isRunningStandalone() && (
                <>
                  <a title="Open YouTube" aria-label="Open YouTube" href="https://youtube.com">
                    <ImYoutube2 style={{ fontSize: '50px', opacity:'.5' }} />
                  </a>
                  <a title="Open Facebook" aria-label="Open Facebook" href="https://www.facebook.com/watch/">
                    <FaFacebookSquare style={{ fontSize: '30px', opacity:'.5' }} />
                  </a>
                  <a title="Open Twitch" aria-label="Open Twitch" href="https://www.twitch.tv/directory">
                    <FaTwitch style={{ fontSize: '30px', opacity:'.5' }} />
                  </a>
                </>
              )}


            </form>
          </div>
        </div>



        <svg className="hidden">
          <defs>
            <symbol id="share-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></symbol>
          </defs>
        </svg>
        {showBranding ? (
          <PageMenu />
        ) : ( "")}
        <ReactPlayer
          ref={playerRef}
          allow="web-share"
          style={{
            position: 'relative', top: '0', margin: '0 auto 0 auto', zIndex: '1', overflow: 'hidden', width: '100vw', minHeight: '', height: '100%', background: 'transparent',
            transition: 'all 1s ease-in-out',
          }}
          width="100%"
          height="100%"
          url={youtubelink}
          playing={true}
          controls={controls}
          playsinline
          loop={loop}
          muted={mute}
          config={{
            youtube: {
              playerVars: { showinfo: false, autoplay: false, controls: controls ? 1 : 0, start: startInputValue || "0", end: stopInputValue || null, mute: false }
            },
          }}
          onProgress={handleProgress}
          onSeek={handleSeek}
        />
      </div>
    </>
  );
};

export default VideoPlayer;

const isValidURL = (url) => {
  const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlPattern.test(url);
};
