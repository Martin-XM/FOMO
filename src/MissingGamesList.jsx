import { useState } from "react";
import { authedFetch } from "./authedFetch.js";
import { 
  tableWrapper,
  tableHeaderName,
  tableHeader,
  tableData,
  buttonClasses,
  boxesClasses,
  formImput,
  saveButon,
  buyButon,
  deleteButton
} from "./tailwindClasses";

// databáze bez ověřování
// const firebaseUrl = import.meta.env.VITE_FIREBASE_URL;

export default function MissingGamesList() {
  const [items, setItems] = useState({});
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [status, setStatus] = useState("");
  const [loaded, setLoaded] = useState(false);

  async function loadData() {
    setStatus("Načítám...");
    try {
      const res = await authedFetch(`/missing-games.json`);
      if (!res.ok) throw new Error("Chyba při načítání");
      const data = await res.json();
      setItems(data || {});
      setLoaded(true);
      setStatus("Databáze sledovaných her");
    } catch (err) {
      console.error(err);
      setStatus("Nepodařilo se načíst data");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleEdit(id, item) {
    setEditing(id);
    setForm(item);
  }

  async function handleSave(id) {
    try {
      const res = await authedFetch(`/missing-games/${encodeURIComponent(id)}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, createdAt: Date.now() }),
      });
      if (!res.ok) throw new Error("Chyba při ukládání");

      setItems((prev) => ({ ...prev, [id]: form }));
      setEditing(null);
      setStatus("Položka byla upravena");
    } catch (err) {
      console.error(err);
      setStatus("Chyba při ukládání");
    }
  }

  async function moveItem(id, item, target) {
    try {
      await authedFetch(`/${target}/${id}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      await authedFetch(`/missing-games/${encodeURIComponent(id)}.json`, {
        method: "DELETE",
      });

      const updated = { ...items };
      delete updated[id];
      setItems(updated);

      setStatus(target === "collect" ? "Přesunuto do zakoupených" : "Smazáno");
    } catch (err) {
      console.error(err);
      setStatus("Chyba při přesunu");
    }
  }

  return (
    <div className={ boxesClasses }>
      <h2 className="text-center mb-3">Sledované hry</h2>
      <div className="flex gap-4">
        <button className={buttonClasses} onClick={loadData}>Sledované hry</button>
        <div className="grid grid-cols-1">
          {status && <p>{status}</p>}

          {loaded && Object.keys(items).length === 0 && (
            <p className="text-left">Žádná data</p>
          )}
        </div>
      </div>

      {Object.entries(items).map(([id, item]) => (
        <div key={id} className={tableWrapper}>
          {editing === id ? (
            <>
              <input className={formImput} name="product" value={form.product} onChange={handleChange} placeholder="Název" />
              <input className={formImput} name="url" value={form.url} onChange={handleChange} placeholder="Odkaz" />
              <input className={formImput} name="price" value={form.price} onChange={handleChange} placeholder="Cena" />
              <input className={formImput} name="note" value={form.note} onChange={handleChange} placeholder="Poznámka" />
              <button className={saveButon} onClick={() => handleSave(id)}>Uložit</button>
              <button className={`${buttonClasses}`} onClick={() => setEditing(null)}>Zrušit</button>
            </>
          ) : (
            <>

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
              <button className={buttonClasses} onClick={() => handleEdit(id, item)}>Upravit</button>
              <button className={buyButon} onClick={() => moveItem(id, item, "collect")}>Zakoupeno</button>
              <button className={deleteButton} onClick={() => moveItem(id, item, "deleted")}>Smazat</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
