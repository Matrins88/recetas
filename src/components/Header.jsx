import animeLogo from '/src/images/logo.png';


export function Header() {
  return (
    <div className="form-data">
      <h1>ANIME</h1>

    <img 
    src={animeLogo} 
    alt="Anime Logo"
    className="anime-logo"
  />
    </div>
  );
}
