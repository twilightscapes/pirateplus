import React, { useState } from 'react';
import Seo from "./seo"
import { Link } from 'gatsby-plugin-modal-routing-4'
// import { ModalRoutingContext } from '@decantyme/gatsby-plugin-modal-routing'
// import { AiOutlineClose } from "react-icons/ai"
// import { window } from "browser-monads"
import "../styles/reset.css"
import "../styles/global.css"
// import "../assets/scss/styles.css"
import { AnchorLink } from "gatsby-plugin-anchor-links"
// import { StoreContext } from "../context/store-context"
// import { Toast } from "./toast"
// import Bug from "../../static/assets/logo.svg"
import SiteLogo from "../../static/assets/logo.svg"
import { Helmet } from "react-helmet"
import Theme from "./theme"
// import { CartButton } from "./cart-button"
import SearchIcon from "../../src/img/search"
// import SearchForm from "./searchbox"
import useSiteMetadata from "../hooks/SiteMetadata"
import { RiArrowUpFill } from "react-icons/ri"
import GoBack from "../components/goBack"
import { BiLeftArrow, BiHome } from "react-icons/bi"
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing-4'
// import { AiOutlineClose } from "react-icons/ai"
// import { BiGridHorizontal } from "react-icons/bi"
// import { MdOutlineRectangle } from "react-icons/md"
import Menu from "../components/menu"
// import MenuSocial from "../components/menu-social"
import userStyles from "../../static/data/userStyles.json"
import SignUp from "../components/newssign"
// import useNetlifyIdentity from '../components/useNetlifyIdentity';
import BlueCheck from './bluecheck';
import Switch from "../components/Switch"


