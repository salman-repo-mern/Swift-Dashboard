import './styles.css';

const Header = ({ navigateTo }) => {
  const handleProfileClick = () => {
    navigateTo('profile');
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img
          src="https://uploads-ssl.webflow.com/5fc61558289f574d2b695fe4/5fc7ad2ded1767b08813a7b5_logo.png"
          alt="logo-image"
          className="image-logo"
          style={{
            width: '150px',
            height: '70px',
            margin: '0 auto'
          }}
        />
      </div>

      <div className="user-info" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
        <div className="user-avatar">EH</div>
        <span className="user-name">Ervin Howell</span>
      </div>
    </header>
  );
};

export default Header;
