import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <span>Made by Praneet.</span>
      <span className="divider">|</span>
      <a
        href="https://github.com/arkp1"
        target="_blank"
        rel="noopener noreferrer"
        className="github-link"
      >
        <Github strokeWidth={1.25} width={20} />
        <span>Github</span>
      </a>
    </footer>
  );
};

export default Footer;