const Layout = ({ children }) => {

  const [loggedIn] = useState(false);
  // useNetlifyIdentity(setLoggedIn);


const { companyname } = useSiteMetadata()
const { iconimage } = useSiteMetadata()

const { image } = useSiteMetadata()

// const { showModals } = useSiteMetadata()

const { showNav } = useSiteMetadata()
const { showNav2 } = useSiteMetadata()
// const { showInfo } = useSiteMetadata()
// const { showFeature } = useSiteMetadata()
// const { showPosts } = useSiteMetadata()
const { showSearch } = useSiteMetadata()

// const { showResume } = useSiteMetadata()
// const { showSocial } = useSiteMetadata()
// const { showSkills } = useSiteMetadata()
// const { showCover } = useSiteMetadata()
// const { showfooter } = useSiteMetadata()
const { showPopup } = useSiteMetadata()
// const { menu1 } = useSiteMetadata()
// const { menu2 } = useSiteMetadata()
// const { menu3 } = useSiteMetadata()
// const { menu4 } = useSiteMetadata()
const { font1 } = useSiteMetadata()
// const { userStyles } = useSiteMetadata()





  



const fontUrl = "https://fonts.googleapis.com/css?family=" + font1.replace(/\s+/g, '+') + "&display=swap";




  return (

<>




<Helmet>
  <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  {font1 ? (
    <link id="yyy" rel="stylesheet" href={fontUrl} crossOrigin="anonymous" referrerPolicy="no-referrer-when-downgrade" />
  ) : null}
  <style>{`
    #menu,.font,.full-width-image:after,.h1,.h2,.h3,.h4,.header .menu-icon:before,.horizontal-scroll:before,.intro:after,.intro:before,.scrolldown,h1,h2,h3,h4,input.special{font-family:${font1}, sans-serif}
    ${userStyles.userStyles}
  `}</style>
    {/* <script defer src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script> */}
</Helmet>


<Seo />


<div id="top" name="pagetop"></div>





  

<ModalRoutingContext.Consumer >
{({ modal, closeTo }) => (
<>
  {modal ? (
    <div style={{display:'', position:'fixed', top:'50px', right:'3%', padding:'0px', fontSize:'', opacity:'1 !important', zIndex:'10',}}>
    <Link state={{noScroll: true }} to={closeTo} style={{fontSize:'',  textDecoration:'none', lineHeight:'', display:'flex', flexDirection:'column', color:'#fff', cursor:'pointer'}}>
    <button className="button" style={{display:'flex', justifyContent:'center'}}><span className="icon -left" style={{paddingRight:''}}><BiLeftArrow /></span> {" "}Go Back</button>
    </Link>
    </div>
  ) : (
''
  )}
</>
)}
</ModalRoutingContext.Consumer>
  

<div id="gobacker" style={{position:'fixed', bottom:'0', right:'0', zIndex:'4', display:'flex', flexDirection:'column', alignItems:'center', gap:'', border:'0px solid yellow', justifyContent:'flex-end', paddingBottom:'18vh',  }}>
  
  <GoBack />

<div style={{display:'flex', alignItems:'center', gap:'10px', paddingLeft:'1rem'}}>
<div className="homebutt button" style={{display:'flex', flexDirection:'column', gap:'0', padding:'0', alignItems:'', textAlign:'center', borderRadius:'3px', textShadow:'0 1px 1px rgba(0, 0, 0, .7)', margin:'0' }}>
  <Link to="/" aria-label="Link to Top" style={{cursor:'pointer', display:'block', height:'', fontSize:''}}>
  <BiHome className="" style={{cursor:'pointer', backgroundColor:'rgba(0,0,0,.9)', color:'#ddd', fontSize:'32px', padding:'2',}} />
  </Link>
</div>

<a href="#top" onClick={(e) => {
  e.preventDefault();
  document.getElementById('top').scrollIntoView({ behavior: 'smooth' });
}} aria-label="Link to Top" style={{cursor:'pointer', display:'block', height:'', fontSize:''}}>
<div className="uparrow1 button" style={{display:'flex', flexDirection:'column', gap:'0', padding:'0', alignItems:'center', textAlign:'center', borderRadius:'3px', textShadow:'0 1px 1px rgba(0, 0, 0, .7)', margin:'0 1rem' }}>
  <RiArrowUpFill className="" style={{cursor:'pointer', backgroundColor:'rgba(0,0,0,.9)', color:'#ddd', padding:'2px', fontSize:'32px'}} />
</div>
</a>
</div>
</div>







{showNav ? (


<header className="header" style={{display:'block', height:'51px',}}>

<div id="menu" className="menu print panel1 header" style={{position:'fixed', width:'100vw', top:'0', zIndex:'10', maxHeight:'', overFlow:'', boxShadow:'0 0 2px rgba(0,0,0,.7)', padding:'0 3%', alignItems:'start', borderRadius:'0', display:'flex', justifyContent:'space-around', gap:'10px', color:'#fff',  borderBottom:'1px solid #222',}}>






          
<Link to="/" className="cornerlogo" name="homereturn" style={{position:'', display:'flex', alignItems:'center', justifyContent:'center', maxWidth:'', height:'60px', border:'0px solid transparent'}}  aria-label="Link to Top" title="Back to Top">
  
{iconimage ? (
<>
{loggedIn ? (
  <SiteLogo className="cornerlogo" style={{position:'relative', top:'', left:'30px', border:'0px solid white', padding:'0', maxHeight:'60px'}} alt={companyname} width="111" height="60" />
) : (
  <img className="cornerlogo" style={{position:'relative', top:'', left:'4%', border:'0px solid white', padding:'0', maxHeight:'60px'}} src={iconimage} alt={companyname} width="111" height="60" />
              
)}
</>    
) : (
  <div style={{fontWeight:'bold', display:'grid', justifyContent:'center', alignItems:'center', height:'60px', fontSize:'150%' }}>{companyname}1</div>
)}
</Link>
                        


<div id="bluecheck" style={{position:'absolute', left:'1%', top:'22px', cursor:'pointer'}}><BlueCheck /></div>

{/* {loggedIn ? (
  <div id="bluecheck" style={{position:'absolute', left:'1%', top:'22px', cursor:'pointer'}}><BlueCheck /></div>
) : (
  ""
  )} */}





<ul className="topmenu" style={{ fontSize:'clamp(.6rem, 1.6vw, 1.8rem)',  textAlign:'center',maxHeight:'', display:'flex', justifyContent:'space-between', gap:'4vw',  alignItems:'center', margin:'0 auto 0 auto', padding:'1.5vh 2% 0 2%', border:'0px solid white',}}>
      





      
 



<Menu />




</ul>

<div id="missioncontrol" className="missioncontrol sitecontrols" style={{display:'flex', justifyContent:'space-around', fontSize:'clamp(.8rem, 2.3vw, 2.5rem)', gap:'3vw', textAlign:'center', maxHeight:'', alignItems:'center', paddingTop:'5px'}}>

{showSearch ? (
<div className="searchIcon">
   <Link to="/search/" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'0px', textAlign:'center'}}>
    <SearchIcon style={{height:'30px'}} />
    <span className="themetext">search</span>
   </Link>
        </div>
      ) : (
        ""
      )}


  <div>
      <Theme  style={{}} />
        </div>

  
        <Switch />
 


</div>
      

        
           
      

            </div>
            </header>

) : (
  ""
)}






