import React, { useState, useEffect } from "react";
import ReactPlayer from 'react-player/lazy';
import { ImYoutube2 } from "react-icons/im";
import { FaTwitch, FaFacebookSquare  } from "react-icons/fa";
import {Link} from "gatsby"
import { RiQuestionLine, RiCloseCircleFill } from "react-icons/ri"
import PirateLogo from "../img/logo.svg"
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

  const finalUrl = youtubelink


  const [isMenuOpen, setIsMenuOpen] = useState(true);
  /* eslint-disable-next-line no-unused-vars */
  const [isMobile, setIsMobile] = useState(false);
  

  const resizeMobile = () => {
    setIsMenuOpen(false);
    setIsMobile(true);
    const elements = document.querySelectorAll(".menusnapp");
    elements.forEach((el) => {
      el.style.display = "none";
      el.style.overflow = "hidden";
      el.style.transition = "transform 1550ms ease-in-out";
    });
  };

  const resizeDesk = () => {
    setIsMenuOpen(true);
    setIsMobile(false);
    const elements = document.querySelectorAll(".menusnapp");
    elements.forEach((el) => {
      el.style.display = "flex";
      el.style.transition = "transform 1550ms ease-in-out";
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedIsMenuOpen = window.localStorage.getItem("isMenuOpen");
      if (storedIsMenuOpen) {
        setIsMenuOpen(storedIsMenuOpen === "true");
      } else {
        setIsMenuOpen(true); // set default value to true if no value found in local storage
      }
    }
  }, []);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("isMenuOpen", isMenuOpen);
    }
  }, [isMenuOpen]);
  

  const MenuIcon = isMenuOpen ? RiCloseCircleFill : PirateLogo;



  return (
    <>
      <div className='player-wrapper '>
        {youtubelink && (
          <ReactPlayer
            className='react-player'
            url={finalUrl}
            width='100vw'
            height='94vh'
            config={{
              youtube: {
                playerVars: { showinfo: 1, autoplay: 1, controls: 1, mute: 0 }
              },
            }}
            playing
            color="white"
            controls
            style={{position:'absolute', top:'0', zIndex:'0', maxHeight:'94vh', overflow:'hidden'}}
          />
        )}
      </div>

      <div className="form-container" style={{background:'var(--theme-ui-colors-headerColor)', padding:'0 2%'}}>
  
        
          <div style={{ maxWidth:'800px', margin:'0 auto'}}>
          <form className="youtubeform frontdrop" onSubmit={handleSubmit}>
      
              <a title="Go Home" href="https://youtube.com" style={{ padding: '', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '', }}>
                <ImYoutube2 style={{ fontSize:'50px' }} />
              </a>
          
  
              <a title="Go Home" href="https://www.facebook.com/watch/" style={{ padding: '', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '', }}>
                <FaFacebookSquare style={{ fontSize: '30px' }} />
              </a>

              <a title="Go Home" href="https://www.twitch.tv/directory" style={{ padding: '', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '', }}>
                <FaTwitch style={{ fontSize: '30px' }} />
              </a>
            <input
              type="text"
              name="youtubelink"
              value={youtubelink}
              onInput={handleInputChange}
              onChange={handleShow}
              style={{ padding: '1vh 1vw', width:'100%', minWidth: '220px', outline: '1px solid #333', borderRadius: '', color: 'var(--theme-ui-colors-siteColor)' }}
              placeholder="Paste Video Link"
              className="youtubelinker"
            />
            <button type="reset" onClick={handleReset} style={{ fontSize: '90%', color: '', fontWeight: 'bold', textAlign: 'left', width: '', margin: '5px 15px 0 0' }}>
              Reset
            </button>
          </form>

          <div
          className="pagemenu panel"
          style={{
            position: "absolute",
            top: "1vw",
            zIndex: "1",
            left: "1vw",
            right: "",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "auto",
            maxWidth: "98vw",
            margin: "0 auto",
            gap: "5vw",
            background: "rgba(0, 0, 0, .5)",
            padding: "",
            border: "1px solid #666",
            borderRadius: "var(--theme-ui-colors-borderRadius)",
            textShadow: "0 1px 1px rgba(0, 0, 0, .7)",
            // fontSize: "clamp(2rem, 3vw, 3rem)",
            verticalAlign: "center",
          }}
        >
          <div
            className="menusnapp"
            style={{
              gap: "0",
              padding: "2vh 2vw",
              alignItems: "center",
              display: isMenuOpen ? "block" : "none",
            }}
          >

<div id="" className="flexbutt" style={{display:'', gap:'3vh', justifyContent:'center', alignItems:"center", margin:'0 0',
  padding:'0', position:'relative'}}>


<div style={{ minWidth:'25vw', maxHeight:'20vh', textAlign:'center', alignItems:"",}}>
<PirateLogo style={{ minWidth:'', maxHeight:'20vh'}} />
the web revolution
</div>

<div className="flexcheek mob2 print" style={{position:'', top:'', minWidth:'25vw', overflow:'', marginBottom:'', paddingTop:'', borderRadius:'var(--theme-ui-colors-borderRadius)',
      }}>
<div className="nameblock font" style={{margin:'0 auto 0 auto', padding:'0 0 0 0',alignContent:'center', display:'grid', textAlign:'center', justifyContent:'center', verticalAlign:'center',
  color:'#fff',
  paddingTop:'', 
  fontSize:'clamp(1rem, 1.4vw, 3.2rem)',
  background:'rgba(0,0,0,0.50)',
  backdropFilter:'blur(8px)',
  border:'10px double var(--theme-ui-colors-buttonHoverBg)', borderRadius:'var(--theme-ui-colors-borderRadius)',
  textShadow:'0 2px 0px #000',
  maxWidth:''
}}>
  <br />
    <span style={{margin:'2vh auto', fontSize:'160%'}}>PIRATE</span>
A web revolution
  <br /><br />
It's completely FREE!
  <br />
  <Link to="/contact" state={{modal: true}} className="button print" style={{ display: 'flex', justifyContent: 'center', padding:'1vh .5vw', maxWidth:'250px', margin:'30px auto' }}>Full verion of PIRATE</Link>

</div>
</div>


<div className="flexcheek mob2 print" style={{position:'', top:'', minWidth:'25vw', overflow:'', marginBottom:'', paddingTop:'', borderRadius:'var(--theme-ui-colors-borderRadius)',
      }}>

<div className="nameblock font" style={{margin:'0 auto 0 auto', padding:'0 0 0 0',alignContent:'center', display:'grid', textAlign:'center', justifyContent:'center', verticalAlign:'center',
  color:'#fff',
  paddingTop:'', 
  fontSize:'clamp(1rem, 1.4vw, 3.2rem)',
  background:'rgba(0,0,0,0.50)',
  backdropFilter:'blur(8px)',
  border:'10px double var(--theme-ui-colors-buttonHoverBg)', borderRadius:'var(--theme-ui-colors-borderRadius)',
  textShadow:'0 2px 0px #000',
  maxWidth:''
}}>
  <br />

    <span style={{margin:'2vh auto', fontSize:'160%'}}>PIRATE pro</span>


  {/* <span style={{margin:'10px auto', fontSize:'160%'}}>{companyname}</span> */}
    {/* <span style={{margin:'10px auto', fontSize:'160%'}}>Become a PIRATE!</span> */}
  
Next Gen Web App
  <br /><br />
Stake your claim
  <br />




  <Link to="/contact" state={{modal: true}} className="button print" style={{ display: 'flex', justifyContent: 'center', padding:'1vh .5vw', maxWidth:'250px', margin:'30px auto' }}>Get PIRATE pro</Link>


  


  


</div>


</div>

{/*  */}
</div> 

          </div>
          <button
            onClick={isMenuOpen ? resizeMobile : resizeDesk}
            aria-label={isMenuOpen ? "Collapse menu" : "Expand menu"}
            style={{ cursor: "pointer", padding: "8px", color: "#999", fontSize: 'clamp(2rem, 3vw, 3rem)' }}
          >
            <MenuIcon style={{maxHeight:'45px'}} />
          </button>
        </div>




          </div>

      </div>
    </>
  );
};

export default YouTubePlayer;
