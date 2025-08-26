import { useState } from "react";
import { buttonClasses, tableHeaderName, boxesClasses, tableWrapper, tableHeader, tableData } from "./tailwindClasses";
import { authedFetch } from "./authedFetch.js";

// databáze bez ověřování
// const firebaseUrl = import.meta.env.VITE_FIREBASE_URL;

export default function CollectList() {
  const [items, setItems] = useState({});
  const [status, setStatus] = useState("");
  const [loaded, setLoaded] = useState(false);

  async function loadData() {
    setStatus("Načítám...");
    try {
      const res = await authedFetch(`/collect.json`);
      if (!res.ok) throw new Error("Chyba při načítání");
      const data = await res.json();
      setItems(data || {});
      setLoaded(true);
      setStatus("Načteno");
    } catch (err) {
      console.error(err);
      setStatus("Nepodařilo se načíst data");
    }
  }

  return (
    <div className={ boxesClasses }>
      <h2 className="text-center mb-3">Zakoupené hry</h2>
      <div className="flex gap-4">
        <button className={`${buttonClasses} bg-green-500`} onClick={loadData}>
          Načíst
        </button>
          <div className="grid grid-cols-1">
        {status && <p>{status}</p>}

          {loaded && Object.keys(items).length === 0 && (
            <p className="text-left">Žádná data</p>
          )}
        </div>
      </div>
        
       {Object.keys(items).length > 0 && (
  <div className="mt-4 space-y-4">
    {Object.entries(items).map(([id, item]) => (
      <div key={id} className={tableWrapper}>

        <table className={ tableHeaderName }>
          <tbody>
            <tr>
              <td className={tableData}>{item.product}</td>
            </tr>
          </tbody>
        </table>

        <table className="w-full border-collapse border">
          <tbody>
            <tr>
              <th className={tableHeader}>
                Cena
              </th>
              <td className={tableData}>
                {item.price} Kč
              </td>
            </tr>
            <tr>
              <th className={tableHeader}>
                Odkaz
              </th>
              <td className={tableData}>
                <a
                  href={item.url.startsWith("http") ? item.url : `https://${item.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white underline break-all"
                >
                  {item.url}
                </a>
              </td>
            </tr>
            <tr>
              <th className={tableHeader}>
                Poznámka
              </th>
              <td className={tableData}>
                {item.note}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ))}
  </div>
)}
    </div>
  );
}