{showNav2 ? (

<header>

<input type="checkbox" className="openSidebarMenu" id="openSidebarMenu" />
<>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }</>
  <label htmlFor="openSidebarMenu" className="backdrop1" ></label>

<label id="menuicon" htmlFor="openSidebarMenu" className="sidebarIconToggle bug">
<div style={{textAlign:'center', opacity:'1', textShadow:'2px 2px 10px 2px #000', maxWidth:'500px', color:'#fff', fontWeight:'bold', border:'0px solid blue'}}>
{iconimage ? (
      <img className="" src={iconimage} alt={companyname} width="111" height="60" style={{maxHeight:'60px', maxWidth:'120px', border:'none'}} />
                ) : (
                  <div style={{fontWeight:'bold', color:'yellow'}}>companyname</div>
                )}
</div>
  </label>

  

   <div id="sidebarMenu" style={{minWidth:'', width:'',}}>

<ul className="sidebarMenuInner post-card panel" style={{maxWidth:'260px', position:'absolute', right:'0', display:'', justifyContent:''}}>

    <li className="grad logo" style={{position:'relative', maxHeight:'100px', width:'auto', display:'flex', justifyContent:'center'}}>
            <AnchorLink className="sidelogo" to="/" name="homereturn" style={{position:'', display:'block', maxWidth:'150px', height:'60px', border:'0px solid'}}  aria-label="Link to Top" title="Back to Top">
            {iconimage ? (
      <img src={iconimage} alt={companyname} width="111" height="60" style={{maxHeight:'60px', border:'none'}} />
                ) : (
                  <div style={{fontWeight:'bold'}}>companyname</div>
                )}
            </AnchorLink>
    </li>
      



       <Menu />          



<li>
<ul className="missioncontrol sitecontrols" style={{display:'flex', justifyContent:'space-around', fontSize:'clamp(.8rem, 2.3vw, 2.5rem)', gap:'', textAlign:'center', maxHeight:'', alignItems:'center', paddingTop:'5px'}}>




{showSearch ? (
<li className="searchIcon">
   <Link to="/search/" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'0px', textAlign:'center'}}>
    <SearchIcon style={{height:'30px'}} />
    <span className="themetext">search</span>
   </Link>
        </li>
      ) : (
        ""
      )}


  <li>
      <Theme  style={{}} />
        </li>

  
        <Switch />


</ul>
</li>

</ul>
</div>

</header>

) : (
  ""
)}














{showPopup ? (
<div className="signup popper"
  style={{
  position:'fixed',
  top:'15vh',
  left:'20vw',
  right:'20vw',
  zIndex:'1',
  margin:'70px auto 0 auto',
  padding:' 0',
  maxWidth:'500px',
  borderRadius:'12px',
  // display:'grid',
  // placeSelf:'center',
  }}>
<SignUp />
  </div>

      ) : (
        ""
      )}




<div style={{maxWidth:'', overflowX:'hidden', position:'relative'}}>
{children}
</div>
      


 

{image ? (
  <img className="backimage" src={image} alt="Default Background" style={{height:'100vh', width:'100vw', position:'fixed', zIndex:'-2', top:'0', objectFit:'cover',}} width="10" height="10" />
  // <object
  //     className="backimage"
  //     id=""
  //     data={image}
  //     type="image/svg+xml"
  //     style={{
  //       position:'absolute',
  //       display:'grid',
  //       placeContent:'center',
  //       top: '0',
  //       left: '',
  //       right: '',
  //       bottom: '',
  //       overflow: '',
  //       border: '0px solid red',
  //       zIndex: '-2',
  //       aspectRatio: '',
  //       height:'100vh', width:'100vw',
  //       background: 'transparent',
  //       objectFit: 'cover', 
  //       margin:'0 auto'
  //     }}
  //     alt="Default Background"
  //     title="Default Background"
  //   ></object>
) : (
  ""
)}



      

      
      </>

    
    );
  };
  
  export default Layout;

  