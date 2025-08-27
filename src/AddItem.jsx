import { useState } from "react";
import { buttonClasses } from './tailwindClasses';
import { formImput } from './tailwindClasses.js';
import { boxesClasses } from './tailwindClasses.js'; 
import { authedFetch } from "./authedFetch.js";

// databáze bez ověřování
// const firebaseUrl = import.meta.env.VITE_FIREBASE_URL;

export default function AddItem() {
  const [form, setForm] = useState({
    id: "",
    product: "",
    url: "",
    price: "",
    note: "",
  });
  
  const [status, setStatus] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Odesílám...");

    try {
      if (!form.product.trim()) throw new Error("Zadej název hry");

    const checkMissing = await authedFetch(
      `/missing-games/${encodeURIComponent(form.product)}.json`
      );
      if (!checkMissing.ok) throw new Error("Chyba při kontrole databáze");
      const existMissing = await checkMissing.json();

      const checkCollect = await authedFetch(
      `/collect/${encodeURIComponent(form.product)}.json`
      );
      if (!checkCollect.ok) throw new Error("Chyba při kontrole databáze");
      const existCollect = await checkCollect.json();

      if (existMissing || existCollect) {
      throw new Error("Hra s tímto názvem v databázi existuje");
    }

  const res = await authedFetch(
    `missing-games/${encodeURIComponent(form.product)}.json`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, createdAt: Date.now() }),
      });
      if (!res.ok) throw new Error("Chyba při odesílání");
      

      const data = await res.json();
      console.log("Odesláno:", data);
      setStatus("Úspěšně uloženo!");
      setForm({
        id: "",
        product: "",
        url: "",
        price: "",
        note: "",
      });
    } catch (err) {
  console.error(err);
  if (err.message) {
    setStatus(err.message);
  } else {
    setStatus("Nepodařilo se odeslat");
  }
}}

  return (
    <>
      <div className={`${boxesClasses} h-80`}>

        <h2 className="text-center mb-3">Vlož do databáze hru pro sledování</h2>
        <form onSubmit={handleSubmit}>
          <input className={ formImput }
            id="product"
            type="text"
            name="product"
            value={form.product}
            onChange={handleChange}
            placeholder="Hra/produkt pro sledování"
          />
          <input className={ formImput }
            id="url"
            type="text"
            name="url"
            value={form.url}
            onChange={handleChange}
            placeholder="Odkaz na produkt"
          />
          <input className={ formImput }
            id="price"  
            type="text"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Cena v Kč"
          />
          <input className={ formImput }
            id="note"
            type="text"
            name="note"
            value={form.note}
            onChange={handleChange}
            placeholder="Poznámka"
          />
          <div className="flex gap-4">
            <button type="submit" className={buttonClasses}>Odeslat</button>
            {status && <p className="mt-3 text-white">{status}</p>}
          </div>
          
        </form>
        
      </div>
    </>
  );
}