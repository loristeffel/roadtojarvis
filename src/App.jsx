
import { useState } from "react";

export default function RoadtoJarvis() {
  const [entries, setEntries] = useState([]);
  const [coffee, setCoffee] = useState(false);
  const [lunch, setLunch] = useState(false);
  const [grocery, setGrocery] = useState(0);
  const [date, setDate] = useState("");

  const coffeeSavings = 4;
  const lunchSavings = 8;

  const addEntry = () => {
    const saved = (coffee ? coffeeSavings : 0) + (lunch ? lunchSavings : 0);
    const newEntry = { date, coffee, lunch, saved };
    setEntries([...entries, newEntry]);
    setCoffee(false);
    setLunch(false);
    setDate("");
  };

  const totalSaved = entries.reduce((sum, e) => sum + e.saved, 0);
  const netSavings = totalSaved - parseFloat(grocery || 0);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-serif p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">RoadtoJarvis</h1>
      <p className="mb-6 italic">Living frugally for the Pearl Jubilee</p>

      <div className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Select Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input type="checkbox" checked={coffee} onChange={() => setCoffee(!coffee)} className="mr-2" />
            Brought Coffee from Home
          </label>
          <label className="flex items-center">
            <input type="checkbox" checked={lunch} onChange={() => setLunch(!lunch)} className="mr-2" />
            Brought Lunch from Home
          </label>
        </div>

        <button onClick={addEntry} className="bg-black text-white px-4 py-2 rounded shadow">
          Add Entry
        </button>

        <div>
          <label className="block font-semibold mb-1">Grocery Spend This Week:</label>
          <input
            type="number"
            value={grocery}
            onChange={(e) => setGrocery(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">Savings Summary</h2>
          <p>Total Saved: ${totalSaved.toFixed(2)}</p>
          <p>Grocery Spend: ${parseFloat(grocery || 0).toFixed(2)}</p>
          <p className="font-bold">Net Savings: ${netSavings.toFixed(2)}</p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Daily Breakdown</h2>
          <ul className="space-y-1">
            {entries.map((entry, index) => (
              <li key={index} className="border p-2 rounded">
                <strong>{entry.date}</strong>: Saved ${entry.saved} {entry.coffee && "(Coffee)"} {entry.lunch && "(Lunch)"}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
