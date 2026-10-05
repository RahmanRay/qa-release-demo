import { useState } from "react";
const CUSTOMERS = [{ id: 1, name: "Aysel", phone: "+994 50 111 22 33" }, { id: 2, name: "Rauf", phone: "+994 55 444 55 66" }, { id: 3, name: "Leyla", phone: "+994 70 777 88 99" }];
export default function Customers() {
  const [query, setQuery] = useState("");
  const rows = CUSTOMERS.filter(c => c.name.toLowerCase().includes(query.trim().toLowerCase()));
  return (<section><h1>Customers</h1>
    <input type="search" placeholder="Search customers" value={query} onChange={e => setQuery(e.target.value)} />
    <table data-testid="customers-table"><thead><tr><th>Name</th><th>Phone</th></tr></thead>
      <tbody>{rows.map(c => <tr key={c.id}><td>{c.name}</td><td>{c.phone}</td></tr>)}</tbody></table></section>);
}
