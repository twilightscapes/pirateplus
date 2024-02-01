import React, { useState, useEffect } from "react";
import ReactPlayer from 'react-player/lazy';
import { ImYoutube2 } from "react-icons/im";
import { FaTwitch } from "react-icons/fa";
const YouTubePlayer = () => {
  const [youtubelink, setYoutubelink] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const fillFormFromClipboard = () => {
      navigator.clipboard.readText().then((clipboardText) => {
        setYoutubelink(clipboardText);
        handleShow();
      });
    };

    fillFormFromClipboard();
  }, []); // Empty dependency array to run the effect only once

  const handleInputChange = (event) => {
    const { value } = event.target;
    setYoutubelink(value);
  };

  const handleShow = () => {
    setIsActive(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleReset = () => {
    setYoutubelink("");
    setIsActive(false);
  };

  const finalUrl = `https://www.youtube.com/embed/${youtubelink}?controls=1&showinfo=1&color=white&rel=0&autoplay=1&loop=1&mute=0&playlist=${youtubelink}`;

  return (
    <>
      <div className='player-wrapper '>
        {youtubelink && (
          <ReactPlayer
            className='react-player'
            url={finalUrl}
            width='100%'
            height='94vh'
            config={{
              youtube: {
                playerVars: { showinfo: 1, autoplay: 1, controls: 1, mute: 0 }
              },
            }}
            playing
            color="white"
          />
        )}
      </div>

      {!isActive ? (
        <div className="form-container">
          <form className="youtubeform frontdrop" onSubmit={handleSubmit}>
          <div className="specialfont" style={{ fontSize: 'clamp(1rem, 1vw, 1rem)', marginTop: '', fontWeight: 'bold', border: '0px solid', display: 'grid', color: '', placeItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
              <a title="Go Home" href="https://youtube.com" style={{ padding: '', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '', }}>
                <ImYoutube2 style={{ fontSize: '50px' }} />
              </a>
            </div>
            <div className="specialfont" style={{ fontSize: 'clamp(1rem, 1vw, 1rem)', marginTop: '', fontWeight: 'bold', border: '0px solid', display: 'grid', color: '', placeItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
              <a title="Go Home" href="https://www.twitch.tv/directory" style={{ padding: '', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '', }}>
                <FaTwitch style={{ fontSize: '30px' }} />
              </a>
            </div>
            {/* <p className="specialfont" style={{ fontSize: 'clamp(.8rem, .8vw, 1rem)', marginTop: '', fontWeight: 'bold', border: '0px solid', display: 'grid', color: '', placeItems: 'center', justifyContent: 'center', margin: '0 auto', width:'' }}><div>Paste</div> Link:</p> */}
            <input
              type="text"
              name="youtubelink"
              value={youtubelink}
              onInput={handleInputChange}
              onChange={handleShow}
              style={{ padding: '1vh .5vw', minWidth: '220px', outline: '1px solid #333', borderRadius: '', color: 'var(--theme-ui-colors-siteColor)' }}
              placeholder="example: https://youtu.be/cVsQLlk-T0s"
              className="youtubelinker"
            />
            <button type="reset" onClick={handleReset} style={{ fontSize: '90%', color: '', fontWeight: 'bold', textAlign: 'left', width: '', margin: '5px 15px 0 0' }}>
              Reset
            </button>
          </form>
        </div>
      ) : (
        <div className="form-container">
          <form className="youtubeform frontdrop" onSubmit={handleSubmit}>
          <div className="specialfont" style={{ fontSize: 'clamp(1rem, 1vw, 1rem)', marginTop: '', fontWeight: 'bold', border: '0px solid', display: 'grid', color: '', placeItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
              <a title="Go Home" href="https://youtube.com" style={{ padding: '', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '', }}>
                <ImYoutube2 style={{ fontSize: '50px' }} />
              </a>
            </div>
            <div className="specialfont" style={{ fontSize: 'clamp(1rem, 1vw, 1rem)', marginTop: '', fontWeight: 'bold', border: '0px solid', display: 'grid', color: '', placeItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
              <a title="Go Home" href="https://www.twitch.tv/directory" style={{ padding: '', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '', }}>
                <FaTwitch style={{ fontSize: '30px' }} />
              </a>
            </div>
            <input
              type="text"
              name="youtubelink"
              value={youtubelink}
              onInput={handleInputChange}
              onChange={handleShow}
              style={{ padding: '1vh .5vw', minWidth: '220px', outline: '1px solid #333', borderRadius: '', color: 'var(--theme-ui-colors-siteColor)' }}
              placeholder="example: https://youtu.be/cVsQLlk-T0s"
              className="youtubelinker"
            />
            <button type="reset" onClick={handleReset} style={{ fontSize: '90%', color: '', fontWeight: 'bold', textAlign: 'left', width: '', margin: '5px 15px 0 0' }}>
              Reset
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default YouTubePlayer;
