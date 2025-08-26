import { footerStyle } from "./tailwindClasses";

export default function Footer() {
    return (
      <footer className={footerStyle}>
        <div>
          <p className="text-center text-sm text-white mt-1">Powered by{" "}
            <a
             href="https://www.facebook.com/KollektorsUniverse"
             target="_blank"
             rel="noopener noreferrer"
             className="!text-white italic no-underline hover:text-gray-300"
           >
             Kollektors Universe
           </a>
          </p>
          <p className="text-center text-sm text-white mt-1">
          © {new Date().getFullYear()} FOMO. Všechna práva ztracena…
          </p>
        </div>

      </footer>
    );
}