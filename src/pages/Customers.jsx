const CUSTOMERS = [{ id: 1, name: "Aysel" }, { id: 2, name: "Rauf" }, { id: 3, name: "Leyla" }];
export default function Customers() {
  return (<section><h1>Customers</h1>
    <table data-testid="customers-table"><thead><tr><th>Name</th></tr></thead>
      <tbody>{CUSTOMERS.map(c => <tr key={c.id}><td>{c.name}</td></tr>)}</tbody></table></section>);
}
