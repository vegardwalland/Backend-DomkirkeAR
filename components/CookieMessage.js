import CookieBanner from 'react-cookie-banner';
import cookie from 'js-cookie';


export default function CookieMessage() {

const styles = {
  banner: {
    fontFamily: 'Source Sans Pro',
    height: 57,
    background: 'rgba(52, 64, 81, 0.88)',
    backgroundSize: '30px 30px',
    backgroundColor: '',
    fontSize: '15px',
    fontWeight: 600
  },
  button: {
    border: '1px solid white',
    borderRadius: 4,
    width: 66,
    height: 32,
    lineHeight: '32px',
    background: 'transparent',
    color: 'white',
    fontSize: '14px',
    fontWeight: 600,
    opacity: 1,
    right: 20,
    marginTop: -18
  },
  message: {
    display: 'block',
    padding: '9px 67px',
    lineHeight: 1.3,
    textAlign: 'left',
    marginRight: 244,
    color: 'white'
  },
  link: {
    textDecoration: 'none',
    fontWeight: 'bold'
  }
}

const message = "Gamle Stavanger AR portal uses cookies to improve your experience. By continuing to browse the site you're agreeing to our use of cookies."


    return(
        <div>
            <CookieBanner
                styles={styles}
                message={message}
                link={<a href='/privacy-policy'>More information on our privacy policy here</a>}
                buttonMessage='Accept'
                onAccept={() => {
                  cookie.set('cookie-permission', 'user-has-accepted-cookies')
               }}
            />
        </div>
    );
}